# 半导体物理：资料索引与校勘

[八章讲义](chapter-notes.md) · [复习安排](review-mode.md) · [PDF 资料中心](../../tools/pdf-library.md)

本次讲义重点参考所提供的《半导体物理》PDF，共 102 页，按原样复制到本站。以下页码均为 **PDF 文件页序**。原八章课件、既有复习资料和回忆卷继续保留于[课程总览](index.md#resources)。

## 原笔记阅读

[新标签页打开原 PDF](resources/semiconductor-exam-notes.pdf) · [下载原 PDF](resources/semiconductor-exam-notes.pdf){ download }

<div class="pdf-reader" data-pdf-reader data-pdf-reader-key="semiconductor-source">
  <div class="pdf-reader__toolbar">
    <div class="pdf-reader__field pdf-reader__field--wide">
      <label for="sem-source-select">章节定位</label>
      <select id="sem-source-select" data-pdf-select>
        <option value="../resources/semiconductor-exam-notes.pdf#page=1">第一章 · 第 1 页</option>
        <option value="../resources/semiconductor-exam-notes.pdf#page=13">第二章 · 第 13 页</option>
        <option value="../resources/semiconductor-exam-notes.pdf#page=27">第三章 · 第 27 页</option>
        <option value="../resources/semiconductor-exam-notes.pdf#page=37">第四章 · 第 37 页</option>
        <option value="../resources/semiconductor-exam-notes.pdf#page=55">第五章 · 第 55 页</option>
        <option value="../resources/semiconductor-exam-notes.pdf#page=68">第六章 · 第 68 页</option>
        <option value="../resources/semiconductor-exam-notes.pdf#page=78">第七章 · 第 78 页</option>
        <option value="../resources/semiconductor-exam-notes.pdf#page=97">第八章 · 第 97 页</option>
      </select>
    </div>
    <div class="pdf-reader__field pdf-reader__height-control">
      <label for="sem-source-height">阅读高度</label>
      <input id="sem-source-height" type="range" min="560" max="1600" step="20" value="900" data-pdf-height aria-label="调整原笔记阅读高度">
      <output data-pdf-height-output for="sem-source-height">900 px</output>
      <button type="button" class="pdf-reader__height-reset" data-pdf-height-reset>恢复默认</button>
    </div>
    <div class="pdf-reader__actions"><a class="md-button" data-pdf-open target="_blank" rel="noopener">新标签页打开</a><a class="md-button" data-pdf-download download>下载</a></div>
  </div>
  <div class="pdf-reader__viewport" data-pdf-viewport><iframe class="pdf-reader__frame" data-pdf-frame title="半导体物理原笔记" loading="lazy"></iframe></div>
  <p class="pdf-reader__fallback">可调节滑块或拖动阅读区右下角。浏览器无法内嵌显示时，请使用新标签页打开。</p>
</div>

## 关键位置与对应讲义

| PDF 页 | 查阅内容 | 对应网页 |
| --- | --- | --- |
| [5、11](resources/semiconductor-exam-notes.pdf#page=5) | 原胞、晶向与晶面图 | [第一章](topics/01-crystal.md) |
| [13—27](resources/semiconductor-exam-notes.pdf#page=13) | 电子状态与有效质量 | [第二章](topics/02-bands.md) |
| [27—37](resources/semiconductor-exam-notes.pdf#page=27) | 杂质电离、补偿与缺陷 | [第三章](topics/03-impurities.md) |
| [37—55](resources/semiconductor-exam-notes.pdf#page=37) | 状态密度、统计与费米能级 | [第四章](topics/04-statistics.md) |
| [55—67](resources/semiconductor-exam-notes.pdf#page=55) | 导电率、散射与温度关系 | [第五章](topics/05-transport.md) |
| [68—78](resources/semiconductor-exam-notes.pdf#page=68) | 复合、寿命与扩散 | [第六章](topics/06-nonequilibrium.md) |
| [78—96](resources/semiconductor-exam-notes.pdf#page=78) | pn 结与耗尽层 | [第七章](topics/07-pn-junction.md) |
| [97—102](resources/semiconductor-exam-notes.pdf#page=97) | 功函数、接触与发射理论 | [第八章](topics/08-contacts.md) |

## 阅读时需要修正或补充的地方

校勘只修正网页讲解，原 PDF 保留原貌。下列问题既有笔误，也有省略前提造成的歧义，应按具体条件理解。

| 页码 | 原文问题或不足 | 网页采用的解释 |
| --- | --- | --- |
| [1](resources/semiconductor-exam-notes.pdf#page=1) | 包含 2025 年考试日期和当时的成绩构成 | 仅作历史资料；本学期信息以教师通知为准 |
| [5](resources/semiconductor-exam-notes.pdf#page=5) | 将原胞表述为唯一 | 原胞选取不唯一，体积为最小平移胞体积 |
| [44](resources/semiconductor-exam-notes.pdf#page=44) | 将禁带中线近似分别代入电子、空穴浓度 | 精确非简并本征式采用 $n_i=\sqrt{N_CN_V}e^{-E_g/(2kT)}$，并保留 $E_i$ 的状态密度修正 |
| [66](resources/semiconductor-exam-notes.pdf#page=66) | 饱和区文字混淆多数浓度与本征浓度 | 近似固定的是多数浓度，$n_i(T)$ 仍随温度变化 |
| [74](resources/semiconductor-exam-notes.pdf#page=74) | 均匀掺杂时忽略扩散的条件不完整 | 光照、注入等仍可造成过剩浓度梯度，需实际检查 $dn/dx,dp/dx$ |
| [82—83](resources/semiconductor-exam-notes.pdf#page=82) | 用两侧费米能级差解释内建电势时容易混淆接触前后 | 接触前孤立材料可比较能级；平衡连接后的费米能级统一 |
| [92](resources/semiconductor-exam-notes.pdf#page=92) | n 侧电场式存在额外负号 | p 左 n 右、$x$ 向右时采用 $E_n=qN_D(x-x_n)/\varepsilon_s$ |
| [102](resources/semiconductor-exam-notes.pdf#page=102) | 将肖特基导电简化为漂移 | 区分多数载流子和具体热发射、扩散、隧穿机制 |

第 94 页扩散电容按该页的长基区存储电荷模型理解；若分析交流响应，需明确频率与边界条件。讲义中所有自编题均独立列出参数与模型，不将原笔记中的重点标记视为本学期命题承诺。
