import { useCallback, useEffect } from 'react';

/**
 * 字体大小自适应 hook - 支持多断点
 * 通过 CSS 变量来控制字体大小缩放，只影响使用 --font-scale 变量的字体
 * 
 * 用法示例：
 * ```
 * useRemAdapter({
 *   mobile: { breakpoint: 768, scale: 0.5 },       // 手机端（≤768px）：字体缩放 50%
 *   tablet: { breakpoint: 1024, scale: 1.0 },      // 平板（1024px-1720px）：字体缩放 100%
 *   desktop: { scale: 1.125 }                       // 桌面端（≥1720px）：字体缩放 112.5%
 * });
 * ```
 * 
 * @param config - 配置对象，包含不同设备的断点和缩放比例
 */
interface RemAdapterConfig {
  mobile?: { breakpoint: number; scale: number };
  tablet?: { breakpoint: number; scale: number };
  desktop?: { scale: number };
}

export function useRemAdapter(config: RemAdapterConfig = {}) {
  const {
    mobile = { breakpoint: 768, scale: 0.5 },
    tablet = { breakpoint: 1720, scale: 1.0 },
    desktop = { scale: 1.125 },
  } = config;

  const getScale = useCallback((width: number): number => {
    if (width <= mobile.breakpoint) {
      return mobile.scale;
    } else if (width <= tablet.breakpoint) {
      return tablet.scale;
    } else {
      return desktop.scale;
    }
  }, [mobile, tablet, desktop]);

  const updateFontScale = useCallback(() => {
    const currentWidth = window.innerWidth;
    const scale = getScale(currentWidth);
    const htmlElement = document.documentElement;
    // 仅更新 --font-scale，不写 font-size，避免首屏重排（根字号由 layout 内联 CSS 控制）
    htmlElement.style.setProperty('--font-scale', scale.toString(), 'important');
  }, [getScale]);

  useEffect(() => {
    // 首屏不写 DOM，避免渲染后注入 style 导致「先大后小」；layout 已用内联 CSS 设置 --font-scale
    const handleResize = () => {
      updateFontScale();
    };

    // 仅 resize/旋转时更新
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', updateFontScale);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', updateFontScale);
    };
  }, [updateFontScale]);
}
