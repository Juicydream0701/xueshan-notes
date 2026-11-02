# 工程电磁场与波：专题笔记

## 专题一：静电场与电势

静电场满足 $\\nabla\\times\\mathbf E=0$，所以可引入电势 $\\mathbf E=-\\nabla\\varphi$；高斯定律为 $\\nabla\\cdot\\mathbf D=\\rho_v$。高对称结构优先选高斯面，低对称结构可用电势方程和边值条件。导体静电平衡时内部电场为零、表面为等势面。

介质界面要区分自由电荷和束缚电荷：法向 D 的跳变由自由面电荷决定，切向 E 在静态无奇异源时连续。电容和场能要检查单位，不能把电势差、电场强度和电位移混为一个量。

## 专题二：恒定电场与静磁场

恒定电流场满足 $\\nabla\\cdot\\mathbf J=0$，本构关系为 $\\mathbf J=\\sigma\\mathbf E$。静磁场满足 $\\nabla\\cdot\\mathbf B=0$、$\\nabla\\times\\mathbf H=\\mathbf J$。选择积分形式还是微分形式取决于几何对称性；先画电流方向和环路方向能避免符号错误。

## 专题三：时变场与感应

法拉第定律和安培—麦克斯韦定律分别为


$$
\\nabla\\times\\mathbf E=-\\frac{\\partial\\mathbf B}{\\partial t},\\qquad \\nabla\\times\\mathbf H=\\mathbf J+\\frac{\\partial\\mathbf D}{\\partial t}.
$$


感应电动势方向由楞次定律决定，但最后符号仍取决于回路方向约定。位移电流是时变场闭合关系的重要部分，不能在高频问题中省略。

## 专题四：平面波与界面

均匀介质平面波中传播方向、E 和 H 两两正交。无耗介质波阻抗为 $\\eta=\\sqrt{\\mu/\\varepsilon}$，有耗介质中传播常数为复数。界面题先确定入射方向、极化和两侧阻抗，再用切向场连续求反射和透射。

## 专题五：传输线与辐射

传输线反射系数为 $\\Gamma=(Z_L-Z_0)/(Z_L+Z_0)$。匹配只意味着无反射，不代表没有传播延迟。辐射问题中要区分近场与远场，远场电场和磁场近似正交，能量流方向由坡印廷矢量决定。

## 专题六：复习检查

每题固定写：坐标系与法向、源类型、介质参数、控制方程、本构关系、边界条件、结果单位。资料入口：[静电场课件](resources/electromagnetics-electrostatics.pdf)、[动态电磁场](resources/electromagnetics-time-varying-fields.pdf)、[电磁波](resources/electromagnetics-waves.pdf)、[历年卷](resources/electromagnetics-past-exams-2026.pdf)。
