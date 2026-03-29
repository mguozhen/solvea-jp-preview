import localFont from 'next/font/local';

// display: 'optional' 避免字体加载完成后从 fallback 切换到 web font 导致整页重排（CLS）
// adjustFontFallback 让 fallback 与主字体尺寸接近，进一步减少布局偏移
export const RobotoMon = localFont({
  src: './Roboto_Mono/RobotoMono-VariableFont_wght.ttf',
  variable: '--font-Roboto_Mono',
  display: 'optional',
  preload: true,
  fallback: ['monospace'],
  adjustFontFallback: 'Arial',
});

export const IBMPlexMono = localFont({
  src: [
    {
      path: './IBM_Plex_Mono/IBMPlexMono-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './IBM_Plex_Mono/IBMPlexMono-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-IBM_Plex_Mono',
  display: 'optional',
  preload: true,
  fallback: ['monospace'],
  adjustFontFallback: 'Arial',
});

// preload: false 避免大体积 Variable 字体阻塞首屏；日文页首次渲染用 fallback，字体就绪后切换
export const NotoSansJP = localFont({
  src: './Noto_Sans_JP/NotoSansJP-VariableFont_wght.ttf',
  variable: '--font-Noto_Sans_JP',
  display: 'optional',
  preload: false,
  fallback: ['sans-serif'],
  adjustFontFallback: 'Arial',
});

export const NeueHelvetica = localFont({
  src: [
    {
      path: './NeueHelveticaPro65Medium/font.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './NeueHelveticaPro65Medium/font.woff',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-NeueHelvetica',
  display: 'optional',
  preload: true,
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
  adjustFontFallback: 'Arial',
});
