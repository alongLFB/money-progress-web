'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Check, PlusCircle } from 'lucide-react';
import { CURRENCIES, CurrencyItem } from '@/data/currencies';
import { useTranslations, useLocale } from 'next-intl';

interface CurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCurrency: string;
  onSelect: (code: string) => void;
}

export function CurrencyModal({ isOpen, onClose, selectedCurrency, onSelect }: CurrencyModalProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on ESC key & Reset / Focus search when opened
  useEffect(() => {
    if (!isOpen) return;

    setSearch('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmedSearch = search.trim();
  const searchLower = trimmedSearch.toLowerCase();

  const filteredCurrencies = CURRENCIES.filter((c) => {
    if (!searchLower) return true;
    return (
      c.code.toLowerCase().includes(searchLower) ||
      c.nameZh.toLowerCase().includes(searchLower) ||
      c.nameEn.toLowerCase().includes(searchLower) ||
      c.symbol.toLowerCase().includes(searchLower)
    );
  });

  const isExactPresetMatch = CURRENCIES.some(
    (c) => c.code.toLowerCase() === searchLower || c.symbol.toLowerCase() === searchLower
  );

  const handleSelectCustom = () => {
    if (!trimmedSearch) return;
    onSelect(trimmedSearch.toUpperCase());
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span>💱</span> {t('selectCurrency')}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder={t('searchCurrency')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && trimmedSearch && !filteredCurrencies.length) {
                  handleSelectCustom();
                }
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>
        </div>

        {/* Currency List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 divide-y divide-slate-100 dark:divide-slate-800/40">
          {/* Custom option if user typed something not matching exactly */}
          {trimmedSearch && !isExactPresetMatch && (
            <button
              onClick={handleSelectCustom}
              className="w-full flex items-center justify-between p-3 rounded-2xl text-left bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/80 text-blue-600 dark:text-blue-300 font-bold hover:bg-blue-100/60 dark:hover:bg-blue-900/60 transition-all cursor-pointer mb-2"
            >
              <div className="flex items-center gap-3">
                <PlusCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <div>
                  <div className="text-xs font-mono font-bold">
                    {t('useCustomCurrency', { unit: trimmedSearch.toUpperCase() })}
                  </div>
                  <div className="text-[11px] opacity-80 font-normal">
                    {t('customCurrency')}
                  </div>
                </div>
              </div>
            </button>
          )}

          {filteredCurrencies.length > 0 ? (
            filteredCurrencies.map((item: CurrencyItem) => {
              const isSelected = selectedCurrency === item.code || selectedCurrency === item.symbol;
              return (
                <button
                  key={item.code}
                  onClick={() => {
                    onSelect(item.code);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-300 font-bold'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono font-extrabold text-blue-500 w-10 text-center px-1 py-0.5 rounded bg-blue-50 dark:bg-blue-950/80 border border-blue-100 dark:border-blue-900">
                      {item.symbol}
                    </span>
                    <div>
                      <div className="text-xs font-mono font-bold">{item.code}</div>
                      <div className="text-[11px] text-slate-400 font-normal">
                        {locale === 'zh' ? item.nameZh : item.nameEn}
                      </div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-blue-500 flex-shrink-0" />}
                </button>
              );
            })
          ) : (
            !trimmedSearch && (
              <div className="p-8 text-center text-xs text-slate-400">
                {t('noCurrencyFound')}
              </div>
            )
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 text-right bg-slate-50/50 dark:bg-slate-900/50">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 rounded-xl transition-all cursor-pointer"
          >
            {t('cancel')}
          </button>
        </div>
      </div>
    </div>
  );
}
