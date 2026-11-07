import hmac
import io
import json
import os
import secrets
import shutil
import re
import csv
import zipfile
from datetime import datetime, timezone
from pathlib import Path, PurePosixPath

import bleach
import markdown
from flask import Flask, abort, flash, redirect, render_template, request, send_file, session, url_for
from werkzeug.security import check_password_hash, generate_password_hash
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "") or secrets.token_hex(32)
app.config["MAX_CONTENT_LENGTH"] = 100 * 1024 * 1024
app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
app.config["SESSION_COOKIE_SECURE"] = bool(os.environ.get("RENDER_EXTERNAL_URL"))
DATA_DIR = Path(os.environ.get("DATA_DIR", Path(__file__).parent / "data"))
LIBRARY = DATA_DIR / "library"
USERS_FILE = DATA_DIR / "users.json"
LIBRARY.mkdir(parents=True, exist_ok=True)
SEED_LIBRARY = Path(__file__).parent / "seed" / "library"
SEED_MARKER = DATA_DIR / ".seed-v2-done"
if SEED_LIBRARY.exists():
    for source in SEED_LIBRARY.rglob("*"):
        target = LIBRARY / source.relative_to(SEED_LIBRARY)
        if source.is_dir():
            target.mkdir(parents=True, exist_ok=True)
        elif not target.exists():
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(source, target)
    if not SEED_MARKER.exists():
        SEED_MARKER.touch()
ALLOWED = {"md", "markdown", "pdf", "png", "jpg", "jpeg", "gif", "webp", "txt", "docx", "pptx", "xlsx", "zip"}
TAGS = {
    "p", "br", "hr", "h1", "h2", "h3", "h4", "blockquote", "ul", "ol", "li",
    "strong", "em", "code", "pre", "table", "thead", "tbody", "tr", "th", "td", "a",
}
ROLES = {
    "owner": {"label": "所有者", "can_edit": True, "can_delete": True, "can_users": True},
    "editor": {"label": "编辑者", "can_edit": True, "can_delete": True, "can_users": False},
    "viewer": {"label": "只读成员", "can_edit": False, "can_delete": False, "can_users": False},
}
USERNAME_RE = re.compile(r"^[A-Za-z][A-Za-z0-9_.-]{1,39}$")
CONVERTER_MAX_FILES = 20
CONVERTER_MAX_FILE_BYTES = 25 * 1024 * 1024


def now_iso():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def read_users():
    try:
        data = json.loads(USERS_FILE.read_text(encoding="utf-8"))
    except (OSError, ValueError, TypeError):
        return {}
    if not isinstance(data, dict):
        return {}
    return {name: value for name, value in data.items() if isinstance(name, str) and isinstance(value, dict)}


def write_users(users):
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    temporary = USERS_FILE.with_suffix(".tmp")
    temporary.write_text(json.dumps(users, ensure_ascii=False, indent=2), encoding="utf-8")
    os.replace(temporary, USERS_FILE)


def ensure_user_store():
    """Create the owner from Render's private env vars on a fresh instance."""
    users = read_users()
    username = (os.environ.get("ADMIN_USERNAME", "xueshan") or "xueshan").strip()
    password = os.environ.get("ADMIN_PASSWORD", "")
    if not USERNAME_RE.fullmatch(username):
        username = "xueshan"
    current = users.get(username)
    if not current or current.get("role") != "owner" or not current.get("password_hash"):
        if password:
            users[username] = {
                "password_hash": generate_password_hash(password),
                "role": "owner",
                "created_at": current.get("created_at", now_iso()) if current else now_iso(),
                "updated_at": now_iso(),
            }
            write_users(users)
    return users


ensure_user_store()


def safe_path(rel=""):
    clean = PurePosixPath(rel.replace("\\", "/"))
    if clean.is_absolute() or any(part in ("..", ".") or part.startswith(".") for part in clean.parts):
        abort(404)
    result = (LIBRARY / Path(*clean.parts)).resolve()
    if result != LIBRARY.resolve() and LIBRARY.resolve() not in result.parents:
        abort(404)
    return result


def logged_in():
    return current_user() is not None


def current_user():
    username = session.get("user")
    if not username:
        return None
    user = read_users().get(username)
    if not user or user.get("disabled") or user.get("role") not in ROLES:
        return None
    return {"username": username, **user, **ROLES[user["role"]]}


def require_role(permission):
    user = current_user()
    if not user or not user.get(permission):
        abort(403)
    return user


def clean_name(value):
    name = Path((value or "").replace("\\", "/")).name.strip()
    name = "".join(ch for ch in name if ch.isprintable() and ch not in "/\\")
    if name in {"", ".", "..", ".order.json"}:
        return ""
    return name[:180]


def converter_uploads():
    files = [item for item in request.files.getlist("files") if item and item.filename]
    if not files:
        raise ValueError("请先选择要转换的文件。")
    if len(files) > CONVERTER_MAX_FILES:
        raise ValueError(f"一次最多处理 {CONVERTER_MAX_FILES} 个文件。")
    for item in files:
        item.stream.seek(0, os.SEEK_END)
        size = item.stream.tell()
        item.stream.seek(0)
        if size > CONVERTER_MAX_FILE_BYTES:
            raise ValueError(f"单个文件不能超过 {CONVERTER_MAX_FILE_BYTES // (1024 * 1024)} MB。")
    return files


def converter_name(upload, fallback="input"):
    name = secure_filename(upload.filename or fallback) or fallback
    return Path(name).stem[:80]


def parse_pages(value, total):
    if not value.strip():
        return list(range(total))
    result = []
    for part in value.replace("，", ",").split(","):
        part = part.strip()
        if not part:
            continue
        if "-" in part:
            start, end = part.split("-", 1)
            if not start.strip().isdigit() or not end.strip().isdigit():
                raise ValueError("页码范围格式应为 1-3,6。")
            first, last = int(start), int(end)
            if first > last:
                first, last = last, first
            result.extend(range(first - 1, last))
        elif part.isdigit():
            result.append(int(part) - 1)
        else:
            raise ValueError("页码格式应为 1-3,6。")
    if not result or any(page < 0 or page >= total for page in result):
        raise ValueError(f"页码必须在 1 到 {total} 之间。")
    return result


def upload_bytes(upload):
    return upload.read()


def make_text_pdf(text, title="文本转换结果"):
    from reportlab.lib.pagesizes import A4
    from reportlab.pdfbase import pdfmetrics
    from reportlab.pdfbase.cidfonts import UnicodeCIDFont
    from reportlab.pdfgen import canvas

    pdfmetrics.registerFont(UnicodeCIDFont("STSong-Light"))
    output = io.BytesIO()
    page_width, page_height = A4
    pdf = canvas.Canvas(output, pagesize=A4)
    pdf.setTitle(title)
    pdf.setFont("STSong-Light", 11)
    x, y = 48, page_height - 52
    for raw_line in text.splitlines() or [""]:
        line = raw_line.expandtabs(4)
        while len(line) > 52:
            pdf.drawString(x, y, line[:52])
            y -= 17
            line = line[52:]
            if y < 48:
                pdf.showPage(); pdf.setFont("STSong-Light", 11); y = page_height - 52
        pdf.drawString(x, y, line)
        y -= 17
        if y < 48:
            pdf.showPage(); pdf.setFont("STSong-Light", 11); y = page_height - 52
    pdf.save()
    output.seek(0)
    return output.getvalue()


@app.route("/convert", methods=["GET", "POST"])
def converter():
    if request.method == "GET":
        return render_template("converter.html")
    require_role("can_edit")
    operation = request.form.get("operation", "")
    try:
        files = converter_uploads()
        if operation == "pdf_merge":
            import fitz
            result = fitz.open()
            for upload in files:
                if Path(upload.filename).suffix.lower() != ".pdf":
                    raise ValueError("PDF 合并只能选择 PDF 文件。")
                source = fitz.open(stream=upload_bytes(upload), filetype="pdf")
                result.insert_pdf(source)
                source.close()
            data = result.tobytes(garbage=4, deflate=True)
            result.close()
            return send_file(io.BytesIO(data), as_attachment=True, download_name="merged.pdf", mimetype="application/pdf")

        if operation in {"pdf_extract", "pdf_split", "pdf_images"}:
            import fitz
            upload = files[0]
            if Path(upload.filename).suffix.lower() != ".pdf":
                raise ValueError("这个功能需要选择一个 PDF 文件。")
            source = fitz.open(stream=upload_bytes(upload), filetype="pdf")
            pages = parse_pages(request.form.get("pages", ""), source.page_count)
            base = converter_name(upload, "document")
            if operation == "pdf_extract":
                result = fitz.open()
                for page in pages:
                    result.insert_pdf(source, from_page=page, to_page=page)
                data = result.tobytes(garbage=4, deflate=True)
                result.close(); source.close()
                return send_file(io.BytesIO(data), as_attachment=True, download_name=f"{base}-selected.pdf", mimetype="application/pdf")
            archive = io.BytesIO()
            with zipfile.ZipFile(archive, "w", zipfile.ZIP_DEFLATED) as bundle:
                for index, page_number in enumerate(pages, 1):
                    if operation == "pdf_split":
                        result = fitz.open(); result.insert_pdf(source, from_page=page_number, to_page=page_number)
                        bundle.writestr(f"{base}-{index:03d}.pdf", result.tobytes(garbage=4, deflate=True)); result.close()
                    else:
                        pixmap = source.load_page(page_number).get_pixmap(matrix=fitz.Matrix(1.5, 1.5), alpha=False)
                        bundle.writestr(f"{base}-{index:03d}.png", pixmap.tobytes("png"))
            source.close(); archive.seek(0)
            suffix = "pages" if operation == "pdf_split" else "images"
            return send_file(archive, as_attachment=True, download_name=f"{base}-{suffix}.zip", mimetype="application/zip")

        if operation == "image_convert":
            from PIL import Image
            fmt = request.form.get("format", "PNG").upper()
            if fmt not in {"PNG", "JPEG", "WEBP"}:
                raise ValueError("图片输出格式不受支持。")
            try:
                max_size = max(0, min(8000, int(request.form.get("max_size", "0") or 0)))
            except ValueError:
                raise ValueError("最大边长必须是数字。")
            outputs = []
            for upload in files:
                image = Image.open(io.BytesIO(upload_bytes(upload)))
                image.load()
                if max_size and max(image.size) > max_size:
                    image.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)
                if fmt == "JPEG" and image.mode not in {"RGB", "L"}:
                    background = Image.new("RGB", image.size, "white"); background.paste(image, mask=image.getchannel("A") if "A" in image.getbands() else None); image = background
                out = io.BytesIO()
                save_kwargs = {"quality": 88} if fmt in {"JPEG", "WEBP"} else {}
                image.save(out, format=fmt, **save_kwargs)
                outputs.append((converter_name(upload), out.getvalue()))
            if len(outputs) == 1:
                ext = fmt.lower().replace("jpeg", "jpg")
                return send_file(io.BytesIO(outputs[0][1]), as_attachment=True, download_name=f"{outputs[0][0]}.{ext}", mimetype=f"image/{'jpeg' if fmt == 'JPEG' else ext}")
            archive = io.BytesIO()
            with zipfile.ZipFile(archive, "w", zipfile.ZIP_DEFLATED) as bundle:
                ext = fmt.lower().replace("jpeg", "jpg")
                for name, data in outputs: bundle.writestr(f"{name}.{ext}", data)
            archive.seek(0)
            return send_file(archive, as_attachment=True, download_name="converted-images.zip", mimetype="application/zip")

        if operation in {"text_pdf", "csv_pdf"}:
            upload = files[0]
            raw = upload_bytes(upload)
            text = None
            for encoding in ("utf-8-sig", "utf-16", "gb18030"):
                try:
                    text = raw.decode(encoding); break
                except UnicodeDecodeError:
                    continue
            if text is None:
                raise ValueError("文本编码无法识别，请另存为 UTF-8、UTF-16 或 GB18030。")
            if operation == "csv_pdf":
                rows = list(csv.reader(io.StringIO(text)))
                text = "\n".join("    ".join(row) for row in rows)
            data = make_text_pdf(text, converter_name(upload))
            return send_file(io.BytesIO(data), as_attachment=True, download_name=f"{converter_name(upload)}.pdf", mimetype="application/pdf")
        raise ValueError("请选择一个转换功能。")
    except ValueError as error:
        flash(str(error), "error")
    except Exception:
        app.logger.exception("online conversion failed")
        flash("转换失败，请确认文件格式和大小后重试。Office 文件在线转换暂不支持。", "error")
    return redirect(url_for("converter"))


@app.get("/health")
def health():
    return {"status": "ok", "service": "xueshan-notes-library", "storage": "ephemeral-free"}


@app.get("/")
def index():
    items = []
    current = request.args.get("folder", "")
    folder = safe_path(current)
    if folder.exists() and folder.is_dir():
        order_file = folder / ".order.json"
        try:
            order = json.loads(order_file.read_text(encoding="utf-8")) if order_file.exists() else []
        except (OSError, ValueError):
            order = []
        order_map = {name: index for index, name in enumerate(order)}
        for item in sorted((p for p in folder.iterdir() if p.name != ".order.json"), key=lambda p: (order_map.get(p.name, 999999), not p.is_dir(), p.name.casefold())):
            rel = item.relative_to(LIBRARY).as_posix()
            try:
                stat = item.stat()
                size = stat.st_size if item.is_file() else sum(child.stat().st_size for child in item.rglob("*") if child.is_file())
                updated = datetime.fromtimestamp(stat.st_mtime, timezone.utc).astimezone().strftime("%Y-%m-%d")
            except OSError:
                size, updated = 0, ""
            items.append({"name": item.name, "path": rel, "folder": item.is_dir(), "ext": item.suffix.lower(), "size": size, "updated": updated})
    user = current_user()
    return render_template("index.html", items=items, folder=current, admin=bool(user), user=user)


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "")
        user = read_users().get(username)
        if user and not user.get("disabled") and check_password_hash(user.get("password_hash", ""), password):
            session.clear()
            session["user"] = username
            session["csrf"] = secrets.token_urlsafe(32)
            return redirect(url_for("index"))
        else:
            flash("账号或密码不正确。", "error")
    return render_template("login.html")


@app.post("/logout")
def logout():
    check_csrf()
    session.clear()
    return redirect(url_for("index"))


def check_csrf():
    if not logged_in() or not hmac.compare_digest(session.get("csrf", ""), request.form.get("csrf", "")):
        abort(403)


@app.post("/folder")
def create_folder():
    check_csrf()
    require_role("can_edit")
    parent = request.form.get("folder", "")
    name = clean_name(request.form.get("name", ""))
    if not name:
        flash("文件夹名称无效。", "error")
    else:
        safe_path(parent).joinpath(name).mkdir(parents=True, exist_ok=True)
        flash("文件夹已创建。", "success")
    return redirect(url_for("index", folder=parent))


@app.post("/upload")
def upload():
    check_csrf()
    require_role("can_edit")
    folder = request.form.get("folder", "")
    destination = safe_path(folder)
    destination.mkdir(parents=True, exist_ok=True)
    saved = 0
    for uploaded in request.files.getlist("files"):
        filename = clean_name(uploaded.filename or "")
        ext = filename.rsplit(".", 1)[-1].lower() if "." in filename else ""
        if filename and ext in ALLOWED:
            uploaded.save(destination / filename)
            saved += 1
    flash(f"已上传 {saved} 个文件。", "success" if saved else "error")
    return redirect(url_for("index", folder=folder))


@app.route("/edit/<path:rel>", methods=["GET", "POST"])
def edit_file(rel):
    require_role("can_edit")
    path = safe_path(rel)
    if not path.is_file() or path.suffix.lower() not in {".md", ".markdown"}:
        abort(404)
    if request.method == "POST":
        check_csrf()
        path.write_text(request.form.get("content", ""), encoding="utf-8")
        flash("笔记已保存。", "success")
        return redirect(url_for("view_file", rel=rel))
    return render_template("edit.html", name=path.name, rel=rel, content=path.read_text(encoding="utf-8", errors="replace"))


@app.get("/view/<path:rel>")
def view_file(rel):
    path = safe_path(rel)
    if not path.is_file():
        abort(404)
    if path.suffix.lower() in {".md", ".markdown"}:
        source = path.read_text(encoding="utf-8", errors="replace")
        html = markdown.markdown(source, extensions=["tables", "fenced_code", "toc"])
        html = bleach.clean(html, tags=TAGS, attributes={"a": ["href", "title"]}, protocols={"http", "https", "mailto"})
        return render_template("markdown.html", name=path.name, content=html)
    mimetypes = {".pdf": "application/pdf", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif", ".webp": "image/webp", ".txt": "text/plain"}
    return send_file(path, mimetype=mimetypes.get(path.suffix.lower(), "application/octet-stream"), as_attachment=False, download_name=path.name)


@app.post("/delete")
def delete_item():
    check_csrf()
    require_role("can_delete")
    path = safe_path(request.form.get("path", ""))
    parent = request.form.get("folder", "")
    if path.is_dir():
        try:
            path.rmdir()
        except OSError:
            flash("文件夹不为空，需先移除其中内容。", "error")
    elif path.is_file():
        path.unlink()
        flash("文件已删除。", "success")
    return redirect(url_for("index", folder=parent))


@app.post("/reorder")
def reorder():
    check_csrf()
    require_role("can_edit")
    folder = safe_path(request.form.get("folder", ""))
    names = request.form.getlist("name")
    actual = {p.name for p in folder.iterdir() if p.name != ".order.json"}
    if set(names) != actual or len(names) != len(actual):
        abort(400)
    (folder / ".order.json").write_text(json.dumps(names, ensure_ascii=False), encoding="utf-8")
    return {"ok": True}


@app.context_processor
def inject_template_values():
    user = current_user()
    return {
        "csrf_token": session.get("csrf", ""),
        "parent_folder": lambda value: str(PurePosixPath(value).parent) if "/" in value else "",
        "current_user": user,
        "role_labels": {key: value["label"] for key, value in ROLES.items()},
    }


@app.get("/admin/users")
def users_admin():
    require_role("can_users")
    users = read_users()
    rows = [{"username": name, **value, **ROLES.get(value.get("role"), ROLES["viewer"])} for name, value in sorted(users.items())]
    return render_template("users.html", users=rows)


@app.post("/admin/users/create")
def create_user():
    check_csrf()
    require_role("can_users")
    username = request.form.get("username", "").strip()
    password = request.form.get("password", "")
    role = request.form.get("role", "viewer")
    users = read_users()
    if not USERNAME_RE.fullmatch(username):
        flash("用户名需以英文字母开头，使用 2–40 个字母、数字、点、下划线或短横线。", "error")
    elif username in users:
        flash("这个用户名已经存在。", "error")
    elif role not in {"editor", "viewer"}:
        flash("新用户只能设置为编辑者或只读成员。", "error")
    elif len(password) < 8:
        flash("密码至少需要 8 个字符。", "error")
    else:
        users[username] = {"password_hash": generate_password_hash(password), "role": role, "created_at": now_iso(), "updated_at": now_iso()}
        write_users(users)
        flash(f"已添加用户 {username}。", "success")
    return redirect(url_for("users_admin"))


@app.post("/admin/users/<username>/update")
def update_user(username):
    check_csrf()
    require_role("can_users")
    users = read_users()
    target = users.get(username)
    if not target:
        abort(404)
    role = request.form.get("role", target.get("role"))
    password = request.form.get("password", "")
    if target.get("role") == "owner":
        flash("所有者账号只能由 Render 的 ADMIN_PASSWORD 环境变量初始化，不能在此降级。", "error")
    elif role not in {"editor", "viewer"}:
        flash("权限选择无效。", "error")
    elif password and len(password) < 8:
        flash("新密码至少需要 8 个字符。", "error")
    else:
        target["role"] = role
        if password:
            target["password_hash"] = generate_password_hash(password)
        target["updated_at"] = now_iso()
        write_users(users)
        flash(f"已更新用户 {username}。", "success")
    return redirect(url_for("users_admin"))


@app.post("/admin/users/<username>/delete")
def delete_user(username):
    check_csrf()
    owner = require_role("can_users")
    users = read_users()
    target = users.get(username)
    if not target:
        abort(404)
    if username == owner["username"] or target.get("role") == "owner":
        flash("所有者账号不能删除。", "error")
    else:
        del users[username]
        write_users(users)
        flash(f"已删除用户 {username}。", "success")
    return redirect(url_for("users_admin"))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", "5000")), debug=False)
