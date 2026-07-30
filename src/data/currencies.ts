export interface CurrencyItem {
  code: string;
  symbol: string;
  nameZh: string;
  nameEn: string;
}

export const CURRENCIES: CurrencyItem[] = [
  // Major Global Currencies
  { code: 'CNY', symbol: '¥', nameZh: '人民币 (Chinese Yuan)', nameEn: 'Chinese Yuan (CNY)' },
  { code: 'USD', symbol: '$', nameZh: '美元 (US Dollar)', nameEn: 'US Dollar (USD)' },
  { code: 'EUR', symbol: '€', nameZh: '欧元 (Euro)', nameEn: 'Euro (EUR)' },
  { code: 'GBP', symbol: '£', nameZh: '英镑 (British Pound)', nameEn: 'British Pound (GBP)' },
  { code: 'JPY', symbol: '¥', nameZh: '日元 (Japanese Yen)', nameEn: 'Japanese Yen (JPY)' },
  { code: 'HKD', symbol: 'HK$', nameZh: '港币 (Hong Kong Dollar)', nameEn: 'Hong Kong Dollar (HKD)' },
  { code: 'TWD', symbol: 'NT$', nameZh: '新台币 (New Taiwan Dollar)', nameEn: 'New Taiwan Dollar (TWD)' },
  { code: 'SGD', symbol: 'S$', nameZh: '新加坡元 (Singapore Dollar)', nameEn: 'Singapore Dollar (SGD)' },
  { code: 'KRW', symbol: '₩', nameZh: '韩元 (South Korean Won)', nameEn: 'South Korean Won (KRW)' },

  // Asia-Pacific & Oceania
  { code: 'AUD', symbol: 'A$', nameZh: '澳大利亚元 (Australian Dollar)', nameEn: 'Australian Dollar (AUD)' },
  { code: 'CAD', symbol: 'C$', nameZh: '加拿大元 (Canadian Dollar)', nameEn: 'Canadian Dollar (CAD)' },
  { code: 'NZD', symbol: 'NZ$', nameZh: '新西兰元 (New Zealand Dollar)', nameEn: 'New Zealand Dollar (NZD)' },
  { code: 'MYR', symbol: 'RM', nameZh: '马来西亚林吉特 (Malaysian Ringgit)', nameEn: 'Malaysian Ringgit (MYR)' },
  { code: 'THB', symbol: '฿', nameZh: '泰铢 (Thai Baht)', nameEn: 'Thai Baht (THB)' },
  { code: 'VND', symbol: '₫', nameZh: '越南盾 (Vietnamese Dong)', nameEn: 'Vietnamese Dong (VND)' },
  { code: 'PHP', symbol: '₱', nameZh: '菲律宾比索 (Philippine Peso)', nameEn: 'Philippine Peso (PHP)' },
  { code: 'IDR', symbol: 'Rp', nameZh: '印尼盾 (Indonesian Rupiah)', nameEn: 'Indonesian Rupiah (IDR)' },
  { code: 'MOP', symbol: 'MOP$', nameZh: '澳门元 (Macanese Pataca)', nameEn: 'Macanese Pataca (MOP)' },
  { code: 'INR', symbol: '₹', nameZh: '印度卢比 (Indian Rupee)', nameEn: 'Indian Rupee (INR)' },
  { code: 'PKR', symbol: 'Rs', nameZh: '巴基斯坦卢比 (Pakistani Rupee)', nameEn: 'Pakistani Rupee (PKR)' },

  // Europe & Middle East
  { code: 'CHF', symbol: 'CHF', nameZh: '瑞士法郎 (Swiss Franc)', nameEn: 'Swiss Franc (CHF)' },
  { code: 'SEK', symbol: 'kr', nameZh: '瑞典克朗 (Swedish Krona)', nameEn: 'Swedish Krona (SEK)' },
  { code: 'NOK', symbol: 'kr', nameZh: '挪威克朗 (Norwegian Krone)', nameEn: 'Norwegian Krone (NOK)' },
  { code: 'DKK', symbol: 'kr', nameZh: '丹麦克朗 (Danish Krone)', nameEn: 'Danish Krone (DKK)' },
  { code: 'PLN', symbol: 'zł', nameZh: '波兰兹罗提 (Polish Zloty)', nameEn: 'Polish Zloty (PLN)' },
  { code: 'CZK', symbol: 'Kč', nameZh: '捷克克朗 (Czech Koruna)', nameEn: 'Czech Koruna (CZK)' },
  { code: 'HUF', symbol: 'Ft', nameZh: '匈牙利福林 (Hungarian Forint)', nameEn: 'Hungarian Forint (HUF)' },
  { code: 'TRY', symbol: '₺', nameZh: '土耳其里拉 (Turkish Lira)', nameEn: 'Turkish Lira (TRY)' },
  { code: 'RUB', symbol: '₽', nameZh: '俄罗斯卢布 (Russian Ruble)', nameEn: 'Russian Ruble (RUB)' },
  { code: 'AED', symbol: 'AED', nameZh: '阿联酋迪拉姆 (UAE Dirham)', nameEn: 'UAE Dirham (AED)' },
  { code: 'SAR', symbol: 'SAR', nameZh: '沙特里亚尔 (Saudi Riyal)', nameEn: 'Saudi Riyal (SAR)' },
  { code: 'QAR', symbol: 'QAR', nameZh: '卡塔尔里亚尔 (Qatari Riyal)', nameEn: 'Qatari Riyal (QAR)' },
  { code: 'ILS', symbol: '₪', nameZh: '以色列新谢克尔 (Israeli Shekel)', nameEn: 'Israeli New Shekel (ILS)' },

  // Americas & Africa
  { code: 'MXN', symbol: '$', nameZh: '墨西哥比索 (Mexican Peso)', nameEn: 'Mexican Peso (MXN)' },
  { code: 'BRL', symbol: 'R$', nameZh: '巴西雷亚尔 (Brazilian Real)', nameEn: 'Brazilian Real (BRL)' },
  { code: 'ARS', symbol: '$', nameZh: '阿根廷比索 (Argentine Peso)', nameEn: 'Argentine Peso (ARS)' },
  { code: 'CLP', symbol: '$', nameZh: '智利比索 (Chilean Peso)', nameEn: 'Chilean Peso (CLP)' },
  { code: 'COP', symbol: '$', nameZh: '哥伦比亚比索 (Colombian Peso)', nameEn: 'Colombian Peso (COP)' },
  { code: 'ZAR', symbol: 'R', nameZh: '南非兰特 (South African Rand)', nameEn: 'South African Rand (ZAR)' },
  { code: 'EGP', symbol: 'EGP', nameZh: '埃及镑 (Egyptian Pound)', nameEn: 'Egyptian Pound (EGP)' },
  { code: 'NGN', symbol: '₦', nameZh: '尼日利亚奈拉 (Nigerian Naira)', nameEn: 'Nigerian Naira (NGN)' },

  // Digital Assets & Points
  { code: 'USDT', symbol: '₮', nameZh: '泰达币 (Tether USDT)', nameEn: 'Tether (USDT)' },
  { code: 'BTC', symbol: '₿', nameZh: '比特币 (Bitcoin)', nameEn: 'Bitcoin (BTC)' },
  { code: 'ETH', symbol: 'Ξ', nameZh: '以太坊 (Ethereum)', nameEn: 'Ethereum (ETH)' },
  { code: 'PTS', symbol: 'Pts', nameZh: '积分/通用点数 (Points)', nameEn: 'Points / Credits (PTS)' },
];
