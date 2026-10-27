const list = document.querySelector('#file-list');
if (list) {
  let dragged;
  list.querySelectorAll('.file-row[draggable="true"]').forEach(row => {
    row.addEventListener('dragstart', () => { dragged = row; row.classList.add('dragging'); });
    row.addEventListener('dragend', async () => {
      row.classList.remove('dragging');
      const body = new URLSearchParams();
      body.set('csrf', list.dataset.csrf); body.set('folder', list.dataset.folder);
      list.querySelectorAll('.file-row').forEach(item => body.append('name', item.dataset.name));
      await fetch('/reorder', { method: 'POST', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body });
    });
    row.addEventListener('dragover', event => {
      event.preventDefault();
      if (dragged && dragged !== row) {
        const box = row.getBoundingClientRect();
        list.insertBefore(dragged, event.clientY < box.top + box.height / 2 ? row : row.nextSibling);
      }
    });
  });
}
