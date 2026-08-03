'use client';

import React from 'react';
import { BackgroundGlow } from '@/components/BackgroundGlow';
import { Header } from '@/components/Header';
import { Timeline } from '@/components/Timeline';
import { ConfigPanel } from '@/components/ConfigPanel';
import { LiveDashboard } from '@/components/LiveDashboard';
import { MenuBarWidget } from '@/components/MenuBarWidget';
import { useApp } from '@/context/AppContext';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();
  const { isConfigured, isEditingConfig, compactMode } = useApp();

  const showConfig = !isConfigured || isEditingConfig;

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-between p-4 sm:p-6 md:p-8 overflow-x-hidden">
      {/* Dynamic Animated Ambient Background */}
      <BackgroundGlow />

      <div className={`w-full transition-all duration-300 z-10 ${
        compactMode ? 'max-w-2xl space-y-4' : 'max-w-4xl space-y-6'
      }`}>
        {/* Header Bar */}
        <Header />

        {showConfig ? (
          /* Step 1: Configuration Setup Flow (ConfigPanel embeds Timeline directly above time inputs) */
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <ConfigPanel />
          </div>
        ) : (
          /* Step 2: Main Live Progress Dashboard */
          <div className={`transition-all duration-300 animate-in fade-in zoom-in-95 ${
            compactMode ? 'space-y-4' : 'space-y-6'
          }`}>
            <LiveDashboard />
            <Timeline interactive={false} />
          </div>
        )}
      </div>

      {/* Floating Status Bar Widget Simulation */}
      <MenuBarWidget />

      {/* Footer */}
      <footer className="w-full max-w-4xl text-center py-6 text-xs text-slate-500 dark:text-slate-400 space-y-1 z-10 border-t border-slate-200/40 dark:border-slate-800/40 mt-8">
        <p className="font-medium">
          {t('appName')} ({t('webEdition')}) • {t('footerTagline')}
        </p>
        <p className="opacity-75">
          {t('footerCredits')}
        </p>
      </footer>
    </main>
  );
}
