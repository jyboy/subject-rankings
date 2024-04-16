import { getSystemInfoSync, getStorageSync } from '@tarojs/taro';

// TODO: JSDoc
export const detectLang = () => {
  return (
    getStorageSync('language') ||
    new Intl.Locale(getSystemInfoSync().language).language
  );
};
