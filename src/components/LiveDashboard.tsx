'use client';

import React, { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useTranslations } from 'next-intl';
import confetti from 'canvas-confetti';
import { TrendingUp, Clock, Coins, Flame } from 'lucide-react';

export function LiveDashboard() {
  const t = useTranslations();
  const {
    dayWorkOfMonth,
    currencyUnit,
    effectiveWorkHours,
    coinPerDay,
    coinPerSecond,
    todayPercent,
    earnedToday,
    compactMode,
  } = useApp();

  const [quoteIndex, setQuoteIndex] = useState(0);

  const quotes = [
    t('touchFish1'),
    t('touchFish2'),
    t('touchFish3'),
    t('touchFish4'),
    t('touchFish5'),
    t('touchFish6'),
    t('touchFish7'),
    t('touchFish8'),
    t('touchFish9'),
    t('touchFish10'),
    t('touchFish11'),
    t('touchFish12'),
  ];

  // Rotate fun status quote every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  // Confetti when todayPercent hits 100%
  useEffect(() => {
    if (todayPercent >= 1) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    }
  }, [todayPercent]);

  const formattedPercent = (todayPercent * 100).toFixed(4);
  const formattedEarned = earnedToday.toFixed(2);
  const formattedCoinPerSecond = coinPerSecond.toFixed(4);
  const formattedCoinPerDay = coinPerDay.toFixed(2);
  const formattedWorkHours = effectiveWorkHours.toFixed(1);

  return (
    <div className={`w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-all duration-300 ${
      compactMode ? 'p-4 rounded-2xl space-y-4' : 'p-6 rounded-3xl space-y-6'
    }`}>
      {/* Real-time Progress Bar Card */}
      <div className={`relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl shadow-xl border border-slate-800/80 transition-all duration-300 ${
        compactMode ? 'p-4 space-y-3' : 'p-6 space-y-4'
      }`}>
        {/* Glow effect behind */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className={`relative z-10 ${compactMode ? 'space-y-3' : 'space-y-4'}`}>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className={compactMode ? 'text-xl' : 'text-2xl'}>💰</span>
              <div className="min-w-0">
                <h3 className={`font-bold tracking-tight truncate ${compactMode ? 'text-sm' : 'text-base'}`}>
                  {todayPercent <= 0
                    ? t('noWorkStarted')
                    : todayPercent >= 1
                    ? t('fullSalaryEarned')
                    : quotes[quoteIndex]}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  {t('todaysProgress')} • {formattedPercent}%
                </p>
              </div>
            </div>

            <div className="text-right font-mono shrink-0">
              <span className={`font-extrabold text-amber-400 tracking-tight block ${compactMode ? 'text-xl' : 'text-2xl'}`}>
                {currencyUnit} {formattedEarned}
              </span>
              <span className="block text-[11px] text-slate-400">
                / {currencyUnit} {formattedCoinPerDay}
              </span>
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className={`relative w-full bg-slate-800/90 rounded-full overflow-hidden border border-slate-700/60 ${
            compactMode ? 'h-3 p-0.5' : 'h-4 p-0.5'
          }`}>
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 rounded-full transition-all duration-300 relative"
              style={{ width: `${Math.max(2, Math.min(100, todayPercent * 100))}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-0.5 font-medium">
            <span>
              {compactMode
                ? t('compactEarned', { amount: formattedEarned, unit: currencyUnit })
                : t('earnedToday', { amount: formattedEarned, unit: currencyUnit })}
            </span>
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
              {t('perSecRate', { amount: formattedCoinPerSecond, unit: currencyUnit })}
            </span>
          </div>
        </div>
      </div>

      {/* Calculations Breakdown Grid */}
      <div className={`grid grid-cols-1 sm:grid-cols-3 ${compactMode ? 'gap-2.5' : 'gap-4'}`}>
        {/* Card 1: Per Day */}
        <div className={`bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between transition-all duration-300 ${
          compactMode ? 'p-3 space-y-1' : 'p-4 space-y-2'
        }`}>
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <Coins className={`${compactMode ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-amber-500`} />
              {t('dailyEarnings')}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-300 font-bold">
              {t('daysPerMonth', { days: dayWorkOfMonth })}
            </span>
          </div>
          <div className={`font-semibold text-slate-800 dark:text-slate-200 ${compactMode ? 'text-xs' : 'text-sm'}`}>
            {t('earnPerDayStat', { amount: formattedCoinPerDay, unit: currencyUnit })}
          </div>
        </div>

        {/* Card 2: Effective Work Hours */}
        <div className={`bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between transition-all duration-300 ${
          compactMode ? 'p-3 space-y-1' : 'p-4 space-y-2'
        }`}>
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <Clock className={`${compactMode ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-blue-500`} />
              {t('effectiveHoursTitle')}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 font-bold">
              {t('hoursPerDay')}
            </span>
          </div>
          <div className={`font-semibold text-slate-800 dark:text-slate-200 ${compactMode ? 'text-xs' : 'text-sm'}`}>
            {t('effectiveHoursStat', { hours: formattedWorkHours })}
          </div>
        </div>

        {/* Card 3: Per Second */}
        <div className={`bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between transition-all duration-300 ${
          compactMode ? 'p-3 space-y-1' : 'p-4 space-y-2'
        }`}>
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <TrendingUp className={`${compactMode ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-emerald-500`} />
              {t('ratePerSecondTitle')}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-300 font-bold">
              {t('liveRate')}
            </span>
          </div>
          <div className={`font-semibold text-slate-800 dark:text-slate-200 ${compactMode ? 'text-xs' : 'text-sm'}`}>
            {t('earnPerSecondStat', { amount: formattedCoinPerSecond, unit: currencyUnit })}
          </div>
        </div>
      </div>
    </div>
  );
}
