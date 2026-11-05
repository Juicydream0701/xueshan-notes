# 第六章　非平衡载流子、复合与扩散

[复习目录](../review-mode.md) · [本章练习](../practice.md#chapter-6) · [原笔记第 68—78 页](../resources/semiconductor-exam-notes.pdf#page=68) · [第六章课件](../resources/semiconductor-chapter-6.pdf)

## 1. 平衡浓度与过剩浓度

光照、载流子注入或电激励使材料偏离热平衡。用 $n=n_0+\Delta n$、$p=p_0+\Delta p$ 区分平衡背景与过剩部分。n 型材料的小注入通常要求过剩载流子浓度远小于平衡多数电子浓度 $n_0$，并不要求 $\Delta p\ll p_0$；少数空穴可以增加许多数量级，同时仍处于小注入。

例如 $n_0=10^{16}$、$p_0=10^4$、$\Delta p=10^{12}\,\mathrm{cm^{-3}}$，少数载流子相对平衡值增加约 $10^8$ 倍，但相对多数载流子仅为 $10^{-4}$。是否有 $\Delta n\approx\Delta p$，还应依据成对产生、局部准电中性及俘获情况判断；小注入条件本身不能单独推出两者相等。

## 2. 准费米能级

在载流子各自接近局部热平衡、非简并时，可分别引入电子与空穴的准费米能级：

$$
n=N_Ce^{-(E_C-E_{Fn})/(kT)},\qquad
p=N_Ve^{-(E_{Fp}-E_V)/(kT)}.
$$

相乘得到

$$
np=n_i^2e^{(E_{Fn}-E_{Fp})/(kT)}.
$$

热平衡时两个准费米能级重合；注入或光照下可发生分裂。因此不能对非平衡浓度仍强制使用 $np=n_i^2$。单一平衡费米能级应与两个准费米能级在符号上区分。

**例 1。** 取 $n_i=10^{10}\,\mathrm{cm^{-3}}$、$n\approx10^{16}$、$p\approx10^{12}\,\mathrm{cm^{-3}}$，则

$$
E_{Fn}-E_{Fp}=kT\ln\frac{np}{n_i^2}=0.02585\ln10^8=0.476\,\mathrm{eV}.
$$

此处 $0.476\,\mathrm{eV}$ 是准费米能级之差，不是导带相对价带的带隙变化。

## 3. 产生、复合与寿命

直接带间复合、经缺陷能级的复合以及 Auger 复合具有不同机制。辐射复合通常伴随光子发射；缺陷辅助复合通过局域能级分步俘获电子和空穴；Auger 过程将能量传递给第三个载流子。哪种机制占主导由材料、缺陷和注入水平决定。

在小信号、小注入且有效寿命近似常数时，过剩少数载流子可用线性净复合率 $U=\Delta p/\tau_p$ 表示。若空间均匀、无输运，关断产生源后有

$$
\frac{d\Delta p}{dt}=-\frac{\Delta p}{\tau_p},\qquad
\Delta p(t)=\Delta p(0)e^{-t/\tau_p}.
$$

寿命为衰减到初值 $1/e$ 的时间，半衰期为 $\tau_p\ln2$。若初值为 $10^{12}\,\mathrm{cm^{-3}}$、$\tau_p=2\,\mu\mathrm s$，衰减到初值的 $10\%$ 需 $t=\tau_p\ln10=4.605\,\mu\mathrm s$。高注入或非线性复合情况下，衰减未必是单指数。

均匀持续产生 $G_L$ 时，稳态过剩浓度为 $\Delta p=G_L\tau_p$；若从零开始照射，$\Delta p(t)=G_L\tau_p(1-e^{-t/\tau_p})$。这两式要求没有空间净输运，不能直接用于任意局部照射问题。

## 4. 连续性方程的符号来源

数目守恒写作“浓度变化率等于流入减流出，加产生减复合”。电子电流与电子粒子通量符号相反，空穴则同号，所以一维连续性方程为

$$
\frac{\partial n}{\partial t}=\frac1q\frac{\partial J_n}{\partial x}+G_n-R_n,
\qquad
\frac{\partial p}{\partial t}=-\frac1q\frac{\partial J_p}{\partial x}+G_p-R_p.
$$

若 $G,R$ 分别包含平衡热产生和复合，则两者在热平衡互相抵消；采用过剩载流子方程时，常将其合并为净复合项 $U$。两种记法不应重复计算背景产生。

在均匀 n 型准中性区、可忽略电场、常数 $D_p,\tau_p$ 和小注入条件下，代入扩散电流得到

$$
\frac{\partial\Delta p}{\partial t}=D_p\frac{\partial^2\Delta p}{\partial x^2}-\frac{\Delta p}{\tau_p}+G_L.
$$

如果有显著漂移电场，应保留相应漂移项。掺杂均匀只帮助简化平衡背景，并不消除过剩少数载流子的扩散。

## 5. 半无限样品的稳态注入

在 $x\ge0$ 的样品中，体内无额外光生，边界为 $\Delta p(0)=\Delta p_s$、$\Delta p(\infty)=0$。稳态方程

$$
D_p\frac{d^2\Delta p}{dx^2}-\frac{\Delta p}{\tau_p}=0
$$

的通解为 $A e^{-x/L_p}+B e^{x/L_p}$，其中

$$
L_p=\sqrt{D_p\tau_p}.
$$

有限性要求 $B=0$，故

$$
\Delta p(x)=\Delta p_s e^{-x/L_p},\qquad
J_p(x)=\frac{qD_p\Delta p_s}{L_p}e^{-x/L_p}.
$$

扩散长度表示稳态空间指数衰减的特征尺度，不能等同于所有载流子实际走过的相同路程。

**例 2。** 给定 $D_p=10\,\mathrm{cm^2/s}$、$\tau_p=1\,\mu\mathrm s$、$\Delta p_s=10^{12}\,\mathrm{cm^{-3}}$，得到

$$
L_p=3.162\times10^{-3}\,\mathrm{cm}=31.62\,\mu\mathrm m,
$$

$$
\Delta p(L_p)=3.679\times10^{11}\,\mathrm{cm^{-3}},\qquad
J_p(0)=5.066\times10^{-4}\,\mathrm{A/cm^2}.
$$

这里空穴浓度向右下降，空穴扩散电流向右为正。把微米直接带入厘米制的 $D_p$ 会造成数量级错误。

## 6. 有限样品与表面复合

若样品宽度为 $W$，另一端为理想少数载流子汇 $\Delta p(W)=0$，相同方程给出

$$
\Delta p(x)=\Delta p_s\frac{\sinh[(W-x)/L_p]}{\sinh(W/L_p)},\qquad
J_p(0)=\frac{qD_p\Delta p_s}{L_p}\coth(W/L_p).
$$

$W\gg L_p$ 时恢复半无限结果；$W\ll L_p$ 时分布近似线性，$J_p(0)\approx qD_p\Delta p_s/W$。因此“长基区”与“短基区”会产生不同边界电流，不能统一套指数解。

表面复合速度 $S$ 的单位为 $\mathrm{cm/s}$。表面向外的少数载流子粒子通量常写为 $S\Delta p_s$，转成电流边界条件时还需乘电荷并检查外法线方向。$S=0$ 代表理想无复合边界，$S\to\infty$ 在有限通量下趋近 $\Delta p_s=0$，两者不能交换。

## 7. 综合题书写要求

先确定求时间衰减还是空间分布；再声明小注入、准中性、电场和复合模型；写连续性方程；列初始或边界条件；求常数后再计算电流。含二阶空间导数的方程通常需要两个独立空间边界条件。仅写 $L=\sqrt{D\tau}$ 无法替代浓度分布与边界电流的完整解。

[上一章：漂移与扩散](05-transport.md) · [下一章：pn 结](07-pn-junction.md)
