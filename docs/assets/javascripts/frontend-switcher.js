(function () {
  "use strict";

  var modeKey = "xueshan:frontend-mode";
  var modes = ["modern", "v2", "legacy"];

  function readMode() {
    try {
      var value = window.localStorage.getItem(modeKey);
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
    if (mode === "v2") return "第二版";
    if (mode === "legacy") return "旧版";
    return "新版";
  }

  function modeButtonLabel(mode) {
    if (mode === "v2") return "第二版 · 切到旧版";
    if (mode === "legacy") return "旧版 · 切到新版";
    return "新版 · 切到第二版";
  }

  function setMode(mode, persist) {
    var legacy = mode === "legacy";
    var v2 = mode === "v2";
    document.body.classList.toggle("legacy-frontend", legacy);
    document.body.classList.toggle("frontend-v2", v2);

    var button = document.querySelector("[data-frontend-switcher]");
    if (button) {
      button.textContent = modeButtonLabel(mode);
      button.setAttribute("aria-label", "当前为" + modeLabel(mode) + "，点击切换到下一套界面");
      button.setAttribute("title", "当前为" + modeLabel(mode) + "；下一次切换：" + modeLabel(nextMode(mode)));
      button.setAttribute("aria-pressed", String(mode !== "modern"));
      button.setAttribute("data-frontend-mode", mode);
    }

    var progress = document.querySelector(".frontend-reading-progress");
    if (progress) {
      progress.style.display = legacy ? "none" : "block";
    }
    if (persist !== false) saveMode(mode);
    updateProgress();
  }

  function createSwitcher() {
    if (document.querySelector("[data-frontend-switcher]")) return;
    var button = document.createElement("button");
    button.type = "button";
    button.className = "frontend-switcher";
    button.setAttribute("data-frontend-switcher", "");
    button.addEventListener("click", function () {
      var current = document.body.classList.contains("legacy-frontend")
        ? "legacy"
        : (document.body.classList.contains("frontend-v2") ? "v2" : "modern");
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
    if (document.body.classList.contains("legacy-frontend")) {
      progress.style.display = "none";
      return;
    }
    progress.style.display = "block";
    var root = document.documentElement;
    var scrollable = Math.max(1, root.scrollHeight - root.clientHeight);
    var ratio = Math.min(1, Math.max(0, window.scrollY / scrollable));
    progress.style.width = (ratio * 100).toFixed(2) + "%";
  }

  function init() {
    if (!document.body) return;
    createProgress();
    createSwitcher();
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}());
