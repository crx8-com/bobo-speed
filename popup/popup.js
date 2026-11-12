(() => {
  // src/ui/popup/popup.js
  var MessageTypes = {
    SET_SPEED: "VSC_SET_SPEED",
    ADJUST_SPEED: "VSC_ADJUST_SPEED",
    RESET_SPEED: "VSC_RESET_SPEED",
    TOGGLE_DISPLAY: "VSC_TOGGLE_DISPLAY"
  };
  document.addEventListener("DOMContentLoaded", () => {
    const speedDisplay = document.querySelector("#current-speed-val");
    const speedSlider = document.querySelector("#speed-slider");
    const decreaseBtn = document.querySelector("#speed-decrease");
    const increaseBtn = document.querySelector("#speed-increase");
    const resetBtn = document.querySelector("#speed-reset");
    const presetButtons = document.querySelectorAll(".preset-pill");
    const rewindBtn = document.querySelector("#btn-rewind");
    const forwardBtn = document.querySelector("#btn-forward");
    const toggleHudBtn = document.querySelector("#btn-toggle-hud");
    const disableBtn = document.querySelector("#disable");
    const configBtn = document.querySelector("#config");
    const statusElement = document.querySelector("#status");
    const connectionStatus = document.querySelector("#connection-status");
    let currentSpeed = 1;
    let slowerStep = 0.1;
    let fasterStep = 0.1;
    let toastTimer = null;
    init();
    function init() {
      chrome.storage.sync.get(["enabled", "lastSpeed", "keyBindings"], (storage) => {
        const enabled = storage.enabled !== false;
        updateEnabledUI(enabled);
        if (storage.keyBindings && Array.isArray(storage.keyBindings)) {
          const slowerBinding = storage.keyBindings.find((kb) => kb.action === "slower");
          const fasterBinding = storage.keyBindings.find((kb) => kb.action === "faster");
          if (slowerBinding && typeof slowerBinding.value === "number") {
            slowerStep = slowerBinding.value;
            decreaseBtn.dataset.delta = -slowerStep;
            decreaseBtn.querySelector(".step-text").textContent = `-${slowerStep}`;
          }
          if (fasterBinding && typeof fasterBinding.value === "number") {
            fasterStep = fasterBinding.value;
            increaseBtn.dataset.delta = fasterStep;
            increaseBtn.querySelector(".step-text").textContent = `+${fasterStep}`;
          }
        }
        if (typeof storage.lastSpeed === "number" && Number.isFinite(storage.lastSpeed)) {
          currentSpeed = storage.lastSpeed;
        }
        checkActiveTabMedia();
        updateSpeedDisplay(currentSpeed);
      });
      bindEvents();
    }
    function checkActiveTabMedia() {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs || !tabs[0] || !tabs[0].id) {
          setOfflineStatus("\u672A\u8FDE\u63A5");
          return;
        }
        const activeTab = tabs[0];
        if (activeTab.url && (activeTab.url.startsWith("chrome://") || activeTab.url.startsWith("edge://"))) {
          setOfflineStatus("\u7CFB\u7EDF\u9875\u9762");
          return;
        }
        chrome.scripting?.executeScript(
          {
            target: { tabId: activeTab.id },
            func: () => {
              const video = document.querySelector("video");
              if (video) {
                return { hasVideo: true, speed: video.playbackRate };
              }
              return { hasVideo: false };
            }
          },
          (results) => {
            if (chrome.runtime.lastError || !results || !results[0] || !results[0].result) {
              setReadyStatus("\u5C31\u7EEA");
              return;
            }
            const res = results[0].result;
            if (res.hasVideo && typeof res.speed === "number") {
              currentSpeed = res.speed;
              updateSpeedDisplay(currentSpeed);
              setOnlineStatus("\u5A92\u4F53\u64AD\u653E\u4E2D");
              try {
                chrome.runtime.sendMessage({ type: "VSC_UPDATE_BADGE", speed: currentSpeed });
              } catch {
              }
            } else {
              setReadyStatus("\u9875\u9762\u5C31\u7EEA");
            }
          }
        );
      });
    }
    function setOnlineStatus(text) {
      if (!connectionStatus) return;
      connectionStatus.querySelector(".pulse-dot").style.backgroundColor = "#10B981";
      connectionStatus.querySelector(".pulse-dot").style.boxShadow = "0 0 8px #10B981";
      connectionStatus.querySelector(".status-text").textContent = text;
    }
    function setReadyStatus(text) {
      if (!connectionStatus) return;
      connectionStatus.querySelector(".pulse-dot").style.backgroundColor = "#0EA5E9";
      connectionStatus.querySelector(".pulse-dot").style.boxShadow = "0 0 8px #0EA5E9";
      connectionStatus.querySelector(".status-text").textContent = text;
    }
    function setOfflineStatus(text) {
      if (!connectionStatus) return;
      connectionStatus.querySelector(".pulse-dot").style.backgroundColor = "#94A3B8";
      connectionStatus.querySelector(".pulse-dot").style.boxShadow = "none";
      connectionStatus.querySelector(".status-text").textContent = text;
    }
    function updateSpeedDisplay(speed) {
      const formatted = Number(speed).toFixed(2);
      speedDisplay.textContent = formatted;
      speedSlider.value = Math.min(Math.max(speed, 0.25), 4).toFixed(2);
      presetButtons.forEach((btn) => {
        const presetVal = parseFloat(btn.dataset.speed);
        const isMatch = Math.abs(presetVal - speed) < 0.04;
        btn.classList.toggle("active", isMatch);
      });
    }
    function showToast(msg) {
      if (!statusElement) return;
      statusElement.textContent = msg;
      statusElement.classList.remove("hide");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        statusElement.classList.add("hide");
      }, 1800);
    }
    function updateEnabledUI(enabled) {
      disableBtn.classList.toggle("disabled", !enabled);
      disableBtn.title = enabled ? "\u6269\u5C55\u5DF2\u542F\u7528 (\u70B9\u51FB\u7981\u7528)" : "\u6269\u5C55\u5DF2\u7981\u7528 (\u70B9\u51FB\u542F\u7528)";
    }
    function sendSpeedCommand(type, payload) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          chrome.tabs.sendMessage(tabs[0].id, { type, payload });
        }
      });
      if (payload && typeof payload.speed === "number") {
        currentSpeed = payload.speed;
        updateSpeedDisplay(currentSpeed);
        chrome.storage.sync.set({ lastSpeed: currentSpeed });
        try {
          chrome.runtime.sendMessage({ type: "VSC_UPDATE_BADGE", speed: currentSpeed });
        } catch {
        }
      }
    }
    function bindEvents() {
      speedSlider.addEventListener("input", (e) => {
        const targetSpeed = parseFloat(e.target.value);
        currentSpeed = targetSpeed;
        speedDisplay.textContent = targetSpeed.toFixed(2);
        sendSpeedCommand(MessageTypes.SET_SPEED, { speed: targetSpeed });
      });
      decreaseBtn.addEventListener("click", () => {
        const delta = parseFloat(decreaseBtn.dataset.delta) || -0.1;
        currentSpeed = Math.max(0.1, +(currentSpeed + delta).toFixed(2));
        sendSpeedCommand(MessageTypes.SET_SPEED, { speed: currentSpeed });
        showToast(`\u901F\u5EA6: ${currentSpeed.toFixed(2)}\xD7`);
      });
      increaseBtn.addEventListener("click", () => {
        const delta = parseFloat(increaseBtn.dataset.delta) || 0.1;
        currentSpeed = Math.min(16, +(currentSpeed + delta).toFixed(2));
        sendSpeedCommand(MessageTypes.SET_SPEED, { speed: currentSpeed });
        showToast(`\u901F\u5EA6: ${currentSpeed.toFixed(2)}\xD7`);
      });
      resetBtn.addEventListener("click", () => {
        currentSpeed = 1;
        sendSpeedCommand(MessageTypes.SET_SPEED, { speed: 1 });
        showToast("\u5DF2\u91CD\u7F6E\u4E3A 1.00\xD7 \u539F\u901F");
      });
      presetButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const speed = parseFloat(btn.dataset.speed);
          sendSpeedCommand(MessageTypes.SET_SPEED, { speed });
          showToast(`\u5DF2\u5207\u6362\u81F3 ${speed}\xD7`);
        });
      });
      function performSeek(seconds) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (!tabs[0]?.id) return;
          const tabId = tabs[0].id;
          chrome.tabs.sendMessage(tabId, {
            type: "VSC_SEEK",
            payload: { seconds }
          });
          chrome.scripting?.executeScript({
            target: { tabId, allFrames: true },
            func: (sec) => {
              try {
                const moviePlayer = document.getElementById("movie_player");
                if (moviePlayer && typeof moviePlayer.seekBy === "function") {
                  moviePlayer.seekBy(sec);
                  return;
                }
              } catch {
              }
              function getAllVideos(root) {
                let list = Array.from(root.querySelectorAll("video"));
                const all = root.querySelectorAll("*");
                for (const el of all) {
                  if (el.shadowRoot) {
                    list = list.concat(getAllVideos(el.shadowRoot));
                  }
                }
                return list;
              }
              const videos = getAllVideos(document);
              videos.forEach((v) => {
                try {
                  let target = v.currentTime + sec;
                  if (Number.isFinite(v.duration) && v.duration > 0) {
                    target = Math.max(0, Math.min(v.duration, target));
                  } else {
                    target = Math.max(0, target);
                  }
                  if (typeof v.fastSeek === "function") {
                    v.fastSeek(target);
                  }
                  v.currentTime = target;
                  v.dispatchEvent(new Event("seeking", { bubbles: true }));
                  v.dispatchEvent(new Event("timeupdate", { bubbles: true }));
                } catch {
                }
              });
            },
            args: [seconds]
          });
        });
      }
      rewindBtn.addEventListener("click", () => {
        performSeek(-10);
        showToast("\u5FEB\u9000 10 \u79D2 \u23EA");
      });
      forwardBtn.addEventListener("click", () => {
        performSeek(10);
        showToast("\u5FEB\u8FDB 10 \u79D2 \u23E9");
      });
      toggleHudBtn.addEventListener("click", () => {
        sendSpeedCommand(MessageTypes.TOGGLE_DISPLAY);
        showToast("\u5207\u6362\u60AC\u6D6E\u63A7\u5236\u5668\u663E\u793A");
      });
      disableBtn.addEventListener("click", () => {
        const isCurrentlyEnabled = !disableBtn.classList.contains("disabled");
        const nextState = !isCurrentlyEnabled;
        chrome.storage.sync.set({ enabled: nextState }, () => {
          updateEnabledUI(nextState);
          showToast(nextState ? "\u6269\u5C55\u5DF2\u6FC0\u6D3B" : "\u6269\u5C55\u5DF2\u505C\u7528 (\u9700\u5237\u65B0\u751F\u6548)");
        });
      });
      configBtn.addEventListener("click", () => {
        chrome.runtime.openOptionsPage();
      });
    }
  });
})();
