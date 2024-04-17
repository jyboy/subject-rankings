import { getSystemInfoSync, getStorageSync } from '@tarojs/taro';

// TODO: JSDoc
export const detectLang = () => {
  const lang = new Intl.Locale(getSystemInfoSync().language).language;
  return getStorageSync('language') || (lang === 'zh' ? 'zh' : 'en');
};
