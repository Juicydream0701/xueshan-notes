# 05 一阶、二阶暂态与拉普拉斯

## 1. 切换题的核心顺序

暂态题不要一上来写微分方程。可靠顺序是：

1. 求 $t<0$ 的稳态，得到储能元件初值；
2. 用连续性写 $u_C(0^+)=u_C(0^-)$、$i_L(0^+)=i_L(0^-)$；
3. 画出 $t>0$ 的新电路，求终值；
4. 从储能元件端口向外看，求 $R_\mathrm{eq}$ 和时间常数；
5. 用标准响应式写答案，再用初值、终值检查。

开关改变拓扑后，$R_\mathrm{eq}$ 必须重新求。电容“开路”、电感“短路”只是在直流稳态求终值时使用。

## 2. 一阶标准形式

任何一阶状态量都可以写成

$$x(t)=x(\infty)+[x(0^+)-x(\infty)]e^{-t/\tau},\qquad t>0.$$

RC 电路：$\tau=R_\mathrm{eq}C$；RL 电路：$\tau=L/R_\mathrm{eq}$。若初值和终值相同，说明没有暂态变化，或者题目中的观察量不是状态量。

<div class="circuit-diagram" markdown>
<svg viewBox="0 0 640 190" role="img" aria-label="一阶RC充电示意图" xmlns="http://www.w3.org/2000/svg">
<path d="M50 95 H145 M220 95 H315 M400 95 H590 M50 95 V155 H590 V95" fill="none" stroke="currentColor" stroke-width="3"/>
<path d="M145 95 l14 -24 l22 48 l22 -48 l17 24" fill="none" stroke="currentColor" stroke-width="3"/>
<path d="M315 72 V118 M400 72 V118" stroke="currentColor" stroke-width="3"/><path d="M315 82 H400" stroke="currentColor" stroke-width="3"/>
<text x="84" y="76" font-size="18">V_s</text><text x="167" y="62" font-size="18">R</text><text x="342" y="62" font-size="18">C</text><text x="430" y="78" font-size="18">u_C(t)</text>
</svg>
</div>

## 3. 一阶例题：带初始电压的 RC

电容初始电压为 $U_0$，切换后通过等效电阻 $R$ 接到直流源 $V_s$。则

$$u_C(t)=V_s+(U_0-V_s)e^{-t/(RC)}.$$

电阻电流为

$$i_R(t)=\frac{V_s-U_0}{R}e^{-t/(RC)}.$$

若 $U_0>V_s$，初始电流方向会与“充电”假设相反；负号是放电的代数表达，不是错误。

## 4. 二阶响应和阻尼

无源串联 RLC 的特征方程可写为

$$s^2+2\alpha s+\omega_0^2=0,\qquad \alpha=\frac{R}{2L},\quad \omega_0=\frac1{\sqrt{LC}}.$$

- $\alpha>\omega_0$：过阻尼，两个不同实根；
- $\alpha=\omega_0$：临界阻尼，响应最快且不振荡；
- $\alpha<\omega_0$：欠阻尼，出现衰减振荡，$\omega_d=\sqrt{\omega_0^2-\alpha^2}$。

二阶题至少需要两个独立初始条件，例如 $u_C(0^+)$ 和 $i_L(0^+)$，或者状态量及其一阶导数。只写一个初值通常无法确定两个待定常数。

## 5. 阶跃、冲激和卷积

线性时不变电路的零状态响应可以由单位阶跃响应 $s(t)$ 得到；冲激响应记作 $h(t)$，输入 $x(t)$ 的响应为

$$y(t)=x(t)*h(t)=\int_{-\infty}^{\infty}x(\tau)h(t-\tau)\,d\tau.$$

考试中若题目给的是分段开关波形，可以把它拆成若干个延迟阶跃，再利用时移和叠加，避免从头解多次微分方程。

## 6. 拉普拉斯法

零初始条件下，元件阻抗形式为 $R$、$sL$、$1/(sC)$。有初始能量时，不能简单把初值“藏掉”，要用等效源或在变换后的元件关系中保留初始项。传递函数定义为零初始条件下的

$$H(s)=\frac{Y(s)}{X(s)}.$$

**初值定理**和**终值定理**可以快速检查结果：

$$x(0^+)=\lim_{s\to\infty}sX(s),\qquad x(\infty)=\lim_{s\to0}sX(s),$$

但终值定理要求系统稳定且极限存在。

## 7. 竞赛式时间常数技巧

如果电路只有一个独立电容，求时间常数不必完整求响应：把独立源置零，从电容两端看进去求 $R_\mathrm{eq}$，再乘以 $C$。含受控源时使用测试源；含多个电容时先判断是否能通过串并联化为单一等效储能元件，不能化简时要使用状态方程。

## 8. 课件

- [一阶暂态：阶跃与冲激](../resources/source-lectures/06-一阶暂态-阶跃冲激.pdf)
- [过渡过程竞答题](../resources/source-lectures/10-过渡过程竞答题.pdf)
- [一阶暂态课堂资料](../resources/circuit-transient-first-order.pdf)
