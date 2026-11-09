# 资料中心与原笔记页码

[课程目录](index.md) · [历年卷](past-exams.md) · [典型题解答](exam-solutions.md) · [公式与资料校勘](corrections.md)

资料分为章节笔记、回忆卷、分类整理和原有课件。先进入网页讲义理解一个专题，再用下面的 PDF 核对电路图和波形；无需下载完整合订本。所有页码均指 **PDF 文件页码**，不一定与页脚印刷页码相同。资料中的历年考试范围和“必考”提示只适用于对应课程安排。

## 八章原笔记

| 章节 | 网页讲义 | PDF 与页数 | 建议重点核对 |
| --- | --- | --- | --- |
| 01 功率器件 | [器件与额定值](chapters/01-devices.md) | [31 页](resources/cc98-notes-01.pdf) | 第 4—5 页二极管恢复；第 7—14 页 SCR；第 22—30 页 MOSFET/IGBT |
| 02 驱动与保护 | [驱动、缓冲和故障](chapters/02-drive-protection.md) | [32 页](resources/cc98-notes-02.pdf) | 第 9—12 页双脉冲/串并联；第 22—26 页栅极驱动；第 29—32 页缓冲保护 |
| 03 AC–DC | [整流与有源逆变](chapters/03-rectifiers.md) | [46 页](resources/cc98-notes-03.pdf) | 单相 R/RL 的差别、三相换相表、重叠和逆变裕量 |
| 04 AC–AC | [调压、调功与变频](chapters/04-ac-ac.md) | [17 页](resources/cc98-notes-04.pdf) | R/RL 导通区间、熄灭角、TCR、周波变换和矩阵变换 |
| 05 DC–DC | [斩波、隔离与 DCM](chapters/05-dc-dc.md) | [24 页](resources/cc98-notes-05.pdf) | Buck/Boost 的状态电路、纹波、边界、正激与反激 |
| 06 DC–AC | [逆变器工作过程](chapters/06-inverters.md) | [23 页](resources/cc98-notes-06.pdf) | 单相全桥、三相 180°/120°、续流与换流 |
| 07 PWM | [调制、频谱与死区](chapters/07-pwm.md) | [16 页](resources/cc98-notes-07.pdf) | 单极/双极、调制比、三次谐波、死区及 SVPWM |
| 08 软开关 | [谐振、ZVS 与 ZCS](chapters/08-soft-switching.md) | [9 页](resources/cc98-notes-08.pdf) | 谐振状态、软开关成立条件、应力和负载范围 |

## 分类复习资料

- [历年卷分类详解讲义，68 页](resources/cc98-exam-handout.pdf)：按题型整理的参考解答，适合与原卷对照。部分结论已在[校勘页](corrections.md)说明，不能等同官方标准答案。
- [背诵整理，8 页](resources/cc98-recall-sheet.pdf)：适合最后回顾概念与简答；不代替推导和算题。
- [春夏历年卷分专题整理，11 页](resources/exams-by-topic.pdf)：手写图较多，建议直接阅读原页。
- [春夏历年卷整合版，13 页](resources/exams-spring-summer.pdf)：可补充选择、作图及跨章节练习；春夏与秋学期范围不一定相同。

## 站内 PDF 对照阅读

阅读器可调高度、打开本地 PDF，也可将选中的资料在新标签页打开。手机浏览器若不显示内嵌文档，使用“新标签页打开”或下载。

<div class="pdf-reader" data-pdf-reader data-pdf-reader-key="power-electronics-library">
  <div class="pdf-reader__toolbar">
    <div class="pdf-reader__field pdf-reader__field--wide">
      <label for="power-pdf-select">章节或试卷</label>
      <select id="power-pdf-select" data-pdf-select>
        <option value="../resources/cc98-notes-01.pdf#page=1">01 功率半导体器件 · 31 页</option>
        <option value="../resources/cc98-notes-02.pdf#page=1">02 驱动与保护 · 32 页</option>
        <option value="../resources/cc98-notes-03.pdf#page=1">03 AC–DC 整流 · 46 页</option>
        <option value="../resources/cc98-notes-04.pdf#page=1">04 AC–AC 变换 · 17 页</option>
        <option value="../resources/cc98-notes-05.pdf#page=1">05 DC–DC 变换 · 24 页</option>
        <option value="../resources/cc98-notes-06.pdf#page=1">06 DC–AC 逆变 · 23 页</option>
        <option value="../resources/cc98-notes-07.pdf#page=1">07 PWM 控制 · 16 页</option>
        <option value="../resources/cc98-notes-08.pdf#page=1">08 谐振软开关 · 9 页</option>
        <option value="../resources/exam-2025-2026.pdf#page=1">25–26 秋回忆卷 · 4 页</option>
        <option value="../resources/exam-2021-2022.pdf#page=1">2021–2022 回忆卷 · 3 页</option>
        <option value="../resources/cc98-exam-handout.pdf#page=1">历年卷分类详解 · 68 页</option>
      </select>
    </div>
    <div class="pdf-reader__field pdf-reader__height-control">
      <label for="power-pdf-height">阅读器高度</label>
      <input id="power-pdf-height" type="range" min="560" max="1600" step="20" value="900" data-pdf-height aria-label="调节电力电子 PDF 阅读器高度">
      <output data-pdf-height-output for="power-pdf-height">900 px</output>
      <button type="button" class="pdf-reader__height-reset" data-pdf-height-reset>恢复默认</button>
    </div>
    <label class="pdf-reader__local-file md-button" for="power-pdf-file">打开本地 PDF
      <input id="power-pdf-file" type="file" accept="application/pdf,.pdf" data-pdf-file>
    </label>
    <div class="pdf-reader__actions">
      <a class="md-button md-button--primary" data-pdf-open target="_blank" rel="noopener">新标签页打开</a>
      <a class="md-button" data-pdf-download download>下载</a>
    </div>
  </div>
  <div class="pdf-reader__viewport" data-pdf-viewport>
    <iframe class="pdf-reader__frame" data-pdf-frame title="电力电子资料阅读器" loading="lazy"></iframe>
  </div>
  <p class="pdf-reader__fallback">浏览器不支持内嵌 PDF 时，请在新标签页打开。选择本地 PDF 只在当前浏览器读取，不会上传。</p>
  <p class="pdf-reader__note">可拖动右下角调整高度，选择与高度会保存在当前浏览器。</p>
  <p class="pdf-reader__file-name" data-pdf-file-name aria-live="polite"></p>
</div>

## 原有课件继续保留

| 课件 | 适合用途 |
| --- | --- |
| [引言](resources/power-0-introduction.pdf) | 电力电子系统、应用和器件整体定位 |
| [整流](resources/power-1-rectifiers.pdf) | 对照课堂符号及整流波形 |
| [直流—交流](resources/power-4-inverters.pdf) | 逆变拓扑与课件图示 |
| [交流—交流](resources/power-6-ac-ac.pdf) | 调压、变频及工程应用 |

同一电路在不同资料中的管号、直流母线定义和调制比可能不同。比较公式前先对齐参考方向与变量定义；发现差异时回到状态电路推导，不以某个单独系数作为判断依据。
