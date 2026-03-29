import { headers } from 'next/headers';

export async function GET(request: Request) {
  // ====================== 爬虫检测与日志记录 ======================
  const headerList = headers();
  const userAgent = headerList.get('user-agent') || '';

  // 检测是否是爬虫（包括 Google、Bing、Yahoo、百度等）
  const crawlerPatterns = [
    'Googlebot',
    'Google-InspectionTool',
    'AdsBot-Google',
    'Mediapartners-Google',
    'bingbot',
    'Slurp', // Yahoo
    'DuckDuckBot',
    'Baiduspider',
    'YandexBot',
    'Sogou',
    'Exabot',
    'facebot', // Facebook
    'ia_archiver', // Alexa
  ];

  const isCrawler = crawlerPatterns.some((pattern) =>
    userAgent.toLowerCase().includes(pattern.toLowerCase()),
  );

  if (isCrawler) {
    console.log('🤖 [爬虫访问 robots.txt] =============================');
    console.log('时间:', new Date().toISOString());
    console.log('访问URL:', request.url);
    console.log('');
    console.log('📋 所有请求头信息:');
    console.log('---------------------------------------------------');

    // 遍历并打印所有请求头
    const allHeaders = {};
    headerList.forEach((value, key) => {
      allHeaders[key] = value;
      console.log(`  ${key}: ${value}`);
    });

    console.log('================================================\n');
  }
  // Method to source urls from cms
  const url = new URL(request.url);
  const { protocol } = url;

  const host = headerList.get('voc-host') || url.hostname || '';

  // 测试环境先禁用搜索引擎记录，因为当前仍然有老页面及其sitemap存在，防止混淆旧版搜索引擎记录
  // 使用请求 URL 的 hostname 判断，避免 voc-host 未设置时误判为生产环境
  const isArrow = !host.includes('staging');

  return new Response(`# *
User-agent: *
Disallow: /cdn-cgi/
${isArrow ? 'Allow: /' : 'Disallow: /'}

# Host
Host: ${protocol}//${process.env.HOST || host}

# Sitemaps
Sitemap: ${protocol}//${process.env.HOST || host}/sitemap-index.xml`);
}
