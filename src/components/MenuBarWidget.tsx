'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useTranslations } from 'next-intl';
import { X, Move, Minus } from 'lucide-react';

export function MenuBarWidget() {
  const t = useTranslations();
  const {
    todayPercent,
    earnedToday,
    coinPerDay,
    currencyUnit,
    menubarRunning,
    setMenubarRunning,
    compactMode,
  } = useApp();

  const [isMinimized, setIsMinimized] = useState(false);

  if (!menubarRunning) return null;

  const formattedPercent = (todayPercent * 100).toFixed(4);
  const formattedEarned = earnedToday.toFixed(2);

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-5 duration-300">
      <div className="bg-slate-900/90 dark:bg-slate-900/95 text-white backdrop-blur-xl border border-slate-700/80 shadow-2xl rounded-2xl p-3 min-w-[240px] max-w-xs space-y-2">
        {/* Widget Top Bar */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-1 border-b border-slate-800">
          <div className="flex items-center gap-1.5 font-bold text-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>💰 {t('appName')}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <Minus className="w-3 h-3" />
            </button>
            <button
              onClick={() => setMenubarRunning(false)}
              className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-rose-400 transition-all cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between font-mono">
              <span className="text-xs text-slate-400">{t('todaysProgress')}</span>
              <span className="text-xs font-bold text-blue-400">{formattedPercent}%</span>
            </div>

            {/* Micro Progress Bar */}
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full transition-all duration-300"
                style={{ width: `${Math.max(2, Math.min(100, todayPercent * 100))}%` }}
              />
            </div>

            <div className="flex items-center justify-between font-mono text-xs pt-1">
              <span className="text-amber-400 font-extrabold">
                {currencyUnit} {formattedEarned}
              </span>
              <span className="text-[10px] text-slate-400">
                / {currencyUnit} {coinPerDay.toFixed(0)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
