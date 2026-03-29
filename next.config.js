const withLess = require('next-with-less');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
// withTM 和 withLess 会导致在app/layout 引入global.css报错，用别的方式代替
const withTM = require('next-transpile-modules')([
  'shulex-util',
  // 'echarts',
  // 'zrender',
]);
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';
const basePath = path.resolve(__dirname, './');

// 仅在实际部署到 CDN 时使用 assetPrefix；本地 yarn start 不指向 CDN，避免 404/CORS。
// 线上构建需在 CI 中设置 USE_CDN=true 或 ASSET_PREFIX。
const assetPrefix =
  process.env.ASSET_PREFIX ||
  (isProd && process.env.USE_CDN === 'true'
    ? 'https://cdn.shulex-voc.com/shulex-static-solvea'
    : undefined);

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  assetPrefix,
  reactStrictMode: false,
  crossOrigin: 'anonymous',
  transpilePackages: ['shulex-util'],
  compress: true,

  // standalone 输出：只打包 server.js + 所需 node_modules，无需完整 node_modules
  // 配合多阶段 Dockerfile，镜像体积从 ~1.2GB 降至 ~300MB，ECR 推送拉取大幅提速
  output: 'standalone',

  // 性能优化配置
  poweredByHeader: false,
  generateEtags: true,
  trailingSlash: false,

  // 实验性功能 - 优化性能
  experimental: {
    // optimizeCss: true, // 优化 CSS - 需要 critters 依赖，暂时禁用
    // 移除 antd：optimizePackageImports 在部分场景会生成错误的 vendor-chunks 路径导致 Cannot find module '../vendor-chunks/antd.js'
    optimizePackageImports: ['lottie-web', 'lodash'],
  },

  // 编译器优化
  compiler: {
    removeConsole: isProd ? { exclude: ['error', 'warn'] } : false,
  },

  // 优化图片加载
  images: {
    domains: [
      'cdn.shulex-tech.com',
      'cdn.shulex-voc.com',
      'www.shulex.com',
      'www.voc.ai',
      'apps.voc.ai',
      'desk.shulex.com',
      'i.ytimg.com',
      'www.youtube.com',
      'privacy-policy.truste.com',
      'truste.com',
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // 设置默认端口
  serverRuntimeConfig: {
    port: process.env.PORT || 3000,
  },
  env: {
    APP_ENV: process.env.APP_ENV || '',
    JS_ENV: process.env.NODE_ENV || '',
    HOST: process.env.HOST || '',
  },
  eslint: {
    // Avoid CI failing due to global/root ESLint config issues
    ignoreDuringBuilds: true,
  },
  lessLoaderOptions: {
    lessOptions: {
      modules: true,
      javascriptEnabled: true,
      paths: [path.resolve(basePath, './src/')],
      modifyVars: {
        'primary-color': '#4080FF',
        'link-color': '#4080FF',
        'success-color': '#69b678',
        'warning-color': '#f29d49',
        'error-color': '#ff5252',
      },
    },
  },
  // 优化静态资源和视频文件请求头 + 安全 headers
  async headers() {
    const securityHeaders = [
      {
        key: 'X-DNS-Prefetch-Control',
        value: 'on',
      },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubDomains; preload',
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
      },
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(self), geolocation=()',
      },
      // CSP 按需放宽：若影响第三方脚本/样式可调整 default-src、script-src、style-src
      {
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:",
          "worker-src 'self' blob:",
          "style-src 'self' 'unsafe-inline' https:",
          "img-src 'self' data: blob: https:",
          "media-src 'self' https://cdn.shulex-voc.com",
          "font-src 'self' data: https:",
          "connect-src 'self' https: wss:",
          "frame-src 'self' https:",
          `frame-ancestors 'self' https://desk-staging.shulex.com https://internal.shulex.com http://localhost:3000/`,
        ].join('; '),
      },
    ];

    // 公共页面（营销/内容）允许短时缓存，便于 CDN 与性能；需 no-store 的路由单独覆盖
    const publicCacheControl = 'public, s-maxage=60, stale-while-revalidate=300';
    const noStoreControl = 'private, no-store';

    return [
      {
        source: '/:path*',
        headers: [...securityHeaders, { key: 'Cache-Control', value: publicCacheControl }],
      },
      { source: '/api/:path*', headers: [{ key: 'Cache-Control', value: noStoreControl }] },
      { source: '/register/:path*', headers: [{ key: 'Cache-Control', value: noStoreControl }] },
      {
        source: '/page-preview/:path*',
        headers: [{ key: 'Cache-Control', value: noStoreControl }],
      },
      { source: '/affiliates/:path*', headers: [{ key: 'Cache-Control', value: noStoreControl }] },
      {
        source: '/videos/:path*',
        headers: [
          {
            key: 'Accept-Ranges',
            value: 'bytes',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Content-Type',
            value: 'video/mp4',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  async rewrites() {
    const host =
      process.env.APP_ENV === 'production'
        ? 'https://apps.voc.ai'
        : process.env.APP_ENV === 'local'
        ? 'http://127.0.0.1:7002' // 你的本地 Node 服务端口
        : 'https://desk-staging.shulex.com';
    const host2 =
      process.env.APP_ENV === 'production'
        ? 'https://apps.voc.ai'
        : process.env.APP_ENV === 'local'
        ? 'http://127.0.0.1:7002' // 你的本地 Node 服务端口
        : 'https://apps-staging.voc.ai';

    return [
      // API转发
      {
        source: '/n/ai/:slug*',
        destination: `${host}/n/ai/:slug*`,
      },
      {
        source: '/n/auth/:slug*',
        destination: `${host}/n/auth/:slug*`,
      },
      {
        source: '/api_v2/voc/:slug*',
        destination: `${host}/api_v2/voc/:slug*`,
      },
      {
        source: '/n/seo/:slug*',
        destination: `${host}/n/seo/:slug*`,
      },
      {
        source: '/api_v2/ticket/user/info',
        destination: `${host2}/api_v2/ticket/user/info`,
      },
      {
        source: '/api_v2/gpt/:slug*',
        destination: `${host2}/api_v2/gpt/:slug*`,
      },
      {
        source: '/api_v2/intelli/:slug*',
        destination: `${host}/api_v2/intelli/:slug*`,
      },
      {
        source: '/api_v2/ticket/:slug*',
        destination: `${host}/api_v2/ticket/:slug*`,
      },
      {
        source: '/j/voc/:slug*',
        destination: `${host}/j/voc/:slug*`,
      },
      {
        source: '/n/amazon/:slug*',
        destination: `${host}/n/amazon/:slug*`,
      },
      {
        source: '/n/gray/:slug*',
        destination: `${host}/n/gray/:slug*`,
      },
      {
        source: '/n/blog/:slug*',
        destination: `${host}/n/blog/:slug*`,
      },
      {
        source: '/n/:slug*',
        destination: `${host}/n/:slug*`,
      },
      {
        source: '/wp-admin/n/internal/:slug*',
        destination: `${host}/wp-admin/n/internal/:slug*`,
      },
    ];
  },
});

module.exports = nextConfig;
