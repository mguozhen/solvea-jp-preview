import { PUBLIC_PAGE_REVALIDATE } from '@/constant/base';

const host =
  process.env.APP_ENV === 'production' ? 'https://apps.voc.ai' : 'https://apps-staging.voc.ai';

/**
 * 根据 slug 请求 getLandingBySlug，取 data.edit_time 或 data.post_date 作为 lastmod
 */
export async function getLastmodBySlug(slug: string): Promise<string> {
  try {
    const res = await fetch(`${host}/n/blog/getLandingBySlug?slug=${encodeURIComponent(slug)}`, {
      next: { revalidate: PUBLIC_PAGE_REVALIDATE },
    });
    const json = res?.ok ? ((await res.json()) as { data?: { edit_time?: number | string; post_date?: number | string } }) : {};
    const data = json?.data;
    const time = data?.edit_time ?? data?.post_date;
    if (time == null) return new Date().toISOString();
    if (typeof time === 'number') return new Date(time).toISOString();
    const parsed = new Date(time);
    return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
  } catch {
    return new Date().toISOString();
  }
}
