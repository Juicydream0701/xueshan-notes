# 电路原理原讲义：按知识点与页码查找

下面的资料以你保存的课程文件为主。同一份PDF可以服务多个章节，因此“重复出现入口”不代表重复上传。表中页码是阅读器实际页序，打开后如果浏览器没有跳页，可手动输入页码。

## 课堂讲义与网页讲解

| 主题 | 网页讲解 | 课件与定位 |
| --- | --- | --- |
| 电压电流方向、吸收与发出功率 | [模型第2节](topics/01-models-laws.md) | [元件课件第15–19页](resources/source-lectures/01-元件信号-KCL-KVL.pdf#page=15) |
| 受控源与控制量 | [模型与电路方程](topics/02-equations.md) | [元件课件第37–41页](resources/source-lectures/01-元件信号-KCL-KVL.pdf#page=37) |
| KCL/KVL | [模型与基本定律](topics/01-models-laws.md) | [元件课件第42–45页](resources/source-lectures/01-元件信号-KCL-KVL.pdf#page=42) |
| 星—三角与电源等效 | [模型第6–7节](topics/01-models-laws.md) | [等效法第10页起](resources/source-lectures/02-等效法-2024.pdf#page=10) · [电源变换第19–23页](resources/source-lectures/02-等效法-2024.pdf#page=19) |
| 方程选择、节点法、网孔法 | [完整方程讲解](topics/02-equations.md) | [电路方程原课件](resources/source-lectures/03-电路方程-2024.pdf) · [原任务解析](resources/circuit-equation-solution.pdf) |
| 叠加、戴维南/诺顿 | [定理与端口等效](topics/03-theorems.md) | [网络定理原课件](resources/source-lectures/04-电路定理-2024.pdf) |
| 交流功率、谐振与匹配 | [交流稳态](topics/04-ac.md) | [2023总结第14–19页](resources/circuit-review-2023.pdf#page=14) |
| 初值与换路 | [动态电路第1节](topics/05-transients.md) | [一阶课件第8–11页](resources/circuit-transient-first-order.pdf#page=8) |
| 一阶时间常数与三要素 | [动态电路第2–5节](topics/05-transients.md) | [一阶课件第31–32页](resources/circuit-transient-first-order.pdf#page=31) |
| 正弦接入、阶跃与冲激 | [动态电路第6、10节](topics/05-transients.md) | [接入相位第2–3页](resources/source-lectures/06-一阶暂态-阶跃冲激.pdf#page=2) · [完整课件](resources/source-lectures/06-一阶暂态-阶跃冲激.pdf) |
| 二阶方程与阻尼 | [动态电路第7–8节](topics/05-transients.md) | [二阶课件第2–6页](resources/source-lectures/07-二阶暂态.pdf#page=2) |
| 傅里叶、非正弦有效值和功率 | [非正弦与三相](topics/06-three-phase.md) | [非正弦课件第5–16页](resources/source-lectures/05-非正弦稳态-2024.pdf#page=5) · [有效值与功率第31–41页](resources/source-lectures/05-非正弦稳态-2024.pdf#page=31) |
| 三相、断中线、两表法 | [三相计算](topics/06-three-phase.md) | [三相补充解答](resources/circuit-three-phase-solutions.pdf) · [2023总结第31–37页](resources/circuit-review-2023.pdf#page=31) |
| 互感与变压器 | [耦合与二端口](topics/08-coupling-twoports.md) | [2023总结第20–26页](resources/circuit-review-2023.pdf#page=20) |

## 练习先后次序

先完成每章自编例题和折叠自测，确认自己能独立列式；再看原作业解析，区分“题不会建模”和“已有方程但算错”；最后用综合总结和竞答题练方法选择。不要一边照抄答案一边判断自己已经会做。

- [九道完整综合训练](topics/07-problems.md)：题设齐全，可先看题后展开解答。
- [电路总结与例题](resources/circuit-autumn-summary.pdf)：按课程已有范围复习。
- [2023总结](resources/circuit-review-2023.pdf)：用于交叉检索，年份不代表当前考试范围。
- [非正弦竞答题](resources/source-lectures/09-非正弦竞答题.pdf)：按每个频率分别列式。
- [过渡过程竞答题](resources/source-lectures/10-过渡过程竞答题.pdf)：重点练初值、终值及时间常数。
- [原教材勘误](resources/source-lectures/textbook-errata.pdf)：与对应版本教材对照使用，不是所有版本的通用勘误。

原PDF保留原貌；网页指出的明确错字或符号问题以可复算的方程说明。例如三相补充解答第7页的加法排版问题，详见[三相章文末说明](topics/06-three-phase.md)。本轮重新绘制的电路图为讲解自编例题，元件编号和参数以各题题设为准。

## 外部公开资料怎么配合用

| 资料 | 适合补哪一层 |
| --- | --- |
| [MIT OCW 6.002](https://ocw.mit.edu/courses/6-002-circuits-and-electronics-spring-2007/) | 用公开讲义、习题和课程视频补模型及物理解释 |
| [All About Circuits：直流](https://www.allaboutcircuits.com/textbook/direct-current/) · [交流](https://www.allaboutcircuits.com/textbook/alternating-current/) | 查基本定律、网络定理、相量和谐振的另一种讲法 |
| [OpenStax University Physics Vol.2](https://openstax.org/details/books/university-physics-volume-2) | 电容、电感、能量、交流的物理基础 |

All About Circuits 在本次自动链接检查中返回403，保留原始入口；如果你的浏览器也无法打开，可先用 MIT OCW、OpenStax 或上方站内课件。

课程大纲、符号和题型覆盖因学校而异。这里的二端口、灵敏度和部分网络定理拓展可用于更高难度训练；报考院校的实际考试范围仍需对照其正式大纲，不能以本站目录代替。

[打开站内PDF阅读器](../../tools/pdf-reader.md) · [返回讲义目录](index.md)
