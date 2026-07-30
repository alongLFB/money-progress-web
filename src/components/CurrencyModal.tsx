'use client';

import React, { useState } from 'react';
import { Search, X, Check } from 'lucide-react';
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

  if (!isOpen) return null;

  const filteredCurrencies = CURRENCIES.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.code.toLowerCase().includes(q) ||
      c.nameZh.toLowerCase().includes(q) ||
      c.nameEn.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span>💱</span> {t('selectCurrency')}
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={t('searchCurrency')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>
        </div>

        {/* Currency List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 divide-y divide-slate-100 dark:divide-slate-800/40">
          {filteredCurrencies.map((item: CurrencyItem) => {
            const isSelected = selectedCurrency === item.code;
            return (
              <button
                key={item.code}
                onClick={() => {
                  onSelect(item.code);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-300 font-bold'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl font-mono font-bold text-blue-500 w-8 text-center">{item.symbol}</span>
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
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 rounded-xl transition-all"
          >
            {t('cancel')}
          </button>
        </div>
      </div>
    </div>
  );
}
