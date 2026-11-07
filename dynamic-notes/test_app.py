import io
import os
import tempfile
import unittest
import zipfile
from pathlib import Path
from unittest.mock import patch

import fitz
from PIL import Image


class LibraryAppTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.temp = tempfile.TemporaryDirectory()
        cls.env = patch.dict(os.environ, {
            "DATA_DIR": cls.temp.name,
            "ADMIN_USERNAME": "xueshan",
            "ADMIN_PASSWORD": "test-password",
            "SECRET_KEY": "test-only-secret-key",
        })
        cls.env.start()
        import app as library_app
        cls.library_app = library_app
        cls.client = library_app.app.test_client()
        library_app.app.config.update(TESTING=True)
        library_app.DATA_DIR = Path(cls.temp.name)
        library_app.LIBRARY = Path(cls.temp.name) / "library"
        library_app.LIBRARY.mkdir(exist_ok=True)

    @classmethod
    def tearDownClass(cls):
        cls.env.stop()
        cls.temp.cleanup()

    def login(self):
        response = self.client.post("/login", data={"username": "xueshan", "password": "test-password"})
        self.assertEqual(response.status_code, 302)
        with self.client.session_transaction() as session:
            return session["csrf"]

    def login_as(self, username, password):
        response = self.client.post("/login", data={"username": username, "password": password})
        self.assertEqual(response.status_code, 302)
        with self.client.session_transaction() as session:
            return session["csrf"]

    def test_public_library_and_unicode_markdown(self):
        note = self.library_app.LIBRARY / "测试笔记.md"
        note.write_text("# 标题\n\n正文", encoding="utf-8")
        listing = self.client.get("/")
        self.assertEqual(listing.status_code, 200)
        self.assertIn("00 爱班资料".encode(), listing.data)
        page = self.client.get("/view/测试笔记.md")
        self.assertEqual(page.status_code, 200)
        self.assertIn("正文".encode(), page.data)

    def test_markdown_edit_requires_login_and_saves(self):
        note = self.library_app.LIBRARY / "可编辑.md"
        note.write_text("旧内容", encoding="utf-8")
        self.assertEqual(self.client.get("/edit/可编辑.md").status_code, 403)
        csrf = self.login()
        editor = self.client.get("/edit/可编辑.md")
        self.assertEqual(editor.status_code, 200)
        saved = self.client.post("/edit/可编辑.md", data={"csrf": csrf, "content": "# 新标题\n\n新内容"})
        self.assertEqual(saved.status_code, 302)
        self.assertIn("新内容", note.read_text(encoding="utf-8"))

    def test_login_required_and_invalid_credentials(self):
        denied = self.client.post("/folder", data={"name": "private"})
        self.assertEqual(denied.status_code, 403)
        wrong = self.client.post("/login", data={"username": "xueshan", "password": "wrong"})
        self.assertEqual(wrong.status_code, 200)
        self.assertIn("账号或密码不正确".encode(), wrong.data)

    def test_upload_folder_and_reorder(self):
        csrf = self.login()
        created = self.client.post("/folder", data={"csrf": csrf, "folder": "", "name": "课程笔记"})
        self.assertEqual(created.status_code, 302)
        uploaded = self.client.post("/upload", data={
            "csrf": csrf,
            "folder": "课程笔记",
            "files": (io.BytesIO(b"# note"), "中文笔记.md"),
        }, content_type="multipart/form-data")
        self.assertEqual(uploaded.status_code, 302)
        saved = self.library_app.LIBRARY / "课程笔记" / "中文笔记.md"
        self.assertTrue(saved.is_file())
        ordered = self.client.post("/reorder", data={"csrf": csrf, "folder": "课程笔记", "name": "中文笔记.md"})
        self.assertEqual(ordered.status_code, 200)
        self.assertTrue((saved.parent / ".order.json").is_file())

    def test_path_traversal_is_rejected(self):
        response = self.client.get("/view/%2e%2e%2foutside.txt")
        self.assertEqual(response.status_code, 404)
        hidden = self.client.get("/view/.order.json")
        self.assertEqual(hidden.status_code, 404)

    def test_owner_can_manage_members_and_viewer_is_read_only(self):
        csrf = self.login()
        created = self.client.post("/admin/users/create", data={
            "csrf": csrf, "username": "reader", "password": "reader-pass", "role": "viewer",
        })
        self.assertEqual(created.status_code, 302)
        self.assertEqual(self.client.get("/admin/users").status_code, 200)
        self.client.post("/logout", data={"csrf": csrf})
        viewer_csrf = self.login_as("reader", "reader-pass")
        self.assertEqual(self.client.get("/admin/users").status_code, 403)
        self.assertEqual(self.client.post("/folder", data={"csrf": viewer_csrf, "name": "blocked"}).status_code, 403)
        self.client.post("/logout", data={"csrf": viewer_csrf})
        owner_csrf = self.login()
        blocked = self.client.post("/admin/users/xueshan/delete", data={"csrf": owner_csrf}, follow_redirects=True)
        self.assertEqual(blocked.status_code, 200)
        self.assertIn("所有者账号不能删除".encode(), blocked.data)

    def test_online_converter_pdf_and_image(self):
        csrf = self.login()
        first = fitz.open(); first.new_page().insert_text((72, 72), "one"); first_pdf = first.tobytes(); first.close()
        second = fitz.open(); second.new_page().insert_text((72, 72), "two"); second_pdf = second.tobytes(); second.close()
        merged = self.client.post("/convert", data={
            "csrf": csrf, "operation": "pdf_merge", "files": [
                (io.BytesIO(first_pdf), "one.pdf"), (io.BytesIO(second_pdf), "two.pdf"),
            ],
        }, content_type="multipart/form-data")
        self.assertEqual(merged.status_code, 200)
        document = fitz.open(stream=merged.data, filetype="pdf")
        self.assertEqual(document.page_count, 2)
        document.close()
        split = self.client.post("/convert", data={
            "csrf": csrf, "operation": "pdf_split", "pages": "2",
            "files": (io.BytesIO(merged.data), "merged.pdf"),
        }, content_type="multipart/form-data")
        self.assertEqual(split.status_code, 200)
        with zipfile.ZipFile(io.BytesIO(split.data)) as bundle:
            self.assertEqual(bundle.namelist(), ["merged-001.pdf"])
        text_pdf = self.client.post("/convert", data={
            "csrf": csrf, "operation": "text_pdf", "files": (io.BytesIO("中文文本".encode("utf-8")), "note.txt"),
        }, content_type="multipart/form-data")
        self.assertEqual(text_pdf.status_code, 200)
        self.assertTrue(text_pdf.data.startswith(b"%PDF"))
        image = Image.new("RGBA", (20, 10), (20, 120, 90, 255)); image_data = io.BytesIO(); image.save(image_data, format="PNG")
        converted = self.client.post("/convert", data={
            "csrf": csrf, "operation": "image_convert", "format": "JPEG", "max_size": "10",
            "files": (io.BytesIO(image_data.getvalue()), "test.png"),
        }, content_type="multipart/form-data")
        self.assertEqual(converted.status_code, 200)
        self.assertEqual(converted.mimetype, "image/jpeg")
        self.assertLessEqual(Image.open(io.BytesIO(converted.data)).width, 10)


if __name__ == "__main__":
    unittest.main()
