# 07 工程电磁场与波

[打开场方程、边界与传播学习路线 →](study-guide.md)

工程电磁场按“场量—边界—波动—传输”推进。所有矢量公式都要配合坐标系和单位检查。

## 静电场

静电场满足 $\nabla\times\mathbf E=0$，可用电势 $\mathbf E=-\nabla\varphi$；高斯定律 $\nabla\cdot\mathbf D=\rho$。介质交界面上切向电场连续，法向电位移跳变等于自由面电荷。电容可由 $C=Q/U$ 或场能 $W_e=\frac12\int\mathbf E\cdot\mathbf D\,dv$ 求得。

## 恒定电场与静磁场

恒定电流满足 $\nabla\cdot\mathbf J=0$，导电介质中 $\mathbf J=\sigma\mathbf E$。静磁场满足 $\nabla\cdot\mathbf B=0$、$\nabla\times\mathbf H=\mathbf J$；安培环路定律适合高对称结构。磁介质边界需分别处理 $\mathbf H$ 和 $\mathbf B$ 的切向、法向分量。

## 时变场与电磁感应

法拉第定律 $\nabla\times\mathbf E=-\partial\mathbf B/\partial t$，位移电流使安培定律推广为 $\nabla\times\mathbf H=\mathbf J+\partial\mathbf D/\partial t$。判断感应电动势方向时使用楞次定律，符号取决于回路方向约定。

## 平面波与传输线

均匀介质平面波中 $\mathbf E\perp\mathbf H\perp\mathbf k$，波阻抗 $\eta=\sqrt{\mu/\varepsilon}$，传播常数同时包含衰减和相位。正入射边界由切向场连续确定反射、透射系数；传输线反射系数 $\Gamma=(Z_L-Z_0)/(Z_L+Z_0)$，匹配时无反射。

## 解题清单

先画坐标和法向，再写边界条件；统一峰值/有效值和相量约定；对结果检查量纲、极限介质和能量流向。涉及波传播时不要把相速度、群速度和频率混为一谈。

## 配套资料

[工程电磁场与波历年卷整理](resources/electromagnetics-past-exams.pdf)
