import { readFile } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from 'next/server';

/** 显式路由，避免被根级 app/[...slug] 抢先匹配；Docker standalone 使用 /content/llms.txt */
async function readLlmsBody(): Promise<string | null> {
  const cwd = process.cwd();
  const candidates = [
    join(cwd, 'src', 'content', 'llms.txt'),
    join(cwd, 'content', 'llms.txt'),
    join(cwd, 'public', 'llms.txt'),
  ];
  for (const p of candidates) {
    try {
      return await readFile(p, 'utf-8');
    } catch {
      /* try next */
    }
  }
  return null;
}

export async function GET() {
  const body = await readLlmsBody();
  if (body === null) {
    return new NextResponse('Not Found', { status: 404 });
  }
  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
