# BoBo Speed - HTML5 Video Speed Controller & Accelerator

<div align="center">

<p>
  <strong>English</strong> | <a href="README.zh-CN.md">简体中文</a>
</p>

[![CRX8 Ecosystem](https://img.shields.io/badge/Powered%20by-CRX8.com-2563eb?style=for-the-badge&logo=googlechrome&logoColor=white)](https://crx8.com)
[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-v0.13.0-blue?style=for-the-badge&logo=googlechrome)](https://chromewebstore.google.com/detail/hefjfbkjdcnnfabcjinadgemanbkamaa)
[![Microsoft Edge](https://img.shields.io/badge/Edge%20Add--ons-v0.13.0-0078d7?style=for-the-badge&logo=microsoftedge)](https://microsoftedge.microsoft.com/addons/detail/a8638e0e-4e17-4d6e-9f61-e4fab9e750e9)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**[CRX8 (https://crx8.com)](https://crx8.com)** Official Open Source Project • Modern Manifest V3 HTML5 Video Speed Controller for Chrome, Edge, and Chromium-based browsers.

[🌐 Visit CRX8 Hub](https://crx8.com) • [🚀 Install from Chrome Web Store](https://chromewebstore.google.com/detail/hefjfbkjdcnnfabcjinadgemanbkamaa) • [⚡ Install from Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/a8638e0e-4e17-4d6e-9f61-e4fab9e750e9)

</div>

---

## 🌟 Highlights & Features

1. **Real-Time Icon Badge (Live Playback Speed Indicator)**
   - Displays the current playback speed directly on the browser extension icon (e.g. `1.0`, `1.5`, `2.0`, `1.25`).
   - Uses high-contrast tech cyan badge background (`#0EA5E9`) with millisecond-level synchronization across tabs, popup adjustments, and in-page keyboard shortcuts.

2. **Modern Light Tech-Chic Mini Media Hub (Popup UI)**
   - **Dynamic Connection Indicator**: Pulsing green dot indicates active playback; cyan indicates ready; gray indicates idle system pages.
   - **HUD Monospace Speed Readout**: Ultra-smooth stepless slider supporting `0.25× ~ 4.00×` playback speed.
   - **Step Adjustments & Instant Reset**: Tactile capsules for `-0.1` / `+0.1` and one-click reset to `1.00×`.
   - **Media Quick Actions**: Rewind 10s (⏪), Fast Forward 10s (⏩), and toggle floating controller visibility (👁️).

3. **Streamlined Settings Center (Options)**
   - **Noise-Free Design**: Removed cluttered regex rules and confusing legacy CSS overrides for a pure, distraction-free experience.
   - **Clean Bento Architecture**: Modern iOS/macOS toggle switches for speed memory, audio pitch correction, floating layer visibility, and keyboard capture modes.
   - **Cyber Keycap Shortcut Center**: Pre-configured with 9 intuitive default hotkeys, easily remapped with a single click.

---

## ⌨️ Default Keyboard Shortcuts

| Action | Shortcut | Description |
| :--- | :---: | :--- |
| **Increase Speed** | `D` | Step speed up by +0.1× |
| **Decrease Speed** | `S` | Step speed down by -0.1× |
| **Reset Speed** | `R` | Reset playback speed to 1.00× |
| **Toggle Preset Speed** | `G` | Switch between 1.0× and custom preset (default: 1.8×) |
| **Rewind Video** | `Z` | Rewind by 10 seconds (configurable in settings) |
| **Fast Forward** | `X` | Fast forward by 10 seconds |
| **Toggle Floating HUD** | `V` | Show or hide in-video overlay controller |
| **Mute / Unmute** | `M` | Toggle audio mute status |
| **Pause / Play** | `P` | Toggle video playback / pause |

---

## 📦 Architecture & Development

- **Pure Native Architecture (Vanilla JS + HTML + CSS)**: Zero build dependencies, zero compilation, zero `node_modules` required for extension runtime.
- **Ultra Lightweight**: Full source code and local assets package is under 400KB.
- **Instant Hot-Reload**: Direct edit in Chrome Developer Mode; reload extension with zero delay.

### Manual Installation (Developer Mode):
1. Navigate to `chrome://extensions/` (or `edge://extensions/`).
2. Enable **Developer mode** in the top-right corner.
3. Click **Load unpacked** and select this directory.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).  
Part of the open-source browser extension ecosystem at [CRX8.com](https://crx8.com).
