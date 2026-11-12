(() => {
  // src/utils/key-maps.js
  var PREDEFINED_CODE_MAP = Object.freeze({
    83: { code: "KeyS", displayKey: "s" },
    // slower
    68: { code: "KeyD", displayKey: "d" },
    // faster
    90: { code: "KeyZ", displayKey: "z" },
    // rewind
    88: { code: "KeyX", displayKey: "x" },
    // advance
    82: { code: "KeyR", displayKey: "r" },
    // reset
    71: { code: "KeyG", displayKey: "g" },
    // fast
    86: { code: "KeyV", displayKey: "v" },
    // display
    77: { code: "KeyM", displayKey: "m" },
    // mark
    74: { code: "KeyJ", displayKey: "j" }
    // jump
  });
  var KEYCODE_TO_CODE = Object.freeze({
    // Control keys
    8: "Backspace",
    13: "Enter",
    // NumpadEnter also produces 13 — we pick main Enter
    27: "Escape",
    32: "Space",
    46: "Delete",
    // Arrow keys
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    // Digit row (top)
    48: "Digit0",
    49: "Digit1",
    50: "Digit2",
    51: "Digit3",
    52: "Digit4",
    53: "Digit5",
    54: "Digit6",
    55: "Digit7",
    56: "Digit8",
    57: "Digit9",
    // Letter keys
    65: "KeyA",
    66: "KeyB",
    67: "KeyC",
    68: "KeyD",
    69: "KeyE",
    70: "KeyF",
    71: "KeyG",
    72: "KeyH",
    73: "KeyI",
    74: "KeyJ",
    75: "KeyK",
    76: "KeyL",
    77: "KeyM",
    78: "KeyN",
    79: "KeyO",
    80: "KeyP",
    81: "KeyQ",
    82: "KeyR",
    83: "KeyS",
    84: "KeyT",
    85: "KeyU",
    86: "KeyV",
    87: "KeyW",
    88: "KeyX",
    89: "KeyY",
    90: "KeyZ",
    // Numpad
    96: "Numpad0",
    97: "Numpad1",
    98: "Numpad2",
    99: "Numpad3",
    100: "Numpad4",
    101: "Numpad5",
    102: "Numpad6",
    103: "Numpad7",
    104: "Numpad8",
    105: "Numpad9",
    106: "NumpadMultiply",
    107: "NumpadAdd",
    109: "NumpadSubtract",
    110: "NumpadDecimal",
    111: "NumpadDivide",
    // Function keys
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    124: "F13",
    125: "F14",
    126: "F15",
    127: "F16",
    128: "F17",
    129: "F18",
    130: "F19",
    131: "F20",
    132: "F21",
    133: "F22",
    134: "F23",
    135: "F24",
    // Lock keys
    144: "NumLock",
    145: "ScrollLock",
    // Punctuation / symbols (US QWERTY positions)
    186: "Semicolon",
    187: "Equal",
    188: "Comma",
    189: "Minus",
    190: "Period",
    191: "Slash",
    192: "Backquote",
    219: "BracketLeft",
    220: "Backslash",
    221: "BracketRight",
    222: "Quote"
  });
  function displayKeyFromCode(code) {
    if (!code) {
      return "";
    }
    if (code.startsWith("Key") && code.length === 4) {
      return code.charAt(3).toLowerCase();
    }
    if (code.startsWith("Digit") && code.length === 6) {
      return code.charAt(5);
    }
    if (/^Numpad\d$/.test(code)) {
      return `Num ${code.charAt(6)}`;
    }
    const numpadOps = {
      NumpadEnter: "Num Enter",
      NumpadMultiply: "Num *",
      NumpadAdd: "Num +",
      NumpadSubtract: "Num -",
      NumpadDecimal: "Num .",
      NumpadDivide: "Num /"
    };
    if (numpadOps[code]) {
      return numpadOps[code];
    }
    const punctuation = {
      Semicolon: ";",
      Equal: "=",
      Comma: ",",
      Minus: "-",
      Period: ".",
      Slash: "/",
      Backquote: "`",
      BracketLeft: "[",
      Backslash: "\\",
      BracketRight: "]",
      Quote: "'"
    };
    if (punctuation[code]) {
      return punctuation[code];
    }
    return code;
  }
  var PREDEFINED_ACTIONS = [
    "slower",
    "faster",
    "rewind",
    "advance",
    "reset",
    "fast",
    "display",
    "mark",
    "jump"
  ];
  var DEFAULT_BINDINGS = Object.freeze({
    slower: { code: "KeyS", key: 83, keyCode: 83, displayKey: "s", value: 0.1 },
    faster: { code: "KeyD", key: 68, keyCode: 68, displayKey: "d", value: 0.1 },
    rewind: { code: "KeyZ", key: 90, keyCode: 90, displayKey: "z", value: 10 },
    advance: { code: "KeyX", key: 88, keyCode: 88, displayKey: "x", value: 10 },
    reset: { code: "KeyR", key: 82, keyCode: 82, displayKey: "r", value: 1 },
    fast: { code: "KeyG", key: 71, keyCode: 71, displayKey: "g", value: 1.8 },
    display: { code: "KeyV", key: 86, keyCode: 86, displayKey: "v", value: 0 },
    mark: { code: "KeyM", key: 77, keyCode: 77, displayKey: "m", value: 0 },
    jump: { code: "KeyJ", key: 74, keyCode: 74, displayKey: "j", value: 0 }
  });

  // src/background.js
  function formatBadgeText(speed) {
    if (typeof speed !== "number" || !Number.isFinite(speed)) {
      return "";
    }
    if (speed % 1 === 0) {
      return `${speed.toFixed(1)}`;
    }
    const str = speed.toFixed(2);
    return str.endsWith("0") ? speed.toFixed(1) : str;
  }
  async function updateBadge(speed, tabId) {
    try {
      const storage = await chrome.storage.sync.get({ enabled: true });
      if (storage.enabled === false) {
        await chrome.action.setBadgeText({ text: "", ...tabId ? { tabId } : {} });
        return;
      }
      const badgeText = formatBadgeText(speed);
      await chrome.action.setBadgeText({
        text: badgeText,
        ...tabId ? { tabId } : {}
      });
      await chrome.action.setBadgeBackgroundColor({
        color: "#0EA5E9",
        ...tabId ? { tabId } : {}
      });
      if (chrome.action.setBadgeTextColor) {
        await chrome.action.setBadgeTextColor({
          color: "#FFFFFF",
          ...tabId ? { tabId } : {}
        });
      }
    } catch (error) {
    }
  }
  async function updateIcon(enabled) {
    try {
      const suffix = enabled ? "" : "_disabled";
      await chrome.action.setIcon({
        path: {
          19: `icons/icon19${suffix}.png`,
          38: `icons/icon38${suffix}.png`,
          48: `icons/icon48${suffix}.png`
        }
      });
      console.log(`Icon updated: ${enabled ? "enabled" : "disabled"}`);
    } catch (error) {
      console.error("Failed to update icon:", error);
    }
  }
  async function initializeIcon() {
    try {
      const storage = await chrome.storage.sync.get({ enabled: true, lastSpeed: 1 });
      await updateIcon(storage.enabled);
      if (storage.enabled) {
        await updateBadge(storage.lastSpeed || 1);
      } else {
        await updateBadge(null);
      }
    } catch (error) {
      console.error("Failed to initialize icon:", error);
      await updateIcon(true);
      await updateBadge(1);
    }
  }
  async function migrateConfig() {
    const DEPRECATED_KEYS = [
      // Removed in v0.9.x
      "speeds",
      "version",
      // Replaced by smarter fight-back defaults in event-manager.js
      "forceLastSavedSpeed",
      // Migrated to keyBindings array in v0.6.x
      "resetSpeed",
      "speedStep",
      "fastSpeed",
      "rewindTime",
      "advanceTime",
      "resetKeyCode",
      "slowerKeyCode",
      "fasterKeyCode",
      "rewindKeyCode",
      "advanceKeyCode",
      "fastKeyCode",
      "displayKeyCode"
    ];
    try {
      await chrome.storage.sync.remove(DEPRECATED_KEYS);
      console.log("[VSC] Config migrated to current version");
    } catch (error) {
      console.error("[VSC] Config migration failed:", error);
    }
  }
  async function migrateKeyBindingsV2() {
    try {
      const storage = await chrome.storage.sync.get(null);
      const bindings = storage.keyBindings;
      if (!bindings || !Array.isArray(bindings) || bindings.length === 0) {
        console.log("[VSC] Migration: no keyBindings in storage, skipping (fresh install)");
        return;
      }
      if (storage.schemaVersion === 2 && bindings.every((b) => b.code !== void 0)) {
        console.log("[VSC] Migration: already at v2, skipping");
        return;
      }
      let predefinedCount = 0;
      let customCount = 0;
      let unmappableCount = 0;
      const migrated = bindings.map((binding) => {
        if (binding.code !== void 0) {
          return binding;
        }
        const legacyKey = binding.key;
        if (binding.predefined && PREDEFINED_CODE_MAP[legacyKey]) {
          const mapped = PREDEFINED_CODE_MAP[legacyKey];
          predefinedCount++;
          return {
            ...binding,
            code: mapped.code,
            keyCode: legacyKey,
            displayKey: mapped.displayKey
          };
        }
        const code = KEYCODE_TO_CODE[legacyKey];
        if (code) {
          customCount++;
          return {
            ...binding,
            code,
            keyCode: legacyKey,
            displayKey: displayKeyFromCode(code)
          };
        }
        unmappableCount++;
        console.info(
          `[VSC] Migration: unmappable keyCode ${legacyKey} for action "${binding.action}"`
        );
        return {
          ...binding,
          code: null,
          keyCode: legacyKey,
          displayKey: ""
        };
      });
      const existingActions = new Set(migrated.map((b) => b.action));
      for (const action of PREDEFINED_ACTIONS) {
        if (!existingActions.has(action)) {
          const defaults = DEFAULT_BINDINGS[action];
          migrated.push({
            action,
            ...defaults,
            predefined: true
          });
          console.info(`[VSC] Migration: added missing predefined action "${action}"`);
        }
      }
      await chrome.storage.sync.set({
        keyBindings: migrated,
        schemaVersion: 2
      });
      console.log(
        `[VSC] Migration: ${predefinedCount} predefined, ${customCount} custom (${unmappableCount} unmappable)`
      );
    } catch (error) {
      console.error("[VSC] Key binding migration failed:", error);
    }
  }
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === "sync") {
      if (changes.enabled) {
        const isEnabled = changes.enabled.newValue !== false;
        updateIcon(isEnabled);
        if (!isEnabled) {
          updateBadge(null);
        }
      }
      if (changes.lastSpeed && changes.lastSpeed.newValue !== void 0) {
        updateBadge(changes.lastSpeed.newValue);
      }
    }
  });
  chrome.runtime.onMessage.addListener((message, sender) => {
    if (message && typeof message === "object") {
      if (message.type === "VSC_UPDATE_BADGE" || message.type === "VSC_SET_SPEED") {
        const speed = message.payload?.speed ?? message.speed;
        if (typeof speed === "number" && Number.isFinite(speed)) {
          updateBadge(speed, sender?.tab?.id);
          updateBadge(speed);
        }
      }
    }
  });
  chrome.tabs.onActivated.addListener(async (activeInfo) => {
    try {
      const results = await chrome.scripting.executeScript({
        target: { tabId: activeInfo.tabId },
        func: () => {
          const v = document.querySelector("video");
          return v ? v.playbackRate : null;
        }
      });
      if (results && results[0] && typeof results[0].result === "number") {
        await updateBadge(results[0].result, activeInfo.tabId);
        return;
      }
    } catch {
    }
    try {
      const storage = await chrome.storage.sync.get({ lastSpeed: 1 });
      await updateBadge(storage.lastSpeed || 1, activeInfo.tabId);
    } catch {
    }
  });
  chrome.runtime.onInstalled.addListener(async () => {
    console.log("Video Speed Controller installed/updated");
    await migrateConfig();
    await migrateKeyBindingsV2();
    await initializeIcon();
  });
  chrome.runtime.onStartup.addListener(async () => {
    console.log("Video Speed Controller started");
    await initializeIcon();
  });
  initializeIcon();
  console.log("Video Speed Controller background script loaded");
})();
