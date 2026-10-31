# PDF 阅读器

这里提供一个和笔记站一起使用的轻量 PDF 阅读器。资料仍然是主站中的静态文件，浏览器直接加载，不需要上传到第三方服务；在课程笔记里看到 PDF 链接时，也可以右键在新标签页打开。

<div class="pdf-reader" data-pdf-reader>
  <div class="pdf-reader__toolbar">
    <label for="course-pdf-select">选择资料</label>
    <select id="course-pdf-select" data-pdf-select>
      <option value="../../courses/semiconductor-physics/resources/semiconductor-chapter-1.pdf#view=FitH">半导体物理 · 第 1 章：晶体结构</option>
      <option value="../../courses/semiconductor-physics/resources/semiconductor-chapter-2.pdf#view=FitH">半导体物理 · 第 2 章：能带与有效质量</option>
      <option value="../../courses/semiconductor-physics/resources/semiconductor-chapter-4.pdf#view=FitH">半导体物理 · 第 4 章：载流子统计</option>
      <option value="../../courses/semiconductor-physics/resources/semiconductor-chapter-7.pdf#view=FitH">半导体物理 · 第 7 章：pn 结</option>
      <option value="../../courses/semiconductor-physics/resources/semiconductor-chapter-8.pdf#view=FitH">半导体物理 · 第 8 章：金属和半导体接触</option>
      <option value="../../courses/circuit-theory/resources/circuit-autumn-summary.pdf#view=FitH">电路与电子技术Ⅰ · 电路总结</option>
      <option value="../../courses/circuit-theory/resources/circuit-equation-solution.pdf#view=FitH">电路原理 · 电路方程解答</option>
      <option value="../../courses/circuit-theory/resources/circuit-theorems-class.pdf#view=FitH">电路原理 · 电路定理课堂资料</option>
      <option value="../../courses/circuit-theory/resources/circuit-transient-first-order.pdf#view=FitH">电路原理 · 一阶暂态</option>
      <option value="../../courses/circuit-theory/resources/circuit-nonsinusoidal-steady-state.pdf#view=FitH">电路原理 · 非正弦稳态</option>
      <option value="../../courses/circuit-theory/resources/circuit-three-phase-solutions.pdf#view=FitH">电路原理 · 三相补充解答</option>
      <option value="../../courses/circuit-theory/resources/circuit-theorems-class.pdf#view=FitH">电路原理 · 电路定理</option>
      <option value="../../courses/circuit-theory/resources/analog-big-problem-review.pdf#view=FitH">电路与电子技术Ⅰ · 模电大题整理</option>
      <option value="../../courses/circuit-theory/resources/analog-concept-review.pdf#view=FitH">电路与电子技术Ⅰ · 模电概念整理</option>
      <option value="../../courses/circuit-theory/resources/analog-final-exam-i.pdf#view=FitH">电路与电子技术Ⅰ · 模电期末卷</option>
    </select>
    <div class="pdf-reader__actions">
      <a class="md-button md-button--primary" data-pdf-open target="_blank" rel="noopener">新标签页打开</a>
      <a class="md-button" data-pdf-download download>下载</a>
    </div>
  </div>
  <iframe class="pdf-reader__frame" data-pdf-frame title="站内 PDF 阅读器" loading="lazy"></iframe>
  <p class="pdf-reader__note">提示：阅读器由浏览器原生 PDF 引擎提供。手机端可以使用“新标签页打开”，获得更大的阅读空间。</p>
</div>

## 边读边记的建议

- 先用选择框定位章节，再回到对应的[课程主线笔记](../courses/index.md)整理公式和易错点。
- 需要对照原始课件时，可在阅读器和笔记之间切换标签页；资料不会离开本站。
- 公开站点只放精选的课程资料，不包含成绩、名单、个人实验报告等内容。
