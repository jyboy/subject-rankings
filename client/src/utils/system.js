import { getSystemInfoSync } from '@tarojs/taro';

// TODO: JSDoc
export const isPC = () => {
  const { platform, screenWidth } = getSystemInfoSync();
  return (
    ['os x', 'windows'].includes(platform.toLowerCase()) || screenWidth >= 768
  );
};
