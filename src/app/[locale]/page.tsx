'use client';

import React from 'react';
import { BackgroundGlow } from '@/components/BackgroundGlow';
import { Header } from '@/components/Header';
import { Timeline } from '@/components/Timeline';
import { ConfigPanel } from '@/components/ConfigPanel';
import { LiveDashboard } from '@/components/LiveDashboard';
import { MenuBarWidget } from '@/components/MenuBarWidget';
import { useApp } from '@/context/AppContext';
import { useLocale } from 'next-intl';

export default function Home() {
  const locale = useLocale();
  const { isConfigured, isEditingConfig } = useApp();

  const showConfig = !isConfigured || isEditingConfig;

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-between p-4 sm:p-6 md:p-8 overflow-x-hidden">
      {/* Dynamic Animated Ambient Background */}
      <BackgroundGlow />

      <div className="w-full max-w-4xl space-y-6 z-10">
        {/* Header Bar */}
        <Header />

        {showConfig ? (
          /* Step 1: Configuration Setup Flow */
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <ConfigPanel />
            <Timeline />
          </div>
        ) : (
          /* Step 2: Main Live Progress Dashboard */
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <LiveDashboard />
            <Timeline />
          </div>
        )}
      </div>

      {/* Floating Status Bar Widget Simulation */}
      <MenuBarWidget />

      {/* Footer */}
      <footer className="w-full max-w-4xl text-center py-6 text-xs text-slate-500 dark:text-slate-400 space-y-1 z-10 border-t border-slate-200/40 dark:border-slate-800/40 mt-8">
        <p>
          钱条 (Money Progress) Web Edition • {locale === 'zh' ? '上班的进度条，开始搬砖吧。' : 'Work progress bar, start earning today.'}
        </p>
        <p className="opacity-75">
          Inspired by Lakr Aream&apos;s MoneyProgress macOS App. Built with Next.js 16 &amp; next-intl.
        </p>
      </footer>
    </main>
  );
}
