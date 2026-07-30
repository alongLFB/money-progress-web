# 💰 Money Progress - Web Edition

[中文 README](README.md)

---

**Money Progress Web Edition** is a real-time salary & work progress calculator. Live calculate your per-second wage, daily earnings, and work progress bar throughout your day!

> 💡 Inspired by Lakr Aream's macOS native application *MoneyProgress*, completely rebuilt with **Next.js 16 + React 19**.

---

## ✨ Features

- ⏱️ **Real-Time Live Earnings**: Per-second earnings counter & visual workday progress bar.
- 🌓 **Dark & Light Themes**: Seamless theme toggle (Dark / Light Mode) with system preference detection.
- 🌐 **Full i18n Support**: Powered by `next-intl` with route-based localization (**Chinese / English**).
- 📊 **Interactive 24-Hour Timeline**: Drag to adjust work start/end and lunch break times.
- 📌 **Floating Widget Mode**: Floating status widget simulating a desktop menu bar tool.
- 💱 **Multi-Currency Support**: Supports CNY (¥), USD ($), EUR (€), GBP (£), JPY (¥), and more.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (Turbopack) & [React 19](https://react.dev/)
- **i18n**: [next-intl 4](https://next-intl-docs.vercel.app/)
- **Styling & UI**: [Tailwind CSS v4](https://tailwindcss.com/), [Lucide React Icons](https://lucide.dev/), [Framer Motion](https://www.framer.com/motion/)
- **Type System**: TypeScript 5

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser to start.

---

## 📂 Project Structure

```text
├── messages/            # next-intl translation dictionaries (zh.json, en.json)
├── src/
│   ├── app/
│   │   └── [locale]/    # Dynamic locale page routes (App Router)
│   │       ├── layout.tsx
│   │       └── page.tsx
│   ├── components/      # UI components (Header, LiveDashboard, Timeline, ConfigPanel etc.)
│   ├── context/         # App state & Theme Context (AppContext, ThemeContext)
│   ├── data/            # Currency and static configuration data
│   ├── i18n/            # next-intl routing & request configs (routing.ts, request.ts)
│   └── proxy.ts         # Next.js 16 middleware proxy
├── next.config.mjs      # Next.js configuration
├── postcss.config.mjs   # Tailwind v4 PostCSS configuration
└── package.json
```

---

## 📄 License

MIT License © 2026 Money Progress Web Team.
