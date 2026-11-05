> 集成复核说明：本文保留首次审查记录。后续87个外链复查有83个返回200、2个All About Circuits入口返回403、2个Render入口超时；小红书短链后续恢复跳转登录页，网站提示已同步更新。以[最终验证记录](2026-11-05-site-review.md)为准。

# 全站既有内容审查记录（电路原理主线之外）

审查日期：2026-11-05。范围是 `docs/` 下除 `notes/courses/circuit-theory/` 之外的 93 个既有 Markdown 页面。电路原理讲义由另一任务逐题制作、核验，未混入本报告统计。主页、导航、CSS 和 JS 未由本审查任务修改。

共对 33 个页面作 63 处有明确理由的纠错与限定。保留原有课程条目、文件和资料路径；未写入任何 `D:/01资料/` 源课程文件夹。

## 优先纠正的内容

- 数学：独立与互斥不存在一般强弱包含关系；可去奇点的洛朗主部为空；壳层法须跟随旋转轴选择半径和积分变量；补充可微、正则约束、收敛区间及单边拉普拉斯初值约定。
- 电学与物理：直流负反馈运放也可在理想线性条件下使用虚短虚断；比较器阈值须先定义电阻连接；高斯定律不限于高对称场；平面波、波阻抗、泊松方程须明确介质条件。
- 微机与数字：8051 支持 `MOV direct,direct`；门控 GATE 看 `/INTx` 高电平；SMOD 是 PCON bit 7；SM2 不替软件匹配地址；静态冒险可由单输入变化引发；setup/hold 时钟偏斜符号已统一。
- 控制、信号与测量：传递函数不一定无量纲；标准二阶系统超调公式的适用条件；Nyquist 需计入开环右半平面极点；系统函数须给零初值；时间窗截断与 DFT 频率取样已区分。
- 半导体：有效质量标量曲率式限定一维/主轴；质量作用定律限定非简并热平衡；小注入不自动推出过剩电子空穴浓度相等；有偏压/光照时不能默认热平衡。
- 资料入口：公式写法改为可确定经 arithmatex 识别的 Markdown 写法；阅读器选项格式整理；原资料链接均保留；一条明确返回 404 的短链添加状态。

## 逐文件记录

“本轮未改”表示已检查可见正文、公式条件、例题逻辑及链接，没有发现本轮需要直接修正的问题；不代表逐页认证原始 PDF 中的每个手写步骤。

| 文件 | 页面角色 | 本轮结果 |
| --- | --- | --- |
| `docs/about.md` | 站点入口 / 说明 | 已读，本轮未改。 |
| `docs/index.md` | 站点入口 / 说明 | 已读，本轮未改。 |
| `docs/life/index.md` | 生活栏目 | 已读，本轮未改。 |
| `docs/life/posts/2026-10-26-first-note.md` | 生活栏目 | 已读，本轮未改。 |
| `docs/managed/index.md` | 动态资料入口 | 已读，本轮未改。 |
| `docs/notes/campus/ai-lab-guide.md` | 经验 / 外部资料索引 | 已读，本轮未改。 |
| `docs/notes/campus/course-selection.md` | 经验 / 外部资料索引 | 已读，本轮未改。 |
| `docs/notes/campus/experiences.md` | 经验 / 外部资料索引 | 已读，本轮未改。 |
| `docs/notes/campus/index.md` | 经验 / 外部资料索引 | 已读，本轮未改。 |
| `docs/notes/campus/modeling-guide.md` | 经验 / 外部资料索引 | 保留原始小红书短链并标注本次检查返回 404，避免读者误以为是可直接使用的资料。 |
| `docs/notes/campus/resource-index.md` | 经验 / 外部资料索引 | 已读，本轮未改。 |
| `docs/notes/campus/study-methods.md` | 经验 / 外部资料索引 | 已读，本轮未改。 |
| `docs/notes/campus/transfer-modeling.md` | 经验 / 外部资料索引 | 已读，本轮未改。 |
| `docs/notes/courses/analog-electronics/index.md` | 课程 / 分类总览 | 已读，本轮未改。 |
| `docs/notes/courses/analog-electronics/study-guide.md` | 复习路线 / 速查提纲 | 修正小信号输入电阻公式多余反斜杠。；修正晶体管电流公式转义。；纠正把理想运放虚短虚断误归为仅动态分析的概念错误。 |
| `docs/notes/courses/circuit-electronics-experiments/index.md` | 课程 / 分类总览 | 将频率响应适用范围改为线性时不变网络，并限定幅度比的分贝参考。；补比较器阈值公式的电阻拓扑和零参考条件，避免只背分压系数。 |
| `docs/notes/courses/computer-networks/index.md` | 课程 / 分类总览 | 已读，本轮未改。 |
| `docs/notes/courses/computer-networks/topics.md` | 专题讲解 | 已读，本轮未改。 |
| `docs/notes/courses/control-theory/index.md` | 课程 / 分类总览 | 已读，本轮未改。 |
| `docs/notes/courses/control-theory/topics.md` | 专题讲解 | 区分标准二阶超调量的精确公式与高阶近似。；纠正传递函数不一定无量纲。；补 Nyquist 必须结合开环右半平面极点计数。 |
| `docs/notes/courses/digital-electronics/chapter-notes.md` | 专题讲解 | 已读，本轮未改。 |
| `docs/notes/courses/digital-electronics/index.md` | 课程 / 分类总览 | 纠正静态冒险不要求两个输入同时变化。；给时钟偏斜定义一致的建立时间公式。；明确 setup/hold 使用最大/最小延迟及 skew 符号约定。 |
| `docs/notes/courses/digital-electronics/study-guide.md` | 复习路线 / 速查提纲 | 已读，本轮未改。 |
| `docs/notes/courses/electrical-networks/chapter-notes.md` | 专题讲解 | 限定理想并联无功补偿保持有功功率的前提。 |
| `docs/notes/courses/electrical-networks/index.md` | 课程 / 分类总览 | 已读，本轮未改。 |
| `docs/notes/courses/electrical-networks/study-guide.md` | 复习路线 / 速查提纲 | 已读，本轮未改。 |
| `docs/notes/courses/electromagnetics/chapter-notes.md` | 专题讲解 | 修正全页向量微分/麦克斯韦方程/波阻抗/反射系数中的双反斜杠。；限定横向平面波的介质条件。 |
| `docs/notes/courses/electromagnetics/index.md` | 课程 / 分类总览 | 补横电磁波和无耗波阻抗的介质条件。 |
| `docs/notes/courses/electromagnetics/study-guide.md` | 复习路线 / 速查提纲 | 补平面波正交关系适用条件。；补简化泊松方程的均匀介质条件。；避免把复数反射系数简化为正负号。 |
| `docs/notes/courses/engineering-graphics/index.md` | 课程 / 分类总览 | 补标准件和轴纵向剖切不剖的图样规定。 |
| `docs/notes/courses/engineering-training/index.md` | 课程 / 分类总览 | 消除 3D 打印悬垂角度方向的歧义。 |
| `docs/notes/courses/foundations/ai-foundations/index.md` | 课程 / 分类总览 | 已读，本轮未改。 |
| `docs/notes/courses/foundations/ai-foundations/topics.md` | 专题讲解 | 已读，本轮未改。 |
| `docs/notes/courses/foundations/c-programming/index.md` | 课程 / 分类总览 | 已读，本轮未改。 |
| `docs/notes/courses/foundations/c-programming/topics.md` | 专题讲解 | 修正 C 字符串结束符的展示。；补清 sizeof 的对象/指针边界。 |
| `docs/notes/courses/foundations/calculus/derivatives.md` | 专题讲解 | 已读，本轮未改。 |
| `docs/notes/courses/foundations/calculus/index.md` | 课程 / 分类总览 | 已读，本轮未改。 |
| `docs/notes/courses/foundations/calculus/integrals.md` | 专题讲解 | 纠正绕 x 轴壳层法的半径和积分变量。；补积分中值定理连续性条件。 |
| `docs/notes/courses/foundations/calculus/limits-continuity.md` | 专题讲解 | 明确双侧极限等价条件及端点例外。；区分介值定理与零点定理特例。 |
| `docs/notes/courses/foundations/calculus/multivariable.md` | 专题讲解 | 补方向导数等于梯度点积的可微条件。；补拉格朗日乘子约束正则条件。；补隐式曲面切平面的非零梯度条件。 |
| `docs/notes/courses/foundations/calculus/series.md` | 专题讲解 | 补基本幂级数的收敛范围。；区分单边拉普拉斯变换 0+ 与 0- 的约定。 |
| `docs/notes/courses/foundations/calculus/vector-integrals.md` | 专题讲解 | 已读，本轮未改。 |
| `docs/notes/courses/foundations/college-physics/index.md` | 课程 / 分类总览 | 已读，本轮未改。 |
| `docs/notes/courses/foundations/college-physics/topics.md` | 专题讲解 | 限定刚体转动力矩公式的固定轴场景。；明确热力学第一定律符号。；纠正将高斯定律适用性限于高对称场景的说法。 |
| `docs/notes/courses/foundations/college-physics-2/index.md` | 课程 / 分类总览 | 已读，本轮未改。 |
| `docs/notes/courses/foundations/complex-analysis/index.md` | 课程 / 分类总览 | 纠正可去奇点与极点的洛朗主部分类。 |
| `docs/notes/courses/foundations/discrete-mathematics/index.md` | 课程 / 分类总览 | 已读，本轮未改。 |
| `docs/notes/courses/foundations/discrete-mathematics/topics.md` | 专题讲解 | 已读，本轮未改。 |
| `docs/notes/courses/foundations/index.md` | 课程 / 分类总览 | 已读，本轮未改。 |
| `docs/notes/courses/foundations/linear-algebra/index.md` | 课程 / 分类总览 | 已读，本轮未改。 |
| `docs/notes/courses/foundations/linear-algebra/topics.md` | 专题讲解 | 已读，本轮未改。 |
| `docs/notes/courses/foundations/ordinary-differential-equations/index.md` | 课程 / 分类总览 | 补暂态衰减和无阻尼共振的条件。 |
| `docs/notes/courses/foundations/ordinary-differential-equations/topics.md` | 专题讲解 | 补分离变量可能遗漏的平衡解。 |
| `docs/notes/courses/foundations/probability-statistics/index.md` | 课程 / 分类总览 | 纠正独立性与互斥之间的错误强弱关系。；澄清方差展开总成立、独立仅使协方差项消失。；补小样本 t 统计量的正态独立假设。 |
| `docs/notes/courses/foundations/probability-statistics/topics.md` | 专题讲解 | 统一概率专题中独立/互斥的定义。 |
| `docs/notes/courses/general-education/college-english.md` | 专题讲解 | 已读，本轮未改。 |
| `docs/notes/courses/general-education/entrepreneurship.md` | 专题讲解 | 已读，本轮未改。 |
| `docs/notes/courses/general-education/index.md` | 课程 / 分类总览 | 已读，本轮未改。 |
| `docs/notes/courses/general-education/innovation-methods.md` | 专题讲解 | 已读，本轮未改。 |
| `docs/notes/courses/general-education/law-basics.md` | 专题讲解 | 已读，本轮未改。 |
| `docs/notes/courses/general-education/marxism.md` | 专题讲解 | 已读，本轮未改。 |
| `docs/notes/courses/general-education/mental-health.md` | 专题讲解 | 已读，本轮未改。 |
| `docs/notes/courses/general-education/modern-china-history.md` | 专题讲解 | 已读，本轮未改。 |
| `docs/notes/courses/index.md` | 课程 / 分类总览 | 已读，本轮未改。 |
| `docs/notes/courses/measurement-instruments/index.md` | 课程 / 分类总览 | 已读，本轮未改。 |
| `docs/notes/courses/measurement-instruments/topics.md` | 专题讲解 | 限定奈奎斯特两倍最高频率条件的基带采样场景。；区分不可恢复混叠与有意带通采样。；纠正有限观察窗与 DFT 频率取样的概念混合。 |
| `docs/notes/courses/microcomputer/architecture.md` | 专题讲解 | 已读，本轮未改。 |
| `docs/notes/courses/microcomputer/assembly.md` | 专题讲解 | 已读，本轮未改。 |
| `docs/notes/courses/microcomputer/chapter-notes.md` | 专题讲解 | 已读，本轮未改。 |
| `docs/notes/courses/microcomputer/cortex-m.md` | 专题讲解 | 已读，本轮未改。 |
| `docs/notes/courses/microcomputer/index.md` | 课程 / 分类总览 | 已读，本轮未改。 |
| `docs/notes/courses/microcomputer/instruction-set.md` | 专题讲解 | 纠正 8051 MOV 可支持直接地址间传送。 |
| `docs/notes/courses/microcomputer/interfaces.md` | 专题讲解 | 已读，本轮未改。 |
| `docs/notes/courses/microcomputer/interrupts.md` | 专题讲解 | 已读，本轮未改。 |
| `docs/notes/courses/microcomputer/serial.md` | 专题讲解 | 区分 PCON 字节地址和 SMOD 位。；补串口多机通信 SM2 过滤机制。 |
| `docs/notes/courses/microcomputer/study-guide.md` | 复习路线 / 速查提纲 | 已读，本轮未改。 |
| `docs/notes/courses/microcomputer/timers.md` | 专题讲解 | 明确定时器门控高电平，不混淆低有效中断。 |
| `docs/notes/courses/power-electronics/index.md` | 课程 / 分类总览 | 已读，本轮未改。 |
| `docs/notes/courses/power-electronics/topics.md` | 专题讲解 | 已读，本轮未改。 |
| `docs/notes/courses/semester-map.md` | 课程 / 分类总览 | 已读，本轮未改。 |
| `docs/notes/courses/semiconductor-physics/chapter-notes.md` | 专题讲解 | 限定有效质量曲率公式的一维/主轴方向，区分一般各向异性张量。；补质量作用定律的非简并与热平衡前提。；区分小注入与少数载流子的相对变化，避免把所有注入都描述为原位成对产生。；纠正把过剩电子空穴相等仅由注入水平决定的判断。 |
| `docs/notes/courses/semiconductor-physics/index.md` | 课程 / 分类总览 | 已读，本轮未改。 |
| `docs/notes/courses/semiconductor-physics/study-guide.md` | 复习路线 / 速查提纲 | 避免题目未明说时盲目默认热平衡，要求先读偏压与光照条件。；修正准费米能级的文字错误。 |
| `docs/notes/courses/signal-analysis/chapter-notes.md` | 专题讲解 | 补周期信号定义与常量无基波周期的例外。 |
| `docs/notes/courses/signal-analysis/index.md` | 课程 / 分类总览 | 补 Z 域系统函数零初始条件。 |
| `docs/notes/courses/signal-analysis/study-guide.md` | 复习路线 / 速查提纲 | 已读，本轮未改。 |
| `docs/notes/courses/wireless-communications/index.md` | 课程 / 分类总览 | 明确路径损耗的 dB 单位、频率距离数值单位和远场条件。；避免把绝对功率 dBm 与相对损耗 dB 混写。 |
| `docs/notes/index.md` | 课程 / 分类总览 | 已读，本轮未改。 |
| `docs/notes/tools/index.md` | 工具 / 资料索引 | 已读，本轮未改。 |
| `docs/notes/tools/markdown.md` | 工具 / 资料索引 | 已读，本轮未改。 |
| `docs/notes/tools/pdf-library.md` | 工具 / 资料索引 | 给出与 Markdown arithmatex 确定兼容的公式写作方法。；纠正普通链接必定新标签页的错误承诺。；避免单份等效法课件被误标为两种资料。 |
| `docs/notes/tools/pdf-reader.md` | 工具 / 资料索引 | 修正阅读器选项源码挤在同一行，选项内容不变。 |
| `docs/notes/topics/index.md` | 课程 / 分类总览 | 已读，本轮未改。 |

## 本地核验

- 93 个页面未发现本地文件链接缺失；Markdown 链接按源文件解析，原始 HTML 阅读器选项按生成后的目录 URL 解析。PDF 的 `#view=FitH` 碎片不影响文件存在性。
- 没有残留控制字符、可疑的字面量 `\n` 行分隔，也未发现独占一行 `$$` 数量为奇数的页面。
- 非电路范围 `git diff --check` 通过。
- 本审查任务未单独启动全站构建，避免与电路讲义并行写作冲突；Zensical 构建、MathJax 运行时渲染、桌面与手机检查由主任务在集成后统一完成。

代表性计算与推导核验：

- 8051：12 MHz、12T 内核、方式 1 计时 1 ms，计数 1000，初值 FC18H。
- 微积分：约束 x²+2y²=1 下，x+y 的最大值 √(3/2)，由柯西不等式与乘子方程交叉核验。
- 微积分：f(x)=x e⁻ˣ 的一、二阶导数 e⁻ˣ(1−x)、e⁻ˣ(x−2) 用独立差分核验。
- 积分：绕 x 轴的水平壳层使用半径 |y| 和 dy；常长区间积分还原圆柱体积 πR²L。
- 概率：正概率互斥事件满足 P(AB)=0<P(A)P(B)，与独立性不相容；独立事件则可有正交集概率。
- 数电：按捕获时钟晚到 s 的约定，从数据到达/要求时刻推导 setup ≤T+s、hold ≥t_hold+s，最大/最小延迟方向一致。

## 外链检查与已知边界

对现有 82 个不同外部 URL 发起 HTTP HEAD 检查（服务器不支持 HEAD 时使用限量 GET）：HTTP 200 共 75 个，HTTP 404 共 1 个，超时未确定共 6 个。检查只读取响应信息，未下载、改写或重新发布外部文件。

| 链接 / 类别 | 结果与处理 |
| --- | --- |
| 小红书原论文示例短链 `https://xhslink.cn/o/7RbSqas6OQs` | 本次请求 404；在建模指南原位置保留 URL，并标注当前不可用，未编造替代链接。 |
| `github.com/zhanwen/MathModel` 等四个既有建模仓库 | 请求超时；保留原链接，不据此判断仓库删除。 |
| Render 动态资料库首页、登录页 | 12 秒读取超时；可能与免费实例唤醒或网络有关，未修改动态服务。 |
| CC98 论坛、网盘、微信、B 站 | HTTP 200 只说明入口返回页面，不证明帖子正文可匿名读取或分享永不失效；登录、校园网、提取码等条件仍可能适用。 |
| CC98 外部 PDF / DOCX / ZIP / WebP | 本轮返回 200 且内容类型与后缀匹配；未把全部附件逐页当作重新校勘的教材。 |

## 后续内容厚度与边界

本批次的“全站校对”处理可见知识错误、适用条件、公式转义和入口准确性；并未把每门课都重写成完整教材，也未删除目前较短的提纲。线性代数、概率统计、大学物理 II、控制和测量等页面仍可在后续按“原讲义章节—完整推导—数值例题—练习与校验”的方法逐章增补。

本批次的详细讲义样板集中在电路原理。各课程现有 `index.md`、`chapter-notes.md` / `topics.md`、`study-guide.md` 分别承担入口、专题正文、复习提纲的职责；最终菜单和页面标签由主任务统一，原路径保留。

内容审查不能替代对所有扫描答案、教材例题的逐行独立证明。特别是未识别的手写图、原 PDF 内部个人标注、外部登录后资料不在上述“93 页正文”的保证范围。审查中没有新增个人经历或虚构成绩。

机器可读记录：`non-circuit-changes.json`、`non-circuit-validation.json`、`non-circuit-external-links.json`。
