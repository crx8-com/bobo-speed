# 波波倍速 (BoBo Speed) - 网页视频加速与播放调速神器

<div align="center">

<p>
  <a href="README.md">English</a> | <strong>简体中文</strong>
</p>

[![CRX8 Ecosystem](https://img.shields.io/badge/Powered%20by-CRX8.com-2563eb?style=for-the-badge&logo=googlechrome&logoColor=white)](https://crx8.com)
[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-v0.13.0-blue?style=for-the-badge&logo=googlechrome)](https://chromewebstore.google.com/detail/hefjfbkjdcnnfabcjinadgemanbkamaa)
[![Microsoft Edge](https://img.shields.io/badge/Edge%20Add--ons-v0.13.0-0078d7?style=for-the-badge&logo=microsoftedge)](https://microsoftedge.microsoft.com/addons/detail/a8638e0e-4e17-4d6e-9f61-e4fab9e750e9)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**[CRX8 (https://crx8.com)](https://crx8.com)** 官方开源项目 • 专为 Chrome / Edge 打造的高性能 HTML5 视频倍速控制器

[🌐 访问 CRX8 官方插件站](https://crx8.com) • [🚀 Chrome 商店安装](https://chromewebstore.google.com/detail/hefjfbkjdcnnfabcjinadgemanbkamaa) • [⚡ Edge 商店安装](https://microsoftedge.microsoft.com/addons/detail/a8638e0e-4e17-4d6e-9f61-e4fab9e750e9)

</div>

---

> 基于经典开源内核全面升级的 **Manifest V3 现代化 Chrome 视频倍速扩展**。  
> 采用**亮色科技风 (Light Tech-Chic)** 设计，打破各类网页限制，提供极致平滑的无级调速、快捷键盲操、快进快退及图标角标实时联动体验。

---

## 🌟 核心特性与亮点

1. **实时倍速图标角标 (Badge 联动)**
   * 对标 *Global Speed*，在浏览器右上角扩展图标上实时呈现当前视频的播放倍速（如 `1.0`、`1.5`、`2.0`、`1.25` 等）。
   * 采用高对比度科技亮青蓝底色（`#0EA5E9`），支持在弹窗滑块、网页快捷键调速或切换标签页时毫秒级自动同步。

2. **现代化亮色科技风 Popup 弹窗 (Mini Media Hub)**
   * **动态连接感知灯**：绿色脉冲灯提示“媒体播放中”，青蓝灯提示“页面就绪”，灰度提示“系统页面”。
   * **超大 HUD 数码读数**：等宽数码字体展示当前倍速，支持 `0.25× ~ 4.00×` 无级平滑拖拽滑杆。
   * **步进微调与原速复位**：自带 `-0.1` / `+0.1` 触控胶囊，一键归位 `1.00×` 原速。
   * **快捷媒体动作**：内置一键快退 10 秒（⏪）、快进 10 秒（⏩）及显隐悬浮窗（👁️）。

3. **极致精简的 Options 设置中心**
   * **信息降噪**：移除了原版冗长复杂的正则表达式规则、难懂的自定义 CSS 注入与复杂的 FAQ 折叠。
   * **单页清爽架构**：去掉了复杂的 Tab 切换和导入导出下拉，顶栏直接配备高质感【保存配置】按钮。
   * **现代 iOS/macOS 风格 Switch 开关**：优雅管理记忆倍速、音频调速、默认隐藏浮层及独占按键模式。
   * **Cyber 键帽快捷键中心**：全套内置 9 组默认快捷键清晰排版，附带中文动作说明，点击键帽即可重新录制。

---

## ⌨️ 默认快捷键一览

| 动作 | 默认按键 | 功能说明 |
| :--- | :---: | :--- |
| **增加速度** | `D` | 每次递增 0.1× 倍速 |
| **减慢速度** | `S` | 每次递减 0.1× 倍速 |
| **恢复原速** | `R` | 一键重置为 1.00× 正常播放 |
| **切换预设速度** | `G` | 快速切到常用速度（默认 1.8×） |
| **快退视频** | `Z` | 倒退 10 秒（时间跨度可在设置修改） |
| **快进视频** | `X` | 快进 10 秒 |
| **显隐悬浮窗** | `V` | 隐藏或唤出视频左上角的悬浮控制球 |
| **静音开关** | `M` | 一键静音/解除静音 |
| **暂停/播放** | `P` | 媒体播放与暂停切换 |

---

## 🛠️ 项目重构与问题排查记录 (Changelog & Issues)

### 1. 解决的原版痛点记录
* **问题一：原版信息流极度混乱、UI 停留在十年前风格**
  * *原因*：原版 Options 页面采用粗暴的表单堆砌，透明度让用户手打小数（如 `0.3`），按钮大小手打像素数字，排版没有任何视觉层级。
  * *解决*：全部重构为 Bento 卡片式布局，采用高纯度冷雾白（`#F8FAFC`）底色搭配激光青蓝微渐变。
* **问题二：Popup 弹窗是“死按钮”，缺乏状态反馈**
  * *原因*：打开弹窗只有几块静态灰色方块，用户不知道当前网页是否检测到视频，也不知道当前实际倍速是多少。
  * *解决*：引入了 `checkActiveTabMedia` 探查机制与 HUD 数码动态显示，实时读取页面 `<video>` 实例。
* **问题三：扩展图标缺乏直观感知**
  * *原因*：原版未调用 `chrome.action.setBadgeText`，用户不看视频画面根本不知道当前处于几倍速。
  * *解决*：在 `background.js` 中新增 Badge 机制，串联 content-bridge、popup 与 storage.onChanged，实现全链路实时角标联动。
* **问题四：高级规则门槛过高，干扰正常用户**
  * *原因*：普通用户只需要简单调速，原版的规则语法、CSS 注入和多级下拉菜单大幅增加了认知负担。
  * *解决*：彻底剔除高级规则面板，保存时内部自动继承安全默认值，顶部保留纯粹优雅的【保存配置】按钮。

---

### 2. 当前已知特性与注意事项 (Known Considerations)

1. **本地视频与无痕浏览权限**：
   * 若要在 Chrome 中打开本地下载的视频文件（`file:///*`）或无痕模式下使用，用户必须在 `chrome://extensions` 的【详细信息】中手动勾选【允许访问文件网址】和【在无痕模式下启用】（受 Chromium 浏览器安全沙箱限制）。
2. **多视频共存页面**：
   * 在同时存在多个视频（如小红书、微博、TikTok 等信息流页面）时，Badge 默认会显示最新交互或主播放器的速度。
3. **Chrome 扩展角标宽度限制**：
   * Chromium 的 Action Badge 最多建议显示 4 个字符（如 `1.25`、`2.5`、`16`）。若速度小数位过多已做自动截断格式化，确保排版不越界。

---

## 📦 架构说明与使用方式

本项目已全面重构为 **纯原生零依赖结构 (Vanilla JS + HTML + CSS)**，与小红书/快手下载器保持完全一致：
* **0 外部依赖**：无 Node.js、无 npm、无构建编译步骤、无需安装 `node_modules`。
* **极速所见即所得**：修改任何 JS/CSS 代码后，直接在 Chrome 扩展管理界面点一次刷新即可生效。
* **极致轻量**：源码与资源全量体积仅 ~400KB。

### 加载到浏览器：
1. 浏览器打开 `chrome://extensions/`
2. 打开右上角【开发者模式】
3. 点击【加载已解压的扩展程序】，直接选择 `波波倍速` 根目录即可。
