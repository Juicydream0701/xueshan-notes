# 电子测量与智能仪器

电子测量的核心是“被测量—传感/变换—采样—计算—显示”。一份可靠的测量结果不仅要有读数，还要说明量程、分辨率、校准方法、不确定度和误差来源。

## 章节讲义与考试资料

以新加入的135页课程笔记为主线，按原课章号展开。每篇配原图、对应PDF页码、计算示例与适用条件；第六章拆为四篇，便于区分原理、触发、采样和实际测量。

[原笔记与可调阅读器](resources-guide.md){ .md-button .md-button--primary }
[2025—2026 秋回忆卷](past-exams.md){ .md-button }
[逐题参考解答](exam-solutions.md){ .md-button }
[原笔记逐节对照](source-map.md){ .md-button }

| 章节与入口 | 本篇解决的问题 |
| --- | --- |
| [第二章（一）误差与系统修正](chapters/02-errors.md) | 准确度等级、统计、异常值、替代与校准 |
| [第二章（二）数据处理与误差传递](chapters/02-data.md) | 有效数字、三种合成、方案比较与拟合 |
| [第三章（一）电压与检波](chapters/03-voltage.md) | 加载、波形换算、峰值/均值/真有效值 |
| [第三章（二）数字表与ADC](chapters/03-digital.md) | SAR、余数再循环、双／三斜积分、转换器、误差与四线法 |
| [第四章 频率与时间](chapters/04-frequency.md) | 门控、测周期、中界频率、抖动与调制域 |
| [第五章 信号发生器](chapters/05-generators.md) | 50Ω输出、函数发生、PLL、DDS与误差 |
| [第六章（一）模拟示波器](chapters/06-analog-scope.md) | CRT、补偿分压、时基、扫描与触发 |
| [第六章（二）双踪与延迟扫描](chapters/06-multi-trigger.md) | 交替/断续显示、共同触发、相位与作图 |
| [第六章（三）数字示波器](chapters/06-digital-scope.md) | 采样、存储、预触发、混叠与单次捕获 |
| [第六章（四）示波测量](chapters/06-measurements.md) | 探头、读数、脉冲、带宽与XY相位 |
| [第七章 频谱分析](chapters/07-spectrum.md) | 超外差、FFT、RBW/VBW、窗与dBm |

先顺序读讲义，再用[资料中心](resources-guide.md)定位原笔记，最后完成[原卷](past-exams.md)并对照[解答](exam-solutions.md)。原资料与网页的差异记录在[校勘页](corrections.md)。以下五个专题及原有课件继续作为跨主题补充保留。

## 五个专题

1. [测量系统与误差](topics.md)
2. [传感器与信号调理](topics.md)
3. [采样、量化与数据采集](topics.md)
4. [示波器、频谱仪与网络分析](topics.md)
5. [智能仪器、校准与实验](topics.md)

## 资料入口

- [第一章讲义](resources/measurement-1.pdf)：测量基本概念；
- [第三章讲义](resources/measurement-3.pdf)：信号与数据处理；
- [第四章讲义](resources/measurement-4.pdf)：仪器结构与应用；
- [实验指导书](resources/measurement-lab-guide.pdf)：实验连接与记录模板。

## 六、代表题：一次测量的不确定度预算

温度传感器输出经线性调理得到 $y=ax+b$。若 $a=2.00\pm0.02$、$x=1.50\pm0.01$、$b=0.10\pm0.02$，且各输入量独立，先求估计值 $y=3.10$，再用灵敏系数合成标准不确定度：

$$
 u_c^2(y)=\left(xu(a)\right)^2+\left(au(x)\right)^2+u^2(b).
$$

最后根据题目指定的覆盖因子给出 $U=ku_c$，并注明 $a,x,b$ 的不确定度来源。不能把仪器的准确度等级直接当成标准差；若说明书给的是均匀分布限差，还要先除以 $\sqrt3$。

## 七、仪器选择与数据记录流程

| 测量任务 | 先确认的量 | 仪器/设置 | 必须留下的证据 |
| --- | --- | --- | --- |
| 观察快速边沿 | 最高频率、上升时间 | 示波器带宽、探头衰减、接地 | 时基、垂直档位、探头倍率 |
| 查找谐波 | 基波、频率分辨率 | 频谱仪 RBW/VBW、窗函数 | 频率轴、参考电平、RBW |
| 测小电阻变化 | 激励电流、温漂 | 恒流源、四线法或桥路 | 激励值、零点、重复测量 |
| 多通道采集 | 通道相位差、采样模式 | 同步采样/扫描采样、触发源 | 采样率、触发、通道延迟 |

## 常见错误与资料对应

- 量程过大导致有效位数不足：先看[第一章讲义](resources/measurement-1.pdf)的量程、分辨率和误差定义；
- 频谱峰值随窗函数变化：结合[第三章讲义](resources/measurement-3.pdf)复核采样、FFT 和窗函数；
- 波形削顶或频率漂移：按[第四章讲义](resources/measurement-4.pdf)检查探头、带宽、触发和仪器校准；
- 报告缺少可复现条件：照[实验指导书](resources/measurement-lab-guide.pdf)记录设备、量程、环境和原始数据。
