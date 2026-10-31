(function () {
  "use strict";

  var STORAGE_PREFIX = "xueshan:";
  var timerKey = STORAGE_PREFIX + "tools:timer";
  var toolsOpenKey = STORAGE_PREFIX + "tools:open";
  var focusKey = STORAGE_PREFIX + "tools:focus";
  var pdfHeightKey = STORAGE_PREFIX + "pdf:height";
  var pdfSelectionKey = STORAGE_PREFIX + "pdf:selection";

  function readStorage(key, fallback) {
    try {
      var value = window.localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch (error) {
      return fallback;
    }
  }

  function writeStorage(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // 隐私模式或禁用存储时仍然允许工具正常使用。
    }
  }

  function formatTime(seconds) {
    var minutes = Math.floor(Math.max(0, seconds) / 60);
    var rest = Math.max(0, seconds) % 60;
    return String(minutes).padStart(2, "0") + ":" + String(rest).padStart(2, "0");
  }

  function createTools() {
    if (document.querySelector("[data-floating-tools]")) return;

    var root = document.createElement("aside");
    root.className = "floating-tools";
    root.setAttribute("data-floating-tools", "");
    root.innerHTML =
      '<button class="floating-tools__toggle" type="button" aria-expanded="false" aria-controls="floating-tools-panel" aria-label="打开小工具栏">' +
        '<span aria-hidden="true">✦</span>' +
      '</button>' +
      '<div class="floating-tools__panel" id="floating-tools-panel" hidden>' +
        '<div class="floating-tools__heading"><strong>随手工具</strong><button class="floating-tools__close" type="button" aria-label="关闭工具栏">×</button></div>' +
        '<section class="floating-tool floating-tool--timer" aria-labelledby="floating-timer-label">' +
          '<div class="floating-tool__label" id="floating-timer-label">专注计时</div>' +
          '<div class="floating-timer__display" data-timer-display>25:00</div>' +
          '<div class="floating-timer__row">' +
            '<button type="button" data-timer-start>开始</button>' +
            '<button type="button" data-timer-reset>重置</button>' +
          '</div>' +
          '<div class="floating-timer__presets" role="group" aria-label="计时长度">' +
            '<button type="button" data-timer-preset="5">5 分钟</button>' +
            '<button type="button" data-timer-preset="25">25 分钟</button>' +
            '<button type="button" data-timer-preset="50">50 分钟</button>' +
          '</div>' +
        '</section>' +
        '<button class="floating-tool__action" type="button" data-focus-mode aria-pressed="false"><span>专注模式</span><small>隐藏干扰，状态会保留</small></button>' +
        '<button class="floating-tool__action" type="button" data-scroll-top><span>回到顶部</span><small>快速回到页面开头</small></button>' +
        '<p class="floating-tools__hint">快捷键：Alt + F 切换专注模式</p>' +
      '</div>';

    document.body.appendChild(root);

    var toggle = root.querySelector(".floating-tools__toggle");
    var panel = root.querySelector(".floating-tools__panel");
    var close = root.querySelector(".floating-tools__close");

    function setOpen(open, persist) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "收起小工具栏" : "打开小工具栏");
      panel.hidden = !open;
      root.classList.toggle("is-open", open);
      if (persist !== false) writeStorage(toolsOpenKey, open);
    }

    setOpen(Boolean(readStorage(toolsOpenKey, false)), false);
    toggle.addEventListener("click", function () { setOpen(panel.hidden); });
    close.addEventListener("click", function () { setOpen(false); });

    var display = root.querySelector("[data-timer-display]");
    var start = root.querySelector("[data-timer-start]");
    var reset = root.querySelector("[data-timer-reset]");
    var savedTimer = readStorage(timerKey, null);
    var timer = {
      seconds: savedTimer && Number.isFinite(savedTimer.seconds) ? Math.max(0, savedTimer.seconds) : 25 * 60,
      interval: null,
      running: Boolean(savedTimer && savedTimer.running),
      endsAt: savedTimer && savedTimer.endsAt ? Number(savedTimer.endsAt) : null,
      done: Boolean(savedTimer && savedTimer.done)
    };

    function saveTimer() {
      writeStorage(timerKey, {
        seconds: timer.seconds,
        running: timer.running,
        endsAt: timer.endsAt,
        done: timer.done
      });
    }

    function reconcileTimer() {
      if (!timer.running || !timer.endsAt) return;
      timer.seconds = Math.max(0, Math.ceil((timer.endsAt - Date.now()) / 1000));
      if (timer.seconds === 0) {
        timer.running = false;
        timer.endsAt = null;
        timer.done = true;
      }
    }

    function renderTimer() {
      reconcileTimer();
      display.textContent = timer.done ? "完成" : formatTime(timer.seconds);
      start.textContent = timer.running ? "暂停" : "开始";
      root.classList.toggle("timer-running", timer.running);
      saveTimer();
    }

    function finishTimer() {
      if (timer.interval) window.clearInterval(timer.interval);
      timer.interval = null;
      timer.running = false;
      timer.endsAt = null;
      timer.seconds = 0;
      timer.done = true;
      renderTimer();
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("专注时间完成", { body: "休息一下，再继续下一段学习吧。" });
      }
    }

    function pauseTimer() {
      reconcileTimer();
      if (timer.interval) window.clearInterval(timer.interval);
      timer.interval = null;
      timer.running = false;
      timer.endsAt = null;
      renderTimer();
    }

    function runTimer() {
      if (timer.running) {
        pauseTimer();
        return;
      }
      if (timer.seconds <= 0 || timer.done) {
        timer.seconds = 25 * 60;
        timer.done = false;
      }
      timer.running = true;
      timer.endsAt = Date.now() + timer.seconds * 1000;
      timer.interval = window.setInterval(function () {
        reconcileTimer();
        if (timer.done) {
          finishTimer();
        } else {
          renderTimer();
        }
      }, 1000);
      renderTimer();
      if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
      }
    }

    reconcileTimer();
    renderTimer();
    if (timer.running) {
      timer.interval = window.setInterval(function () {
        reconcileTimer();
        if (timer.done) finishTimer();
        else renderTimer();
      }, 1000);
    }

    start.addEventListener("click", runTimer);
    reset.addEventListener("click", function () {
      pauseTimer();
      timer.seconds = 25 * 60;
      timer.done = false;
      renderTimer();
    });
    root.querySelectorAll("[data-timer-preset]").forEach(function (button) {
      button.addEventListener("click", function () {
        pauseTimer();
        timer.seconds = Number(button.getAttribute("data-timer-preset")) * 60;
        timer.done = false;
        renderTimer();
      });
    });

    var focusButton = root.querySelector("[data-focus-mode]");
    function setFocus(active, persist) {
      document.body.classList.toggle("focus-mode", active);
      focusButton.setAttribute("aria-pressed", String(active));
      focusButton.querySelector("span").textContent = active ? "退出专注模式" : "专注模式";
      if (persist !== false) writeStorage(focusKey, active);
    }
    setFocus(Boolean(readStorage(focusKey, false)), false);
    focusButton.addEventListener("click", function () {
      setFocus(!document.body.classList.contains("focus-mode"));
    });
    root.querySelector("[data-scroll-top]").addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.addEventListener("keydown", function (event) {
      if (event.altKey && event.key.toLowerCase() === "f") {
        event.preventDefault();
        setFocus(!document.body.classList.contains("focus-mode"));
      }
      if (event.key === "Escape" && !panel.hidden) setOpen(false);
    });
  }

  function enhancePdfReaders() {
    document.querySelectorAll("[data-pdf-reader]").forEach(function (reader) {
      if (reader.getAttribute("data-pdf-ready") === "true") return;
      reader.setAttribute("data-pdf-ready", "true");

      var select = reader.querySelector("[data-pdf-select]");
      var frame = reader.querySelector("[data-pdf-frame]");
      var open = reader.querySelector("[data-pdf-open]");
      var download = reader.querySelector("[data-pdf-download]");
      var fileInput = reader.querySelector("[data-pdf-file]");
      var heightInput = reader.querySelector("[data-pdf-height]");
      var heightOutput = reader.querySelector("[data-pdf-height-output]");
      var heightReset = reader.querySelector("[data-pdf-height-reset]");
      var viewport = reader.querySelector("[data-pdf-viewport]");
      if (!frame) return;

      var readerKey = reader.getAttribute("data-pdf-reader-key") || window.location.pathname;
      var savedSelection = readStorage(pdfSelectionKey + ":" + readerKey, "");
      var savedHeight = Number(readStorage(pdfHeightKey, 0));
      var objectUrl = null;

      function clampHeight(value) {
        return Math.min(1300, Math.max(560, Number(value) || 820));
      }

      function setHeight(value, persist) {
        var height = clampHeight(value);
        reader.style.setProperty("--pdf-reader-height", height + "px");
        if (heightInput) heightInput.value = String(height);
        if (heightOutput) heightOutput.value = height + " px";
        if (persist !== false) writeStorage(pdfHeightKey, height);
      }

      function setSource(value, persistSelection) {
        if (!value) return;
        frame.src = value;
        if (open) open.href = value;
        if (download) download.href = value;
        if (persistSelection && select) {
          writeStorage(pdfSelectionKey + ":" + readerKey, select.value);
        }
      }

      if (select) {
        if (savedSelection && Array.from(select.options).some(function (option) { return option.value === savedSelection; })) {
          select.value = savedSelection;
        }
        select.addEventListener("change", function () { setSource(select.value, true); });
      }

      if (fileInput) {
        fileInput.addEventListener("change", function () {
          var file = fileInput.files && fileInput.files[0];
          if (!file) return;
          if (objectUrl) URL.revokeObjectURL(objectUrl);
          objectUrl = URL.createObjectURL(file);
          setSource(objectUrl, false);
          reader.classList.add("pdf-reader--local-file");
          var fileName = reader.querySelector("[data-pdf-file-name]");
          if (fileName) fileName.textContent = file.name;
        });
      }

      if (heightInput) {
        heightInput.addEventListener("input", function () { setHeight(heightInput.value, true); });
      }
      if (heightReset) {
        heightReset.addEventListener("click", function () {
          setHeight(Math.min(1000, Math.max(700, Math.round(window.innerHeight * 0.82))), true);
        });
      }

      setHeight(savedHeight || Math.min(1000, Math.max(700, Math.round(window.innerHeight * 0.82))), false);
      setSource(select ? select.value : frame.getAttribute("data-pdf-src"), false);
      if (viewport) {
        viewport.setAttribute("aria-label", "可拖拽调整高度的 PDF 阅读区域");
        if (window.ResizeObserver) {
          new ResizeObserver(function (entries) {
            var height = Math.round(entries[0].contentRect.height);
            if (height < 400) return;
            if (heightInput) heightInput.value = String(Math.min(1300, Math.max(560, height)));
            if (heightOutput) heightOutput.value = height + " px";
            writeStorage(pdfHeightKey, height);
          }).observe(viewport);
        }
      }
    });
  }

  function boot() {
    createTools();
    enhancePdfReaders();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
