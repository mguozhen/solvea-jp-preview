// app/server-sitemap.xml/route.ts
import { stat } from 'fs/promises';
import path from 'path';
import { getServerSideSitemap } from 'next-sitemap';

async function getRouteFileMtime(): Promise<string> {
  try {
    const routePath = path.join(process.cwd(), 'src/app/sitemap.xml/route.ts');
    const s = await stat(routePath);
    return s.mtime.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const { protocol, host } = url;

  // 仅包含可访问页面；/compare、/solutions 已移除。含 jp/es/de 语言首页及 contact（H4：de 加入 sitemap）
  const pathNames = [
    '',
    'jp',
    'es',
    'de',
    'contact',
    'jp/contact',
    'es/contact',
    'de/contact',
    'customer-stories',
    'glossary',
  ];

  const base = `${protocol}//${process.env.HOST || host}`;
  const lastmod = await getRouteFileMtime();

  return getServerSideSitemap(
    pathNames.map((pathname) => ({
      loc: pathname ? `${base}/${pathname}` : `${base}/`,
      lastmod,
    })),
  );
}
