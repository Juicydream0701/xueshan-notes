/* 原卷页面放大阅读；无脚本时仍可直接打开图片。 */
(() => {
  const bind = () => {
    document.querySelectorAll('[data-exam-gallery]').forEach(gallery => {
      if (gallery.dataset.ready) return;
      gallery.dataset.ready = 'true';
      const links = [...gallery.querySelectorAll('figure > a')];
      if (!links.length || typeof HTMLDialogElement === 'undefined') return;
      const dialog = document.createElement('dialog');
      dialog.className = 'exam-zoom';
      dialog.setAttribute('aria-label', '回忆卷原页放大阅读');
      dialog.innerHTML = '<div class="exam-zoom__bar"><button type="button" data-prev aria-label="上一页">←</button><output aria-live="polite"></output><button type="button" data-next aria-label="下一页">→</button><label>缩放 <input type="range" min="100" max="240" value="100" step="10" aria-label="原页缩放比例"></label><a target="_blank" rel="noopener">原图</a><button type="button" data-close>关闭</button></div><div class="exam-zoom__body" tabindex="0"><img alt=""></div>';
      gallery.after(dialog);
      const body = dialog.querySelector('.exam-zoom__body');
      const img = dialog.querySelector('img');
      const range = dialog.querySelector('input');
      let index = 0;
      const show = i => {
        index = Math.max(0, Math.min(links.length - 1, i));
        const source = links[index].querySelector('img');
        img.src = links[index].href;
        img.alt = source.alt;
        range.value = '100';
        img.style.width = '100%';
        dialog.querySelector('output').textContent = `第 ${index + 1} / ${links.length} 页`;
        dialog.querySelector('a').href = links[index].href;
        dialog.querySelector('[data-prev]').disabled = index === 0;
        dialog.querySelector('[data-next]').disabled = index === links.length - 1;
        body.scrollTop = body.scrollLeft = 0;
      };
      links.forEach((link, i) => link.addEventListener('click', event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        show(i);
        dialog.showModal();
      }));
      dialog.querySelector('[data-prev]').addEventListener('click', () => show(index - 1));
      dialog.querySelector('[data-next]').addEventListener('click', () => show(index + 1));
      dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
      range.addEventListener('input', () => { img.style.width = `${range.value}%`; });
      dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
      dialog.addEventListener('keydown', event => {
        if (event.target.tagName === 'INPUT') return;
        if (event.key === 'ArrowLeft') { event.preventDefault(); show(index - 1); }
        if (event.key === 'ArrowRight') { event.preventDefault(); show(index + 1); }
      });
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
  else bind();
  if (typeof document$ !== 'undefined') document$.subscribe(bind);
})();
