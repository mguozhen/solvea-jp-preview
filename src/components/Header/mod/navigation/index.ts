import en from './en';
import jp from './jp';
import cn from './cn';
import { getLang } from '@/i18n';
interface Props {
  lang?: string;
}

export interface NavData {
  type?: string;
  name: string;
  href?: string; // 没写就不加动作
  logo?: React.ReactNode;
  qrCode?: string;
  sum?: string;
  children?: NavData[];
  column?: number;
  description?: string;
  target?: string;
}

export default function getNavigation(props: Props): NavData[] {
  const { lang } = props;
  return en();
  const l = lang || getLang();
  switch (l) {
    case 'jp':
    case 'ja-JP':
      return jp() as NavData[];
    case 'cn':
    case 'zh-CN':
      return cn() as NavData[];
    default:
      return en() as NavData[];
  }
}
