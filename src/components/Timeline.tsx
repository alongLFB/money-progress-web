'use client';

import React, { useRef, useState, useCallback } from 'react';
import { useApp } from '@/context/AppContext';
import { useTranslations } from 'next-intl';
import { Sun, Coffee, Clock } from 'lucide-react';

export function Timeline() {
  const t = useTranslations();
  const {
    workStartMinutes,
    setWorkStartMinutes,
    workEndMinutes,
    setWorkEndMinutes,
    isHaveNoonBreak,
    noonBreakStartMinutes,
    setNoonBreakStartMinutes,
    noonBreakEndMinutes,
    setNoonBreakEndMinutes,
    nowMinutes,
  } = useApp();

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHandle, setActiveHandle] = useState<
    'start' | 'end' | 'noonStart' | 'noonEnd' | null
  >(null);

  const minutesToPercent = (mins: number) => (mins / (24 * 60)) * 100;

  const minutesToTimeStr = (mins: number) => {
    const h = Math.floor(mins / 60) % 24;
    const m = Math.floor(mins % 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  const calculateMinsFromX = useCallback((clientX: number) => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    let x = clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    const percent = x / rect.width;
    // Round to 5-minute intervals for smooth dragging
    const rawMins = percent * 24 * 60;
    return Math.round(rawMins / 5) * 5;
  }, []);

  const handlePointerDown = (
    handle: 'start' | 'end' | 'noonStart' | 'noonEnd',
    e: React.PointerEvent
  ) => {
    e.preventDefault();
    setActiveHandle(handle);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!activeHandle) return;
    const mins = calculateMinsFromX(e.clientX);
    if (activeHandle === 'start') {
      setWorkStartMinutes(Math.min(mins, workEndMinutes - 30));
    } else if (activeHandle === 'end') {
      setWorkEndMinutes(Math.max(mins, workStartMinutes + 30));
    } else if (activeHandle === 'noonStart') {
      setNoonBreakStartMinutes(
        Math.max(workStartMinutes, Math.min(mins, noonBreakEndMinutes - 15))
      );
    } else if (activeHandle === 'noonEnd') {
      setNoonBreakEndMinutes(
        Math.min(workEndMinutes, Math.max(mins, noonBreakStartMinutes + 15))
      );
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (activeHandle) {
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      setActiveHandle(null);
    }
  };

  // Percentage values for styling
  const startPct = minutesToPercent(workStartMinutes);
  const endPct = minutesToPercent(workEndMinutes);
  const noonStartPct = minutesToPercent(noonBreakStartMinutes);
  const noonEndPct = minutesToPercent(noonBreakEndMinutes);
  const nowPct = minutesToPercent(nowMinutes);

  return (
    <div className="w-full bg-slate-50/70 dark:bg-slate-800/30 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 space-y-4">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-500" />
          <h2 className="text-xs font-bold text-slate-700 dark:text-slate-200">
            24H 交互时间轴 (00:00 - 24:00)
          </h2>
        </div>
        <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            {t('workAt')}: {minutesToTimeStr(workStartMinutes)}
          </span>
          {isHaveNoonBreak && (
            <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              午休: {minutesToTimeStr(noonBreakStartMinutes)} - {minutesToTimeStr(noonBreakEndMinutes)}
            </span>
          )}
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            {t('offWorkOn')}: {minutesToTimeStr(workEndMinutes)}
          </span>
        </div>
      </div>

      {/* Main Interactive Track */}
      <div className="relative pt-6 pb-2">
        <div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="relative h-10 w-full bg-slate-200/80 dark:bg-slate-800 rounded-2xl cursor-pointer select-none overflow-visible shadow-inner flex items-center border border-slate-300/40 dark:border-slate-700/40"
        >
          {/* Hour grid lines & labels */}
          <div className="absolute inset-0 flex justify-between px-1 pointer-events-none">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center justify-between h-full py-1">
                <div
                  className={`w-px ${
                    i % 6 === 0
                      ? 'h-3 bg-slate-400 dark:bg-slate-500'
                      : i % 3 === 0
                      ? 'h-2 bg-slate-300 dark:bg-slate-600'
                      : 'h-1 bg-slate-200 dark:bg-slate-700'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Active Work Period Shading */}
          <div
            className="absolute top-0 bottom-0 bg-blue-500/25 dark:bg-blue-500/35 border-y-2 border-blue-500/60 rounded-lg pointer-events-none transition-all duration-75"
            style={{
              left: `${startPct}%`,
              width: `${Math.max(0, endPct - startPct)}%`,
            }}
          />

          {/* Lunch Break Shading */}
          {isHaveNoonBreak && (
            <div
              className="absolute top-0 bottom-0 bg-amber-500/30 border-y-2 border-amber-500/80 rounded-lg pointer-events-none flex items-center justify-center overflow-hidden"
              style={{
                left: `${noonStartPct}%`,
                width: `${Math.max(0, noonEndPct - noonStartPct)}%`,
              }}
            >
              <Coffee className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 opacity-60 animate-pulse" />
            </div>
          )}

          {/* Current Time Pin (Red Indicator) */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-rose-500 dark:bg-rose-400 z-10 pointer-events-none shadow-[0_0_8px_rgba(244,63,94,0.8)]"
            style={{ left: `${nowPct}%` }}
          >
            <div className="absolute -top-5 -translate-x-1/2 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md whitespace-nowrap">
              Now {minutesToTimeStr(nowMinutes)}
            </div>
          </div>

          {/* Handle: Work Start (Blue Pin) */}
          <div
            onPointerDown={(e) => handlePointerDown('start', e)}
            className="absolute top-1/2 -translate-y-1/2 z-20 cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
            style={{ left: `calc(${startPct}% - 12px)` }}
          >
            <div className="w-6 h-10 bg-gradient-to-b from-blue-400 to-blue-600 rounded-xl shadow-lg border-2 border-white dark:border-slate-900 flex items-center justify-center text-white">
              <div className="w-1 h-4 bg-white/60 rounded-full" />
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-bold px-1.5 py-0.5 rounded shadow whitespace-nowrap">
              {minutesToTimeStr(workStartMinutes)}
            </div>
          </div>

          {/* Handle: Work End (Green Pin) */}
          <div
            onPointerDown={(e) => handlePointerDown('end', e)}
            className="absolute top-1/2 -translate-y-1/2 z-20 cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
            style={{ left: `calc(${endPct}% - 12px)` }}
          >
            <div className="w-6 h-10 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-xl shadow-lg border-2 border-white dark:border-slate-900 flex items-center justify-center text-white">
              <div className="w-1 h-4 bg-white/60 rounded-full" />
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[11px] font-bold px-1.5 py-0.5 rounded shadow whitespace-nowrap">
              {minutesToTimeStr(workEndMinutes)}
            </div>
          </div>

          {/* Handles for Lunch Break (Orange Pins) */}
          {isHaveNoonBreak && (
            <>
              <div
                onPointerDown={(e) => handlePointerDown('noonStart', e)}
                className="absolute top-1/2 -translate-y-1/2 z-20 cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
                style={{ left: `calc(${noonStartPct}% - 10px)` }}
              >
                <div className="w-5 h-8 bg-gradient-to-b from-amber-400 to-amber-600 rounded-lg shadow-md border border-white dark:border-slate-900 flex items-center justify-center">
                  <Coffee className="w-2.5 h-2.5 text-white" />
                </div>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-[10px] font-bold px-1 py-0.5 rounded whitespace-nowrap">
                  {minutesToTimeStr(noonBreakStartMinutes)}
                </div>
              </div>

              <div
                onPointerDown={(e) => handlePointerDown('noonEnd', e)}
                className="absolute top-1/2 -translate-y-1/2 z-20 cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
                style={{ left: `calc(${noonEndPct}% - 10px)` }}
              >
                <div className="w-5 h-8 bg-gradient-to-b from-amber-500 to-amber-700 rounded-lg shadow-md border border-white dark:border-slate-900 flex items-center justify-center">
                  <Coffee className="w-2.5 h-2.5 text-white" />
                </div>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-amber-700 text-white text-[10px] font-bold px-1 py-0.5 rounded whitespace-nowrap">
                  {minutesToTimeStr(noonBreakEndMinutes)}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Hour Axis Markers Below */}
        <div className="flex justify-between px-1 text-[10px] font-mono text-slate-500 dark:text-slate-400 pt-5 font-semibold">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>24:00</span>
        </div>
      </div>
    </div>
  );
}
