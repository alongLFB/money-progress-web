# 💰 钱条 (Money Progress) - Web Edition

[中文](#-中文说明) | [English](#-english)

---

## 🇨🇳 中文说明

**钱条 (Money Progress) Web Edition** 是一款实时摸鱼进度与秒薪/日薪计价器。借一个上班的进度条，开始开心搬砖！实时计算您的秒薪、日薪、当日已挣薪资及今日下班进度。

> 💡 本项目灵感来源于 Lakr Aream 的 macOS 原生应用 *MoneyProgress*，基于最新的 **Next.js 16 + React 19** 全新构建。

### ✨ 核心特性

- ⏱️ **实时薪资计价**：精确到秒级别的收益递增与实时摸鱼进度条显示。
- 🌓 **黑白双主题**：支持深色模式 (Dark Mode) 与浅色模式 (Light Mode) 随意切换，支持自动跟随系统。
- 🌐 **全量国际化支持**：采用基于路由的 `next-intl` 框架，无缝支持 **中文 (ZH)** 与 **English (EN)** 实时切换。
- 📊 **24小时交互式时间轴**：可拖拽调整上班、下班及午休时间段，可视化展示工作时刻。
- 📌 **悬浮状态栏挂件**：可置顶/悬浮在页面角落，像 macOS 菜单栏挂件一样随时监控秒薪增幅。
- 💱 **多币种支持**：支持 CNY (¥), USD ($), EUR (€), GBP (£), JPY (¥) 等数十种国际货币。

### 🛠️ 技术栈

- **框架**：[Next.js 16](https://nextjs.org/) (Turbopack) & [React 19](https://react.dev/)
- **国际化**：[next-intl 4](https://next-intl-docs.vercel.app/)
- **样式与UI**：[Tailwind CSS v4](https://tailwindcss.com/), [Lucide React Icons](https://lucide.dev/), [Framer Motion](https://www.framer.com/motion/)
- **类型系统**：TypeScript 5

### 🚀 快速开始

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 构建生产包
npm run build
```

用浏览器打开 [http://localhost:3000](http://localhost:3000) 即可使用。

---

## 🇺🇸 English

**Money Progress Web Edition** is a real-time salary & work progress calculator. Live calculate your per-second wage, daily earnings, and work progress bar throughout your day!

### ✨ Features

- ⏱️ **Real-time Live Earnings**: Per-second earnings counter & visual workday progress bar.
- 🌓 **Dark & Light Themes**: Seamless theme toggle (Dark / Light Mode) with system preference detection.
- 🌐 **Full i18n Support**: Powered by `next-intl` with route-based localization (**Chinese / English**).
- 📊 **Interactive 24-Hour Timeline**: Drag to adjust work start/end and lunch break times.
- 📌 **Floating Widget Mode**: Floating status widget simulating a desktop menu bar tool.
- 💱 **Multi-Currency Support**: Supports CNY (¥), USD ($), EUR (€), GBP (£), JPY (¥), and more.

---

## 📂 项目结构 / Folder Structure

```text
├── messages/            # next-intl 语言字典文件 (zh.json, en.json)
├── src/
│   ├── app/
│   │   └── [locale]/    # 动态国际化页面路由 (App Router)
│   │       ├── layout.tsx
│   │       └── page.tsx
│   ├── components/      # UI 组件 (Header, LiveDashboard, Timeline, ConfigPanel 等)
│   ├── context/         # App 状态与主题 Context (AppContext, ThemeContext)
│   ├── data/            # 货币与基础静态配置数据
│   ├── i18n/            # next-intl 路由与请求配置 (routing.ts, request.ts)
│   └── proxy.ts         # Next.js 16 路由代理中间件
├── next.config.mjs      # Next.js 配置文件
├── postcss.config.mjs   # Tailwind v4 PostCSS 配置
└── package.json
```

---

## 📄 许可证 / License

MIT License © 2026 Money Progress Web Team.
