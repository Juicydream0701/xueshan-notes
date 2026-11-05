(function () {
  "use strict";
  var prefix = "xueshan:semiconductor:v1:";
  function read(key, fallback) {
    try { var raw = localStorage.getItem(prefix + key); return raw ? JSON.parse(raw) : fallback; }
    catch (_) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(prefix + key, JSON.stringify(value)); return true; }
    catch (_) { return false; }
  }
  function init() {
    document.querySelectorAll("[data-sem-review]:not([data-sem-ready])").forEach(function (panel) {
      panel.setAttribute("data-sem-ready", "true");
      var checks = Array.from(panel.querySelectorAll("[data-review-chapter]"));
      var chapters = ["01-crystal", "02-bands", "03-impurities", "04-statistics", "05-transport", "06-nonequilibrium", "07-pn-junction", "08-contacts"];
      var progress = read("progress", {});
      if (!progress || typeof progress !== "object" || Array.isArray(progress)) progress = {};
      function render() {
        checks.forEach(function (input) { input.checked = progress[input.dataset.reviewChapter] === true; });
        var count = checks.filter(function (input) { return input.checked; }).length;
        panel.querySelector("[data-review-count]").textContent = count + " / 8 章";
        panel.querySelector("[data-review-progress]").value = count;
        var next = checks.findIndex(function (input) { return !input.checked; });
        var link = panel.querySelector("[data-review-next]");
        link.textContent = next < 0 ? "进入综合模拟卷" : "继续第 " + (next + 1) + " 章";
        link.href = next < 0 ? "../mock-exam/" : "../topics/" + chapters[next] + "/";
      }
      checks.forEach(function (input) {
        input.addEventListener("change", function () {
          var stored = read("progress", progress);
          if (!stored || typeof stored !== "object" || Array.isArray(stored)) stored = progress;
          stored[input.dataset.reviewChapter] = input.checked;
          progress = stored;
          var saved = save("progress", stored);
          render();
          if (!saved) panel.querySelector("[data-review-storage]").textContent = "当前浏览器未允许保存进度，勾选仅在本页有效。";
        });
      });
      window.addEventListener("storage", function (event) {
        if (event.key !== prefix + "progress") return;
        var stored = read("progress", {});
        progress = stored && typeof stored === "object" && !Array.isArray(stored) ? stored : {};
        render();
      });
      render();
    });
    document.querySelectorAll("[data-sem-exam]:not([data-sem-ready])").forEach(function (panel) {
      panel.setAttribute("data-sem-ready", "true");
      var key = "exam:" + panel.dataset.examId;
      var duration = Number(panel.dataset.duration) * 60;
      var start = panel.querySelector("[data-exam-start]");
      var status = panel.querySelector("[data-exam-status]");
      var stored = read(key, null);
      function valid(value) {
        return value && typeof value === "object" && Number.isFinite(value.remaining) && value.remaining >= 0 && value.remaining <= duration && (!value.running || Number.isFinite(value.endsAt));
      }
      var state = valid(stored) ? stored : { remaining: duration, running: false, endsAt: null, started: false };
      var storageOk = true;
      function persist() { storageOk = save(key, state); }
      function reconcile() {
        if (state.running) {
          state.remaining = Math.max(0, Math.ceil((state.endsAt - Date.now()) / 1000));
          if (!state.remaining) { state.running = false; state.endsAt = null; persist(); }
        }
      }
      function render() {
        reconcile();
        panel.querySelector("[data-exam-clock]").textContent = String(Math.floor(state.remaining / 60)).padStart(2, "0") + ":" + String(state.remaining % 60).padStart(2, "0");
        start.disabled = state.remaining === 0;
        start.textContent = state.running ? "暂停计时" : state.started ? "继续答卷" : "开始答卷";
        var message = state.remaining === 0 ? "计时结束。请停止作答，核对参考解答与评分点。" : state.running ? "正在计时；切换页面或刷新后继续按截止时间计算。" : state.started ? "已暂停，可继续答卷。" : "建议先备好答题纸，再开始 120 分钟训练。";
        if (!storageOk) message += " 当前浏览器未允许保存，关闭页面后计时将丢失。";
        if (status.textContent !== message) status.textContent = message;
      }
      start.addEventListener("click", function () {
        reconcile();
        if (state.remaining === 0) return;
        state.running = !state.running;
        state.started = true;
        state.endsAt = state.running ? Date.now() + state.remaining * 1000 : null;
        persist(); render();
      });
      panel.querySelector("[data-exam-reset]").addEventListener("click", function () {
        state = { remaining: duration, running: false, endsAt: null, started: false };
        persist(); render();
      });
      panel.querySelector("[data-exam-print]").addEventListener("click", function () { window.print(); });
      window.addEventListener("storage", function (event) {
        if (event.key !== prefix + key) return;
        var next = read(key, null);
        if (valid(next)) { state = next; render(); }
      });
      render();
      var interval = window.setInterval(function () {
        if (!panel.isConnected) { window.clearInterval(interval); return; }
        render();
      }, 1000);
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
  if (typeof document$ !== "undefined") document$.subscribe(init);
})();
