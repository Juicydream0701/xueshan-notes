(function () {
  "use strict";

  function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var rest = seconds % 60;
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
        '<button class="floating-tool__action" type="button" data-focus-mode aria-pressed="false"><span>专注模式</span><small>隐藏干扰，保留正文</small></button>' +
        '<button class="floating-tool__action" type="button" data-scroll-top><span>回到顶部</span><small>快速回到页面开头</small></button>' +
        '<p class="floating-tools__hint">快捷键：Alt + F 切换专注模式</p>' +
      '</div>';

    document.body.appendChild(root);

    var toggle = root.querySelector(".floating-tools__toggle");
    var panel = root.querySelector(".floating-tools__panel");
    var close = root.querySelector(".floating-tools__close");
    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "收起小工具栏" : "打开小工具栏");
      panel.hidden = !open;
      root.classList.toggle("is-open", open);
    }
    toggle.addEventListener("click", function () { setOpen(panel.hidden); });
    close.addEventListener("click", function () { setOpen(false); });

    var display = root.querySelector("[data-timer-display]");
    var start = root.querySelector("[data-timer-start]");
    var reset = root.querySelector("[data-timer-reset]");
    var timer = { seconds: 25 * 60, interval: null, running: false };

    function renderTimer() {
      display.textContent = formatTime(timer.seconds);
      start.textContent = timer.running ? "暂停" : "开始";
      root.classList.toggle("timer-running", timer.running);
    }
    function stopTimer() {
      if (timer.interval) window.clearInterval(timer.interval);
      timer.interval = null;
      timer.running = false;
      renderTimer();
    }
    function runTimer() {
      if (timer.running) {
        stopTimer();
        return;
      }
      if (timer.seconds <= 0) timer.seconds = 25 * 60;
      timer.running = true;
      timer.interval = window.setInterval(function () {
        timer.seconds -= 1;
        if (timer.seconds <= 0) {
          timer.seconds = 0;
          stopTimer();
          display.textContent = "完成";
          if ("Notification" in window && Notification.permission === "granted") {
            new Notification("专注时间完成", { body: "休息一下，再继续下一段学习吧。" });
          }
        }
        renderTimer();
      }, 1000);
      renderTimer();
    }
    start.addEventListener("click", runTimer);
    reset.addEventListener("click", function () {
      stopTimer();
      timer.seconds = 25 * 60;
      renderTimer();
    });
    root.querySelectorAll("[data-timer-preset]").forEach(function (button) {
      button.addEventListener("click", function () {
        stopTimer();
        timer.seconds = Number(button.getAttribute("data-timer-preset")) * 60;
        renderTimer();
      });
    });
    renderTimer();

    var focusButton = root.querySelector("[data-focus-mode]");
    focusButton.addEventListener("click", function () {
      var active = document.body.classList.toggle("focus-mode");
      focusButton.setAttribute("aria-pressed", String(active));
      focusButton.querySelector("span").textContent = active ? "退出专注模式" : "专注模式";
    });
    root.querySelector("[data-scroll-top]").addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.addEventListener("keydown", function (event) {
      if (event.altKey && event.key.toLowerCase() === "f") {
        event.preventDefault();
        focusButton.click();
      }
      if (event.key === "Escape" && !panel.hidden) setOpen(false);
    });
  }

  function enhancePdfReaders() {
    document.querySelectorAll("[data-pdf-reader]").forEach(function (reader) {
      var select = reader.querySelector("[data-pdf-select]");
      var frame = reader.querySelector("[data-pdf-frame]");
      var open = reader.querySelector("[data-pdf-open]");
      var download = reader.querySelector("[data-pdf-download]");
      if (!select || !frame) return;
      function update() {
        var value = select.value;
        frame.src = value;
        if (open) open.href = value;
        if (download) download.href = value;
      }
      select.addEventListener("change", update);
      update();
    });
  }

  function requestNotificationPermission() {
    document.addEventListener("click", function (event) {
      if (event.target.matches("[data-timer-start]") && "Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
      }
    }, { once: true });
  }

  function boot() {
    createTools();
    enhancePdfReaders();
    requestNotificationPermission();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
