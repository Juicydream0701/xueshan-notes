import hmac
import json
import os
import secrets
import shutil
from pathlib import Path, PurePosixPath

import bleach
import markdown
from flask import Flask, abort, flash, redirect, render_template, request, send_file, session, url_for

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "") or secrets.token_hex(32)
app.config["MAX_CONTENT_LENGTH"] = 100 * 1024 * 1024
app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
app.config["SESSION_COOKIE_SECURE"] = bool(os.environ.get("RENDER_EXTERNAL_URL"))
DATA_DIR = Path(os.environ.get("DATA_DIR", Path(__file__).parent / "data"))
LIBRARY = DATA_DIR / "library"
LIBRARY.mkdir(parents=True, exist_ok=True)
SEED_LIBRARY = Path(__file__).parent / "seed" / "library"
SEED_MARKER = DATA_DIR / ".seed-v1-done"
if SEED_LIBRARY.exists() and not SEED_MARKER.exists():
    for source in SEED_LIBRARY.rglob("*"):
        target = LIBRARY / source.relative_to(SEED_LIBRARY)
        if source.is_dir():
            target.mkdir(parents=True, exist_ok=True)
        elif not target.exists():
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(source, target)
    SEED_MARKER.touch()
ALLOWED = {"md", "markdown", "pdf", "png", "jpg", "jpeg", "gif", "webp", "txt", "docx", "pptx", "xlsx", "zip"}
TAGS = {
    "p", "br", "hr", "h1", "h2", "h3", "h4", "blockquote", "ul", "ol", "li",
    "strong", "em", "code", "pre", "table", "thead", "tbody", "tr", "th", "td", "a",
}


def safe_path(rel=""):
    clean = PurePosixPath(rel.replace("\\", "/"))
    if clean.is_absolute() or any(part in ("..", ".") or part.startswith(".") for part in clean.parts):
        abort(404)
    result = (LIBRARY / Path(*clean.parts)).resolve()
    if result != LIBRARY.resolve() and LIBRARY.resolve() not in result.parents:
        abort(404)
    return result


def logged_in():
    return session.get("admin") is True


def clean_name(value):
    name = Path((value or "").replace("\\", "/")).name.strip()
    name = "".join(ch for ch in name if ch.isprintable() and ch not in "/\\")
    if name in {"", ".", "..", ".order.json"}:
        return ""
    return name[:180]


@app.get("/health")
def health():
    return {"status": "ok"}


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
            items.append({"name": item.name, "path": rel, "folder": item.is_dir(), "ext": item.suffix.lower()})
    return render_template("index.html", items=items, folder=current, admin=logged_in())


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        expected_user = os.environ.get("ADMIN_USERNAME", "")
        expected_password = os.environ.get("ADMIN_PASSWORD", "")
        if not expected_user or not expected_password:
            flash("后台尚未配置管理员账号，请联系站点管理员。", "error")
        elif hmac.compare_digest(request.form.get("username", ""), expected_user) and hmac.compare_digest(request.form.get("password", ""), expected_password):
            session.clear()
            session["admin"] = True
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
    if not logged_in():
        abort(403)
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
    folder = safe_path(request.form.get("folder", ""))
    names = request.form.getlist("name")
    actual = {p.name for p in folder.iterdir() if p.name != ".order.json"}
    if set(names) != actual or len(names) != len(actual):
        abort(400)
    (folder / ".order.json").write_text(json.dumps(names, ensure_ascii=False), encoding="utf-8")
    return {"ok": True}


@app.context_processor
def inject_template_values():
    return {"csrf_token": session.get("csrf", ""), "parent_folder": lambda value: str(PurePosixPath(value).parent) if "/" in value else ""}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", "5000")), debug=False)
