import { DEFAULT_OG_IMAGE, SITE_WITH_PORTAL } from '@/constant/base';
import { generateHrefLangConfig } from 'components/Header/mod/HrefLang';
import i18n, { setLang } from '@/i18n';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { decodePathnameToCanonical, getPathNameLang } from 'util/common';
import HomeContent from './HomeContent';

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const pathname = decodePathnameToCanonical(headerList.get('voc-pathname') || '/');
  const origin = headerList.get('voc-host') || '';
  const currentLang = getPathNameLang(pathname, origin) as string;
  setLang(currentLang);

  const title = i18n('solvea.Home_meta_title');
  const description = i18n('solvea.Home_meta_desc');

  return {
    title,
    description,
    alternates: generateHrefLangConfig('/', currentLang, SITE_WITH_PORTAL),
    openGraph: {
      title,
      description,
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'Solvea - AI Receptionist' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default function Home() {
  return <HomeContent />;
}
