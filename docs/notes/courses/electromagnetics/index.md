# 07 工程电磁场与波

[打开场方程、边界与传播学习路线](study-guide.md)

工程电磁场按“场量—边界—波动—传输”推进。所有矢量公式都要配合坐标系和单位检查。

## 静电场

静电场满足 $\nabla\times\mathbf E=0$，可用电势 $\mathbf E=-\nabla\varphi$；高斯定律 $\nabla\cdot\mathbf D=\rho$。介质交界面上切向电场连续，法向电位移跳变等于自由面电荷。电容可由 $C=Q/U$ 或场能 $W_e=\frac12\int\mathbf E\cdot\mathbf D\,dv$ 求得。

## 恒定电场与静磁场

恒定电流满足 $\nabla\cdot\mathbf J=0$，导电介质中 $\mathbf J=\sigma\mathbf E$。静磁场满足 $\nabla\cdot\mathbf B=0$、$\nabla\times\mathbf H=\mathbf J$；安培环路定律适合高对称结构。磁介质边界需分别处理 $\mathbf H$ 和 $\mathbf B$ 的切向、法向分量。

## 时变场与电磁感应

法拉第定律 $\nabla\times\mathbf E=-\partial\mathbf B/\partial t$，位移电流使安培定律推广为 $\nabla\times\mathbf H=\mathbf J+\partial\mathbf D/\partial t$。判断感应电动势方向时使用楞次定律，符号取决于回路方向约定。

## 平面波与传输线

均匀、各向同性介质中的均匀平面波为横电磁波；在无耗介质中 $\mathbf E$、$\mathbf H$、$\mathbf k$ 两两垂直，波阻抗 $\eta=\sqrt{\mu/\varepsilon}$。采用 $e^{j\omega t}$ 约定的有耗介质应使用 $\eta=\sqrt{j\omega\mu/(\sigma+j\omega\varepsilon)}$，传播常数同时包含衰减和相位。正入射边界由切向场连续确定反射、透射系数；传输线反射系数 $\Gamma=(Z_L-Z_0)/(Z_L+Z_0)$，匹配时无反射。

## 解题清单

先画坐标和法向，再写边界条件；统一峰值/有效值和相量约定；对结果检查量纲、极限介质和能量流向。涉及波传播时不要把相速度、群速度和频率混为一谈。

## 配套资料

[工程电磁场与波历年卷整理](resources/electromagnetics-past-exams.pdf)

## 六、代表题：正入射平面波边界

设波从介质 1 正入射到介质 2，两个介质的波阻抗分别为 (eta_1,eta_2)。电场反射系数和透射系数可写成

$$
\Gamma_E=\frac{\eta_2-\eta_1}{\eta_2+\eta_1},\qquad
\tau_E=\frac{2\eta_2}{\eta_2+\eta_1}.
$$

解题时先画传播方向、界面法向和 (mathbf E,mathbf H) 方向，再用切向电场、切向磁场连续关系求系数。若介质 2 波阻抗更低，电场反射系数可能为负，表示反射电场发生相位反转；不要只比较幅值正负而忽略方向。

## 七、场论题的统一检查

- 静电场：先判断是否有对称性，再选高斯定律或电势法；
- 边界题：标界面法向，区分自由面电荷与束缚电荷；
- 感应题：先定回路正方向，再由楞次定律检查符号；
- 平面波：核对 (mathbf E\times\mathbf H) 是否指向传播方向；
- 传输线：同时写 (Z_0)、(Gamma)、驻波比和端接条件。

最常见的错误是混用 (e^{j\omega t}) 与 (e^{-j\omega t}) 约定、把峰值和有效值混写、把相速度当成群速度，或在有耗介质中漏掉衰减项。每道题最后做量纲和能量流向检查。

## 资料对应关系

先用[工程电磁场与波历年卷整理](resources/electromagnetics-past-exams.pdf)按题型建立清单，再回到课堂讲义逐章核对场方程、边界条件和波传播推导。公式页建议按照“静电—静磁—时变场—平面波—传输线”顺序整理，避免按零散题目背公式。
