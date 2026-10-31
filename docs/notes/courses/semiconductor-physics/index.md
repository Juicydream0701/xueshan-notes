# 半导体物理

[打开八章主线笔记 →](chapter-notes.md) · [打开应试复习与公式检查 →](study-guide.md)

半导体物理把“器件为什么这样工作”还原成材料、能带、统计和输运问题。本页根据 2026 秋冬课程课件的八章结构整理：从晶体结构出发，经过能带与载流子统计，最后落到非平衡载流子、pn 结和金属—半导体接触。

## 课程定位

第一章课件给出的课程信息显示，这是一门专业必修课（EE3502M），成绩由平时习题和期末考试构成，比例为习题 30%、期末 70%。因此复习不能只背结论：计算题要会从能带图、费米能级和边界条件写出公式，概念题要能解释近似成立的原因。

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

## 公式主线

在热平衡、非简并近似下，先用本征关系和质量作用定律连接载流子：

$$n_0p_0=n_i^2,\qquad n_0=N_Ce^{-(E_C-E_F)/kT},\qquad p_0=N_Ve^{-(E_F-E_V)/kT}.$$

再用输运关系连接电流：

$$\sigma=q(n\mu_n+p\mu_p),\qquad J_{drift}=\sigma E,\qquad \frac{D_n}{\mu_n}=\frac{D_p}{\mu_p}=\frac{kT}{q}.$$

最后把局部材料参数推进到器件：

$$L=\sqrt{D\tau},\qquad V_{bi}=\frac{kT}{q}\ln\frac{N_AN_D}{n_i^2},\qquad I=I_S\left(e^{qV/kT}-1\right).$$

每条公式都要先写假设：热平衡还是非平衡、非简并还是简并、小注入还是大注入、突变结还是缓变结。

## 精选资料

如果想在笔记和原始课件之间来回对照，可以打开[站内 PDF 阅读器](../../tools/pdf-reader.md)，直接选择章节并在当前页面阅读。

- [第 1 章：晶体结构的各向异性](resources/semiconductor-chapter-1.pdf)
- [第 2 章：电子状态、能带与有效质量](resources/semiconductor-chapter-2.pdf)
- [第 3 章：杂质和缺陷能级](resources/semiconductor-chapter-3.pdf)
- [第 4 章：载流子统计分布](resources/semiconductor-chapter-4.pdf)
- [第 5 章：导电性、迁移率与散射](resources/semiconductor-chapter-5.pdf)
- [第 6 章：非平衡载流子](resources/semiconductor-chapter-6.pdf)
- [第 7 章：pn 结](resources/semiconductor-chapter-7.pdf)
- [第 8 章：金属和半导体接触](resources/semiconductor-chapter-8.pdf)
- [完整学习讲义与历年卷详解](resources/semiconductor-full-review.pdf)
- [2025–2026 学年回忆卷](resources/semiconductor-recall-2025-2026.pdf)

资料从课程文件夹中精选复制，教材全集、作业答案全集和含个人信息的文件没有放入公开站点。
