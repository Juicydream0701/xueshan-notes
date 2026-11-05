# 模拟卷 A：参考解答与评分点

[返回试卷](mock-exam.md) · [分章讲义](chapter-notes.md) · [复习进度](review-mode.md)

评分按物理关系、推导步骤和结果分配。数值因常数取舍产生的合理舍入差异不扣分；前题数值错误但后题方法正确，可保留后续方法分。以下分值用于自评。

## 第 1 题（10 分）

每项判断 1 分，修正理由 1 分。

1. 错。原胞含一个格点，基元可含多个原子；金刚石原胞有两个原子。
2. 错。速度取决于一阶导数，质量取决于二阶导数。谷底斜率为零不要求曲率为零。
3. 错。n 型表示电子是多数载流子，体区负电荷与离化施主等正电荷保持平衡。
4. 错。非平衡应使用准费米能级，$np=n_i^2e^{(E_{Fn}-E_{Fp})/(kT)}$，一般不等于 $n_i^2$。
5. 错。重掺杂窄势垒可使隧穿显著，形成近线性低阻接触；非零势垒高度不排除欧姆行为。

对应[第一章](topics/01-crystal.md)、[第二章](topics/02-bands.md)、[第三章](topics/03-impurities.md)、[第六章](topics/06-nonequilibrium.md)、[第八章](topics/08-contacts.md)。

## 第 2 题（10 分）

电子粒子向负 $x$ 扩散，电子扩散电流向正 $x$（各 1 分）。总电流为 $J_n=q\mu_n nE+qD_n\,dn/dx$（2 分）。

理想 pn 结正向电流来源于少数载流子注入后在准中性区的扩散，并存在少数载流子存储（2 分）。肖特基主要由多数载流子输运，少数存储通常较少，但仍有结电容等动态影响（2 分）。具体机制可能是热电子发射、扩散限制或隧穿，需依据模型判断，不能统一称为漂移（2 分）。见[第五章](topics/05-transport.md)及[第八章](topics/08-contacts.md)。

## 第 3 题（8 分）

截距倒数为 $(1,1/2,0)$，晶面为 $(210)$（2 分）；$d_{210}=a/\sqrt5=0.2428\,\mathrm{nm}$（2 分）。

金刚石常规胞有 8 个原子，$N_{\rm atom}=8/(5.43\times10^{-8})^3=5.00\times10^{22}\,\mathrm{cm^{-3}}$（2 分）。比例为 $10^{16}/N_{\rm atom}=2.00\times10^{-7}$（2 分）。见[第一章例题](topics/01-crystal.md)。

## 第 4 题（8 分）

由 $v=\hbar^{-1}dE/dk$（1 分）、$\hbar\,dk/dt=F$（1 分）得到 $a=\hbar^{-2}(d^2E/dk^2)F$，故 $m^{*-1}=\hbar^{-2}d^2E/dk^2$（2 分）。

$m^*/m_0=3.810/15.24=0.250$（2 分）。价带近满，满带电流相互抵消；缺失电子的响应可用正电荷、正有效质量空穴表示，避免逐个追踪满带电子（2 分）。见[第二章](topics/02-bands.md)。

## 第 5 题（14 分）

完全电离下 $n-p=N_D-N_A=10^{16}\,\mathrm{cm^{-3}}$（2 分），热平衡非简并下 $np=n_i^2$（2 分）。净掺杂远大于 $n_i$，得 $n\approx10^{16}$、$p\approx10^4\,\mathrm{cm^{-3}}$（2 分）。

$$
E_F-E_i=kT\ln(n/n_i)=0.3571\,\mathrm{eV},
\qquad E_C-E_F=kT\ln(N_C/n)=0.2052\,\mathrm{eV}.
$$

两项各 2 分。后者约 $7.94kT$，与非简并假设一致（1 分）。完全补偿时电中性要求 $n=p$，结合质量作用定律仍有 $n=p=n_i$，并非没有自由载流子（3 分）。见[第四章](topics/04-statistics.md)。

## 第 6 题（8 分）

$\mu=(1/2000+1/4000)^{-1}=1333.33\,\mathrm{cm^2/(V\cdot s)}$（2 分）。$\sigma=qn\mu=2.136\,\mathrm{S/cm}$（1 分），$\rho=0.4682\,\Omega\cdot\mathrm{cm}$（1 分）。$D_n=\mu V_T=34.47\,\mathrm{cm^2/s}$（2 分）。

动量弛豫时间描述定向动量因散射而衰减；复合寿命描述过剩载流子数目因净复合而减少，不能等同（2 分）。见[第五章](topics/05-transport.md)。

## 第 7 题（12 分）

空穴连续性方程为 $\partial p/\partial t=-q^{-1}\partial J_p/\partial x+G-R$，无场时 $J_p=-qD_p\,dp/dx$（2 分）；稳态、无体产生、小注入线性复合得到 $D_p\Delta p''-\Delta p/\tau_p=0$（1 分）。

$$
L_p=\sqrt{D_p\tau_p}=3.162\times10^{-3}\,\mathrm{cm}=31.62\,\mu\mathrm m.
$$

长度计算 2 分。通解 $Ae^{-x/L_p}+Be^{x/L_p}$，远端有限且趋零使 $B=0$，边界浓度使 $A=10^{12}$，故 $\Delta p(x)=10^{12}e^{-x/L_p}\,\mathrm{cm^{-3}}$（3 分）。

$J_p(0)=qD_p\Delta p(0)/L_p=5.066\times10^{-4}\,\mathrm{A/cm^2}$（3 分），方向沿正 $x$、进入样品内部（1 分）。见[第六章](topics/06-nonequilibrium.md)。

## 第 8 题（16 分）

$V_{bi}=V_T\ln(N_AN_D/n_i^2)=0.7738\,\mathrm V$（3 分）。

$$
E_p=-\frac{qN_A}{\varepsilon_s}(x+x_p),\qquad
E_n=\frac{qN_D}{\varepsilon_s}(x-x_n).
$$

两侧电场各 2 分。结面连续或两侧耗尽电荷等量给出 $N_Ax_p=N_Dx_n$（1 分）。

$$
W=\sqrt{\frac{2\varepsilon_s}{q}\left(\frac1{N_A}+\frac1{N_D}\right)V_{bi}}
\approx0.3318\,\mu\mathrm m.
$$

宽度式与结果 2 分。$x_p\approx0.0302\,\mu\mathrm m$、$x_n\approx0.3016\,\mu\mathrm m$（共 2 分），$|E_{\max}|=2V_{bi}/W\approx4.66\times10^4\,\mathrm{V/cm}$（1 分）。

$C_j=\varepsilon_sA/W\approx3.12\,\mathrm{pF}$（2 分），反偏增大时宽度增大、电容减小（1 分）。见[第七章](topics/07-pn-junction.md)。

## 第 9 题（6 分）

$$
J_S=qn_i^2\left(\frac{D_n}{L_nN_A}+\frac{D_p}{L_pN_D}\right)
=8.811\times10^{-12}\,\mathrm{A/cm^2}.
$$

公式与数值共 3 分。$I=AJ_S(e^{0.60/V_T}-1)\approx10.6\,\mu\mathrm A$（2 分）。第一项为 p 区少数电子贡献，第二项为 n 区少数空穴贡献（1 分）。本题的 $I_S=AJ_S$，电流与电流密度不可混淆。见[第七章](topics/07-pn-junction.md)。

## 第 10 题（8 分）

$W_s=\chi+(E_C-E_F)=4.27\,\mathrm{eV}$（1 分），$q\phi_{Bn}=W_m-\chi=0.75\,\mathrm{eV}$，即 $\phi_{Bn}=0.75\,\mathrm V$（2 分）；$qV_{bi}=W_m-W_s=0.53\,\mathrm{eV}$，即 $V_{bi}=0.53\,\mathrm V$（1 分）。$W_m>W_s$，电子流向金属，半导体侧形成耗尽（1 分）。

由 $J_0\propto e^{-q\phi_{Bn}/(kT)}$，势垒降低 $0.10\,\mathrm{eV}$ 后 $J_0$ 增大至 $e^{0.10/0.02585}\approx47.9$ 倍（3 分）。见[第八章](topics/08-contacts.md)。

## 评阅后的复习安排

将失分题定位到相应章节，区分“概念未掌握”与“计算执行错误”。第 5 题失分应回到电中性与统计关系；第 7 题失分检查方程和边界；第 8 题失分先复画电荷、电场、电势图。完成订正后，重新做对应的[三道分章练习](practice.md)，再在[复习进度页](review-mode.md)记录完成情况。单次模拟成绩只反映本卷训练表现，不对应实际考试等级。
