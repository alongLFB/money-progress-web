'use client';

import React, { useTransition } from 'react';
import { Sun, Moon, Languages, RotateCcw, Maximize2, Minimize2, Pin, PinOff, Settings, LayoutDashboard } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useApp } from '@/context/AppContext';
import { useTheme } from '@/context/ThemeContext';

export function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const {
    compactMode,
    setCompactMode,
    restoreDefault,
    menubarRunning,
    setMenubarRunning,
    isConfigured,
    isEditingConfig,
    openConfig,
    confirmConfig,
  } = useApp();
  const { theme, toggleTheme, isMounted } = useTheme();

  const handleLanguageChange = (nextLocale: 'zh' | 'en') => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <header className="w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 rounded-3xl shadow-sm transition-all">
      {/* Brand & Subtitle */}
      <div className="flex items-center gap-4 text-center sm:text-left">
        <div className="relative group cursor-pointer" onClick={isEditingConfig ? confirmConfig : openConfig}>
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-yellow-500 flex items-center justify-center text-3xl shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300">
            💰
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t('appName')}
          </h1>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 max-w-md">
            {t('tagline')}
          </p>
        </div>
      </div>

      {/* Control Actions */}
      <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-end">
        {/* Reconfigure / Toggle Config Button */}
        {isConfigured && (
          <button
            onClick={isEditingConfig ? confirmConfig : openConfig}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer shadow-xs ${
              isEditingConfig
                ? 'bg-amber-500 text-white border-amber-600 shadow-amber-500/20'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {isEditingConfig ? (
              <>
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>{t('backToDashboard')}</span>
              </>
            ) : (
              <>
                <Settings className="w-3.5 h-3.5 text-amber-500" />
                <span>{t('reconfigure')}</span>
              </>
            )}
          </button>
        )}

        {/* Dark / Light Theme Toggle */}
        <button
          onClick={toggleTheme}
          title={isMounted ? (theme === 'dark' ? t('lightMode') : t('darkMode')) : ''}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all cursor-pointer shadow-xs min-w-[90px] justify-center"
        >
          {isMounted && theme === 'dark' ? (
            <>
              <Sun className="w-4 h-4 text-amber-400" />
              <span>{t('lightMode')}</span>
            </>
          ) : isMounted ? (
            <>
              <Moon className="w-4 h-4 text-indigo-500" />
              <span>{t('darkMode')}</span>
            </>
          ) : (
            <div className="w-14 h-4" />
          )}
        </button>

        {/* Language Switcher */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
          <Languages className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-0.5" />
          <button
            onClick={() => handleLanguageChange('zh')}
            disabled={isPending}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              locale === 'zh'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            中文
          </button>
          <button
            onClick={() => handleLanguageChange('en')}
            disabled={isPending}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              locale === 'en'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            EN
          </button>
        </div>

        {/* Compact Mode Toggle */}
        <button
          onClick={() => setCompactMode(!compactMode)}
          title={t('compactMode')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl border transition-all cursor-pointer ${
            compactMode
              ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-300 font-semibold'
              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
          }`}
        >
          {compactMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          <span>{t('compactMode')}</span>
        </button>

        {/* Status Bar Widget Toggle */}
        <button
          onClick={() => setMenubarRunning(!menubarRunning)}
          title={menubarRunning ? t('removeFromStatusBar') : t('hangOnStatusBar')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl border transition-all cursor-pointer ${
            menubarRunning
              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-300 font-semibold'
              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
          }`}
        >
          {menubarRunning ? <PinOff className="w-3.5 h-3.5" /> : <Pin className="w-3.5 h-3.5" />}
          <span className="hidden md:inline">{t('dockedWidget')}</span>
        </button>

        {/* Restore Defaults */}
        <button
          onClick={restoreDefault}
          title={t('restoreDefault')}
          className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-all hover:rotate-180 duration-500 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
