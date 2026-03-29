import { DEFAULT_OG_IMAGE, HTML_LANG_MAP, SITE_URL } from '@/constant/base';
import { IBMPlexMono, NeueHelvetica, NotoSansJP, RobotoMon } from '@/fonts';
import { getLang, setLang } from '@/i18n';
import '@/theme/reset.css';
import classNames from 'classnames';
import StructuredData from 'components/StructuredData';
import { type Metadata } from 'next';
import dynamic from 'next/dynamic';
import { headers } from 'next/headers';
import LanguageSetter from 'pages/langSet';
import { Footer } from 'pages/mod/Footer';
import Header from 'pages/mod/Header';
import { Responsive } from 'pages/Responsive';
import { ReactNode } from 'react';
import { decodePathnameToCanonical, getPathNameLang } from 'util/common';
import './global.css';
import styles from './layout.module.scss';

/**
 * 全站公共 head（由 Next Metadata API 注入 `<meta property="og:*" />` 等，无需在下方 `<head>` 手写 og:image）。
 * 默认含 og:image / twitter:image（DEFAULT_OG_IMAGE）。子路由 generateMetadata 若返回不完整 openGraph（例如只写 locale），
 * 可能覆盖掉图片，应在子页补全 images 或勿单独传 openGraph。
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  title: {
    default: 'Deploy Your AI Receptionist in Under 3 Minutes | Solvea',
    template: '%s',
  },
  description:
    'Solvea answers phone calls, emails, SMS and live chats so you never miss a customer. Easy to set up with no code required.',
  openGraph: {
    type: 'website',
    // 使用当前的语言
    locale: HTML_LANG_MAP[getLang()],
    url: SITE_URL,
    siteName: 'Solvea',
    title: 'Deploy Your AI Receptionist in Under 3 Minutes | Solvea',
    description:
      'Solvea answers phone calls, emails, SMS and live chats so you never miss a customer. Easy to set up with no code required.',
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Solvea - AI Receptionist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deploy Your AI Receptionist in Under 3 Minutes | Solvea',
    description:
      'Solvea answers phone calls, emails, SMS and live chats so you never miss a customer. Easy to set up with no code required.',
    images: [DEFAULT_OG_IMAGE],
  },
};

/** 仅延迟加载追踪/客服脚本，不参与首屏，降低 TBT（主线程脚本评估时间） */
const LiveChatScript = dynamic(
  () => import('@/components/LiveChatScript').then((m) => ({ default: m.LiveChatScript })),
  { ssr: false },
);
const PostAffiliatePro = dynamic(
  () => import('@/components/PostAffiliatePro').then((m) => ({ default: m.PostAffiliatePro })),
  { ssr: false },
);
const GoogleIdentityServicesHost = dynamic(
  () =>
    import('@/components/GoogleIdentityServicesHost').then((m) => ({
      default: m.GoogleIdentityServicesHost,
    })),
  { ssr: false },
);

interface Props {
  href?: string;
  children?: ReactNode;
}

/** 使用 Next 的 viewport 导出，不限制缩放以通过无障碍审计（避免 user-scalable=no / maximum-scale<5） */
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  // 允许内容延伸到安全区之外，配合 env(safe-area-inset-*) 精确留白
  // 对无刘海屏设备无任何影响
  viewportFit: 'cover',
};

export default function PageBase({ children }: Props) {
  const headerList = headers();
  const pathname = decodePathnameToCanonical(headerList.get('voc-pathname') || '') || '/';
  const origin = headerList.get('voc-host') || headerList.get('host') || '';
  setLang(getPathNameLang(pathname, origin) as any);
  const lang = getLang();
  const isJp = 'ja-JP' === lang;

  // 检查是否为 /agent 路径
  const isAgentPage = pathname === '/agent';

  // 检查是否是旧域名 solvea.voc.ai
  const isOldDomain =
    origin.includes('solvea.voc.ai') ||
    origin.includes('solvea-staging.voc.ai') ||
    pathname.includes('/solutions/');
  // staging 环境（如 staging.solvea.cx）不收录
  const isStaging = origin.toLowerCase().includes('staging');

  // 检查是否是定价页面且来自 LTD 页面
  const isPrcingLtdPage = pathname.includes('pricingLtd');

  // 导航栏统一使用英文字体样式，故始终注入 IBM Plex Mono
  const fontClass = isJp
    ? classNames(NotoSansJP.variable, IBMPlexMono.variable)
    : classNames(
        RobotoMon.variable,
        IBMPlexMono.variable,
        NotoSansJP.variable,
        NeueHelvetica.variable,
      );

  return (
    <html
      lang={HTML_LANG_MAP[lang]}
      className={classNames('notranslate', fontClass)}
      translate="no"
    >
      <head>
        {/* 根字号 + --font-scale 仅用 CSS 首屏生效，避免 useRemAdapter 等脚本在渲染后写 html style 导致跳动 */}
        <style
          dangerouslySetInnerHTML={{
            __html: `html{font-size:16px}@media(max-width:479px){html{font-size:calc(100vw/375*16)}}@media(min-width:480px)and(max-width:719px){html{font-size:8px}}@media(min-width:720px)and(max-width:1439px){html{font-size:calc(100vw/1440*16)}}@media(min-width:1440px){html{font-size:min(calc(100vw/1440*16),18px)}}@media(max-width:768px){html{--font-scale:0.5}}@media(min-width:769px)and(max-width:1720px){html{--font-scale:1}}@media(min-width:1721px){html{--font-scale:1.125}}`,
          }}
        />
        <link rel="icon" href="/new-solvea.ico" />
        {/* 旧域名或 staging 环境添加 noindex，阻止搜索引擎索引 */}
        {(isOldDomain || isStaging) && <meta name="robots" content="noindex, nofollow" />}

        {/* JSON-LD：Organization + SoftwareApplication 全站；首页额外 FAQPage */}
        <StructuredData pathname={pathname} />

        {/* Ant Design 样式：使用稳定的 media，避免 hydration 阶段属性不一致告警 */}
        <link id="antd-css" rel="stylesheet" href="/antd.min.css" media="all" />
        <noscript>
          <link rel="stylesheet" href="/antd.min.css" />
        </noscript>

        {/* 性能优化：DNS 预解析和预连接 */}
        <link rel="dns-prefetch" href="https://cdn.shulex-voc.com" />
        <link rel="preconnect" href="https://cdn.shulex-voc.com" crossOrigin="anonymous" />

        {/* 第三方服务的 DNS 预解析 - 不使用 preconnect 避免阻塞 */}
        <link rel="dns-prefetch" href="https://analytics.ahrefs.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://apps.voc.ai" />
        <link rel="dns-prefetch" href="https://solveacx.postaffiliatepro.com" />

        {/* 首屏 LCP 图片预加载，缩短 FCP/LCP（首页 Hero 图，按视口只预加载一个） */}
        <link
          rel="preload"
          as="image"
          href="https://cdn.shulex-voc.com/shulex/upload/2026-02-26/fcbc3bda-32ce-495b-8205-83e94d270b66.webp"
          type="image/webp"
          media="(min-width: 769px)"
        />
        <link
          rel="preload"
          as="image"
          href="https://cdn.shulex-voc.com/shulex/upload/2026-02-26/e402910c-0c2e-4337-b5ca-2ab95e12e692.webp"
          type="image/webp"
          media="(max-width: 768px)"
        />

        {/* 预加载关键字体（如果有） */}
        {/* <link rel="preload" href="/fonts/your-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /> */}

        {/* 延迟加载第三方脚本 - 使用更激进的延迟策略 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // 延迟加载 Ahrefs Analytics（3秒后或用户交互后）
              (function() {
                var loaded = false;
                function loadAhrefs() {
                  if (loaded) return;
                  loaded = true;
                  var s = document.createElement('script');
                  s.src = 'https://analytics.ahrefs.com/analytics.js';
                  s.setAttribute('data-key', 'rZaF0Kpu7QonBHq3UWtGnw');
                  s.async = true;
                  document.head.appendChild(s);
                }
                // 3秒后或用户交互时加载
                setTimeout(loadAhrefs, 3000);
                ['mousedown', 'touchstart', 'scroll', 'keydown'].forEach(function(evt) {
                  window.addEventListener(evt, loadAhrefs, {once: true, passive: true});
                });
              })();
            `,
          }}
        />

        {/* Google Tag Manager 延迟加载 - 主线程空闲或用户交互时加载，降低 TBT */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                var loaded = false;
                function loadGTM() {
                  if (loaded) return;
                  loaded = true;
                  w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});
                  var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                  j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                  f.parentNode.insertBefore(j,f);
                }
                // 主线程空闲时加载，最晚 3.5 秒，降低 TBT
                if (w.requestIdleCallback) {
                  w.requestIdleCallback(loadGTM, { timeout: 3500 });
                } else {
                  w.setTimeout(loadGTM, 2500);
                }
                ['mousedown', 'touchstart', 'scroll'].forEach(function(evt) {
                  w.addEventListener(evt, loadGTM, {once: true, passive: true});
                });
              })(window,document,'script','dataLayer','GTM-WRD9G2QJ');
            `,
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WRD9G2QJ"
            height="0"
            width="0"
            style={{
              display: 'none',
              visibility: 'hidden',
            }}
          ></iframe>
        </noscript>
        {/* 禁止刷新后恢复滚动位置，避免首屏跳动 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if('scrollRestoration' in history) history.scrollRestoration='manual';`,
          }}
        />
        {/* 注入服务端语言，供客户端 hydration 时 getLang() 一致，避免首屏跳动 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__INITIAL_LANG__="${lang
              .replace(/\\/g, '\\\\')
              .replace(/"/g, '\\"')}";`,
          }}
        />
        {/* PostAffiliatePro 客户端追踪组件 */}
        <PostAffiliatePro />

        {/* Google One Tap：与 plg 产品同登录接口，挂载节点 + 客户端触发 */}
        <GoogleIdentityServicesHost initialLang={lang} skip={isAgentPage} />

        {/* 清除 URL 中的 _nolang 参数 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && window.location.search.includes('_nolang=1')) {
                const url = new URL(window.location.href);
                url.searchParams.delete('_nolang');
                window.history.replaceState({}, '', url.pathname + (url.search || ''));
              }
            `,
          }}
        />
        <div className={`${styles.container} solvea-root`}>
          <LanguageSetter />
          {/* <HomeTopBannerBlock /> */}
          {isPrcingLtdPage ? null : <Header />}
          <main className={styles.main}>{children}</main>
          {!isAgentPage && <Footer />}
          <Responsive />
        </div>
        {!isAgentPage && <LiveChatScript />}
      </body>
    </html>
  );
}
