import React, { useContext } from 'react';
import cx from 'classnames';
import styles from './index.module.scss';
import HeaderStyleContext from '@/context/HeaderStyleContext';
import { useI18n } from '@/i18n';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  loginClassName?: string;
  signUpClassName?: string;
}

export default function LoginLink(props: Props) {
  const { className, style, signUpClassName } = props;
  const { locale, shortLang } = useI18n();
  const styleContext = useContext(HeaderStyleContext);
  const primaryButton = styleContext?.primaryButton;

  return (
    <div className={cx(styles.loginLink, className)} style={style}>
      {/* {locale === 'zh-CN' && (
        <>
          {!hideLogin && (
            <NavLink
              // href={`https://apps.voc.ai/app?lang=${shortLang}`}
              href={`https://apps.voc.ai/account/#/cnLoginOfficial?lang=${shortLang}`}
              className={cx(styles.btnLogin, loginClassName)}
              text="登录"
              target="_blank"
              onClick={() => {
                sumLog('nav_login_btn_cn');
              }}
            />
          )}

          <NavLink
            // href="https://apps.voc.ai/account?redirect=%2Fvoc#/cnRegisterOfficial?lang=cn"
            href={`https://apps.voc.ai/account/#/cnRegisterOfficial?lang=${shortLang}`}
            className={cx(styles.btn, signUpClassName)}
            style={{ background: ACTION_BTN_DEFAULT_COLOR }}
            text="注册"
            target="_blank"
            onClick={() => {
              sumLog('nav_signup_btn_cn');
            }}
          />
        </>
      )} */}
      {locale !== 'zh-CN' && (
        <>
          <div className={styles.blurBack}>
            <a
              className={cx(styles.btn, signUpClassName)}
              style={{
                background:
                  primaryButton?.backgroundColor || 'rgba(18, 18, 18, 0.92)',
                border: primaryButton?.borderColor
                  ? `1px solid ${primaryButton?.borderColor}`
                  : undefined,
                color: primaryButton?.color,
              }}
              target="_blank"
              // href={`https://apps.voc.ai/account?redirect=%2Fvoc#/enRegisterOfficial?lang=${shortLang}`}
              href={`https://apps.voc.ai/account/#/enRegisterOfficial?lang=${shortLang}`}
              onClick={() => {
                // if (isCN) {
                //   sumLog('nav_signup_btn_cn');
                // } else {
                //   sumLog('nav_signup_btn_en');
                // }
              }}
            >
              {'Get started'}
            </a>
          </div>
        </>
      )}
    </div>
  );
}
