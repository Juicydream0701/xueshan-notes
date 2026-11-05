# 半导体物理

[开始逐章复习](review-mode.md) · [分章讲义](chapter-notes.md) · [章节练习](practice.md) · [历年卷](past-exams.md) · [综合模拟卷](mock-exam.md)

课程按晶体结构、能带、杂质、载流子统计、输运、非平衡载流子、pn 结与金属接触八章组织。详细讲义参照所提供的 102 页《半导体物理》PDF，补充推导、数值例题、适用条件及原页码索引。

## 课程定位

半导体物理为专业课程（EE3502M）。原资料记录的习题 30%、期末 70% 及考试日期属于对应学年的安排，本学期以教师通知为准。复习应掌握能带图、统计关系、输运方程和边界条件，概念题说明机制与假设，计算题保留推导过程。

## 八章知识地图

| 章节 | 需要回答的核心问题 | 常用工具 |
| --- | --- | --- |
| 1. 晶体结构与各向异性 | 晶向、晶面如何描述？为什么物性有方向性？ | 晶格、米勒指数、对称性 |
| 2. 电子状态与能带 | 电子允许处在哪些能量？有效质量从哪里来？ | 波粒二象性、薛定谔方程、能带 |
| 3. 杂质与缺陷 | 施主、受主如何改变载流子？缺陷如何影响材料？ | 能级图、补偿、位错 |
| 4. 载流子统计 | 已知掺杂和温度，如何求 $n,p,E_F$？ | 状态密度、费米分布、非简并近似 |
| 5. 导电性 | 电场、浓度梯度和散射如何形成电流？ | 漂移、扩散、迁移率、电导率 |
| 6. 非平衡载流子 | 光照或注入后，过剩载流子如何演化？ | 寿命、准费米能级、连续性方程 |
| 7. pn 结 | 空间电荷区、内建电势和整流从何而来？ | 耗尽近似、I–V、电容、击穿 |
| 8. 金属—半导体接触 | 什么时候整流，什么时候欧姆？ | 功函数、电子亲和能、肖特基势垒 |

## 主要公式

在热平衡、非简并近似下，先用本征关系和质量作用定律连接载流子：



$$
n_0p_0=n_i^2,\qquad n_0=N_Ce^{-(E_C-E_F)/kT},\qquad p_0=N_Ve^{-(E_F-E_V)/kT}.
$$



再用输运关系连接电流：



$$
\sigma=q(n\mu_n+p\mu_p),\qquad J_{drift}=\sigma E,\qquad \frac{D_n}{\mu_n}=\frac{D_p}{\mu_p}=\frac{kT}{q}.
$$



最后把局部材料参数推进到器件：



$$
L=\sqrt{D\tau},\qquad V_{bi}=\frac{kT}{q}\ln\frac{N_AN_D}{n_i^2},\qquad I=I_S\left(e^{qV/kT}-1\right).
$$



每条公式都要先写假设：热平衡还是非平衡、非简并还是简并、小注入还是大注入、突变结还是缓变结。

## 复习材料与训练 {#training}

- [八章讲义目录](chapter-notes.md)：分章正文与原有概要。
- [分章练习](practice.md)：每章三题，附可展开的计算与解释。
- [模拟卷 A](mock-exam.md)：100 分、120 分钟，配独立评分解答。
- [原 PDF 阅读与校勘](resources-guide.md)：章节页码、嵌入阅读器与需要修正的原文。
- [应试复习与公式检查](study-guide.md)：保留原有考前速查。

<a id="_5"></a>

## 精选资料 {#resources}

如果想在笔记和原始课件之间来回对照，可以打开[站内 PDF 阅读器](../../tools/pdf-reader.md)，直接选择章节并在当前页面阅读。

- [第 1 章：晶体结构的各向异性](resources/semiconductor-chapter-1.pdf)
- [第 2 章：电子状态、能带与有效质量](resources/semiconductor-chapter-2.pdf)
- [第 3 章：杂质和缺陷能级](resources/semiconductor-chapter-3.pdf)
- [第 4 章：载流子统计分布](resources/semiconductor-chapter-4.pdf)
- [第 5 章：导电性、迁移率与散射](resources/semiconductor-chapter-5.pdf)
- [第 6 章：非平衡载流子](resources/semiconductor-chapter-6.pdf)
- [第 7 章：pn 结](resources/semiconductor-chapter-7.pdf)
- [第 8 章：金属和半导体接触](resources/semiconductor-chapter-8.pdf)
- [本次参考笔记（102 页）](resources/semiconductor-exam-notes.pdf)
- [25–26 学年回忆卷](resources/exams/semiconductor-recall-2025-2026.pdf) · [2024 秋电信回忆卷](resources/exams/semiconductor-recall-2024-autumn.pdf)
- [既有复习讲义与历年卷详解](resources/semiconductor-full-review.pdf)
- [2025–2026 学年回忆卷](resources/semiconductor-recall-2025-2026.pdf)

资料从课程文件夹中精选复制，教材全集、作业答案全集和含个人信息的文件没有放入公开站点。
