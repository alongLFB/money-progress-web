'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface AppContextType {
  workStartMinutes: number;
  setWorkStartMinutes: (val: number) => void;
  workEndMinutes: number;
  setWorkEndMinutes: (val: number) => void;
  isHaveNoonBreak: boolean;
  setIsHaveNoonBreak: (val: boolean) => void;
  noonBreakStartMinutes: number;
  setNoonBreakStartMinutes: (val: number) => void;
  noonBreakEndMinutes: number;
  setNoonBreakEndMinutes: (val: number) => void;
  monthPaid: number;
  setMonthPaid: (val: number) => void;
  dayWorkOfMonth: number;
  setDayWorkOfMonth: (val: number) => void;
  currencyUnit: string;
  setCurrencyUnit: (val: string) => void;
  compactMode: boolean;
  setCompactMode: (val: boolean) => void;
  menubarRunning: boolean;
  setMenubarRunning: (val: boolean) => void;
  restoreDefault: () => void;
  
  // Setup Wizard State & Actions
  isConfigured: boolean;
  isEditingConfig: boolean;
  confirmConfig: () => void;
  openConfig: () => void;

  // Real-time calculated properties
  effectiveWorkSeconds: number;
  effectiveWorkHours: number;
  coinPerDay: number;
  coinPerSecond: number;
  todayPercent: number;
  earnedToday: number;
  nowMinutes: number;
  isWorkTimeValid: boolean;
  isMounted: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [workStartMinutes, setWorkStartMinutes] = useState<number>(9 * 60); // 09:00
  const [workEndMinutes, setWorkEndMinutes] = useState<number>(18 * 60); // 18:00
  const [isHaveNoonBreak, setIsHaveNoonBreak] = useState<boolean>(false);
  const [noonBreakStartMinutes, setNoonBreakStartMinutes] = useState<number>(12 * 60); // 12:00
  const [noonBreakEndMinutes, setNoonBreakEndMinutes] = useState<number>(14 * 60); // 14:00
  const [monthPaid, setMonthPaid] = useState<number>(20000);
  const [dayWorkOfMonth, setDayWorkOfMonth] = useState<number>(20);
  const [currencyUnit, setCurrencyUnit] = useState<string>('CNY');
  const [compactMode, setCompactMode] = useState<boolean>(false);
  const [menubarRunning, setMenubarRunning] = useState<boolean>(true);

  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const [isEditingConfig, setIsEditingConfig] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const [currentTime, setCurrentTime] = useState<Date>(() => new Date());

  // Load stored settings on mount
  useEffect(() => {
    setIsMounted(true);
    setCurrentTime(new Date());
    try {
      const sConfigured = localStorage.getItem('money_progress_configured');
      const sWorkStart = localStorage.getItem('money_progress_work_start');
      const sWorkEnd = localStorage.getItem('money_progress_work_end');
      const sNoonBreak = localStorage.getItem('money_progress_noon_break');
      const sNoonStart = localStorage.getItem('money_progress_noon_start');
      const sNoonEnd = localStorage.getItem('money_progress_noon_end');
      const sMonthPaid = localStorage.getItem('money_progress_month_paid');
      const sWorkDays = localStorage.getItem('money_progress_work_days');
      const sCurrency = localStorage.getItem('money_progress_currency');
      const sCompact = localStorage.getItem('money_progress_compact');
      const sMenubar = localStorage.getItem('money_progress_menubar');

      if (sConfigured === 'true') {
        setIsConfigured(true);
      } else {
        setIsConfigured(false);
      }

      if (sWorkStart !== null) setWorkStartMinutes(Number(sWorkStart));
      if (sWorkEnd !== null) setWorkEndMinutes(Number(sWorkEnd));
      if (sNoonBreak !== null) setIsHaveNoonBreak(sNoonBreak === 'true');
      if (sNoonStart !== null) setNoonBreakStartMinutes(Number(sNoonStart));
      if (sNoonEnd !== null) setNoonBreakEndMinutes(Number(sNoonEnd));
      if (sMonthPaid !== null) setMonthPaid(Number(sMonthPaid));
      if (sWorkDays !== null) setDayWorkOfMonth(Number(sWorkDays));
      if (sCurrency !== null) setCurrencyUnit(sCurrency);
      if (sCompact !== null) setCompactMode(sCompact === 'true');
      if (sMenubar !== null) setMenubarRunning(sMenubar === 'true');
    } catch {
      // ignore
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('money_progress_work_start', String(workStartMinutes));
    localStorage.setItem('money_progress_work_end', String(workEndMinutes));
    localStorage.setItem('money_progress_noon_break', String(isHaveNoonBreak));
    localStorage.setItem('money_progress_noon_start', String(noonBreakStartMinutes));
    localStorage.setItem('money_progress_noon_end', String(noonBreakEndMinutes));
    localStorage.setItem('money_progress_month_paid', String(monthPaid));
    localStorage.setItem('money_progress_work_days', String(dayWorkOfMonth));
    localStorage.setItem('money_progress_currency', currencyUnit);
    localStorage.setItem('money_progress_compact', String(compactMode));
    localStorage.setItem('money_progress_menubar', String(menubarRunning));
  }, [
    workStartMinutes,
    workEndMinutes,
    isHaveNoonBreak,
    noonBreakStartMinutes,
    noonBreakEndMinutes,
    monthPaid,
    dayWorkOfMonth,
    currencyUnit,
    compactMode,
    menubarRunning,
  ]);

  const confirmConfig = useCallback(() => {
    setIsConfigured(true);
    setIsEditingConfig(false);
    localStorage.setItem('money_progress_configured', 'true');
  }, []);

  const openConfig = useCallback(() => {
    setIsEditingConfig(true);
  }, []);

  // Fast timer ticker for real-time progress update (100ms for smooth fluid ticking!)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const restoreDefault = useCallback(() => {
    setWorkStartMinutes(9 * 60);
    setWorkEndMinutes(18 * 60);
    setIsHaveNoonBreak(false);
    setNoonBreakStartMinutes(12 * 60);
    setNoonBreakEndMinutes(14 * 60);
    setMonthPaid(3000);
    setDayWorkOfMonth(22);
    setCurrencyUnit('CNY');
    setCompactMode(false);
    setMenubarRunning(true);
  }, []);

  // Time calculations
  const isWorkTimeValid = isHaveNoonBreak
    ? workStartMinutes < noonBreakStartMinutes &&
      noonBreakStartMinutes < noonBreakEndMinutes &&
      noonBreakEndMinutes < workEndMinutes
    : workStartMinutes < workEndMinutes;

  let effectiveWorkSeconds = 0;
  if (isWorkTimeValid) {
    if (isHaveNoonBreak) {
      effectiveWorkSeconds =
        (workEndMinutes - noonBreakEndMinutes + (noonBreakStartMinutes - workStartMinutes)) * 60;
    } else {
      effectiveWorkSeconds = (workEndMinutes - workStartMinutes) * 60;
    }
  }

  const effectiveWorkHours = effectiveWorkSeconds / 3600;
  const coinPerDay = dayWorkOfMonth > 0 ? monthPaid / dayWorkOfMonth : 0;
  const coinPerSecond = effectiveWorkSeconds > 0 ? coinPerDay / effectiveWorkSeconds : 0;

  // Real-time status for today
  const nowMinutes =
    currentTime.getHours() * 60 +
    currentTime.getMinutes() +
    currentTime.getSeconds() / 60 +
    currentTime.getMilliseconds() / 60000;

  let passedSeconds = 0;
  if (isHaveNoonBreak) {
    if (nowMinutes <= workStartMinutes) {
      passedSeconds = 0;
    } else if (nowMinutes > workStartMinutes && nowMinutes < noonBreakStartMinutes) {
      passedSeconds = (nowMinutes - workStartMinutes) * 60;
    } else if (nowMinutes >= noonBreakStartMinutes && nowMinutes <= noonBreakEndMinutes) {
      passedSeconds = (noonBreakStartMinutes - workStartMinutes) * 60;
    } else if (nowMinutes > noonBreakEndMinutes && nowMinutes < workEndMinutes) {
      passedSeconds =
        (noonBreakStartMinutes - workStartMinutes + (nowMinutes - noonBreakEndMinutes)) * 60;
    } else {
      passedSeconds = effectiveWorkSeconds;
    }
  } else {
    if (nowMinutes <= workStartMinutes) {
      passedSeconds = 0;
    } else if (nowMinutes > workStartMinutes && nowMinutes < workEndMinutes) {
      passedSeconds = (nowMinutes - workStartMinutes) * 60;
    } else {
      passedSeconds = effectiveWorkSeconds;
    }
  }

  const todayPercent =
    effectiveWorkSeconds > 0 ? Math.min(1, Math.max(0, passedSeconds / effectiveWorkSeconds)) : 0;
  const earnedToday = todayPercent * coinPerDay;

  return (
    <AppContext.Provider
      value={{
        workStartMinutes,
        setWorkStartMinutes,
        workEndMinutes,
        setWorkEndMinutes,
        isHaveNoonBreak,
        setIsHaveNoonBreak,
        noonBreakStartMinutes,
        setNoonBreakStartMinutes,
        noonBreakEndMinutes,
        setNoonBreakEndMinutes,
        monthPaid,
        setMonthPaid,
        dayWorkOfMonth,
        setDayWorkOfMonth,
        currencyUnit,
        setCurrencyUnit,
        compactMode,
        setCompactMode,
        menubarRunning,
        setMenubarRunning,
        restoreDefault,
        isConfigured,
        isEditingConfig,
        confirmConfig,
        openConfig,
        effectiveWorkSeconds,
        effectiveWorkHours,
        coinPerDay,
        coinPerSecond,
        todayPercent,
        earnedToday,
        nowMinutes,
        isWorkTimeValid,
        isMounted,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
