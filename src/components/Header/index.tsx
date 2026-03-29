'use client';
import Drawer from '@mui/material/Drawer';
import { Menu } from 'antd';
import cx from 'classnames';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './index.module.scss';
import NavLink from './mod/NavLink';
// import SvgFoldDrawer from 'components/Icons/FoldDrawer';
import HeaderStyleContext from '@/context/HeaderStyleContext';
import i18n, { useI18n } from '@/i18n';
import GoogleFonts from 'components/GoogleFonts';
import SvgLogoSmall from 'components/Icons/LogoSmall';
import SvgMenu from 'components/Icons/Menu';
import LangSwap from 'components/LangSwap';
import { Logo } from 'components/Logo';
import Nav from 'components/Nav';
import PrimaryButton from 'components/PrimaryButton';
import Head from 'next/head';
import { getLink } from 'util/getLink';
import { getUserLogin } from 'util/services';
import NavMenu from './mod/NavMenu';
import getNavigation from './mod/navigation';
import TrackingArms from './mod/tracking/arms';
import VOCAIBaidu from './mod/tracking/baidu';
import VOCGoogleAnalytics from './mod/tracking/ga';
import Hotjar from './mod/tracking/hotjar';
import TrackingProfound from './mod/tracking/profound';
import TrackingUtils from './mod/tracking/utils';

interface Props {
  className?: string;
  utmSource?: string;
  style?: React.CSSProperties;
  sticky?: boolean;
  hideMenu?: boolean;
  solid?: boolean;
  black?: boolean;
  hideLogin?: boolean;
  hideChromeExtension?: boolean;
  chromeHref?: string;
  showDetect?: boolean;
  hideLoginBtn?: boolean; // 只隐藏Log in这一个按钮
  siteConfig?: any;
  headerStyleConfig?: {
    primaryButton?: {
      backgroundColor?: string;
      color?: string;
      borderColor?: string;
    };
    defaultButton?: {
      backgroundColor?: string;
      color?: string;
      borderColor?: string;
    };
    backgroundColor?: string;
  };
  setUserInfo?: (_params?: any) => void;
}

export default function Header(props: Props) {
  const {
    className,
    style,
    sticky,
    hideMenu,
    headerStyleConfig,
    setUserInfo,
  } = props;

  let { locale, shortLang, homeUrl } = useI18n();
  const [openMenu, setOpenMenu] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const menuData = getNavigation({ lang: shortLang });

  const dealSubDataField = (list) => {
    return list?.map((v) => {
      if (v.children?.length) {
        return {
          ...v,
          label: (
            <NavLink
              text={v.name}
              href={v.href}
              titleClassName={styles.navLinkTitle}
              className={styles.navLinkText}
            />
          ),
          key: v.name,
          className: styles.navLinkText,
          children: v.children?.map((a) => {
            return {
              ...a,
              label: (
                <NavLink
                  text={a.name}
                  href={a.href}
                  className={styles.navLinkText}
                  titleClassName={styles.navLinkTitle}
                />
              ),
              key: a.name,
            };
          }),
        };
      }
      return {
        ...v,
        label: (
          <NavLink
            text={v.name}
            href={v.href}
            className={styles.navLinkText}
            titleClassName={styles.navLinkTitle}
          />
        ),
        key: v.name,
      };
    });
  };

  const mobileMenuData = useMemo(
    () =>
      menuData?.map((data) => {
        if (data?.href) {
          return {
            label: <a href={data?.href}>{data.name}</a>,
            key: data.name,
            children: dealSubDataField(data.children),
          };
        } else {
          return {
            label: data.name,
            key: data.name,
            children: dealSubDataField(data.children),
          };
        }
      }),
    menuData,
  );

  const insertChat = useCallback((email?: string) => {
    const sc = document.createElement('script');
    if (typeof window === 'object' && window) {
      (window as any).__shulexConfig = {
        email,
      };
    }
    sc.src = `https://apps.voc.ai/api_v2/gpt/bots/livechat/embed.js?id=23029&token=684958ECE4B0FDB1BCAF63DE`;
    sc.async = true;
    sc.defer = true;
    document.body.appendChild(sc);
  }, []);

  const getInfo = useCallback(async () => {
    try {
      const userInfo = await getUserLogin();
      setUserInfo?.(userInfo || {});
      insertChat(userInfo?.email);
    } catch (error) {
      console.log(error);
      setUserInfo?.({});
      insertChat();
    }
  }, []);

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      <VOCGoogleAnalytics />
      <VOCAIBaidu />
      <TrackingUtils />
      <TrackingArms />
      <Hotjar />
      <TrackingProfound />
      {locale !== 'zh-CN' && <GoogleFonts />}
      <Head>
        <meta name="baidu-site-verification" content="codeva-oehy3O1Goe" />
      </Head>
      {/* <div className={cx(styles.headPlaceholder)} /> */}
      <header className={`${styles.header}`}>
        <div className={styles.headerNav}>
          <Logo />
          <span className={styles.flexContainer}>
            <Nav />
            <LangSwap noBorder />
          </span>
        </div>
      </header>
      <HeaderStyleContext.Provider value={headerStyleConfig || {}}>
        <div
          className={cx(
            styles.topNav,
            {
              [styles.sticky]: sticky,
            },
            className,
          )}
          style={{
            ...style,
            background: headerStyleConfig?.backgroundColor,
          }}
          ref={ref}
        >
          <div className={styles.headerInner}>
            <div className={styles.left}>
              <a href={homeUrl} className={styles.mainIndex}>
                <SvgLogoSmall className={styles.logo} />
              </a>
              {!hideMenu && (
                <nav className={styles.mainActions}>
                  {menuData?.map((data) => {
                    return (
                      <NavMenu
                        key={data.name}
                        href={data.href}
                        text={data.name}
                        target={data.target}
                        sum={data.sum}
                        column={data?.column}
                        subItems={data.children || []}
                      />
                    );
                  })}
                </nav>
              )}
              {/* 折叠菜单 */}
              {!hideMenu && (
                <div className={styles.openDrawer}>
                  <div
                    className={cx(styles.menu, openMenu && styles.openMenu)}
                    onClick={() => setOpenMenu(!openMenu)}
                  >
                    <SvgMenu className={styles.icon} />
                  </div>
                  <Drawer anchor={'top'} open={openMenu} onClose={() => setOpenMenu(false)}>
                    <div className={styles.mobileDrawer}>
                      <Menu
                        rootClassName={styles.mobileMenu}
                        mode="inline"
                        items={mobileMenuData}
                        onClick={() => setOpenMenu(false)}
                      />
                    </div>
                  </Drawer>
                </div>
              )}
            </div>
            <div className={styles.rightBtns}>
              <div className={styles.rightTopActions}>
                <a href={getLink('/contact')} className={styles.link}>
                  <PrimaryButton className={styles.primaryButton} innerClassName={styles.innerBtn}>
                    {i18n('layout.Common_GetStarted')}
                  </PrimaryButton>
                </a>
              </div>
            </div>
          </div>
        </div>
      </HeaderStyleContext.Provider>
    </>
  );
}
