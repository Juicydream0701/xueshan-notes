# 第七章　pn 结的电场、电流与电容

[复习目录](../review-mode.md) · [本章练习](../practice.md#chapter-7) · [原笔记第 78—96 页](../resources/semiconductor-exam-notes.pdf#page=78) · [第七章课件](../resources/semiconductor-chapter-7.pdf)

## 1. 坐标、偏压与物理模型

本章统一取 p 区在左、n 区在右，冶金结面为 $x=0$，$x$ 正向向右；耗尽层边界为 $-x_p$ 与 $x_n$。外加电压定义为 $V=V_p-V_n$，正值为正偏。$q>0$ 表示元电荷大小，电场与静电势满足 $E=-d\psi/dx$，电子能带边缘满足 $E_C=\text{常数}-q\psi$。

突变结指掺杂在结面处由近似均匀的受主浓度突变为施主浓度。耗尽近似进一步假设耗尽层中可动载流子远少于离化杂质，准中性体区电场近似为零。它适合推导基本电势与电容，不适用于所有高注入、强退化、极薄或非平衡情形。

接触后电子由 n 区向 p 区扩散，空穴反向扩散；结附近留下正施主离子和负受主离子，产生由 n 指向 p 的内建电场。热平衡时漂移与扩散相互抵消，总电流为零，整个连接体系只有一个平衡费米能级。

## 2. 内建电势

采用非简并、完全电离和两侧体区准中性近似，平衡多数浓度分别约为 $N_A,N_D$。由平衡费米能级一致，可得

$$
V_{bi}=V_T\ln\frac{N_AN_D}{n_i^2},\qquad V_T=\frac{kT}{q}.
$$

同温同质材料中，这表示从 p 区到 n 区的体内静电势升高量。它不是可以在平衡二极管两端直接取出的电源电压；实际测量还涉及接触电势。接触前两块孤立材料的费米能级差可以用来求 $qV_{bi}$，但接触达到热平衡后不能继续画两个不同高度的平衡费米能级。

正偏时结势垒约降为 $V_{bi}-V$，反偏 $V<0$ 时势垒升高。该近似要求外加电压主要落在结区；高电流下串联电阻压降不可忽略。

## 3. 由泊松方程求电场

耗尽层电荷密度为

$$
\rho(x)=\begin{cases}-qN_A,&-x_p<x<0,\\qN_D,&0<x<x_n,\\0,&\text{准中性区}.\end{cases}
$$

由 $dE/dx=\rho/\varepsilon_s$，并使用边界 $E(-x_p)=E(x_n)=0$，有

$$
E(x)=\begin{cases}
-\dfrac{qN_A}{\varepsilon_s}(x+x_p),&-x_p\le x\le0,\\
\dfrac{qN_D}{\varepsilon_s}(x-x_n),&0\le x\le x_n.
\end{cases}
$$

两侧 $E$ 均为负，方向向左。结面处电场连续给出电荷守恒 $N_Ax_p=N_Dx_n$。若假定不存在额外界面片电荷，却在结面处得到电场跳变，通常是符号或边界常数错误。

**原笔记校正。** 第 92 页右侧区间的电场式多写了一个负号。按本章坐标，其正确形式为 $qN_D(x-x_n)/\varepsilon_s$。可用边界为零、两侧同向以及结面连续三项检验确认。[原页](../resources/semiconductor-exam-notes.pdf#page=92)。

## 4. 耗尽宽度和峰值电场

电场三角形面积的绝对值等于势垒电压：

$$
V_{bi}-V=-\int_{-x_p}^{x_n}E(x)\,dx=\frac12|E_{\max}|W,
\qquad W=x_p+x_n.
$$

联立电荷守恒得

$$
W=\sqrt{\frac{2\varepsilon_s}{q}\left(\frac1{N_A}+\frac1{N_D}\right)(V_{bi}-V)},
$$

$$
x_p=\frac{N_D}{N_A+N_D}W,\qquad x_n=\frac{N_A}{N_A+N_D}W,
\qquad |E_{\max}|=\frac{2(V_{bi}-V)}{W}.
$$

耗尽层主要伸入轻掺杂一侧。对 $p^+n$ 结，可近似 $x_n\approx W$，但应先由 $N_A\gg N_D$ 证明，不能只根据 p、n 字母的位置判断。

**例 1。** 硅突变结，$N_A=10^{17}$、$N_D=10^{16}$、$n_i=10^{10}\,\mathrm{cm^{-3}}$，$T=300\,\mathrm K$，$\varepsilon_s=11.7\times8.854\times10^{-14}\,\mathrm{F/cm}$。零偏时：

$$
V_{bi}=0.774\,\mathrm V,\quad W=0.332\,\mu\mathrm m,\quad
x_p=0.0302\,\mu\mathrm m,\quad x_n=0.302\,\mu\mathrm m,
$$

$$
|E_{\max}|\approx4.66\times10^4\,\mathrm{V/cm}.
$$

反偏 $2\,\mathrm V$ 时，取 $V=-2\,\mathrm V$，宽度增大为约 $0.628\,\mu\mathrm m$。反偏代入 $V_{bi}-2$ 会导致错误的减小趋势。

## 5. 势垒电容与 C–V 测量

单位面积耗尽电荷大小为 $Q'=qN_Dx_n=qN_Ax_p$。势垒电容是该电荷大小随反偏势垒变化的微分量，得到

$$
C_j'=\frac{\varepsilon_s}{W},\qquad C_j=A\frac{\varepsilon_s}{W}.
$$

例 1 若结面积为 $A=10^{-4}\,\mathrm{cm^2}$，零偏电容约 $3.12\,\mathrm{pF}$。单位面积电容与总电容差一个面积因子，不能混用。

对突变结，总电容满足

$$
\frac1{C_j^2}=\frac{2(N_A+N_D)}{q\varepsilon_sA^2N_AN_D}(V_{bi}-V).
$$

若横轴采用正的反向电压 $V_R=-V$，则是随 $V_R$ 线性上升。单边结近似下，斜率为 $2/(q\varepsilon_sA^2N_{\rm light})$。由斜率提取掺杂时要检查横轴符号、面积单位以及是否满足突变单边结假设。线性缓变结的电压幂次不同，不可直接套此式。

## 6. 理想二极管方程的来源

在低注入、非简并、耗尽层内复合可忽略、长准中性区和理想边界条件下，正向偏压使耗尽层边缘的少数载流子增加：

$$
n_p(0)=n_{p0}e^{V/V_T},\qquad p_n(0)=p_{n0}e^{V/V_T},
\qquad n_{p0}=\frac{n_i^2}{N_A},\quad p_{n0}=\frac{n_i^2}{N_D}.
$$

这里的 $0$ 分别表示各自准中性区边缘坐标。按第六章长基区扩散解，边缘扩散电流相加：

$$
J=J_S(e^{V/V_T}-1),\qquad
J_S=qn_i^2\left(\frac{D_n}{L_nN_A}+\frac{D_p}{L_pN_D}\right).
$$

电子项对应 p 区少数电子，空穴项对应 n 区少数空穴，分母掺杂不能交换。实际 pn 结中耗尽区复合、高注入和串联电阻等会改变指数斜率，题目若给理想因子应按题设使用。

**例 2。** 沿用例 1 浓度，取 $D_n=25$、$D_p=10\,\mathrm{cm^2/s}$，$L_n=0.005$、$L_p=0.002\,\mathrm{cm}$。得到 $J_S=8.811\times10^{-12}\,\mathrm{A/cm^2}$。若 $V=0.60\,\mathrm V$、$A=10^{-4}\,\mathrm{cm^2}$，则 $J\approx0.106\,\mathrm{A/cm^2}$，$I\approx10.6\,\mu\mathrm A$。反偏尚未击穿且满足理想模型时，$J\approx-J_S$。

## 7. 扩散电容与存储电荷

正偏下准中性区积累过剩少数载流子。采用长基区指数分布和准静态电荷控制模型，存储电荷量写为

$$
Q_s=qA(n_{p0}L_n+p_{n0}L_p)(e^{V/V_T}-1).
$$

对外加电压求导：

$$
C_D=\frac{dQ_s}{dV}=\frac{qA}{V_T}(n_{p0}L_n+p_{n0}L_p)e^{V/V_T}.
$$

此为原笔记第 94 页采用的存储电荷近似。不同交流频率、寿命和边界条件下应使用对应的小信号输运模型，不能将准静态式外推到任意高频。势垒电容来自耗尽区电荷变化，扩散电容来自注入存储，两者物理来源不同。若单一少子分量占主导，可写 $Q_s\approx\tau I$，由此估计电荷存储造成的动态限制。

## 8. 击穿与提高题范围

雪崩击穿由载流子碰撞电离与倍增产生，需要足够电场及加速距离；隧穿击穿发生在很窄的高场势垒中，与量子隧穿有关。重掺杂使耗尽区窄，较易出现隧穿机制；较轻掺杂宽结常以雪崩机制为主，但两机制可能同时贡献。

常见硅结中，雪崩主导时击穿电压温度系数通常为正，隧穿主导时通常为负，交界区域需具体判断。热失控是温升与电流相互促进的热过程，不应直接等同于前两种电学击穿。击穿是否造成永久损坏还取决于电流限制和散热。

若题目给定临界场并采用单边突变结，可联立 $|E_{\max}|=qNW/\varepsilon_s$ 与三角形势降估算击穿电压。原 PDF 将缓变结列为较次要内容；本站将其保留为拓展，不据此宣称本学期必考。

## 9. 综合检查

电场方向、电势升降、能带弯曲三者应一致；两侧耗尽电荷应等量；反偏宽度应增大、电容应减小；平衡费米能级应水平。计算 I–V 时再次确认少数载流子边界和低注入条件。以上检查比仅核对一个最终数值更能定位错误。

## 10. 最新回忆卷：14 分耗尽层推导怎样完整作答 {#recall-depletion}

[查看回忆卷第 8—10 页](../resources/exams/2026-recall/semiconductor-recall-2026-2027.pdf#page=8)。题目记录为电中性关系 1 分、电场和方向 6 分、宽度关系 7 分。以下是本站建议的书写顺序，并非官方评分细则。题名虽含“势垒电容”，回忆到的三个小问止于耗尽宽度；电容推导放在末尾作为同一模型的延伸。

### 第一步：先把边界条件写在图旁

采用本章坐标和突变、完全电离、耗尽近似；忽略界面片电荷，令 $\varepsilon_s=\varepsilon_r\varepsilon_0$。定义实际耗尽势降

$$
U=V_{bi}-V>0.
$$

零偏原题中的 $V_D$ 即 $V_{bi}$，此时 $U=V_D$。边界为 $E(-x_p)=E(x_n)=0$；结面没有片电荷，所以 $E(0^-)=E(0^+)$。对整个耗尽区积分 $dE/dx=\rho/\varepsilon_s$，得

$$
0=\frac1{\varepsilon_s}\int_{-x_p}^{x_n}\rho\,dx
=\frac q{\varepsilon_s}(N_Dx_n-N_Ax_p),
\qquad \boxed{N_Ax_p=N_Dx_n}.
$$

这一步说明的是两侧**电荷面密度**相等，而非杂质浓度相等。轻掺杂一侧必须提供更宽的耗尽区。

### 第二步：积分常数决定电场的符号

p 侧积分为 $E_p=-qN_Ax/\varepsilon_s+C_p$，代入左边界，$C_p=-qN_Ax_p/\varepsilon_s$；n 侧为 $E_n=qN_Dx/\varepsilon_s+C_n$，代入右边界，$C_n=-qN_Dx_n/\varepsilon_s$。因此

$$
\boxed{E_p=-\frac{qN_A}{\varepsilon_s}(x+x_p)},\qquad
\boxed{E_n=\frac{qN_D}{\varepsilon_s}(x-x_n)}.
$$

在各自定义域内二者均小于等于零，电场由 n 指向 p，结面处绝对值最大：

$$
E(0)=-\frac{qN_Ax_p}{\varepsilon_s}
=-\frac{qN_Dx_n}{\varepsilon_s},\qquad
|E_{\max}|=\frac{qN_Ax_p}{\varepsilon_s}.
$$

最新卷第 10 页参考图与原笔记第 92 页的 n 侧公式在 $qN_D(x-x_n)/\varepsilon_s$ 前多了负号；原图按原貌保留，作答应使用上式。若照抄，n 侧会得到向右电场，并与 p 侧在结面不连续。

### 第三步：再次积分，得到连续的分段电势

取左侧准中性区电势为零，即 $\psi(-x_p)=0$。由 $d\psi/dx=-E$，p 侧积分后用左边界定常数；n 侧用 $\psi(x_n)=U$ 定常数，得到

$$
\psi(x)=\begin{cases}
0,&x\le -x_p,\\
\dfrac{qN_A}{2\varepsilon_s}(x+x_p)^2,&-x_p\le x\le0,\\
U-\dfrac{qN_D}{2\varepsilon_s}(x_n-x)^2,&0\le x\le x_n,\\
U,&x\ge x_n.
\end{cases}
$$

两侧电势在结面连续，于是

$$
\boxed{U=\frac q{2\varepsilon_s}(N_Ax_p^2+N_Dx_n^2)}.
$$

电势从 p 向 n 上升，电子能带边缘随 $-q\psi$ 下降；这与零偏能带图的方向一致。电势零点可以更换，势差和电场不变。

### 第四步：用一个总宽度消去两个未知量

令 $X_D=x_p+x_n$。先由电中性写出

$$
x_p=\frac{N_D}{N_A+N_D}X_D,\qquad
x_n=\frac{N_A}{N_A+N_D}X_D.
$$

代入上一步，化简为 $U=qN_AN_DX_D^2/[2\varepsilon_s(N_A+N_D)]$，所以

$$
\boxed{X_D=\sqrt{\frac{2\varepsilon_sU}{q}
\left(\frac1{N_A}+\frac1{N_D}\right)}},\qquad
\boxed{|E_{\max}|=\frac{2U}{X_D}}.
$$

零偏将 $U$ 换成 $V_D$，即得到题目所求。可按“电荷关系；两段积分与峰值；势差积分与消元”检查 1＋6＋7 分三个小问是否都有过程。即使某步数值出错，也应保留后续符号推导。

### 延伸：由宽度推到电容，不要把导数符号弄反

n 侧正电荷的大小为 $Q=qAN_Dx_n$。由 $Q=A\sqrt{2q\varepsilon_sN_AN_DU/(N_A+N_D)}$，得 $dQ/dU=\varepsilon_sA/X_D$。若改对正向电压 $V$ 求导，因 $dU/dV=-1$，正电荷**大小**的导数为负；通常所报正的结电容取对应端电荷的导数或其幅值：

$$
\boxed{C_j=\frac{\varepsilon_sA}{X_D}}.
$$

最后检查四项：$X_D$ 的量纲为长度；$N_A\gg N_D$ 时耗尽层主要在 n 侧；反偏加深使 $U,X_D$ 增大、$C_j$ 减小；电场积分的负值与电势上升量相符。

[上一章：非平衡载流子](06-nonequilibrium.md) · [下一章：金属接触](08-contacts.md)
