import { SITE_WITH_PORTAL } from '@/constant/base';
import { generateHrefLangConfig } from 'components/Header/mod/HrefLang';
import i18n from '@/i18n';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { decodePathnameToCanonical, getPathNameLang } from 'util/common';
import Agent from './Agent';

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const pathname = decodePathnameToCanonical(headerList.get('voc-pathname') || '/agent');
  const origin = headerList.get('voc-host') || '';
  const currentLang = getPathNameLang(pathname, origin) as string;

  return {
    title: i18n('solvea.Agent_Meta_Title'),
    description: i18n('solvea.Agent_Meta_Desc'),
    alternates: generateHrefLangConfig(pathname, currentLang, SITE_WITH_PORTAL),
  };
}

export default function AgentPage() {
  return <Agent />;
}
