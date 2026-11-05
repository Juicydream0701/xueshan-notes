(function () {
  "use strict";

  var modeKey = "xueshan:frontend-mode";

  function getMode() {
    try {
      return window.localStorage.getItem(modeKey) === "legacy" ? "legacy" : "modern";
    } catch (error) {
      return "modern";
    }
  }

  function saveMode(mode) {
    try {
      window.localStorage.setItem(modeKey, mode);
    } catch (error) {
      // 浏览器禁用存储时仍允许本次页面切换。
    }
  }

  function setMode(mode) {
    var legacy = mode === "legacy";
    document.body.classList.toggle("legacy-frontend", legacy);
    var button = document.querySelector("[data-frontend-switcher]");
    if (button) {
      button.textContent = legacy ? "使用新版" : "切回旧版";
      button.setAttribute("aria-label", legacy ? "切换到新版前端" : "切换到旧版前端");
      button.setAttribute("title", legacy ? "当前为旧版界面，点击切换到新版" : "当前为新版界面，点击切回旧版");
      button.setAttribute("aria-pressed", String(legacy));
    }
    saveMode(legacy ? "legacy" : "modern");
    updateProgress();
  }

  function createSwitcher() {
    if (document.querySelector("[data-frontend-switcher]")) return;
    var button = document.createElement("button");
    button.type = "button";
    button.className = "frontend-switcher";
    button.setAttribute("data-frontend-switcher", "");
    button.addEventListener("click", function () {
      setMode(document.body.classList.contains("legacy-frontend") ? "modern" : "legacy");
    });
    document.body.appendChild(button);
    setMode(getMode());
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
