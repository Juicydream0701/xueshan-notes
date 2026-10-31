(function () {
  "use strict";

  var STORAGE_PREFIX = "xueshan:";
  var timerKey = STORAGE_PREFIX + "tools:timer";
  var toolsOpenKey = STORAGE_PREFIX + "tools:open";
  var focusKey = STORAGE_PREFIX + "tools:focus";
  var pdfHeightKey = STORAGE_PREFIX + "pdf:height";
  var pdfSelectionKey = STORAGE_PREFIX + "pdf:selection";
  var aiConfigKey = STORAGE_PREFIX + "ai:config";
  var aiTreePrefix = STORAGE_PREFIX + "ai:tree:";
  var pdfJsPromise = null;

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

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character];
    });
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
        '<div class="floating-tools__heading"><strong>雪山工具箱</strong><button class="floating-tools__close" type="button" aria-label="关闭工具栏">×</button></div>' +
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
        '<div class="floating-tools__quick-actions">' +
          '<button class="floating-tool__action" type="button" data-ai-open><span>AI 笔记助手</span><small>查文件、找链接、问知识</small></button>' +
          '<button class="floating-tool__action" type="button" data-focus-mode aria-pressed="false"><span>专注模式</span><small>隐藏干扰，状态会保留</small></button>' +
          '<button class="floating-tool__action" type="button" data-scroll-top><span>回到顶部</span><small>快速回到页面开头</small></button>' +
        '</div>' +
        '<p class="floating-tools__hint">快捷键：Alt + F 切换专注模式</p>' +
      '</div>';

    document.body.appendChild(root);

    var toggle = root.querySelector(".floating-tools__toggle");
    var panel = root.querySelector(".floating-tools__panel");
    var close = root.querySelector(".floating-tools__close");

    function setOpen(open, persist) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "收起工具箱" : "打开工具箱");
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
        if (timer.done) finishTimer();
        else renderTimer();
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
    root.querySelector("[data-ai-open]").addEventListener("click", function () {
      openAssistant();
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
          if (fileName) fileName.textContent = "当前本地文件：" + file.name;
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

  function enhancePdfLinks() {
    document.querySelectorAll("a[href]").forEach(function (link) {
      if (/\.pdf(?:[?#]|$)/i.test(link.getAttribute("href") || "") && !link.hasAttribute("target")) {
        link.target = "_blank";
        link.rel = "noopener";
      }
    });
  }

  function getDefaultAiConfig() {
    return {
      apiKey: "",
      endpoint: "https://api.deepseek.com/chat/completions",
      model: "deepseek-chat",
      owner: "Juicydream0701",
      repo: "xueshan-notes",
      branch: "main"
    };
  }

  function getAiConfig() {
    var defaults = getDefaultAiConfig();
    var saved = readStorage(aiConfigKey, {});
    return {
      apiKey: saved.apiKey || defaults.apiKey,
      endpoint: saved.endpoint || defaults.endpoint,
      model: saved.model || defaults.model,
      owner: saved.owner || defaults.owner,
      repo: saved.repo || defaults.repo,
      branch: saved.branch || defaults.branch
    };
  }

  function repoBase(config) {
    return "https://github.com/" + encodeURIComponent(config.owner) + "/" + encodeURIComponent(config.repo);
  }

  function rawUrl(config, path) {
    return "https://raw.githubusercontent.com/" + encodeURIComponent(config.owner) + "/" +
      encodeURIComponent(config.repo) + "/" + encodeURIComponent(config.branch) + "/" +
      path.split("/").map(encodeURIComponent).join("/");
  }

  function siteUrl(config, path) {
    var base = "https://" + config.owner + ".github.io/" + config.repo + "/";
    var clean = path.replace(/^docs\//, "");
    if (clean === "index.md") return base;
    if (/\.md$/i.test(clean)) {
      var page = clean.replace(/\.md$/i, "");
      if (page.endsWith("/index")) page = page.slice(0, -6);
      return base + page.replace(/^\/+/, "") + "/";
    }
    return base + clean;
  }

  function tokeniseQuery(query) {
    var tokens = query.toLowerCase().match(/[\u4e00-\u9fff]+|[a-z0-9_]+/gi) || [];
    var aliases = [];
    if (/电路|电网|暂态|三相/.test(query)) aliases.push("circuit", "circuit-theory");
    if (/半导体|pn结|能带|载流子/.test(query)) aliases.push("semiconductor", "semiconductor-physics");
    if (/模拟|模电|运放|晶体管/.test(query)) aliases.push("analog", "circuit-theory");
    if (/微机|汇编|8051|stm32/i.test(query)) aliases.push("microcomputer");
    return tokens.concat(aliases);
  }

  async function loadTree(config) {
    var cacheKey = aiTreePrefix + config.owner + "/" + config.repo + "@" + config.branch;
    var cached = readStorage(cacheKey, null);
    if (cached && cached.at && Date.now() - cached.at < 10 * 60 * 1000 && Array.isArray(cached.tree)) {
      return cached.tree;
    }
    var url = "https://api.github.com/repos/" + encodeURIComponent(config.owner) + "/" +
      encodeURIComponent(config.repo) + "/git/trees/" + encodeURIComponent(config.branch) + "?recursive=1";
    var response = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
    if (!response.ok) throw new Error("GitHub 文件目录读取失败（" + response.status + "）");
    var data = await response.json();
    var tree = (data.tree || []).filter(function (item) { return item.type === "blob"; }).map(function (item) {
      return { path: item.path, size: item.size || 0 };
    });
    writeStorage(cacheKey, { at: Date.now(), tree: tree });
    return tree;
  }

  function loadPdfJs() {
    if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
    if (pdfJsPromise) return pdfJsPromise;
    pdfJsPromise = new Promise(function (resolve, reject) {
      var script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      script.onload = function () {
        if (!window.pdfjsLib) {
          reject(new Error("PDF 文字读取组件没有加载成功"));
          return;
        }
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        resolve(window.pdfjsLib);
      };
      script.onerror = function () { reject(new Error("PDF 文字读取组件加载失败，可仍使用 PDF 链接阅读")); };
      document.head.appendChild(script);
    });
    return pdfJsPromise;
  }

  async function extractPdfText(url, maxPages) {
    var response = await fetch(url);
    if (!response.ok) throw new Error("PDF 读取失败（" + response.status + "）");
    var buffer = await response.arrayBuffer();
    var pdf = await window.pdfjsLib.getDocument({ data: buffer }).promise;
    var pages = Math.min(pdf.numPages, maxPages || 12);
    var output = [];
    for (var pageNumber = 1; pageNumber <= pages; pageNumber += 1) {
      var page = await pdf.getPage(pageNumber);
      var text = await page.getTextContent();
      output.push("[第 " + pageNumber + " 页] " + text.items.map(function (item) { return item.str; }).join(" "));
    }
    return output.join("\n").slice(0, 28000);
  }

  function scorePath(path, tokens) {
    var lower = path.toLowerCase();
    var score = 0;
    tokens.forEach(function (token) {
      if (lower.indexOf(token.toLowerCase()) >= 0) score += token.length > 2 ? 5 : 2;
    });
    if (/\/index\.md$/i.test(path)) score += 2;
    if (/\.md$/i.test(path)) score += 1;
    if (/\.pdf$/i.test(path)) score += 0.5;
    return score;
  }

  async function searchRepository(query, config, onProgress) {
    var tree = await loadTree(config);
    var tokens = tokeniseQuery(query);
    var docs = tree.filter(function (item) { return /^docs\//i.test(item.path); });
    var ranked = docs.map(function (item) {
      return { path: item.path, size: item.size, score: scorePath(item.path, tokens) };
    }).sort(function (a, b) { return b.score - a.score || a.path.localeCompare(b.path); });
    var selected = ranked.filter(function (item) { return item.score > 0; }).slice(0, 14);
    if (!selected.length) {
      selected = ranked.filter(function (item) { return /\.(md|pdf)$/i.test(item.path); }).slice(0, 12);
    }

    var markdown = selected.filter(function (item) { return /\.md$/i.test(item.path); }).slice(0, 7);
    var pdfs = selected.filter(function (item) { return /\.pdf$/i.test(item.path); }).slice(0, 12);
    var documents = await Promise.all(markdown.map(async function (item) {
      try {
        var response = await fetch(rawUrl(config, item.path));
        var text = response.ok ? await response.text() : "";
        return { path: item.path, text: text.slice(0, 16000) };
      } catch (error) {
        return { path: item.path, text: "" };
      }
    }));
    var pdfDocuments = [];
    if (config.apiKey && pdfs.length) {
      if (onProgress) onProgress("正在加载 PDF 文字读取组件…");
      try {
        await loadPdfJs();
        for (var pdfIndex = 0; pdfIndex < Math.min(3, pdfs.length); pdfIndex += 1) {
          var pdfItem = pdfs[pdfIndex];
          if (onProgress) onProgress("正在读取 PDF：" + pdfItem.path.split("/").pop());
          try {
            pdfDocuments.push({ path: pdfItem.path, text: await extractPdfText(rawUrl(config, pdfItem.path), 12) });
          } catch (pdfError) {
            pdfDocuments.push({ path: pdfItem.path, text: "（PDF 文字读取失败，但文件链接可用）" });
          }
        }
      } catch (pdfLibraryError) {
        pdfDocuments.push({ path: "PDF 读取组件", text: "（未能加载 PDF 文字组件，使用文件链接回答）" });
      }
    }
    return {
      files: selected,
      pdfs: pdfs,
      documents: documents,
      pdfDocuments: pdfDocuments,
      query: query,
      config: config
    };
  }

  function linkForFile(result, item) {
    var config = result.config;
    return {
      site: siteUrl(config, item.path),
      github: repoBase(config) + "/blob/" + encodeURIComponent(config.branch) + "/" + item.path.split("/").map(encodeURIComponent).join("/")
    };
  }

  function resultLinks(result) {
    var list = result.files.slice(0, 12);
    if (!list.length) return "<p>没有找到匹配文件，可以换一个关键词。</p>";
    return "<ul class=\"floating-ai__file-list\">" + list.map(function (item) {
      var links = linkForFile(result, item);
      return "<li><span>" + escapeHtml(item.path.replace(/^docs\//, "")) + "</span><small>" +
        '<a href="' + escapeHtml(links.site) + '" target="_blank" rel="noopener">网站</a> · ' +
        '<a href="' + escapeHtml(links.github) + '" target="_blank" rel="noopener">GitHub</a>' +
        "</small></li>";
    }).join("") + "</ul>";
  }

  function contextForAi(result) {
    var fileLines = result.files.slice(0, 18).map(function (item) {
      var links = linkForFile(result, item);
      return "文件: " + item.path + "\n网站: " + links.site + "\nGitHub: " + links.github;
    }).join("\n\n");
    var textLines = result.documents.map(function (item) {
      return "\n--- " + item.path + " ---\n" + item.text;
    }).join("\n").slice(0, 70000);
    var pdfLines = (result.pdfDocuments || []).map(function (item) {
      return "\n--- PDF 摘要 " + item.path + " ---\n" + item.text;
    }).join("\n").slice(0, 70000);
    return "相关文件清单:\n" + fileLines + "\n\n可读取的 Markdown 内容:\n" + textLines +
      "\n\n可读取的 PDF 文字摘要:\n" + pdfLines +
      "\n\n说明：PDF 上下文来自浏览器端提取的匹配文件前若干页；完整资料仍请打开 PDF 阅读器。";
  }

  function appendAssistantMessage(messages, role, content, html) {
    var item = document.createElement("div");
    item.className = "floating-ai__message floating-ai__message--" + role;
    item.innerHTML = html || escapeHtml(content).replace(/\n/g, "<br>");
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
  }

  function assistantText(text) {
    return escapeHtml(text).replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>').replace(/\n/g, "<br>");
  }

  async function askDeepSeek(config, query, context) {
    if (!config.apiKey) return "";
    var response = await fetch(config.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + config.apiKey
      },
      body: JSON.stringify({
        model: config.model,
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content: "你是雪山大地笔记网站的站内助手。只依据提供的仓库上下文回答。用户询问文件时，明确给出文件路径、网站链接和 GitHub 链接；用户询问知识时，先给结论，再给简短推理和对应笔记页面。不要编造仓库中没有的内容。如果上下文只有 PDF 文件名而没有全文，要明确说这是文件定位结果，并引导用户打开 PDF 阅读器。"
          },
          { role: "user", content: "用户问题：\n" + query + "\n\n仓库上下文：\n" + context }
        ]
      })
    });
    if (!response.ok) {
      var errorText = await response.text();
      throw new Error("DeepSeek 请求失败（" + response.status + "）：" + errorText.slice(0, 180));
    }
    var data = await response.json();
    return data.choices && data.choices[0] && data.choices[0].message ? data.choices[0].message.content : "模型没有返回内容。";
  }

  function openAssistant() {
    var assistant = document.querySelector("[data-ai-assistant]");
    if (!assistant) return;
    assistant.hidden = false;
    assistant.classList.add("is-open");
    var input = assistant.querySelector("[data-ai-input]");
    if (input) input.focus();
  }

  function closeAssistant() {
    var assistant = document.querySelector("[data-ai-assistant]");
    if (!assistant) return;
    assistant.classList.remove("is-open");
    assistant.hidden = true;
  }

  function createAssistant() {
    if (document.querySelector("[data-ai-assistant]")) return;

    var assistant = document.createElement("section");
    assistant.className = "floating-ai";
    assistant.setAttribute("data-ai-assistant", "");
    assistant.setAttribute("role", "dialog");
    assistant.setAttribute("aria-modal", "true");
    assistant.setAttribute("aria-labelledby", "floating-ai-title");
    assistant.hidden = true;
    assistant.innerHTML =
      '<div class="floating-ai__backdrop" data-ai-close></div>' +
      '<div class="floating-ai__dialog">' +
        '<div class="floating-ai__header"><div><span class="floating-ai__eyebrow">LOCAL REPOSITORY ASSISTANT</span><h2 id="floating-ai-title">雪山大地 · AI 笔记助手</h2></div><button type="button" class="floating-ai__close" data-ai-close aria-label="关闭 AI 助手">×</button></div>' +
        '<p class="floating-ai__privacy">默认使用 DeepSeek。API Key 只保存在当前浏览器，并直接发送给你配置的模型接口，不会写入 GitHub。</p>' +
        '<details class="floating-ai__config" open><summary>配置连接</summary>' +
          '<div class="floating-ai__form-grid">' +
            '<label>DeepSeek API Key<input type="password" data-ai-api-key placeholder="sk-..." autocomplete="off"></label>' +
            '<label>模型<input type="text" data-ai-model></label>' +
            '<label>GitHub 用户名<input type="text" data-ai-owner></label>' +
            '<label>仓库名<input type="text" data-ai-repo></label>' +
            '<label>分支<input type="text" data-ai-branch></label>' +
            '<label>接口地址<input type="url" data-ai-endpoint></label>' +
          '</div>' +
          '<button type="button" class="md-button md-button--primary" data-ai-save>保存配置</button>' +
        '</details>' +
        '<div class="floating-ai__quick" data-ai-quick>' +
          '<button type="button" data-ai-prompt="请找到半导体物理第7章 PDF，并给出网站和 GitHub 链接">找半导体物理第 7 章</button>' +
          '<button type="button" data-ai-prompt="电路原理的暂态部分在哪里？请给出页面和资料链接">找电路原理暂态</button>' +
          '<button type="button" data-ai-prompt="请介绍这个网站里的课程主线">课程主线</button>' +
        '</div>' +
        '<div class="floating-ai__messages" data-ai-messages><div class="floating-ai__welcome">先保存配置，再输入问题。即使不填 API Key，也可以直接搜索仓库文件并获得链接。</div></div>' +
        '<form class="floating-ai__form" data-ai-form><textarea data-ai-input rows="2" placeholder="例如：电路原理的三相资料在哪里？"></textarea><button type="submit" class="md-button md-button--primary">发送</button></form>' +
        '<p class="floating-ai__status" data-ai-status aria-live="polite"></p>' +
      '</div>';
    document.body.appendChild(assistant);

    var config = getAiConfig();
    assistant.querySelector("[data-ai-api-key]").value = config.apiKey;
    assistant.querySelector("[data-ai-model]").value = config.model;
    assistant.querySelector("[data-ai-owner]").value = config.owner;
    assistant.querySelector("[data-ai-repo]").value = config.repo;
    assistant.querySelector("[data-ai-branch]").value = config.branch;
    assistant.querySelector("[data-ai-endpoint]").value = config.endpoint;

    assistant.querySelectorAll("[data-ai-close]").forEach(function (button) {
      button.addEventListener("click", closeAssistant);
    });
    assistant.querySelector("[data-ai-save]").addEventListener("click", function () {
      var next = {
        apiKey: assistant.querySelector("[data-ai-api-key]").value.trim(),
        model: assistant.querySelector("[data-ai-model]").value.trim() || "deepseek-chat",
        owner: assistant.querySelector("[data-ai-owner]").value.trim() || "Juicydream0701",
        repo: assistant.querySelector("[data-ai-repo]").value.trim() || "xueshan-notes",
        branch: assistant.querySelector("[data-ai-branch]").value.trim() || "main",
        endpoint: assistant.querySelector("[data-ai-endpoint]").value.trim() || "https://api.deepseek.com/chat/completions"
      };
      writeStorage(aiConfigKey, next);
      assistant.querySelector("[data-ai-status]").textContent = "配置已保存在当前浏览器。";
    });

    var form = assistant.querySelector("[data-ai-form]");
    var input = assistant.querySelector("[data-ai-input]");
    var messages = assistant.querySelector("[data-ai-messages]");
    var status = assistant.querySelector("[data-ai-status]");

    function fillAndAsk(prompt) {
      input.value = prompt;
      form.requestSubmit();
    }

    assistant.querySelectorAll("[data-ai-prompt]").forEach(function (button) {
      button.addEventListener("click", function () { fillAndAsk(button.getAttribute("data-ai-prompt")); });
    });

    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      var query = input.value.trim();
      if (!query) return;
      var activeConfig = getAiConfig();
      appendAssistantMessage(messages, "user", query);
      input.value = "";
      status.textContent = "正在读取 GitHub 文件目录…";
      try {
        var result = await searchRepository(query, activeConfig, function (message) { status.textContent = message; });
        var linksHtml = resultLinks(result);
        if (!activeConfig.apiKey) {
          appendAssistantMessage(messages, "assistant", "", "<p>已找到相关文件：</p>" + linksHtml + "<p>填写 DeepSeek API Key 后，我还可以基于这些 Markdown 笔记继续回答知识问题。</p>");
        } else {
          status.textContent = "已找到资料，正在请求 DeepSeek…";
          var answer = await askDeepSeek(activeConfig, query, contextForAi(result));
          appendAssistantMessage(messages, "assistant", answer, assistantText(answer) + "<hr>" + linksHtml);
        }
        status.textContent = "完成";
      } catch (error) {
        appendAssistantMessage(messages, "assistant", "", "<p>这次没有完成：</p><p>" + escapeHtml(error.message) + "</p><p>你仍然可以先检查 GitHub 用户名、仓库名、分支和 API 地址。</p>");
        status.textContent = "请求失败";
      }
    });
  }

  function boot() {
    createTools();
    createAssistant();
    enhancePdfReaders();
    enhancePdfLinks();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
