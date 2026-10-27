# 独立动态资料库

这是与 Zensical/GitHub Pages 静态主站分开的动态 Flask 应用。管理员可登录、创建目录、多文件上传、拖动排序、删除文件；公开访客可浏览目录、在线打开 Markdown、PDF 与图片。

`seed/library/` 是首次部署时导入的初始内容。导入完成后，服务在数据盘创建初始化标记；后续部署会保留线上修改与删除，不会重新覆盖初始内容。

## 部署到 Render

1. 打开 [Render Blueprint 新建页](https://dashboard.render.com/blueprints/new)，登录或注册 Render。若出现 GitHub 授权页，授权 Render 读取你的 GitHub 仓库。
2. 选择仓库 `Juicydream0701/xueshan-notes`，分支选 `main`。Render 会读取仓库根目录的 `render.yaml`，服务根目录已设置为 `dynamic-notes`。
3. 检查将要创建的服务：Web 服务 `xueshan-notes-library`、Starter 实例、1 GB 持久磁盘。Render 持久磁盘需要付费实例；先核对页面显示的费用，再决定是否创建。
4. Render 提示填写 `ADMIN_PASSWORD` 时输入后台密码。用户名已经预设为 `xueshan`。原先计划的 `xueshan2006` 已出现在聊天记录中，公网部署建议改用新的强密码，并保存在自己的密码管理器中。
5. 点击创建后等待首次构建完成。首次启动会把 `seed/library/` 里的三类初始资料复制到持久磁盘；以后代码重新部署会保留线上资料和修改。
6. 在服务页面找到 `https://...onrender.com` 域名，打开后确认首页能看到“爱班资料”“方法与工具”“资料索引”三个目录，再测试 `/login` 管理员登录和 Markdown 预览。

主站连接：将生成的 `onrender.com` 地址发给维护者，主站“笔记资料管理”入口即可改为动态资料库首页。管理员入口是该域名下的 `/login`。

创建服务时，Blueprint 会配置以下环境变量：

- `ADMIN_USERNAME` 已预设为 `xueshan`。
- `ADMIN_PASSWORD`：由你在 Render 控制台的私密 Environment 页面设置，不会存进 GitHub。
- `SECRET_KEY` 会由 Render 自动生成。

Render Blueprint 中配置了持久磁盘，上传文件会保存于 `/var/data/library`。部署完成会得到独立的 `*.onrender.com` 域名。将该域名接入主站的“笔记资料管理”入口后，访客可从主站进入动态资料库。Render 持久磁盘需使用付费实例，提交部署前请查看账户显示的当前费用。

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

上传支持 Markdown、PDF、图片、TXT、DOCX、PPTX、XLSX 和 ZIP，单文件上限 100 MB。删除非空文件夹前需先移除其中文件。
