'use client';

import { usePathname } from 'next/navigation';
import { getPathNameLang } from 'util/common';
import { setLang } from '@/i18n';
import { setLang as setLangOld } from 'util/i18nOld/i18nOld';

interface Props {
  origin?: string;
}

export default function LanguageSetter(props: Props) {
  const { origin } = props;
  const pathname = usePathname();
  const lang = getPathNameLang(pathname, origin);
  setLang(lang);
  setLangOld(lang as any);
  //   useEffect(() => {
  //     const lang = getPathNameLang(pathname);
  //     if (lang) {
  //       console.log('lang', lang);
  //       setLang(lang);
  //     }
  //   }, [pathname]);

  return null;
}
