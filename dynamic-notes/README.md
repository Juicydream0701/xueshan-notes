# 独立动态资料库

这是与 Zensical/GitHub Pages 静态主站分开的动态 Flask 应用。成员登录后按角色浏览或管理资料：`xueshan` 是不可删除的所有者，可以添加、删除成员并调整权限；编辑者可以上传、编辑、删除和排序资料；只读成员只能浏览。公开访客可浏览目录、在线打开 Markdown、PDF 与图片。`/convert` 提供在线 PDF、图片、TXT/CSV 转换入口。

`seed/library/` 是每次服务启动时可恢复的初始内容。新增精选导读应放进这里并提交到 GitHub，避免把大 PDF 重复上传到 Render。免费实例没有持久磁盘，服务休眠、重启或重新部署后，运行时上传的文件、`users.json` 和权限改动可能丢失；GitHub 中的初始 Markdown 资料不会丢失。

## 部署到 Render

1. 打开 [Render Blueprint 新建页](https://dashboard.render.com/blueprints/new)，登录或注册 Render。若出现 GitHub 授权页，授权 Render 读取你的 GitHub 仓库。
2. 选择仓库 `Juicydream0701/xueshan-notes`，分支选 `main`。Render 会读取仓库根目录的 `render.yaml`，服务根目录已设置为 `dynamic-notes`。
3. 检查将要创建的服务：Web 服务 `xueshan-notes-library`、Free 实例。当前配置不创建磁盘，因此不产生持久磁盘费用。
4. Render 提示填写 `ADMIN_PASSWORD` 时输入后台密码。用户名已经预设为 `xueshan`。原先计划的 `xueshan2006` 已出现在聊天记录中，公网部署建议改用新的强密码，并保存在自己的密码管理器中。
5. 点击创建后等待首次构建完成。服务启动时会把 `seed/library/` 里的精选资料复制到临时目录，并用 `ADMIN_PASSWORD` 初始化 `xueshan` 所有者。
6. 在服务页面找到 `https://...onrender.com` 域名，打开后确认首页能看到课程导读和生活随感目录，再测试 `/login`、Markdown 预览和 `/admin/users` 用户管理。

主站连接：将生成的 `onrender.com` 地址发给维护者，主站“笔记资料管理”入口即可改为动态资料库首页。管理员入口是该域名下的 `/login`。

创建服务时，Blueprint 会配置以下环境变量：

- `ADMIN_USERNAME` 已预设为 `xueshan`。
- `ADMIN_PASSWORD`：由你在 Render 控制台的私密 Environment 页面设置，不会存进 GitHub。
- `SECRET_KEY` 会由 Render 自动生成。

免费 Web Service 每月提供有限的实例小时数，连续约 15 分钟没有请求会休眠，唤醒可能需要等待约一分钟；服务没有持久磁盘，运行时上传、用户配置和本地 JSON 在重启或重新部署后不保证保留。它适合少量精选资料和临时协作。若要长期保存用户、权限和 PDF，应使用外部数据库/对象存储或带持久磁盘的方案；不要把 Render Free 当作唯一备份。

## 本地运行

```powershell
$env:ADMIN_USERNAME='xueshan'
$env:ADMIN_PASSWORD='设置你自己的密码'
$env:SECRET_KEY='本机随机长字符串'
python -m venv .venv
.venv\Scripts\python.exe -m pip install -r requirements.txt
.venv\Scripts\python.exe app.py
```

打开 `http://127.0.0.1:5000/`。本地资料默认保存在 `data/library`，此目录不纳入 Git。

上传支持 Markdown、PDF、图片、TXT、DOCX、PPTX、XLSX 和 ZIP，单次请求上限 100 MB。在线转换单个输入限制为 25 MB，最多 20 个文件，输出完成后直接下载。删除非空文件夹前需先移除其中文件。用户密码使用哈希保存，不会写入明文；所有管理表单要求 CSRF 令牌。

你提供的 Windows EXE 是独立的 PyInstaller 桌面版，包含依赖 Microsoft Office 的 PPT/Word/Excel 能力。浏览器和 Render Linux 不能直接执行它，所以网页端只重做可跨平台的 PDF、图片和文本功能；完整 Office 转换仍需在 Windows 本机运行该工具。EXE 不放进 GitHub 仓库或 Render 文件系统，避免超过 GitHub 单文件限制和免费实例的临时存储限制。
