# 全站校对与电路原理讲义：交付记录

日期：2026-11-05。所有写入均在网站目录内，原课程资料文件夹只读。沿用米白、青绿页面背景与课程侧边栏，保留课程、原资料及原URL。

## 本轮完成内容

- 通读电路主线以外93个原有Markdown页面，对33页作63处知识、适用条件、符号或资料状态纠正。逐页记录见[内容审查](content-audit.md)。课程入口、专题正文、速查提纲和原始PDF的用途在新增阅读说明中分开说明；其他课程仍有部分短提纲，本轮未把所有课程重写成教材。
- 电路原理按8章扩展，约3万中文汉字：模型与定律、方程、定理与端口、正弦稳态、动态电路、非正弦与三相、9道综合训练、耦合与二端口。含从定义到公式的推导、完整数值题、易错分析、折叠自测和提高方法。例题明确为教学自编，不标作历年真题；二端口等拓展不冒充当前课程必考范围。
- 新绘12幅SVG电路/波形图，核对拓扑、方向和参数，并修复读图发现的标签重叠。原PDF中的题图通过具体文件和物理页码入口提供。
- 新增按知识点检索原讲义的资料页；只另复制二阶暂态和对应版本教材勘误两份PDF。原有文件保留，不整包搬运课程文件夹。
- 整本HTML讲义从8章构建结果自动汇总，提供目录、展开全部解答、打印/浏览器另存为PDF。它是阅读与打印入口，本轮未生成一份独立下载的PDF讲义。原有总览提纲折叠保存，速查页连接相应详细讲解。
- MathJax 3.2.2固定版本本地托管，附Apache许可证，不依赖外部CDN加载公式；限定TeX输入，避免动态排版把辅助MathML再次嵌套处理。保留辅助MathML输出。

## 校验结果

| 范围 | 结果 |
| --- | --- |
| 构建 | `zensical build --clean`无问题；整本汇总8章成功 |
| 本地引用 | 109个HTML文件、16,488个本地引用，未发现失效文件或锚点、越界PDF页码 |
| PDF | 146份站内PDF可解析、页数可读取；不代表逐页认证全部扫描答案 |
| 源文件保护 | 49份实际读取的电路课程源PDF与提取前SHA256一致 |
| 浏览器公式 | Chrome检查107个index页面、2,095处公式标记；无公式错误、页面JS异常、坏图或整页横向溢出 |
| 电路数值 | 独立MNA/复数网络求解、ODE数值积分及波形积分，71项断言通过 |
| 手机布局 | 8章在390px视口下均无整页横向溢出；长公式保留局部滚动 |
| 整本版 | 8章、1,386处公式，38个提示/解答折叠块可全部展开；打印前展开及打印后恢复通过 |
| 动态公式 | 新插入模拟助手回答的行内公式和aligned环境均排版成功；重复排版未增加嵌套公式 |
| PDF阅读器 | 切换二阶课件、调至1000px、刷新后文件选择和高度均保留；新标签页地址正确 |
| 外部网络隔离 | 禁止外部HTTPS请求时，测试页面公式仍可加载、排版 |

数值验证程序是[verify_circuit_examples.py](verify_circuit_examples.py)，需要额外安装NumPy，仅用于复核，不参与网站构建；结果见[circuit-crosscheck-results.json](circuit-crosscheck-results.json)。审查理由见[交叉校对](circuit-crosscheck-review.md)。机器可读汇总见[validation-summary.json](validation-summary.json)。

## 外部资料与仍需区分的范围

87个不同外链复查中，83个返回200；All About Circuits的两个入口返回403，Render首页和登录入口超时。保留来源并在资料页说明可替代的公开入口；HTTP成功也不代表登录后正文可匿名读取。小红书短链首次检查404，后续恢复为登录跳转，提示已更新。

三相原PDF第7页存在可见算术排版错误，网页明确提醒按完整题图重新列式，原文件未改写。本轮未声称全部原课件、手写答案或所有考试题均已逐题重算。二端口、灵敏度及部分网络定理作为提高内容，具体考试范围须对照任课教师或报考院校大纲。

## 审阅入口

- [电路课程目录](https://juicydream0701.github.io/xueshan-notes/notes/courses/circuit-theory/)
- [动态电路：完整推导与例题](https://juicydream0701.github.io/xueshan-notes/notes/courses/circuit-theory/topics/05-transients/)
- [综合训练](https://juicydream0701.github.io/xueshan-notes/notes/courses/circuit-theory/topics/07-problems/)
- [整本阅读与打印](https://juicydream0701.github.io/xueshan-notes/notes/courses/circuit-theory/handout.html)
- [原讲义资料索引](https://juicydream0701.github.io/xueshan-notes/notes/courses/circuit-theory/resources-guide/)

GitHub Actions先构建常规页面，再执行`scripts/build_circuit_handout.py`汇总整本讲义，最后部署Pages。具体发布是否成功须以对应Actions和线上新内容验证为准。
