'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useTranslations } from 'next-intl';
import { CurrencyModal } from '@/components/CurrencyModal';
import { DollarSign, Calendar, Clock, Coffee, AlertCircle, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export function ConfigPanel() {
  const t = useTranslations();
  const {
    monthPaid,
    setMonthPaid,
    dayWorkOfMonth,
    setDayWorkOfMonth,
    currencyUnit,
    setCurrencyUnit,
    isHaveNoonBreak,
    setIsHaveNoonBreak,
    workStartMinutes,
    setWorkStartMinutes,
    workEndMinutes,
    setWorkEndMinutes,
    noonBreakStartMinutes,
    setNoonBreakStartMinutes,
    noonBreakEndMinutes,
    setNoonBreakEndMinutes,
    isWorkTimeValid,
    isConfigured,
    confirmConfig,
  } = useApp();

  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);

  const minsToTimeString = (mins: number) => {
    const h = Math.floor(mins / 60) % 24;
    const m = mins % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  const timeStringToMins = (val: string) => {
    const [h, m] = val.split(':').map(Number);
    if (isNaN(h) || isNaN(m)) return 0;
    return h * 60 + m;
  };

  const isSalaryInvalid = monthPaid < 0;
  const isDaysInvalid = dayWorkOfMonth < 1 || dayWorkOfMonth > 31;
  const canSave = isWorkTimeValid && !isSalaryInvalid && !isDaysInvalid;

  return (
    <div className="w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 shadow-lg space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 gap-2">
        <div>
          <h2 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            {t('setupTitle')}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t('setupSubtitle')}
          </p>
        </div>
      </div>

      {/* Salary & Currency Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Monthly Salary Input */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
            {t('monthlySalary')} ({currencyUnit})
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              placeholder={t('salaryPlaceholder')}
              value={monthPaid === 0 ? '' : monthPaid}
              onChange={(e) => setMonthPaid(Number(e.target.value))}
              className={`w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/70 border rounded-2xl text-slate-800 dark:text-slate-100 font-semibold focus:outline-none focus:ring-2 transition-all ${
                isSalaryInvalid
                  ? 'border-rose-400 focus:ring-rose-500'
                  : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500'
              }`}
            />
            <button
              onClick={() => setIsCurrencyModalOpen(true)}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 text-xs font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-800 transition-all cursor-pointer"
            >
              {currencyUnit} ⚙️
            </button>
          </div>
          {isSalaryInvalid && (
            <p className="text-xs text-rose-500 font-medium flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {t('invalidMoneyAlert')}
            </p>
          )}
        </div>

        {/* Work Days Per Month Input */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-500" />
            {t('oneMonthWork')}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max="31"
              value={dayWorkOfMonth === 0 ? '' : dayWorkOfMonth}
              onChange={(e) => setDayWorkOfMonth(Number(e.target.value))}
              className={`w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/70 border rounded-2xl text-slate-800 dark:text-slate-100 font-semibold focus:outline-none focus:ring-2 transition-all ${
                isDaysInvalid
                  ? 'border-rose-400 focus:ring-rose-500'
                  : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500'
              }`}
            />
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 px-2 whitespace-nowrap">
              {t('days')}
            </span>
          </div>
          {isDaysInvalid && (
            <p className="text-xs text-rose-500 font-medium flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {t('invalidWorkDaysAlert')}
            </p>
          )}
        </div>
      </div>

      {/* Time Controls */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Work Start */}
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              {t('workAt')}
            </span>
            <input
              type="time"
              value={minsToTimeString(workStartMinutes)}
              onChange={(e) => setWorkStartMinutes(timeStringToMins(e.target.value))}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-xl text-sm font-mono font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Work End */}
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-emerald-500" />
              {t('offWorkOn')}
            </span>
            <input
              type="time"
              value={minsToTimeString(workEndMinutes)}
              onChange={(e) => setWorkEndMinutes(timeStringToMins(e.target.value))}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-xl text-sm font-mono font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Lunch Break Toggle & Pickers */}
        <div className="p-4 bg-slate-50/70 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800/80 space-y-3">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isHaveNoonBreak}
              onChange={(e) => setIsHaveNoonBreak(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
            />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
              <Coffee className="w-3.5 h-3.5 text-amber-500" />
              {t('isHaveNoonBreak')}
            </span>
          </label>

          {isHaveNoonBreak && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200/50 dark:border-slate-700/50 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  {t('lunchBreakStart')}
                </span>
                <input
                  type="time"
                  value={minsToTimeString(noonBreakStartMinutes)}
                  onChange={(e) => setNoonBreakStartMinutes(timeStringToMins(e.target.value))}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-xl text-xs font-mono font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  {t('lunchBreakEnd')}
                </span>
                <input
                  type="time"
                  value={minsToTimeString(noonBreakEndMinutes)}
                  onChange={(e) => setNoonBreakEndMinutes(timeStringToMins(e.target.value))}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-xl text-xs font-mono font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          )}
        </div>

        {!isWorkTimeValid && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-2xl flex items-start gap-2.5 text-xs text-rose-700 dark:text-rose-300">
            <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">{t('invalidTimeTitle')}</span>
              <span>{t('invalidTimeAlert')}</span>
            </div>
          </div>
        )}
      </div>

      {/* Primary Action Button: Start Pricing & Tracking */}
      <div className="pt-2">
        <button
          onClick={confirmConfig}
          disabled={!canSave}
          className={`w-full py-4 px-6 rounded-2xl font-bold text-base shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
            canSave
              ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 hover:opacity-95 text-white shadow-blue-500/25 active:scale-[0.99]'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
          }`}
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>{t('startTracking')}</span>
        </button>
      </div>

      {/* Currency Modal */}
      <CurrencyModal
        isOpen={isCurrencyModalOpen}
        onClose={() => setIsCurrencyModalOpen(false)}
        selectedCurrency={currencyUnit}
        onSelect={(unit) => setCurrencyUnit(unit)}
      />
    </div>
  );
}
