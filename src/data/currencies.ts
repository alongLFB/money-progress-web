export interface CurrencyItem {
  code: string;
  symbol: string;
  nameZh: string;
  nameEn: string;
}

export const CURRENCIES: CurrencyItem[] = [
  { code: 'CNY', symbol: '¥', nameZh: '人民币 (Yuan Renminbi)', nameEn: 'Chinese Yuan (CNY)' },
  { code: 'USD', symbol: '$', nameZh: '美元 (US Dollar)', nameEn: 'US Dollar (USD)' },
  { code: 'EUR', symbol: '€', nameZh: '欧元 (Euro)', nameEn: 'Euro (EUR)' },
  { code: 'GBP', symbol: '£', nameZh: '英镑 (Pound Sterling)', nameEn: 'British Pound (GBP)' },
  { code: 'JPY', symbol: '¥', nameZh: '日元 (Yen)', nameEn: 'Japanese Yen (JPY)' },
  { code: 'HKD', symbol: 'HK$', nameZh: '港币 (Hong Kong Dollar)', nameEn: 'Hong Kong Dollar (HKD)' },
  { code: 'TWD', symbol: 'NT$', nameZh: '新台币 (New Taiwan Dollar)', nameEn: 'New Taiwan Dollar (TWD)' },
  { code: 'SGD', symbol: 'S$', nameZh: '新加坡元 (Singapore Dollar)', nameEn: 'Singapore Dollar (SGD)' },
  { code: 'KRW', symbol: '₩', nameZh: '韩元 (Won)', nameEn: 'South Korean Won (KRW)' },
  { code: 'AUD', symbol: 'A$', nameZh: '澳大利亚元 (Australian Dollar)', nameEn: 'Australian Dollar (AUD)' },
  { code: 'CAD', symbol: 'C$', nameZh: '加拿大元 (Canadian Dollar)', nameEn: 'Canadian Dollar (CAD)' },
  { code: 'CHF', symbol: 'CHF', nameZh: '瑞士法郎 (Swiss Franc)', nameEn: 'Swiss Franc (CHF)' },
  { code: 'INR', symbol: '₹', nameZh: '印度卢比 (Indian Rupee)', nameEn: 'Indian Rupee (INR)' },
  { code: 'RUB', symbol: '₽', nameZh: '俄罗斯卢布 (Russian Ruble)', nameEn: 'Russian Ruble (RUB)' },
  { code: 'BRL', symbol: 'R$', nameZh: '巴西雷亚尔 (Brazilian Real)', nameEn: 'Brazilian Real (BRL)' },
  { code: 'THB', symbol: '฿', nameZh: '泰铢 (Thai Baht)', nameEn: 'Thai Baht (THB)' },
  { code: 'MYR', symbol: 'RM', nameZh: '马来西亚林吉特 (Malaysian Ringgit)', nameEn: 'Malaysian Ringgit (MYR)' },
  { code: 'VND', symbol: '₫', nameZh: '越南盾 (Vietnamese Dong)', nameEn: 'Vietnamese Dong (VND)' },
  { code: 'NZD', symbol: 'NZ$', nameZh: '新西兰元 (New Zealand Dollar)', nameEn: 'New Zealand Dollar (NZD)' },
  { code: 'PHP', symbol: '₱', nameZh: '菲律宾比索 (Philippine Peso)', nameEn: 'Philippine Peso (PHP)' },
];
