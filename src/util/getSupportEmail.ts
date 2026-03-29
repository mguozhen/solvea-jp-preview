import { getLang } from '@/i18n';

export function getSupportEmail() {
  const lang = getLang();

  return (
    {
      'ja-JP': 'support@voc.ai',
    }[lang] || 'support@solvea.cx'
  );
}
