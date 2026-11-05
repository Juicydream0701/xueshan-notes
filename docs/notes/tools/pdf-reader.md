# PDF 阅读器

这里提供一个和笔记站一起使用的轻量 PDF 阅读器。资料仍然是主站中的静态文件，浏览器直接加载，不需要上传到第三方服务；在课程笔记里看到 PDF 链接时，也可以右键在新标签页打开。

<div class="pdf-reader" data-pdf-reader data-pdf-reader-key="course-library">
  <div class="pdf-reader__toolbar">
    <div class="pdf-reader__field pdf-reader__field--wide">
      <label for="course-pdf-select">选择资料</label>
      <select id="course-pdf-select" data-pdf-select>
      <option value="../../courses/semiconductor-physics/resources/semiconductor-exam-notes.pdf#page=1">半导体物理 · 参考笔记（102 页）</option>
      <option value="../../courses/semiconductor-physics/resources/exams/semiconductor-recall-2025-2026.pdf#page=1">半导体物理 · 25–26 学年回忆卷</option>
      <option value="../../courses/semiconductor-physics/resources/exams/semiconductor-recall-2024-autumn.pdf#page=1">半导体物理 · 2024 秋电信回忆卷</option>
      <option value="../../courses/semiconductor-physics/resources/semiconductor-chapter-3.pdf#view=FitH">半导体物理 · 第 3 章：杂质与缺陷</option>
      <option value="../../courses/semiconductor-physics/resources/semiconductor-chapter-5.pdf#view=FitH">半导体物理 · 第 5 章：输运与散射</option>
      <option value="../../courses/semiconductor-physics/resources/semiconductor-chapter-6.pdf#view=FitH">半导体物理 · 第 6 章：非平衡载流子</option>
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
      <option value="../../courses/circuit-theory/resources/source-lectures/01-元件信号-KCL-KVL.pdf#view=FitH">电路原理 · 元件、KCL 与 KVL</option>
      <option value="../../courses/circuit-theory/resources/source-lectures/02-等效法-2024.pdf#view=FitH">电路原理 · 等效法（2024）</option>
      <option value="../../courses/circuit-theory/resources/source-lectures/03-电路方程-2024.pdf#view=FitH">电路原理 · 电路方程（2024）</option>
      <option value="../../courses/circuit-theory/resources/source-lectures/04-电路定理-2024.pdf#view=FitH">电路原理 · 电路定理（2024）</option>
      <option value="../../courses/circuit-theory/resources/source-lectures/05-非正弦稳态-2024.pdf#view=FitH">电路原理 · 非正弦稳态（2024）</option>
      <option value="../../courses/circuit-theory/resources/source-lectures/06-一阶暂态-阶跃冲激.pdf#view=FitH">电路原理 · 一阶暂态课件</option>
      <option value="../../courses/circuit-theory/resources/source-lectures/07-二阶暂态.pdf#view=FitH">电路原理 · 二阶暂态与阻尼</option>
      <option value="../../courses/circuit-theory/resources/source-lectures/08-三相补充解答.pdf#view=FitH">电路原理 · 三相补充解答（课件）</option>
      <option value="../../courses/circuit-theory/resources/source-lectures/09-非正弦竞答题.pdf#view=FitH">电路原理 · 非正弦竞答题</option>
      <option value="../../courses/circuit-theory/resources/source-lectures/10-过渡过程竞答题.pdf#view=FitH">电路原理 · 过渡过程竞答题</option>
      <option value="../../courses/circuit-theory/resources/analog-big-problem-review.pdf#view=FitH">电路与电子技术Ⅰ · 模电大题整理</option>
      <option value="../../courses/circuit-theory/resources/analog-concept-review.pdf#view=FitH">电路与电子技术Ⅰ · 模电概念整理</option>
      <option value="../../courses/circuit-theory/resources/analog-final-exam-i.pdf#view=FitH">电路与电子技术Ⅰ · 模电期末卷</option>
      </select>
    </div>
    <div class="pdf-reader__field pdf-reader__height-control">
      <label for="pdf-reader-height">阅读器高度</label>
      <input id="pdf-reader-height" type="range" min="560" max="1600" step="20" value="820" data-pdf-height aria-label="调节 PDF 阅读器高度">
      <output data-pdf-height-output for="pdf-reader-height">820 px</output>
      <button type="button" class="pdf-reader__height-reset" data-pdf-height-reset>恢复默认</button>
    </div>
    <label class="pdf-reader__local-file md-button" for="pdf-reader-file">打开本地 PDF
      <input id="pdf-reader-file" type="file" accept="application/pdf,.pdf" data-pdf-file>
    </label>
    <div class="pdf-reader__actions">
      <a class="md-button md-button--primary" data-pdf-open target="_blank" rel="noopener">新标签页打开</a>
      <a class="md-button" data-pdf-download download>下载</a>
    </div>
  </div>
  <div class="pdf-reader__viewport" data-pdf-viewport>
    <iframe class="pdf-reader__frame" data-pdf-frame title="站内 PDF 阅读器" loading="lazy"></iframe>
  </div>
  <p class="pdf-reader__fallback">如果当前浏览器不支持内嵌 PDF，请点击“新标签页打开”；“打开本地 PDF”只在当前浏览器中读取文件，不会上传到网站。</p>
  <p class="pdf-reader__note">提示：拖动阅读器右下角可以改变高度，也可以使用上方滑块。阅读器高度和上次选择会保存在当前浏览器。</p>
  <p class="pdf-reader__file-name" data-pdf-file-name aria-live="polite"></p>
</div>

## 边读边记的建议

- 先用选择框定位章节，再回到对应的[课程主线笔记](../courses/index.md)整理公式和易错点。
- 需要对照原始课件时，可在阅读器和笔记之间切换标签页；资料不会离开本站。
- 公开站点只放精选的课程资料，不包含成绩、名单、个人实验报告等内容。
