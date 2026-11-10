# 原笔记逐节对照

[课程目录](index.md) · [完整 PDF 与阅读器](resources-guide.md) · [原资料校勘](corrections.md) · [试题与解答](exam-solutions.md)

下表按原笔记的小节排列，便于一边读网页、一边核对 PDF。页码均为 **PDF 文件页码**，不是图中幻灯片的小页码。同章不同 Part 中重复的小节号，分别注明“模拟／数字”“原理／通道”等名称，不另造原课编号。第 135 页为空白页。

## 第二章：误差与数据处理

| 原小节与文件页码 | 应逐项掌握的内容 | 网页位置 |
| --- | --- | --- |
| 2.1，3—9 页 | 真值与参考值、测得值、绝对误差、相对误差、示值相对误差、引用误差、分贝误差 | [定义与分贝换算](chapters/02-errors.md#reference-db) |
| 2.1，3—9 页 | 仪表等级、量程选择、准确度与精密度、三类误差和四种来源 | [误差与量程](chapters/02-errors.md) · [来源对照](chapters/02-errors.md#error-origins) |
| 2.2，10—18 页 | 等精度、期望、系统与随机分量、均值、残差、贝塞尔公式、均值标准差 | [统计推导与五次测量算例](chapters/02-errors.md) |
| 2.2，10—18 页 | 正态概率、均匀分布、3σ 的含义、量化方差、相关数据的平均 | [分布与量化](chapters/02-errors.md#error-distributions) |
| 2.3，18—24 页 | 恒定、累进、周期与复杂变化；校准、变条件、残差与判据检查 | [系统趋势与检验](chapters/02-errors.md#system-tests) |
| 2.3，18—24 页 | 零示、替代、补偿、交换、微差、交叉读数；修正因数、调零与两点校准 | [修正方法](chapters/02-errors.md) · [补偿与 ABBA 推导](chapters/02-errors.md#compensation-abba) |
| 2.4，25—30 页 | 有效数字、偶数舍入、加减乘除与乘幂、等精度处理八步 | [完整处理次序](chapters/02-data.md#data-workflow) |
| 2.4，28—30 页 | 直线正规方程、多项式、指数线性化、残差与拟合前提 | [拟合展开](chapters/02-data.md#least-squares-details) |
| 2.5，30—36 页 | 全微分、对数微分、有符号偏差、最坏限差、方和根与相关项 | [模型传递表](chapters/02-data.md#propagation-models) |
| 2.5，33—36 页 | 等准确度、等作用、主误差原则；三种功率方案 | [预算分配](chapters/02-data.md#error-budget) · [功率例题](chapters/02-data.md) |

## 第三章 Part 1：电压模拟测量

| 原小节与文件页码 | 应逐项掌握的内容 | 网页位置 |
| --- | --- | --- |
| 3.1，36—38 页 | 六个测量特点、仪表分类、模拟检波、AC/DC、直接采样和示波方法 | [对象与方法](chapters/03-voltage.md#voltage-methods) |
| 3.2，38—40 页 | 动圈表、多量程串联电阻、Ω/V 灵敏度、输入加载、电子表与数字表 | [表头与量程算例](chapters/03-voltage.md#moving-coil) |
| 3.3，40—42 页 | 峰值、直流平均、整流平均、RMS、波形因数、波峰因数 | [定义、表格与换算](chapters/03-voltage.md) |
| 3.3，42—43 页 | 均值检波、串联／并联／倍压峰值检波、充放电条件与直流分量 | [检波电路逐类分析](chapters/03-voltage.md#peak-topologies) |
| 3.3，43—48 页 | 直接／反馈 RMS、热转换、数字 RMS、三种刻度、低高频及波形误差 | [真有效值架构与带宽例](chapters/03-voltage.md#rms-implementations) |
| 3.4，48—49 页 | 噪声来源、正弦注入、标准噪声、平方差与 RC 滤波 | [两种测法及数值题](chapters/03-voltage.md#noise-methods) |

## 第三章 Part 2：电压数字测量

| 原小节与文件页码 | 应逐项掌握的内容 | 网页位置 |
| --- | --- | --- |
| 3.1—3.3，50—51 页 | 数字测量特点、DVM 与 DMM、输入变换与 ADC 分工 | [功能链](chapters/03-digital.md) |
| 3.4，51—53 页 | SAR 的逐位试探、8 位 3.285 V 算例、余数再循环 | [逐次逼近](chapters/03-digital.md) · [余数算法](chapters/03-digital.md#recirculating-remainder) |
| 3.4，54—56 页 | 双斜准备／正积／反积、RC 与共同时间基相消、三斜粗细积分 | [双斜推导](chapters/03-digital.md) · [三斜与计数权重](chapters/03-digital.md#triple-slope) |
| 3.5，56—58 页 | 电流、电阻（小阻与高阻）、电感、电容及交流—直流变换 | [转换器与原图](chapters/03-digital.md#dmm-converters) |
| 3.6，58—62 页 | 量程、显示位数、超量程、分辨力、百分比与字数 | [误差规格算例](chapters/03-digital.md) |
| 3.6—3.7，59—63 页 | 温度、输入阻抗、偏流、分布参数、稳定时间、SMR／CMR | [附加误差表](chapters/03-digital.md#dvm-additional-errors) |
| 3.8—3.9，63—64 页 | 单极 ADC 的人工偏置、增益恢复、总 RMS 与交流 RMS | [12 位 ADC 计算步骤](chapters/03-digital.md#dsp-rms) |

## 第四章与第五章：频率、时间和信号源

| 原小节与文件页码 | 应逐项掌握的内容 | 网页位置 |
| --- | --- | --- |
| 4.1，64—68 页 | 直接测频框图、±1 计数、时基误差、门宽选择、测周期 | [计数链与门宽题](chapters/04-frequency.md#frequency-chain) |
| 4.1，67—71 页 | 标准时钟分频 k、多周期 M、中界频率、触发噪声与时间游走 | [分频位置](chapters/04-frequency.md#clock-divider) · [多周期误差](chapters/04-frequency.md#multi-period-errors) |
| 4.1—4.2，71—74 页 | RC 桥、谐振、差频、F/V、示波测频；相位—时间／电压 | [模拟方法与歧义](chapters/04-frequency.md#analog-frequency) |
| 4.3—4.4，74—76 页 | 调制域、事件累计与时间戳、20／12 MHz 例、200 Hz 方法比较 | [逐段计数](chapters/04-frequency.md#event-timestamps) |
| 5.1—5.2，76—77 页 | 激励／仿真／校准、输出级、阻抗匹配、RC 正弦振荡 | [用途与输出链](chapters/05-generators.md#generator-roles) |
| 5.3，77—78 页 | 恒流积分、阈值、周期、方波、二极管分段整形正弦 | [函数产生](chapters/05-generators.md) · [整形机制](chapters/05-generators.md#triangle-sine) |
| 5.4—5.5，78—81 页 | 三类合成、锁定三条件、混频／倍频／分频／多环、频率误差 | [PLL 逐类列式](chapters/05-generators.md#pll-units) |
| 5.6—5.7，81—82 页 | DDS 相位累加、控制字、相位连续、截断与杂散 | [DDS 计算](chapters/05-generators.md) · [频谱限制](chapters/05-generators.md#dds-limits) |

## 第六章：示波器

| 原 Part、小节与文件页码 | 应逐项掌握的内容 | 网页位置 |
| --- | --- | --- |
| 原理 6.1—6.2，82—84 页 | 万用表／LCR／电源、探头校准、不同带宽与倍率比较 | [四项实验记录](chapters/06-digital-scope.md#scope-lab-plan) |
| 原理 6.3—6.6，84—86 页 | 应用、分类、六项性能指标、时域／频域／数据域 | [仪器指标与排查](chapters/06-analog-scope.md#scope-diagnostics) |
| 原理 6.7，87—89 页 | 电子枪各极、静电透镜、偏转式、PDA、荧光余辉 | [CRT 定量分析](chapters/06-analog-scope.md#crt-details) |
| 原理 6.8，89—91 页 | X／Y 合成、扫描、同步、增辉、任意两变量 | [时基与同步](chapters/06-analog-scope.md#timebase-sequence) |
| 通道 6.1—6.2，92—94 页 | 整机框图、衰减补偿、延迟、Y 放大、移位与耦合 | [垂直链](chapters/06-analog-scope.md#vertical-details) |
| 通道 6.3，94—98 页 | 米勒积分、扫描门、滞回、比较、回扫与释抑完整时序 | [六阶段次序](chapters/06-analog-scope.md#timebase-sequence) |
| 通道 6.3，98—101 页 | 电平／极性、输入与触发耦合、内／外／电源触发、X 放大 | [触发两条路径](chapters/06-analog-scope.md#trigger-coupling) |
| 通道 6.4—6.8，101—103 页 | 校准与电源、异常波形、40 ms 显示窗与课堂作图 | [基准与 X 通道](chapters/06-analog-scope.md#x-calibration) · [异常排查](chapters/06-analog-scope.md#scope-diagnostics) |
| 多波形 6.1—6.4，104—106 页 | 双束、双踪、五种显示、ALT／CHOP、共同与交替触发 | [显示方式对照](chapters/06-multi-trigger.md#five-displays) |
| 多波形 6.5—6.7，106—107 页 | A／B 时基、延迟、增辉、全局与局部时间换算 | [延迟扫描读图](chapters/06-multi-trigger.md#delayed-sweep-reading) |
| 数字 6.1—6.3，108—109 页 | 数字结构、采样保持、并行比较 ADC、实时与等效 | [采样与转换](chapters/06-digital-scope.md#sample-hold-adc) |
| 数字 6.3—6.6，109—112 页 | 顺序／随机等效采样、点显示、插值、混叠 | [采样条件与重建](chapters/06-digital-scope.md#equivalent-interpolation) |
| 数字 6.4—6.9，110—114 页 | 时基与采样率、环形存储、三类带宽、垂直／水平分辨率、深浅存储 | [点数账本](chapters/06-digital-scope.md#memory-depth) |
| 数字 6.10—6.11，114—117 页 | Auto／Normal／Single、普通／峰检／平均、刷新与死区 | [采集方式](chapters/06-digital-scope.md#acquisition-modes) |
| 数字 6.12—6.14，117—119 页 | 线性／开关电源、纹波、单次启动、探头校正与接地 | [实验次序](chapters/06-digital-scope.md#scope-lab-plan) |
| 使用方法，120—123 页 | 电压直接／比较／位移、时间直接／时标／位移、脉冲参数 | [读数方法](chapters/06-measurements.md#voltage-comparison) · [阈值算例](chapters/06-measurements.md#pulse-thresholds) |
| 使用方法，123—125 页 | 线性扫描相位、截距、XY 椭圆及其歧义 | [相位推导](chapters/06-measurements.md#phase-intercepts) |
| 使用方法，125—127 页 | 毛刺捕获、带宽选型、探头类型、补偿与操作、原题读图 | [毛刺与原题](chapters/06-measurements.md#glitch-procedure) · [探头选择](chapters/06-measurements.md#probe-types) |

## 第七章：频域测量

| 原小节与文件页码 | 应逐项掌握的内容 | 网页位置 |
| --- | --- | --- |
| 7.1—7.9，128—130 页 | 应用、时频互补、周期／非周期、仪器区别、傅里叶系数、FFT 用途 | [理论与测试任务](chapters/07-spectrum.md#fourier-tasks) |
| 7.11，130—132 页 | 超外差 RF／IF 链、调谐、扫频、镜像；FFT 链与抗混叠 | [调谐数字题](chapters/07-spectrum.md#tuning-image) |
| 7.11 指标，132—134 页 | 频率范围、RBW、ER、形状因数、剩余调频、相噪、动态范围与显示 | [强弱信号分辨](chapters/07-spectrum.md#edge-resolution) |
| 对应 7.8、7.11 的计算补充 | 频点／窗／幅值标度、噪声带宽、THD／SNR／SINAD／SFDR | [FFT 标度](chapters/07-spectrum.md#fft-scaling) · [频谱指标](chapters/07-spectrum.md#spectrum-metrics) |

## 核对图像与原题

正文图片优先直接提取 PDF 的内嵌图像，图注保留文件页码。原图内部已经模糊或带课堂批注的部分不冒充重新绘制的高清图；可点击图片查看原尺寸，并通过同节 PDF 链接核对上下文。网页另有解释与勘误，原 PDF 不作改动。

2025—2026 秋回忆卷的题干、原页及信息缺失范围见[历年卷](past-exams.md)，推导见[分步解答](exam-solutions.md)。课堂思考题与回忆卷分别标注，不将补充的教学条件写成原题已知条件。
