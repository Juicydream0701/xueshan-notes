# 电子测量资料中心与章页对照

[课程目录](index.md) · [历年卷](past-exams.md) · [分步解答](exam-solutions.md) · [原资料校勘](corrections.md)

[按原 PDF 小节逐项找知识点 →](source-map.md)

新增主资料为135页课程笔记和7页回忆卷。原笔记完整保留，网页按课程章号拆成11个专题。**本页均使用PDF文件页码**，与幻灯片角落的小页码可能不同。网页讲解用于展开推导和训练，原图用于核对结构与波形，校勘页解释原笔记中需要修正的地方。

[完整笔记 PDF · 135页，约37.7 MiB](resources/measurement-notes.pdf){ .md-button .md-button--primary }
[秋学期回忆卷 · 7页](resources/exam-2025-2026.pdf){ .md-button }

## 按章节定位

| 章号 | 网页讲义 | 原笔记PDF页码 | 阅读任务 |
| --- | --- | --- | --- |
| 02（一） | [误差、统计与系统修正](chapters/02-errors.md) | 3—25 | 等级、平均、残差、替代与修正 |
| 02（二） | [数据处理与误差传递](chapters/02-data.md) | 25—36 | 有效数字、误差预算、拟合与方案比较 |
| 03（一） | [电压与检波](chapters/03-voltage.md) | 36—50 | 加载、波形因数、峰值/均值/真RMS |
| 03（二） | [数字表与ADC](chapters/03-digital.md) | 50—64 | SAR、双积分、位数、字数与四线法 |
| 04 | [频率与时间](chapters/04-frequency.md) | 64—76 | 测频/测周期、中界频率、触发抖动 |
| 05 | [信号发生器](chapters/05-generators.md) | 76—82 | 输出负载、函数发生、PLL与DDS |
| 06（一） | [模拟示波器](chapters/06-analog-scope.md) | 84—103 | CRT、垂直、时基、扫描与触发 |
| 06（二） | [双踪与延迟扫描](chapters/06-multi-trigger.md) | 98—107 | ALT/CHOP、共同时间原点、作图 |
| 06（三） | [数字示波器](chapters/06-digital-scope.md) | 108—119 | 实时采样、环形存储、混叠、单次捕获 |
| 06（四） | [示波测量](chapters/06-measurements.md) | 118—127 | 探头、带宽、脉冲、XY与相位 |
| 07 | [频谱分析](chapters/07-spectrum.md) | 128—135 | 超外差、FFT、窗、RBW/VBW与dBm |

## 站内对照阅读

选择章节可定位到相应PDF页。高度可拖动调整并保存在当前浏览器；本地PDF只在本机读取，不上传。原笔记较大，首次载入需要等待，亦可下载后离线阅读。

<div class="pdf-reader" data-pdf-reader data-pdf-reader-key="measurement-instruments-library">
  <div class="pdf-reader__toolbar">
    <div class="pdf-reader__field pdf-reader__field--wide">
      <label for="measurement-pdf-select">章节或试卷</label>
      <select id="measurement-pdf-select" data-pdf-select>
        <option value="../resources/measurement-notes.pdf#page=3">第二章 · 误差与数据处理 · 第3页起</option>
        <option value="../resources/measurement-notes.pdf#page=36">第三章 · 电压与数字表 · 第36页起</option>
        <option value="../resources/measurement-notes.pdf#page=64">第四章 · 频率与时间 · 第64页起</option>
        <option value="../resources/measurement-notes.pdf#page=76">第五章 · 信号发生器 · 第76页起</option>
        <option value="../resources/measurement-notes.pdf#page=84">第六章 · 示波器 · 第84页起</option>
        <option value="../resources/measurement-notes.pdf#page=128">第七章 · 频谱分析 · 第128页起</option>
        <option value="../resources/exam-2025-2026.pdf#page=1">2025—2026 秋回忆卷 · 7页</option>
        <option value="../resources/measurement-1.pdf">原有第一章课件</option>
        <option value="../resources/measurement-3.pdf">原有第三章课件</option>
        <option value="../resources/measurement-4.pdf">原有第四章课件</option>
        <option value="../resources/measurement-lab-guide.pdf">原有实验指导书</option>
      </select>
    </div>
    <div class="pdf-reader__field pdf-reader__height-control">
      <label for="measurement-pdf-height">阅读器高度</label>
      <input id="measurement-pdf-height" type="range" min="560" max="1600" step="20" value="900" data-pdf-height aria-label="调节电子测量 PDF 阅读器高度">
      <output data-pdf-height-output for="measurement-pdf-height">900 px</output>
      <button type="button" class="pdf-reader__height-reset" data-pdf-height-reset>恢复默认</button>
    </div>
    <label class="pdf-reader__local-file md-button" for="measurement-pdf-file">打开本地 PDF
      <input id="measurement-pdf-file" type="file" accept="application/pdf,.pdf" data-pdf-file>
    </label>
    <div class="pdf-reader__actions">
      <a class="md-button md-button--primary" data-pdf-open target="_blank" rel="noopener">新标签页打开</a>
      <a class="md-button" data-pdf-download download>下载</a>
    </div>
  </div>
  <div class="pdf-reader__viewport" data-pdf-viewport>
    <iframe class="pdf-reader__frame" data-pdf-frame title="电子测量资料阅读器" loading="lazy"></iframe>
  </div>
  <p class="pdf-reader__fallback">浏览器不支持内嵌 PDF 时，请在新标签页打开。选择本地 PDF 只在当前浏览器读取，不会上传。</p>
  <p class="pdf-reader__note">可拖动右下角调整高度，选择与高度会保存在当前浏览器。</p>
  <p class="pdf-reader__file-name" data-pdf-file-name aria-live="polite"></p>
</div>

## 原有资料入口

原有[第一章课件](resources/measurement-1.pdf)、[第三章课件](resources/measurement-3.pdf)、[第四章课件](resources/measurement-4.pdf)和[实验指导书](resources/measurement-lab-guide.pdf)继续保留。不同版本的章号安排可能不同，查找内容应结合标题，而非只凭章号猜内容。

## 图号与来源

图文件按 `ch章号-图序-主题.webp` 命名，集中存于本课程 `resources/figures/`。正文图注给出原PDF页码；第六章四个专题共用章内图号。回忆卷逐页图按 `page-01.png` 至 `page-07.png` 命名，另有少量原题裁图及注明用途的教学曲线。未复制扫描教材等重复大文件。

本次重核课程插图，优先提取 PDF 内嵌原图，保留完整标注与原始像素，替换此前按页面比例裁切的图；其中四线法已核对为二线／四线接线对照图。图号按章内文件管理，正文插入顺序不必等于图号次序。图像仍受原文件本身清晰度限制，不进行会改变电路连接或公式的生成式修补。

[图像来源清单](resources/figures/sources.json)记录每张图的 PDF 页码、内嵌对象与原始像素；波形因数表另记经过核对的页面裁切边界。
