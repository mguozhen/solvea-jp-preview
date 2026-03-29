import React, { useContext } from 'react';
import cx from 'classnames';
import styles from './index.module.scss';
import { sumLog } from 'shulex-util';
import { ACTION_BTN_DEFAULT_COLOR } from 'theme/color';
import HeaderStyleContext from '@/context/HeaderStyleContext';
import { useI18n } from '@/i18n';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  btnClassname?: string;
}

export default function MyAccountLink(props: Props) {
  const { className, style, btnClassname } = props;
  const { locale, i18n, shortLang } = useI18n();
  const styleContext = useContext(HeaderStyleContext);
  const primaryButton = styleContext?.primaryButton;
  return (
    <div className={cx(styles.loginLink, className)} style={style}>
      <a
        className={cx(styles.btn, btnClassname)}
        style={{
          background:
            primaryButton?.backgroundColor || ACTION_BTN_DEFAULT_COLOR,
          border: primaryButton?.borderColor
            ? `1px solid ${primaryButton?.borderColor}`
            : undefined,
          color: primaryButton?.color,
        }}
        target="_blank"
        href={`https://apps.voc.ai/app#/account/user?lang=${locale}`}
        onClick={() => {
          sumLog(`nav_myaccount_btn_${shortLang}`);
        }}
      >
        {i18n('homepage.myAccount')}
      </a>
    </div>
  );
}
