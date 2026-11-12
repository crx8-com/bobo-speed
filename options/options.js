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
  var BLACKLISTED_CODES = /* @__PURE__ */ new Set([
    "Tab",
    "ShiftLeft",
    "ShiftRight",
    "ControlLeft",
    "ControlRight",
    "AltLeft",
    "AltRight",
    "MetaLeft",
    "MetaRight",
    "ContextMenu",
    "CapsLock",
    "NumLock",
    "ScrollLock"
  ]);

  // src/styles/controller-css-defaults.js
  var DEFAULT_CONTROLLER_CSS = `/* === Domain-based rules (stable \u2014 hostname only) === */

/* Facebook */
:root[style*='--vsc-domain: "facebook.com"'] vsc-controller {
  position: relative;
  top: 40px;
}

/* Google Photos \u2014 inline preview */
:root[style*='--vsc-domain: "photos.google.com"'] vsc-controller {
  position: relative;
  top: 35px;
}

/* Google Photos \u2014 full-screen view */
:root[style*='--vsc-domain: "photos.google.com"'] #player .house-brand vsc-controller {
  top: 50px;
}

/* Netflix */
:root[style*='--vsc-domain: "netflix.com"'] vsc-controller {
  position: relative;
  top: 85px;
}

/* Google Drive \u2014 shift native controls overlay down to expose video */
:root[style*='--vsc-domain: "drive.google.com"'] section[role="tabpanel"][aria-label="Video Player"] {
  top: 80px;
}

/* ChatGPT */
:root[style*='--vsc-domain: "chatgpt.com"'] vsc-controller {
  position: relative;
  top: 0px;
  left: 35px;
}

/* === DOM-contextual rules (may break if site changes HTML structure) === */

/* YouTube autohide \u2014 style the light-DOM host instead of relying on the
   deprecated Chromium-only :host-context() shadow selector. Explicit SHOW
   and temporary feedback stop matching this rule; HIDE and no-source remain
   final in the shadow cascade. Domain wrapping prevents unrelated sites from
   paying for or accidentally matching the YouTube-owned ancestor class. */
:root[style*='--vsc-domain: "youtube.com"'] .ytp-autohide vsc-controller:not([data-vsc-visibility="show"]):not(.vsc-show) {
  visibility: hidden !important;
  opacity: 0 !important;
  transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

:root[style*='--vsc-domain: "youtube-nocookie.com"'] .ytp-autohide vsc-controller:not([data-vsc-visibility="show"]):not(.vsc-show) {
  visibility: hidden !important;
  opacity: 0 !important;
  transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

/* YouTube \u2014 controller can be inside .html5-video-player (main site via
   youtube-handler) or a sibling of it (edge cases). Both selectors needed;
   :has(> ...) handles the sibling case DOM-order-independently. Domain-
   wrapped (marker on the first selector scopes the whole rule) so the
   :has() probe never evaluates off-YouTube (#1501); the duplicate block
   covers youtube-nocookie.com, the privacy-enhanced embed host serving the
   identical player. */
:root[style*='--vsc-domain: "youtube.com"'] .ytp-hide-info-bar > vsc-controller,
:has(> .ytp-hide-info-bar) > vsc-controller {
  position: relative;
  top: 10px;
}

:root[style*='--vsc-domain: "youtube-nocookie.com"'] .ytp-hide-info-bar > vsc-controller,
:has(> .ytp-hide-info-bar) > vsc-controller {
  position: relative;
  top: 10px;
}

/* YouTube Shorts \u2014 the native 48px play/volume row occupies the regular
   top-left controller position. Keep the controller below that row without
   moving it into the Shorts controls on the right. */
:root[style*='--vsc-domain: "youtube.com"'] #shorts-player > vsc-controller {
  position: relative;
  top: 60px;
}

/* YouTube \u2014 shifts below paid promotion overlay when visible.
   Domain-wrapped so preprocessDomainCSS strips it on non-YouTube pages:
   [style*=...] forces global style invalidation on every style mutation,
   causing multi-second hangs on heavy pages (Gemini, etc). (#1501) */
:root[style*='--vsc-domain: "youtube.com"'] .ytp-hide-info-bar:has(.ytp-paid-content-overlay-link:not([style*="display: none"])) > vsc-controller,
:has(> .ytp-hide-info-bar .ytp-paid-content-overlay-link:not([style*="display: none"])) > vsc-controller {
  top: 40px;
}

/* YouTube embedded player \u2014 title-bar clearance across all insertion
   generations: inside the player (classic), promoted to #player (older
   #player-controls sibling layout), and body-anchored (2026 ytm layout,
   where youtube-handler escapes the #movie_player stacking context and the
   never-cleared ytp-autohide coupling). position:relative keeps the
   deterministic 0,0 inner placeholder (VideoController skips rect math for
   relative hosts). Domain-wrapped so the :has()/#player probes never
   evaluate off-YouTube (#1501); previously the bare #player rule applied a
   60px offset on ANY site with a #player container. The duplicate block
   covers youtube-nocookie.com privacy-enhanced embeds. */
:root[style*='--vsc-domain: "youtube.com"'] .html5-video-player:not(.ytp-hide-info-bar) > vsc-controller,
:has(> .html5-video-player:not(.ytp-hide-info-bar)) > vsc-controller,
#player > vsc-controller,
body:has(> #player-controls) > vsc-controller {
  position: relative;
  top: 60px;
}

:root[style*='--vsc-domain: "youtube-nocookie.com"'] .html5-video-player:not(.ytp-hide-info-bar) > vsc-controller,
:has(> .html5-video-player:not(.ytp-hide-info-bar)) > vsc-controller,
#player > vsc-controller,
body:has(> #player-controls) > vsc-controller {
  position: relative;
  top: 60px;
}

/* OpenAI \u2014 prevent black overlay */
.Shared-Video-player > vsc-controller {
  height: 0 !important;
}

/* Amazon Prime Video \u2014 prevent black overlay */
.dv-player-fullscreen vsc-controller {
  height: 0 !important;
}

/* Google Drive YouTube embed \u2014 no info bar, override embedded player offset.
   Extra :root bumps specificity above .html5-video-player:not(...) rule. */
:root:root[style*='--vsc-domain: "youtube.googleapis.com"'] vsc-controller {
  position: relative;
  top: 0px;
}`;

  // src/utils/constants.js
  window.VSC = window.VSC || {};
  window.VSC.Constants = {};
  if (!window.VSC.Constants.DEFAULT_SETTINGS) {
    const regStrip = /^[\r\t\f\v ]+|[\r\t\f\v ]+$/gm;
    const regEndsWithFlags = /\/(?!.*(.).*\1)[gimsuy]*$/;
    window.VSC.Constants.regStrip = regStrip;
    window.VSC.Constants.regEndsWithFlags = regEndsWithFlags;
    window.VSC.Constants.DEFAULT_CONTROLLER_CSS = DEFAULT_CONTROLLER_CSS;
    const DEFAULT_SETTINGS = {
      schemaVersion: 1,
      lastSpeed: 1,
      // default 1x
      enabled: true,
      // default enabled
      rememberSpeed: false,
      // default: false
      exclusiveKeys: false,
      // default: false
      audioBoolean: true,
      // default: true (enable audio controller support)
      startHidden: false,
      // default: false
      controllerOpacity: 0.3,
      // default: 0.3
      controllerButtonSize: 14,
      customCSS: "",
      // user's additional CSS injected alongside the built-in defaults
      keyBindings: PREDEFINED_ACTIONS.map((action) => ({
        action,
        ...DEFAULT_BINDINGS[action],
        predefined: true
      })),
      siteRules: [
        { pattern: "imgur.com", enabled: false, speed: null },
        { pattern: "teams.microsoft.com", enabled: false, speed: null },
        { pattern: "meet.google.com", enabled: false, speed: null }
      ],
      blacklist: `imgur.com
teams.microsoft.com
meet.google.com`.replace(regStrip, ""),
      defaultLogLevel: 4,
      logLevel: 3
    };
    window.VSC.Constants.DEFAULT_SETTINGS = DEFAULT_SETTINGS;
    const formatSpeed = (speed) => speed.toFixed(2);
    window.VSC.Constants.formatSpeed = formatSpeed;
    const LOG_LEVELS = {
      NONE: 1,
      ERROR: 2,
      WARNING: 3,
      INFO: 4,
      DEBUG: 5,
      VERBOSE: 6
    };
    const MESSAGE_TYPES = {
      SET_SPEED: "VSC_SET_SPEED",
      ADJUST_SPEED: "VSC_ADJUST_SPEED",
      RESET_SPEED: "VSC_RESET_SPEED",
      TOGGLE_DISPLAY: "VSC_TOGGLE_DISPLAY",
      SEEK: "VSC_SEEK",
      TEARDOWN: "VSC_TEARDOWN"
    };
    const SPEED_LIMITS = {
      MIN: 0.07,
      // Video min rate per Chromium source
      MAX: 16
      // Maximum playback speed in Chrome per Chromium source
    };
    const CONTROLLER_SIZE_LIMITS = {
      // Video elements: minimum size before rejecting controller entirely
      VIDEO_MIN_WIDTH: 40,
      VIDEO_MIN_HEIGHT: 40,
      // Audio elements: minimum size before starting controller hidden
      AUDIO_MIN_WIDTH: 20,
      AUDIO_MIN_HEIGHT: 20
    };
    const CUSTOM_ACTIONS_NO_VALUES = ["pause", "muted", "mark", "jump", "display"];
    window.VSC.Constants.LOG_LEVELS = LOG_LEVELS;
    window.VSC.Constants.MESSAGE_TYPES = MESSAGE_TYPES;
    window.VSC.Constants.SPEED_LIMITS = SPEED_LIMITS;
    window.VSC.Constants.CONTROLLER_SIZE_LIMITS = CONTROLLER_SIZE_LIMITS;
    window.VSC.Constants.CUSTOM_ACTIONS_NO_VALUES = CUSTOM_ACTIONS_NO_VALUES;
    window.VSC.Constants.PREDEFINED_CODE_MAP = PREDEFINED_CODE_MAP;
    window.VSC.Constants.KEYCODE_TO_CODE = KEYCODE_TO_CODE;
    window.VSC.Constants.displayKeyFromCode = displayKeyFromCode;
    window.VSC.Constants.BLACKLISTED_CODES = BLACKLISTED_CODES;
    window.VSC.Constants.PREDEFINED_ACTIONS = PREDEFINED_ACTIONS;
  }

  // src/utils/logger.js
  window.VSC = window.VSC || {};
  if (!window.VSC.logger) {
    class Logger {
      constructor() {
        this.verbosity = 3;
        this.defaultLevel = 4;
        this.contextStack = [];
        this._buffer = [];
        this._ready = false;
      }
      /**
       * Set logging verbosity level and flush any buffered messages.
       * Called once config.load() has the user's logLevel preference.
       * @param {number} level - Log level from LOG_LEVELS constants
       */
      setVerbosity(level) {
        this.verbosity = level;
        if (!this._ready) {
          this._ready = true;
          const pending = this._buffer;
          this._buffer = [];
          for (const entry of pending) {
            this._emit(entry.message, entry.level);
          }
        }
      }
      /**
       * Set default logging level
       * @param {number} level - Default level from LOG_LEVELS constants
       */
      setDefaultLevel(level) {
        this.defaultLevel = level;
      }
      /**
       * Generate video/controller context string from context stack
       * @returns {string} Context string like "[V1]" or ""
       * @private
       */
      generateContext() {
        if (this.contextStack.length > 0) {
          return `[${this.contextStack[this.contextStack.length - 1]}] `;
        }
        return "";
      }
      /**
       * Format video element identifier using controller ID
       * @param {HTMLMediaElement} video - Video element
       * @returns {string} Formatted ID like "V1" or "A1"
       * @private
       */
      formatVideoId(video) {
        if (!video) {
          return "V?";
        }
        const isAudio = video.tagName === "AUDIO";
        const prefix = isAudio ? "A" : "V";
        if (video.vsc?.controllerId) {
          return `${prefix}${video.vsc.controllerId}`;
        }
        return `${prefix}?`;
      }
      /**
       * Push context onto stack (for nested operations)
       * @param {string|HTMLMediaElement} context - Context string or video element
       */
      pushContext(context) {
        if (typeof context === "string") {
          this.contextStack.push(context);
        } else if (context && (context.tagName === "VIDEO" || context.tagName === "AUDIO")) {
          this.contextStack.push(this.formatVideoId(context));
        }
      }
      /**
       * Pop context from stack
       */
      popContext() {
        this.contextStack.pop();
      }
      /**
       * Execute function with context
       * @param {string|HTMLMediaElement} context - Context string or video element
       * @param {Function} fn - Function to execute
       * @returns {*} Function result
       */
      withContext(context, fn) {
        this.pushContext(context);
        try {
          return fn();
        } finally {
          this.popContext();
        }
      }
      /**
       * Log a message with specified level
       * @param {string} message - Message to log
       * @param {number} level - Log level (optional, uses default if not specified)
       */
      log(message, level) {
        const logLevel = typeof level === "undefined" ? this.defaultLevel : level;
        if (!this._ready) {
          this._buffer.push({ message, level: logLevel });
          return;
        }
        this._emit(message, logLevel);
      }
      /**
       * Emit a log message to console (only called after verbosity is configured)
       * @param {string} message - Message to log
       * @param {number} logLevel - Resolved log level
       * @private
       */
      _emit(message, logLevel) {
        if (this.verbosity < logLevel) {
          return;
        }
        const LOG_LEVELS = window.VSC.Constants.LOG_LEVELS;
        const context = this.generateContext();
        const contextualMessage = `${context}${message}`;
        switch (logLevel) {
          case LOG_LEVELS.ERROR:
            console.log(`ERROR:${contextualMessage}`);
            break;
          case LOG_LEVELS.WARNING:
            console.log(`WARNING:${contextualMessage}`);
            break;
          case LOG_LEVELS.INFO:
            console.log(`INFO:${contextualMessage}`);
            break;
          case LOG_LEVELS.DEBUG:
            console.log(`DEBUG:${contextualMessage}`);
            break;
          case LOG_LEVELS.VERBOSE:
            console.log(`DEBUG (VERBOSE):${contextualMessage}`);
            console.trace();
            break;
          default:
            console.log(contextualMessage);
        }
      }
      /**
       * Log error message
       * @param {string} message - Error message
       */
      error(message) {
        this.log(message, window.VSC.Constants.LOG_LEVELS.ERROR);
      }
      /**
       * Log warning message
       * @param {string} message - Warning message
       */
      warn(message) {
        this.log(message, window.VSC.Constants.LOG_LEVELS.WARNING);
      }
      /**
       * Log info message
       * @param {string} message - Info message
       */
      info(message) {
        this.log(message, window.VSC.Constants.LOG_LEVELS.INFO);
      }
      /**
       * Log debug message
       * @param {string} message - Debug message
       */
      debug(message) {
        this.log(message, window.VSC.Constants.LOG_LEVELS.DEBUG);
      }
      /**
       * Log verbose debug message with stack trace
       * @param {string} message - Verbose debug message
       */
      verbose(message) {
        this.log(message, window.VSC.Constants.LOG_LEVELS.VERBOSE);
      }
    }
    window.VSC.logger = new Logger();
  }

  // src/core/storage-manager.js
  window.VSC = window.VSC || {};
  if (!window.VSC.StorageManager) {
    const docEl = document.documentElement;
    const hasChrome = typeof chrome !== "undefined" && chrome.storage && chrome.storage.sync;
    class StorageManager {
      static errorCallback = null;
      /**
       * Register error callback for monitoring storage failures
       * @param {Function} callback - Callback function for errors
       */
      static onError(callback) {
        this.errorCallback = callback;
      }
      /**
       * @param {Object} defaults - Default values
       * @returns {Promise<Object>} Storage data
       */
      static async get(defaults = {}) {
        if (hasChrome) {
          return new Promise((resolve) => {
            chrome.storage.sync.get(defaults, (storage) => {
              window.VSC.logger?.debug?.("StorageManager: settings from chrome.storage");
              resolve(storage);
            });
          });
        }
        return new Promise((resolve) => {
          const onReady = (e) => {
            docEl.removeEventListener("VSC_SETTINGS_READY", onReady);
            clearTimeout(timeout);
            const detail = e.detail;
            if (!detail) {
              window.VSC.logger?.error?.("StorageManager: bridge response is null (clone failed?)");
              resolve(null);
              return;
            }
            if (detail.abort) {
              window.VSC.logger?.debug?.("StorageManager: site disabled by bridge");
              resolve(null);
              return;
            }
            if (!detail.settings || typeof detail.settings !== "object" || Array.isArray(detail.settings)) {
              window.VSC.logger?.error?.("StorageManager: invalid settings response from bridge");
              resolve(null);
              return;
            }
            window.VSC.logger?.debug?.("StorageManager: settings from bridge");
            resolve({ ...defaults, ...detail.settings });
          };
          const timeout = setTimeout(() => {
            docEl.removeEventListener("VSC_SETTINGS_READY", onReady);
            window.VSC.logger?.warn?.("StorageManager: settings timeout, aborting initialization");
            resolve(null);
          }, 2e3);
          docEl.addEventListener("VSC_SETTINGS_READY", onReady);
          docEl.dispatchEvent(new CustomEvent("VSC_REQUEST_SETTINGS"));
        });
      }
      /**
       * @param {Object} data - Data to store
       * @returns {Promise<void>}
       */
      static async set(data) {
        if (hasChrome) {
          return new Promise((resolve, reject) => {
            chrome.storage.sync.set(data, () => {
              if (chrome.runtime.lastError) {
                const error = new Error(`Storage failed: ${chrome.runtime.lastError.message}`);
                window.VSC.logger?.error?.(
                  `Chrome storage save failed: ${chrome.runtime.lastError.message}`
                );
                if (this.errorCallback) {
                  this.errorCallback(error, data);
                }
                reject(error);
                return;
              }
              window.VSC.logger?.debug?.("StorageManager: saved to chrome.storage");
              resolve();
            });
          });
        }
        const keys = Object.keys(data);
        if (keys.length === 1 && keys[0] === "lastSpeed") {
          const speed = data.lastSpeed;
          if (typeof speed === "number" && Number.isFinite(speed)) {
            docEl.dispatchEvent(
              new CustomEvent("VSC_WRITE_STORAGE", { detail: { lastSpeed: speed } })
            );
          } else {
            window.VSC.logger?.warn?.("StorageManager.set: invalid lastSpeed value");
          }
        } else {
          window.VSC.logger?.warn?.(
            `StorageManager.set: only lastSpeed bridgeable from MAIN. Keys: ${keys.join(", ")}`
          );
        }
        window.VSC_settings = { ...window.VSC_settings, ...data };
        return Promise.resolve();
      }
      /**
       * Remove keys from storage.
       * @param {Array<string>} keys - Keys to remove
       * @returns {Promise<void>}
       */
      static async remove(keys) {
        if (hasChrome) {
          return new Promise((resolve, reject) => {
            chrome.storage.sync.remove(keys, () => {
              if (chrome.runtime.lastError) {
                const error = new Error(`Storage remove failed: ${chrome.runtime.lastError.message}`);
                window.VSC.logger?.error?.(
                  `Chrome storage remove failed: ${chrome.runtime.lastError.message}`
                );
                if (this.errorCallback) {
                  this.errorCallback(error, { removedKeys: keys });
                }
                reject(error);
                return;
              }
              resolve();
            });
          });
        }
        if (window.VSC_settings) {
          keys.forEach((key) => delete window.VSC_settings[key]);
        }
        return Promise.resolve();
      }
      /**
       * Clear all storage.
       * @returns {Promise<void>}
       */
      static async clear() {
        if (hasChrome) {
          return new Promise((resolve, reject) => {
            chrome.storage.sync.clear(() => {
              if (chrome.runtime.lastError) {
                const error = new Error(`Storage clear failed: ${chrome.runtime.lastError.message}`);
                window.VSC.logger?.error?.(
                  `Chrome storage clear failed: ${chrome.runtime.lastError.message}`
                );
                if (this.errorCallback) {
                  this.errorCallback(error, { operation: "clear" });
                }
                reject(error);
                return;
              }
              resolve();
            });
          });
        }
        window.VSC_settings = {};
        return Promise.resolve();
      }
      /**
       * @param {Function} callback - Callback with changes in chrome.storage.onChanged format
       */
      static onChanged(callback) {
        if (hasChrome) {
          chrome.storage.onChanged.addListener((changes, areaName) => {
            if (areaName === "sync") {
              callback(changes);
            }
          });
        } else {
          docEl.addEventListener("VSC_STORAGE_CHANGED", (e) => {
            const changes = e.detail;
            for (const [key, change] of Object.entries(changes)) {
              if (change.newValue !== void 0) {
                window.VSC_settings = window.VSC_settings || {};
                window.VSC_settings[key] = change.newValue;
              }
            }
            callback(changes);
          });
        }
      }
    }
    window.VSC.StorageManager = StorageManager;
  }

  // src/core/settings.js
  window.VSC = window.VSC || {};
  if (!window.VSC.VideoSpeedConfig) {
    class VideoSpeedConfig {
      constructor() {
        this.settings = { ...window.VSC.Constants.DEFAULT_SETTINGS };
        this.pendingSave = null;
        this.saveTimer = null;
        this.SAVE_DELAY = 1e3;
        this._loaded = false;
        this._setupStorageListener();
      }
      /**
       * Listen for storage changes from other contexts and update in-memory state.
       * @private
       */
      _setupStorageListener() {
        try {
          window.VSC.StorageManager.onChanged((changes) => {
            for (const [key, change] of Object.entries(changes)) {
              if (!(key in this.settings) || change.newValue === void 0) {
                continue;
              }
              if (key === "lastSpeed") {
                continue;
              }
              this.settings[key] = change.newValue;
              window.VSC.logger.debug(`Settings updated from storage change: ${key}`);
            }
          });
        } catch (e) {
          window.VSC.logger.debug(`Could not set up storage change listener: ${e.message}`);
        }
      }
      /**
       * Load settings from Chrome storage or pre-injected settings
       * @returns {Promise<Object>} Loaded settings
       */
      async load() {
        try {
          const storage = await window.VSC.StorageManager.get({
            ...window.VSC.Constants.DEFAULT_SETTINGS,
            controllerCSS: null
          });
          if (storage === null) {
            this.settings._abort = true;
            return;
          }
          this._loaded = true;
          this.settings.keyBindings = (storage.keyBindings || window.VSC.Constants.DEFAULT_SETTINGS.keyBindings).map(VideoSpeedConfig.normalizeKeyBinding);
          if (!storage.keyBindings || storage.keyBindings.length === 0) {
            window.VSC.logger.info("First initialization - setting up default key bindings");
            this.settings.keyBindings = [...window.VSC.Constants.DEFAULT_SETTINGS.keyBindings];
            await this.save({ keyBindings: this.settings.keyBindings });
          }
          if (storage.blacklist !== null && storage.blacklist !== void 0 && !storage.siteRules) {
            const regStrip = /^[\r\t\f\v ]+|[\r\t\f\v ]+$/gm;
            storage.siteRules = storage.blacklist.split("\n").map((l) => l.replace(regStrip, "")).filter(Boolean).map((pattern) => ({ pattern, enabled: false, speed: null }));
            await this.save({ siteRules: storage.siteRules });
            window.VSC.logger.info("Migrated blacklist to siteRules");
          } else if (storage.blacklist !== null && storage.blacklist !== void 0 && storage.siteRules) {
          }
          this.settings.siteRules = storage.siteRules || window.VSC.Constants.DEFAULT_SETTINGS.siteRules;
          this.settings.siteDefaultSpeed = null;
          if (window.VSC.matchSiteRule) {
            const matched = window.VSC.matchSiteRule(this.settings.siteRules, window.location.href);
            if (matched && matched.speed !== null && matched.speed !== void 0) {
              this.settings.siteDefaultSpeed = matched.speed;
              window.VSC.logger.info(
                `Site rule matched: pattern="${matched.pattern}", speed=${matched.speed}`
              );
            }
          }
          this.settings.rememberSpeed = Boolean(storage.rememberSpeed);
          if (this.settings.siteDefaultSpeed) {
            this.settings.lastSpeed = this.settings.siteDefaultSpeed;
          } else if (this.settings.rememberSpeed) {
            this.settings.lastSpeed = Number(storage.lastSpeed) || null;
          } else {
            this.settings.lastSpeed = null;
          }
          this.settings.exclusiveKeys = Boolean(storage.exclusiveKeys);
          this.settings.audioBoolean = Boolean(storage.audioBoolean);
          this.settings.startHidden = Boolean(storage.startHidden);
          this.settings.controllerOpacity = Number(storage.controllerOpacity);
          this.settings.controllerButtonSize = Number(storage.controllerButtonSize);
          if (storage.controllerCSS !== null) {
            window.VSC.StorageManager.remove(["controllerCSS"]);
          }
          this.settings.customCSS = storage.customCSS ?? "";
          this.settings.logLevel = Number(
            storage.logLevel || window.VSC.Constants.DEFAULT_SETTINGS.logLevel
          );
          window.VSC.logger.setVerbosity(this.settings.logLevel);
          window.VSC.logger.info("Settings loaded successfully");
          return this.settings;
        } catch (error) {
          window.VSC.logger.error(`Failed to load settings: ${error.message}`);
          return window.VSC.Constants.DEFAULT_SETTINGS;
        }
      }
      /**
       * Save settings to Chrome storage
       *
       * IMPORTANT: Only the keys present in newSettings are written to storage.
       * This avoids the "stale full-blob write" race condition where two contexts
       * (e.g. options page + content script) each hold their own in-memory copy
       * and overwrite each other's changes.  chrome.storage.sync.set({key: val})
       * atomically merges — it updates only the supplied keys and leaves the
       * rest untouched.
       *
       * In-memory settings are updated immediately regardless of persistence
       * outcome — the current session should always reflect the user's intent.
       * Returns false only when the storage write observably fails (options page
       * context with direct chrome.storage access). In page context, the
       * postMessage bridge is fire-and-forget so failures are invisible here.
       *
       * @param {Object} newSettings - Settings to save (only these keys are written)
       * @returns {Promise<boolean>} true if persisted (or debounced), false on storage failure
       */
      /**
       * Commit a speed as the SESSION authority (in-memory lastSpeed) and
       * persist it when the user asked us to remember speed. Executes the
       * arbiter's PERSIST effect (cells 2/5/7/12). Persistence purity (I2)
       * holds by construction: only user-attributed choices reach this —
       * lifecycle, fight and observe paths never call it.
       * @param {number} speed
       */
      persistAuthority(speed) {
        this.settings.lastSpeed = speed;
        if (this.settings.rememberSpeed) {
          this.save({ lastSpeed: speed });
        }
      }
      async save(newSettings = {}) {
        const keys = Object.keys(newSettings);
        if (keys.length === 0) {
          return true;
        }
        if (!this._loaded) {
          window.VSC.logger.error(
            "save() called before load() \u2014 refusing to overwrite user data with defaults"
          );
          return false;
        }
        this.settings = { ...this.settings, ...newSettings };
        if (keys.length === 1 && keys[0] === "lastSpeed") {
          this.pendingSave = newSettings.lastSpeed;
          if (this.saveTimer) {
            clearTimeout(this.saveTimer);
          }
          this.saveTimer = setTimeout(async () => {
            const speedToSave = this.pendingSave;
            this.pendingSave = null;
            this.saveTimer = null;
            try {
              await window.VSC.StorageManager.set({ lastSpeed: speedToSave });
              window.VSC.logger.info("Debounced speed setting saved successfully");
            } catch (error) {
              window.VSC.logger.error(`Failed to persist speed: ${error.message}`);
            }
          }, this.SAVE_DELAY);
          return true;
        }
        try {
          await window.VSC.StorageManager.set(newSettings);
        } catch (error) {
          window.VSC.logger.error(`Failed to save settings: ${error.message}`);
          return false;
        }
        if (newSettings.logLevel !== void 0) {
          window.VSC.logger.setVerbosity(this.settings.logLevel);
        }
        window.VSC.logger.info("Settings saved successfully");
        return true;
      }
      /**
       * Get a specific key binding
       * @param {string} action - Action name
       * @param {string} property - Property to get (default: 'value')
       * @returns {*} Key binding property value
       */
      getKeyBinding(action, property = "value") {
        try {
          const binding = this.settings.keyBindings.find((item) => item.action === action);
          return binding ? binding[property] : false;
        } catch (e) {
          window.VSC.logger.error(`Failed to get key binding for ${action}: ${e.message}`);
          return false;
        }
      }
      /**
       * Set a key binding value with validation
       * @param {string} action - Action name
       * @param {*} value - Value to set
       */
      setKeyBinding(action, value) {
        try {
          const binding = this.settings.keyBindings.find((item) => item.action === action);
          if (!binding) {
            window.VSC.logger.warn(`No key binding found for action: ${action}`);
            return;
          }
          if (["reset", "fast", "slower", "faster"].includes(action)) {
            if (typeof value !== "number" || isNaN(value)) {
              window.VSC.logger.warn(`Invalid numeric value for ${action}: ${value}`);
              return;
            }
          }
          binding.value = value;
          window.VSC.logger.debug(`Updated key binding ${action} to ${value}`);
        } catch (e) {
          window.VSC.logger.error(`Failed to set key binding for ${action}: ${e.message}`);
        }
      }
      /**
       * Normalize a key binding's modifiers to strict booleans.
       * Strips the modifiers object entirely when all values are falsy.
       * Defensive against corrupt storage data (e.g., modifiers: { shift: 1 }).
       * @param {Object} binding
       * @returns {Object} Sanitized binding (shallow copy)
       * @private
       */
      static normalizeKeyBinding(binding) {
        if (!binding || !binding.modifiers) {
          return binding;
        }
        const m = binding.modifiers;
        const normalized = {
          shift: Boolean(m.shift),
          ctrl: Boolean(m.ctrl),
          alt: Boolean(m.alt),
          meta: Boolean(m.meta)
        };
        const result = { ...binding };
        if (normalized.shift || normalized.ctrl || normalized.alt || normalized.meta) {
          result.modifiers = normalized;
        } else {
          delete result.modifiers;
        }
        return result;
      }
    }
    window.VSC.videoSpeedConfig = new VideoSpeedConfig();
    window.VSC.VideoSpeedConfig = VideoSpeedConfig;
  }

  // src/ui/options/row-renderer.js
  function createRow(container, columns, data = {}, opts = {}) {
    const row = document.createElement("div");
    row.className = `row${opts.className ? ` ${opts.className}` : ""}`;
    if (opts.id) {
      row.id = opts.id;
    }
    for (const col of columns) {
      let el;
      if (col.type === "select") {
        el = document.createElement("select");
        el.className = col.className;
        for (const [value, label] of col.options) {
          const opt = document.createElement("option");
          opt.value = value;
          opt.textContent = label;
          el.appendChild(opt);
        }
        if (data[col.key] !== null && data[col.key] !== void 0) {
          el.value = data[col.key];
        }
      } else if (col.type === "checkbox") {
        el = document.createElement("input");
        el.type = "checkbox";
        el.className = col.className;
        el.checked = data[col.key] ?? col.default ?? false;
      } else {
        el = document.createElement("input");
        el.type = col.inputType || "text";
        el.className = col.className;
        if (col.placeholder) {
          el.placeholder = col.placeholder;
        }
        const val = data[col.key] ?? col.default;
        if (val !== null && val !== void 0) {
          el.value = val;
        }
      }
      row.appendChild(el);
    }
    if (opts.removable) {
      const btn = document.createElement("button");
      btn.className = "removeParent";
      btn.textContent = "\xD7";
      row.appendChild(btn);
    }
    if (opts.before) {
      container.insertBefore(row, opts.before);
    } else {
      container.appendChild(row);
    }
    return row;
  }

  // src/ui/options/options.js
  window.VSC = window.VSC || {};
  var keyBindings = [];
  function highlightCSS(text) {
    const escaped = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    let result = "";
    let pos = 0;
    while (pos < escaped.length) {
      const commentStart = escaped.indexOf("/*", pos);
      if (commentStart === pos) {
        const commentEnd = escaped.indexOf("*/", pos + 2);
        const end = commentEnd === -1 ? escaped.length : commentEnd + 2;
        result += `<span class="css-comment">${escaped.slice(pos, end)}</span>`;
        pos = end;
        continue;
      }
      const nextComment = commentStart === -1 ? escaped.length : commentStart;
      const chunk = escaped.slice(pos, nextComment);
      result += chunk.replace(/([{}])/g, '<span class="css-brace">$1</span>').replace(/([\w-]+)\s*(?=:)/g, '<span class="css-property">$1</span>').replace(/:\s*([^;{}]+)(;)/g, ': <span class="css-value">$1</span>$2').replace(
        /([^{}><\n][^{}<>]*?)(\s*<span class="css-brace">\{)/g,
        '<span class="css-selector">$1</span>$2'
      );
      pos = nextComment;
    }
    return result;
  }
  function updateCSSHighlight() {
    const textarea = document.getElementById("controllerCSS");
    const highlight = document.getElementById("cssHighlight");
    if (textarea && highlight) {
      highlight.innerHTML = `${highlightCSS(textarea.value)}
`;
    }
  }
  function syncCSSScroll() {
    const textarea = document.getElementById("controllerCSS");
    const highlight = document.getElementById("cssHighlight");
    if (textarea && highlight) {
      highlight.scrollTop = textarea.scrollTop;
      highlight.scrollLeft = textarea.scrollLeft;
    }
  }
  var ACTION_OPTIONS = [
    ["slower", "\u51CF\u6162\u901F\u5EA6 (Slower)"],
    ["faster", "\u589E\u52A0\u901F\u5EA6 (Faster)"],
    ["rewind", "\u5FEB\u9000 (Rewind)"],
    ["advance", "\u5FEB\u8FDB (Advance)"],
    ["reset", "\u6062\u590D\u539F\u901F 1.0x (Reset)"],
    ["fast", "\u5207\u6362\u9884\u8BBE\u901F\u5EA6 (Preferred speed)"],
    ["muted", "\u9759\u97F3\u5F00\u5173 (Mute)"],
    ["softer", "\u964D\u4F4E\u97F3\u91CF (Decrease volume)"],
    ["louder", "\u589E\u52A0\u97F3\u91CF (Increase volume)"],
    ["pause", "\u6682\u505C/\u64AD\u653E (Pause)"],
    ["mark", "\u8BB0\u5F55\u65F6\u95F4\u70B9 (Set marker)"],
    ["jump", "\u8DF3\u8F6C\u5230\u65F6\u95F4\u70B9 (Jump to marker)"],
    ["display", "\u663E\u9690\u6D6E\u5C42\u63A7\u5236\u5668 (Toggle controller)"]
  ];
  var SHORTCUT_COLUMNS = [
    { key: "action", type: "select", className: "customDo", options: ACTION_OPTIONS },
    { key: "keyInput", type: "text", className: "customKey", placeholder: "press a key" },
    { key: "value", type: "text", className: "customValue", placeholder: "value (0.10)" }
  ];
  var SITE_RULE_COLUMNS = [
    { key: "pattern", type: "text", className: "rulePattern", placeholder: "youtube.com or /regex/" },
    { key: "disabled", type: "checkbox", className: "ruleDisabled", default: false },
    { key: "speed", type: "text", className: "ruleSpeed", placeholder: "(global)" }
  ];
  function findDroppedRules(css, parsedSheet) {
    const blocks = [];
    let depth = 0;
    let start = 0;
    const stripped = css.replace(/\/\*[\s\S]*?\*\//g, (m) => " ".repeat(m.length));
    for (let i = 0; i < stripped.length; i++) {
      if (stripped[i] === "{") {
        depth++;
      } else if (stripped[i] === "}") {
        depth--;
        if (depth === 0) {
          blocks.push(css.substring(start, i + 1).trim());
          start = i + 1;
        }
      }
    }
    if (depth !== 0) {
      const remainder = css.substring(start).trim();
      if (remainder) {
        const selector = remainder.split("{")[0].trim();
        return [selector || remainder.slice(0, 40)];
      }
    }
    if (blocks.length <= parsedSheet.cssRules.length) {
      return [];
    }
    const dropped = [];
    const probe = new CSSStyleSheet();
    for (const block of blocks) {
      try {
        probe.replaceSync(block);
        if (probe.cssRules.length === 0) {
          const selector = block.split("{")[0].trim();
          dropped.push(selector || block.slice(0, 40));
        }
      } catch {
        const selector = block.split("{")[0].trim();
        dropped.push(selector || block.slice(0, 40));
      }
    }
    return dropped;
  }
  function validateControllerCSS(css) {
    const textarea = document.getElementById("controllerCSS");
    const msg = document.getElementById("cssValidation");
    textarea.classList.remove("css-error", "css-warn");
    msg.classList.remove("error", "warn");
    msg.textContent = "";
    if (!css.trim()) {
      return true;
    }
    try {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(css);
      const count = sheet.cssRules.length;
      if (count === 0) {
        textarea.classList.add("css-warn");
        msg.classList.add("warn");
        msg.textContent = "No CSS rules parsed \u2014 check for syntax errors.";
        return true;
      }
      const dropped = findDroppedRules(css, sheet);
      if (dropped.length > 0) {
        textarea.classList.add("css-warn");
        msg.classList.add("warn");
        msg.textContent = `${count} rule${count !== 1 ? "s" : ""} parsed, ${dropped.length} dropped: ${dropped.map((r) => `"${r.slice(0, 40)}${r.length > 40 ? "..." : ""}"`).join(", ")}`;
        return true;
      }
      return true;
    } catch (e) {
      textarea.classList.add("css-error");
      msg.classList.add("error");
      msg.textContent = `Syntax error: ${e.message.replace(/^Failed to execute.*: /, "")}`;
      return false;
    }
  }
  var keyCodeAliases = {
    0: "null",
    null: "null",
    undefined: "null",
    32: "Space",
    37: "Left",
    38: "Up",
    39: "Right",
    40: "Down",
    96: "Num 0",
    97: "Num 1",
    98: "Num 2",
    99: "Num 3",
    100: "Num 4",
    101: "Num 5",
    102: "Num 6",
    103: "Num 7",
    104: "Num 8",
    105: "Num 9",
    106: "Num *",
    107: "Num +",
    109: "Num -",
    110: "Num .",
    111: "Num /",
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
    186: ";",
    188: "<",
    189: "-",
    187: "+",
    190: ">",
    191: "/",
    192: "~",
    219: "[",
    220: "\\",
    221: "]",
    222: "'"
  };
  var layoutMap = null;
  (async function initLayoutMap() {
    try {
      if (navigator.keyboard && navigator.keyboard.getLayoutMap) {
        layoutMap = await navigator.keyboard.getLayoutMap();
        navigator.keyboard.addEventListener("layoutchange", async () => {
          layoutMap = await navigator.keyboard.getLayoutMap();
        });
      }
    } catch {
    }
  })();
  function formatShortcutDisplay(displayKey, modifiers) {
    if (!displayKey) {
      return "null";
    }
    const parts = [];
    if (modifiers) {
      if (modifiers.ctrl) {
        parts.push("Ctrl");
      }
      if (modifiers.alt) {
        parts.push("Alt");
      }
      if (modifiers.shift) {
        parts.push("Shift");
      }
      if (modifiers.meta) {
        parts.push("Meta");
      }
    }
    const label = displayKey.length === 1 ? displayKey.toUpperCase() : displayKey;
    parts.push(label);
    return parts.join(" + ");
  }
  function resolveDisplayLabel(binding) {
    if (layoutMap && binding.code) {
      const mapped = layoutMap.get(binding.code);
      if (mapped) {
        return formatShortcutDisplay(mapped, binding.modifiers);
      }
    }
    if (binding.displayKey) {
      return formatShortcutDisplay(binding.displayKey, binding.modifiers);
    }
    if (binding.code) {
      const derived = window.VSC.Constants.displayKeyFromCode(binding.code);
      return formatShortcutDisplay(derived, binding.modifiers);
    }
    const kc = binding.keyCode ?? binding.key;
    return keyCodeAliases[kc] || (kc >= 48 && kc <= 90 ? String.fromCharCode(kc) : `Key ${kc}`);
  }
  function autoSizeKeyInput(input) {
    const minWidth = 75;
    if (!input.value || input.value.length <= 3) {
      input.style.width = `${minWidth}px`;
      return;
    }
    const span = document.createElement("span");
    span.style.visibility = "hidden";
    span.style.position = "absolute";
    span.style.font = getComputedStyle(input).font;
    span.style.whiteSpace = "nowrap";
    span.textContent = input.value;
    document.body.appendChild(span);
    const textWidth = span.offsetWidth;
    document.body.removeChild(span);
    input.style.width = `${Math.max(minWidth, textWidth + 26)}px`;
  }
  function recordKeyPress(e) {
    if (e.code === "Backspace") {
      e.target.value = "";
      e.target.code = null;
      e.target.keyCode = null;
      e.target.displayKey = null;
      e.target.modifiers = void 0;
      e.preventDefault();
      e.stopPropagation();
      return;
    } else if (e.code === "Escape") {
      e.target.value = "null";
      e.target.code = null;
      e.target.keyCode = null;
      e.target.displayKey = null;
      e.target.modifiers = void 0;
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (window.VSC.Constants.BLACKLISTED_CODES.has(e.code)) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    e.target.code = e.code;
    e.target.keyCode = e.keyCode;
    const isNumpad = e.code.startsWith("Numpad");
    e.target.displayKey = isNumpad ? window.VSC.Constants.displayKeyFromCode(e.code) || e.key : layoutMap?.get(e.code) || window.VSC.Constants.displayKeyFromCode(e.code) || e.key;
    const hasMod = e.ctrlKey || e.altKey || e.shiftKey || e.metaKey;
    e.target.modifiers = hasMod ? {
      ctrl: e.ctrlKey,
      alt: e.altKey,
      shift: e.shiftKey,
      meta: e.metaKey
    } : void 0;
    e.target.value = formatShortcutDisplay(e.target.displayKey, e.target.modifiers);
    autoSizeKeyInput(e.target);
    clearWarning(e.target);
    if (e.ctrlKey && e.altKey) {
      showWarning(
        e.target,
        "This combination may conflict with AltGr input on some keyboard layouts."
      );
    } else if (e.metaKey) {
      showWarning(e.target, "Some Cmd/Meta combinations are intercepted by the OS and may not work.");
    }
    e.preventDefault();
    e.stopPropagation();
  }
  function showWarning(input, message) {
    clearWarning(input);
    const warn = document.createElement("span");
    warn.className = "shortcut-warning";
    warn.textContent = message;
    warn.style.cssText = "display:block;color:#c57600;font-size:11px;margin-top:2px;";
    input.parentNode.insertBefore(warn, input.nextSibling);
  }
  function clearWarning(input) {
    const existing = input.parentNode.querySelector(".shortcut-warning");
    if (existing) {
      existing.remove();
    }
  }
  function inputFilterNumbersOnly(e) {
    if ((e.inputType === "insertText" || e.inputType === "insertFromPaste") && e.data) {
      if (!/^\d+(\.\d*)?$/.test(e.target.value + e.data)) {
        e.preventDefault();
      }
    }
  }
  function inputFocus(e) {
    e.target.value = "";
  }
  function inputBlur(e) {
    if (e.target.code) {
      e.target.value = formatShortcutDisplay(
        e.target.displayKey || window.VSC.Constants.displayKeyFromCode(e.target.code),
        e.target.modifiers
      );
    } else if (e.target.code === null) {
      e.target.value = "null";
    } else {
      const kc = e.target.keyCode;
      e.target.value = keyCodeAliases[kc] || (kc >= 48 && kc <= 90 ? String.fromCharCode(kc) : `Key ${kc}`);
    }
    autoSizeKeyInput(e.target);
  }
  function setShortcutInput(input, binding) {
    input.code = binding.code;
    input.keyCode = binding.keyCode ?? binding.key;
    input.displayKey = binding.displayKey;
    input.modifiers = binding.modifiers;
    input.value = resolveDisplayLabel(binding);
    autoSizeKeyInput(input);
  }
  function add_shortcut(data = {}) {
    const container = document.getElementById("shortcuts-container");
    const row = createRow(container, SHORTCUT_COLUMNS, data, {
      className: "customs",
      removable: true
    });
    const action = data.action || row.querySelector(".customDo").value;
    if (window.VSC.Constants.CUSTOM_ACTIONS_NO_VALUES.includes(action)) {
      row.querySelector(".customValue").style.display = "none";
    }
    return row;
  }
  function add_predefined_shortcut(data) {
    const container = document.getElementById("shortcuts-container");
    const row = createRow(
      container,
      SHORTCUT_COLUMNS,
      { action: data.action },
      {
        className: "customs",
        id: data.action,
        removable: false
      }
    );
    const select = row.querySelector(".customDo");
    select.disabled = true;
    setShortcutInput(row.querySelector(".customKey"), data);
    const valueInput = row.querySelector(".customValue");
    valueInput.value = data.value;
    if (window.VSC.Constants.CUSTOM_ACTIONS_NO_VALUES.includes(data.action)) {
      valueInput.style.display = "none";
    }
    return row;
  }
  function createKeyBindings(item) {
    const action = item.querySelector(".customDo").value;
    const input = item.querySelector(".customKey");
    const value = Number(item.querySelector(".customValue").value);
    const predefined = !!item.id;
    const binding = {
      action,
      code: input.code,
      // PRIMARY — event.code string
      key: input.keyCode,
      // OLD field name — integer, downgrade compat
      keyCode: input.keyCode,
      // NEW field name — canonical legacy integer
      displayKey: input.displayKey,
      // display-friendly from event.key
      value,
      predefined
    };
    if (input.modifiers) {
      binding.modifiers = input.modifiers;
    }
    keyBindings.push(binding);
  }
  function add_site_rule(data = { enabled: true }) {
    const container = document.getElementById("site-rules-container");
    const speedDisplay = data.speed !== null && data.speed !== void 0 ? data.speed : void 0;
    return createRow(
      container,
      SITE_RULE_COLUMNS,
      { pattern: data.pattern, disabled: !data.enabled, speed: speedDisplay },
      { className: "site-rule", removable: true }
    );
  }
  function parseSpeed(s) {
    if (typeof s !== "string") {
      return s ?? null;
    }
    const trimmed = s.trim();
    if (trimmed === "") {
      return null;
    }
    const v = parseFloat(trimmed);
    return isNaN(v) ? null : v;
  }
  function collectSiteRules() {
    const container = document.getElementById("site-rules-container");
    return Array.from(container.querySelectorAll(".row.site-rule")).map((row) => ({
      pattern: row.querySelector(".rulePattern").value.trim(),
      enabled: !row.querySelector(".ruleDisabled").checked,
      speed: parseSpeed(row.querySelector(".ruleSpeed").value)
    })).filter((r) => r.pattern);
  }
  function validate() {
    let valid = true;
    const status2 = document.getElementById("status");
    if (window.validationTimeout) {
      clearTimeout(window.validationTimeout);
    }
    const regEndsWithFlags = window.VSC.Constants.regEndsWithFlags;
    const rules = collectSiteRules();
    for (const rule of rules) {
      if (rule.pattern.startsWith("/")) {
        try {
          const parts = rule.pattern.split("/");
          if (parts.length < 3) {
            throw "invalid regex";
          }
          const hasFlags = regEndsWithFlags.test(rule.pattern);
          const flags = hasFlags ? parts.pop() : "";
          const regex = parts.slice(1, hasFlags ? void 0 : -1).join("/");
          if (!regex) {
            throw "empty regex";
          }
          new RegExp(regex, flags);
        } catch {
          status2.textContent = `Error: Invalid site rule regex: "${rule.pattern}". Unable to save.`;
          status2.classList.add("show", "error");
          valid = false;
          window.validationTimeout = setTimeout(() => {
            status2.textContent = "";
            status2.classList.remove("show", "error");
          }, 5e3);
          return valid;
        }
      }
      if (rule.speed !== null && rule.speed !== void 0) {
        if (rule.speed < window.VSC.Constants.SPEED_LIMITS.MIN || rule.speed > window.VSC.Constants.SPEED_LIMITS.MAX) {
          status2.textContent = `Error: Speed for "${rule.pattern}" must be between ${window.VSC.Constants.SPEED_LIMITS.MIN} and ${window.VSC.Constants.SPEED_LIMITS.MAX}.`;
          status2.classList.add("show", "error");
          valid = false;
          window.validationTimeout = setTimeout(() => {
            status2.textContent = "";
            status2.classList.remove("show", "error");
          }, 5e3);
          return valid;
        }
      }
    }
    return valid;
  }
  async function save_options() {
    if (validate() === false) {
      return;
    }
    const status2 = document.getElementById("status");
    status2.textContent = "";
    status2.classList.remove("show", "success", "error");
    try {
      keyBindings = [];
      Array.from(document.querySelectorAll(".customs")).forEach((item) => createKeyBindings(item));
      const currentSettings = window.VSC.videoSpeedConfig?.settings || {};
      const rememberSpeed = document.getElementById("rememberSpeed")?.checked ?? currentSettings.rememberSpeed ?? false;
      const exclusiveKeys = document.getElementById("exclusiveKeys")?.checked ?? currentSettings.exclusiveKeys ?? false;
      const audioBoolean = document.getElementById("audioBoolean")?.checked ?? currentSettings.audioBoolean ?? true;
      const startHidden = document.getElementById("startHidden")?.checked ?? currentSettings.startHidden ?? false;
      const opacityEl = document.getElementById("controllerOpacity");
      const controllerOpacity = opacityEl ? Number(opacityEl.value) : currentSettings.controllerOpacity ?? 0.3;
      const sizeEl = document.getElementById("controllerButtonSize");
      const controllerButtonSize = sizeEl ? Number(sizeEl.value) : currentSettings.controllerButtonSize ?? 14;
      const logEl = document.getElementById("logLevel");
      const logLevel = logEl ? parseInt(logEl.value) : currentSettings.logLevel ?? 3;
      const siteRulesEl = document.getElementById("site-rules-container");
      const siteRules = siteRulesEl ? collectSiteRules() : currentSettings.siteRules || [];
      const customCSSEl = document.getElementById("controllerCSS");
      const customCSS = customCSSEl ? customCSSEl.value : currentSettings.customCSS || "";
      if (customCSSEl && !validateControllerCSS(customCSS)) {
        status2.textContent = "Error: Controller CSS has syntax errors. Fix them before saving.";
        status2.classList.add("show", "error");
        setTimeout(() => {
          status2.textContent = "";
          status2.classList.remove("show", "error");
        }, 5e3);
        return;
      }
      const cssByteSize = new Blob([customCSS]).size;
      if (customCSSEl && cssByteSize > 8192) {
        status2.textContent = `Error: Controller CSS exceeds 8KB storage limit (${Math.round(cssByteSize / 1024)}KB). Reduce CSS size.`;
        status2.classList.add("show", "error");
        setTimeout(() => {
          status2.textContent = "";
          status2.classList.remove("show", "error");
        }, 5e3);
        return;
      }
      if (!window.VSC.videoSpeedConfig) {
        window.VSC.videoSpeedConfig = new window.VSC.VideoSpeedConfig();
      }
      const settingsToSave = {
        rememberSpeed,
        exclusiveKeys,
        audioBoolean,
        startHidden,
        controllerOpacity,
        controllerButtonSize,
        logLevel,
        keyBindings,
        siteRules
      };
      settingsToSave.customCSS = customCSS;
      const ok = await window.VSC.videoSpeedConfig.save(settingsToSave);
      if (!ok) {
        status2.textContent = "Error: failed to save options to storage";
        status2.classList.add("show", "error");
        setTimeout(() => {
          status2.textContent = "";
          status2.classList.remove("show", "error");
        }, 3e3);
      }
    } catch (error) {
      console.error("Failed to save options:", error);
      status2.textContent = `Error saving options: ${error.message}`;
      status2.classList.add("show", "error");
      setTimeout(() => {
        status2.textContent = "";
        status2.classList.remove("show", "error");
      }, 3e3);
    }
  }
  async function restore_options() {
    try {
      if (!window.VSC.videoSpeedConfig) {
        window.VSC.videoSpeedConfig = new window.VSC.VideoSpeedConfig();
      }
      await window.VSC.videoSpeedConfig.load();
      const storage = window.VSC.videoSpeedConfig.settings;
      if (document.getElementById("rememberSpeed")) document.getElementById("rememberSpeed").checked = storage.rememberSpeed;
      if (document.getElementById("exclusiveKeys")) document.getElementById("exclusiveKeys").checked = storage.exclusiveKeys;
      if (document.getElementById("audioBoolean")) document.getElementById("audioBoolean").checked = storage.audioBoolean;
      if (document.getElementById("startHidden")) document.getElementById("startHidden").checked = storage.startHidden;
      if (document.getElementById("controllerOpacity")) document.getElementById("controllerOpacity").value = storage.controllerOpacity;
      if (document.getElementById("controllerButtonSize")) document.getElementById("controllerButtonSize").value = storage.controllerButtonSize;
      if (document.getElementById("logLevel")) document.getElementById("logLevel").value = storage.logLevel;
      if (document.getElementById("controllerCSS")) document.getElementById("controllerCSS").value = storage.customCSS ?? "";
      const rulesContainer = document.getElementById("site-rules-container");
      if (rulesContainer) {
        const siteRules = storage.siteRules || window.VSC.Constants.DEFAULT_SETTINGS.siteRules;
        rulesContainer.querySelectorAll(".row.site-rule").forEach((r) => r.remove());
        for (const rule of siteRules) {
          add_site_rule(rule);
        }
      }
      let bindings = storage.keyBindings;
      if (!bindings || !Array.isArray(bindings) || bindings.length === 0) {
        bindings = window.VSC.Constants.DEFAULT_SETTINGS.keyBindings;
      }
      const shortcutsContainer = document.getElementById("shortcuts-container");
      if (shortcutsContainer) {
        shortcutsContainer.innerHTML = "";
        for (const item of bindings) {
          if (item.predefined) {
            add_predefined_shortcut(item);
          } else {
            const row = add_shortcut({ action: item.action, value: item.value });
            setShortcutInput(row.querySelector(".customKey"), item);
          }
        }
      }
    } catch (error) {
      console.error("Failed to restore options:", error);
      document.getElementById("status").textContent = `Error loading options: ${error.message}`;
      document.getElementById("status").classList.add("show", "error");
      setTimeout(() => {
        document.getElementById("status").textContent = "";
        document.getElementById("status").classList.remove("show", "error");
      }, 3e3);
    }
  }
  async function restore_defaults() {
    try {
      const status2 = document.getElementById("status");
      status2.textContent = "Restoring defaults...";
      status2.classList.remove("success", "error");
      status2.classList.add("show");
      await window.VSC.StorageManager.clear();
      if (!window.VSC.videoSpeedConfig) {
        window.VSC.videoSpeedConfig = new window.VSC.VideoSpeedConfig();
      }
      const defaults = { ...window.VSC.Constants.DEFAULT_SETTINGS, schemaVersion: 2 };
      const ok = await window.VSC.videoSpeedConfig.save(defaults);
      if (!ok) {
        throw new Error("failed to write defaults to storage");
      }
      await restore_options();
      status2.textContent = "Default options restored";
      status2.classList.add("success");
      setTimeout(() => {
        status2.textContent = "";
        status2.classList.remove("show", "success");
      }, 2e3);
    } catch (error) {
      console.error("Failed to restore defaults:", error);
      status.textContent = `Error restoring defaults: ${error.message}`;
      status.classList.add("show", "error");
      setTimeout(() => {
        status.textContent = "";
        status.classList.remove("show", "error");
      }, 3e3);
    }
  }
  async function export_settings() {
    const status2 = document.getElementById("status");
    try {
      if (!window.VSC.videoSpeedConfig) {
        window.VSC.videoSpeedConfig = new window.VSC.VideoSpeedConfig();
      }
      await window.VSC.videoSpeedConfig.load();
      const settings = { ...window.VSC.videoSpeedConfig.settings };
      const blob = new Blob([JSON.stringify(settings, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "videospeed-settings.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      status2.textContent = "Settings exported";
      status2.classList.remove("error");
      status2.classList.add("show", "success");
      setTimeout(() => {
        status2.textContent = "";
        status2.classList.remove("show", "success");
      }, 2e3);
    } catch (error) {
      console.error("Failed to export settings:", error);
      status2.textContent = `Error exporting settings: ${error.message}`;
      status2.classList.add("show", "error");
      setTimeout(() => {
        status2.textContent = "";
        status2.classList.remove("show", "error");
      }, 3e3);
    }
  }
  function import_settings2() {
    document.getElementById("importFile").click();
  }
  async function handleImportFile(event) {
    const status2 = document.getElementById("status");
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    event.target.value = "";
    try {
      const text = await file.text();
      let imported;
      try {
        imported = JSON.parse(text);
      } catch (e) {
        throw new Error("File is not valid JSON", { cause: e });
      }
      if (!imported || typeof imported !== "object" || !Array.isArray(imported.keyBindings)) {
        throw new Error("File does not look like a Video Speed Controller settings file");
      }
      if (!window.VSC.videoSpeedConfig) {
        window.VSC.videoSpeedConfig = new window.VSC.VideoSpeedConfig();
      }
      await window.VSC.StorageManager.clear();
      const ok = await window.VSC.videoSpeedConfig.save(imported);
      if (!ok) {
        throw new Error("Failed to write imported settings to storage");
      }
      document.querySelectorAll(".removeParent").forEach((button) => {
        button.click();
      });
      await restore_options();
      status2.textContent = "Settings imported successfully";
      status2.classList.remove("error");
      status2.classList.add("show", "success");
      setTimeout(() => {
        status2.textContent = "";
        status2.classList.remove("show", "success");
      }, 2e3);
    } catch (error) {
      console.error("Failed to import settings:", error);
      status2.textContent = `Import failed: ${error.message}`;
      status2.classList.add("show", "error");
      setTimeout(() => {
        status2.textContent = "";
        status2.classList.remove("show", "error");
      }, 4e3);
    }
  }
  function switchTab(tabName) {
    ["settings", "advanced"].forEach((name) => {
      const tabEl = document.getElementById(`tab-${name}`);
      const panelEl = document.getElementById(`panel-${name}`);
      if (tabEl) tabEl.classList.toggle("active", name === tabName);
      if (panelEl) panelEl.style.display = name === tabName ? "" : "none";
    });
  }
  document.addEventListener("DOMContentLoaded", async () => {
    window.VSC.StorageManager.onError((error, data) => {
      console.warn("Storage operation failed:", error.message, data);
    });
    await restore_options();
    const saveBtn = document.getElementById("save");
    function markDirty() {
      saveBtn.classList.add("has-changes");
      saveBtn.classList.remove("saved");
    }
    function markClean() {
      saveBtn.classList.remove("has-changes");
      saveBtn.classList.add("saved");
      setTimeout(() => saveBtn.classList.remove("saved"), 1500);
    }
    document.body.addEventListener("input", markDirty);
    document.body.addEventListener("change", markDirty);
    saveBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      await save_options();
      markClean();
    });
    document.getElementById("add")?.addEventListener("click", () => {
      add_shortcut();
      markDirty();
    });
    document.getElementById("add-site-rule")?.addEventListener("click", () => {
      add_site_rule();
      markDirty();
    });
    document.getElementById("restore")?.addEventListener("click", async (e) => {
      e.preventDefault();
      await restore_defaults();
      markDirty();
    });
    document.getElementById("export")?.addEventListener("click", (e) => {
      e.preventDefault();
      export_settings();
    });
    document.getElementById("import")?.addEventListener("click", (e) => {
      e.preventDefault();
      import_settings2();
    });
    document.getElementById("importFile")?.addEventListener("change", handleImportFile);
    document.getElementById("tab-settings")?.addEventListener("click", () => switchTab("settings"));
    document.getElementById("tab-advanced")?.addEventListener("click", () => switchTab("advanced"));
    document.getElementById("tab-faq")?.addEventListener("click", () => switchTab("faq"));
    const splitMenu = document.getElementById("split-menu");
    const splitToggle = document.getElementById("split-toggle");
    if (splitMenu && splitToggle) {
      splitToggle.addEventListener("click", () => {
        splitMenu.hidden = !splitMenu.hidden;
      });
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".split-button")) {
          splitMenu.hidden = true;
        }
      });
      splitMenu.addEventListener("click", () => {
        splitMenu.hidden = true;
      });
    }
    const cssTextarea = document.getElementById("controllerCSS");
    if (cssTextarea) {
      let cssValidationTimer;
      cssTextarea.addEventListener("input", () => {
        updateCSSHighlight();
        clearTimeout(cssValidationTimer);
        cssValidationTimer = setTimeout(() => {
          validateControllerCSS(cssTextarea.value);
        }, 300);
      });
      cssTextarea.addEventListener("scroll", syncCSSScroll);
      updateCSSHighlight();
      validateControllerCSS(cssTextarea.value);
    }
    document.addEventListener("click", (e) => {
      const splitToggle2 = document.getElementById("split-toggle");
      const splitMenu2 = document.getElementById("split-menu");
      if (splitMenu2 && !splitMenu2.hidden && !splitToggle2?.contains(e.target) && !splitMenu2.contains(e.target)) {
        splitMenu2.hidden = true;
      }
    });
    document.getElementById("about")?.addEventListener("click", () => {
      window.open("https://github.com/igrigorik/videospeed");
    });
    document.getElementById("feedback")?.addEventListener("click", () => {
      window.open("https://github.com/igrigorik/videospeed/issues");
    });
    function eventCaller(event, className, funcName) {
      if (!event.target.classList.contains(className)) {
        return;
      }
      funcName(event);
    }
    document.addEventListener("beforeinput", (event) => {
      eventCaller(event, "customValue", inputFilterNumbersOnly);
    });
    document.addEventListener("focus", (event) => {
      eventCaller(event, "customKey", inputFocus);
    });
    document.addEventListener("blur", (event) => {
      eventCaller(event, "customKey", inputBlur);
    });
    document.addEventListener("keydown", (event) => {
      eventCaller(event, "customKey", recordKeyPress);
    });
    document.addEventListener("click", (event) => {
      eventCaller(event, "removeParent", () => {
        event.target.closest(".row").remove();
        markDirty();
      });
    });
    document.addEventListener("change", (event) => {
      eventCaller(event, "customDo", () => {
        const row = event.target.closest(".row");
        const valueInput = row.querySelector(".customValue");
        if (window.VSC.Constants.CUSTOM_ACTIONS_NO_VALUES.includes(event.target.value)) {
          valueInput.style.display = "none";
          valueInput.value = 0;
        } else {
          valueInput.style.display = "inline-block";
        }
      });
    });
  });
})();
