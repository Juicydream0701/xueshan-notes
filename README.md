# 雪山大地 · 个人笔记网站

这是一个“学习笔记为主、生活记录为辅”的个人网站初版。

## 本地预览

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m zensical serve
```

浏览器打开 `http://127.0.0.1:8000/` 即可预览。

## 内容怎么放

- 学习笔记放在 `docs/notes/`，新增页面后在 `mkdocs.yml` 的 `nav` 中加入目录。
- 生活文章放在 `docs/life/posts/`，文件顶部写日期、标签和主题，文章会自动归档。
- 图片可以放在 `docs/assets/images/`，文章中用相对路径引用。

## 免费发布到 GitHub Pages

1. 在 GitHub 新建一个公开仓库，例如 `my-notes`。
2. 把这个文件夹上传到仓库的 `main` 分支。
3. 在仓库的 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
4. 等待名为“部署笔记网站”的工作流完成。
5. 网站地址通常是 `https://你的用户名.github.io/my-notes/`。

GitHub Free 可以为公开仓库提供 Pages 托管。个人文字笔记通常远低于 GitHub Pages 的 1 GB 网站大小和每月约 100 GB 流量软限制；私人日记和敏感信息不要放进公开仓库。

## 下一步可以一起调整

- 把“雪山大地”换成你的正式站名和一句介绍。
- 把课程、专业或兴趣方向写进学习笔记目录。
- 决定生活栏目要不要增加旅行、阅读、照片等分类。
- 根据你的照片和审美继续调整首页插画、字体和配色。
