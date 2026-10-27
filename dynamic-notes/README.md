# 独立动态资料库

这是与 Zensical/GitHub Pages 静态主站分开的动态 Flask 应用。管理员可登录、创建目录、多文件上传、拖动排序、删除文件；公开访客可浏览目录、在线打开 Markdown、PDF 与图片。

## 部署到 Render

在 Render 新建 Blueprint 并选择此仓库，根目录的 `render.yaml` 会创建独立 Web 服务。创建服务时，在 Render 的环境变量设置页面填写：

- `ADMIN_USERNAME`：`xueshan`
- `ADMIN_PASSWORD`：设置管理员密码。不要把密码写入仓库或发进公开页面；准备正式启用时建议换成未公开过的强密码。
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
