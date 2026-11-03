window.MathJax = {
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
    ignoreHtmlClass: 'no-mathjax',
    skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
  }
};
