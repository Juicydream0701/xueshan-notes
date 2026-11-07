(function () {
  "use strict";

  var modeKey = "xueshan:frontend-mode";
  // 两套前端：legacy 是版本 1（原版），modern 是版本 2（阅读台）。
  var modes = ["modern", "legacy"];
  var transitionTimer = 0;
  var progressFrame = 0;

  function readMode() {
    try {
      var value = window.localStorage.getItem(modeKey);
      // 兼容旧浏览器中保存过的旧模式值：统一回退到当前阅读台。
      if (value === "v2") value = "modern";
      return modes.indexOf(value) >= 0 ? value : "modern";
    } catch (error) {
      return "modern";
    }
  }

  function saveMode(mode) {
    try {
      window.localStorage.setItem(modeKey, mode);
    } catch (error) {
      // 禁用本地存储时仍然允许本次页面切换。
    }
  }

  function nextMode(mode) {
    return modes[(modes.indexOf(mode) + 1) % modes.length];
  }

  function modeLabel(mode) {
    return mode === "legacy" ? "版本 1" : "版本 2";
  }

  function modeButtonLabel(mode) {
    return mode === "legacy" ? "版本 1 · 切到版本 2" : "版本 2 · 切换";
  }

  function setMode(mode, persist) {
    var legacy = mode === "legacy";
    mode = legacy ? "legacy" : "modern";
    window.clearTimeout(transitionTimer);
    document.body.classList.toggle("frontend-transitioning", persist !== false);
    document.body.classList.toggle("legacy-frontend", legacy);
    document.body.setAttribute("data-frontend-version", legacy ? "1" : "2");

    var button = document.querySelector("[data-frontend-switcher]");
    var badge = document.querySelector("[data-frontend-version-badge]");
    if (button) {
      button.textContent = modeButtonLabel(mode);
      button.setAttribute("aria-label", "当前为" + modeLabel(mode) + "，点击切换到下一套界面");
      button.setAttribute("title", "当前为" + modeLabel(mode) + "；下一次切换：" + modeLabel(nextMode(mode)));
      button.setAttribute("aria-pressed", String(legacy));
      button.setAttribute("data-frontend-mode", mode);
      // 新版控件参加顶栏的 flex 布局，不再悬在正文目录上方。
      var parent = legacy ? document.body : document.querySelector(".md-header__inner");
      if (parent && button.parentElement !== parent) parent.appendChild(button);
    }
    if (badge) {
      badge.textContent = modeLabel(mode);
      badge.setAttribute("data-frontend-version", legacy ? "1" : "2");
    }

    var progress = document.querySelector(".frontend-reading-progress");
    if (progress) progress.style.display = "block";
    if (persist !== false) saveMode(mode);
    updateProgress();
    transitionTimer = window.setTimeout(function () {
      document.body.classList.remove("frontend-transitioning");
    }, 340);
  }

  function createSwitcher() {
    if (document.querySelector("[data-frontend-switcher]")) return;
    var badge = document.createElement("span");
    badge.className = "frontend-version-badge";
    badge.setAttribute("data-frontend-version-badge", "");
    badge.setAttribute("aria-hidden", "true");
    document.body.appendChild(badge);
    var button = document.createElement("button");
    button.type = "button";
    button.className = "frontend-switcher";
    button.setAttribute("data-frontend-switcher", "");
    button.addEventListener("click", function () {
      var current = document.body.classList.contains("legacy-frontend")
        ? "legacy"
        : "modern";
      setMode(nextMode(current));
    });
    document.body.appendChild(button);
    setMode(readMode(), false);
  }

  function createProgress() {
    if (document.querySelector(".frontend-reading-progress")) return;
    var progress = document.createElement("div");
    progress.className = "frontend-reading-progress";
    progress.setAttribute("aria-hidden", "true");
    document.body.appendChild(progress);
  }

  function updateProgress() {
    var progress = document.querySelector(".frontend-reading-progress");
    if (!progress) return;
    progress.style.display = "block";
    var root = document.documentElement;
    var scrollable = Math.max(1, root.scrollHeight - root.clientHeight);
    var ratio = Math.min(1, Math.max(0, window.scrollY / scrollable));
    progress.style.width = (ratio * 100).toFixed(2) + "%";
  }

  function scheduleProgress() {
    if (progressFrame) return;
    progressFrame = window.requestAnimationFrame(function () {
      progressFrame = 0;
      updateProgress();
    });
  }

  function init() {
    if (!document.body) return;
    document.body.classList.toggle("frontend-home", !!document.querySelector(".new-home"));
    createProgress();
    createSwitcher();
    updateProgress();
    window.addEventListener("scroll", scheduleProgress, { passive: true });
    window.addEventListener("resize", scheduleProgress, { passive: true });
    if (window.ResizeObserver) {
      var content = document.querySelector(".md-content");
      if (content) new ResizeObserver(scheduleProgress).observe(content);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}());
