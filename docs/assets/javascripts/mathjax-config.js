window.MathJax = {
  // 页面和助手均输入 TeX；保留辅助 MathML 输出，但不将它再次当作输入排版。
  startup: { input: ['tex'] },
  tex: {
    inlineMath: [['\\(', '\\)'], ['$', '$']],
    displayMath: [['\\[', '\\]'], ['$$', '$$']],
    processEscapes: true,
    processEnvironments: true
  },
  options: {
    // 静态笔记由 pymdownx.arithmatex 包在 .arithmatex 中，AI 助手的动态回答
    // 使用 .floating-ai__message。两者都交给 MathJax，避免回答中的公式停留在源码状态。
    processHtmlClass: 'arithmatex|floating-ai__message',
    // 动态回答会再次排版；跳过已有 MathJax 输出，避免重新处理辅助 MathML。
    ignoreHtmlClass: 'no-mathjax|MathJax',
    skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'mjx-container', 'mjx-assistive-mml']
  }
};
