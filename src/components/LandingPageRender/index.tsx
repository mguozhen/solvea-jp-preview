'use client';
// import Footer from 'components/Footer';
// import Header from 'components/Header';
// import Render from 'components/ValueDescComponent';
import cx from 'classnames';
import Footer from 'components/Footer';
import GoogleFonts from 'components/GoogleFonts';
import Render from 'components/ValueDescComponent';
import Head from 'next/head';
import React, { useMemo } from 'react';
import { RecoilRoot } from 'recoil';
import styles from './index.module.scss';

interface LandingPageProps {
  data?: any;
  articleList?: any;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  canonical?: string;
  hideLogin?: boolean;
  chromeHref?: string;
  padding?: string;
  contentClass?: string;
  transparentTitle?: boolean;
  renderWrapper?: (_comp: React.ReactNode, _schema: any, _index: number) => React.ReactNode;
  isUaMobile?: boolean; // 根据header里ua判断是否为移动设备
  backgroundColor?: string;
  theme?: 'dark' | 'light';
  styleConfig?: {
    headerStyleConfig?: any;
    footerStyleConfig?: any;
  };
  headerSticky?: boolean;
}

export default function LandingPage(props: LandingPageProps) {
  const {
    data,
    seoTitle,
    seoDescription,
    seoKeywords,
    canonical,
    padding,
    contentClass,
    renderWrapper,
    isUaMobile,
    backgroundColor,
    theme = 'light',
  } = props;
  console.log('hyx data', data);
  // const { locale } = useI18n();
  const headerProps = useMemo(() => {
    return data?.subComponents?.find((a) => a.isHeader);
  }, [data]);
  const noHeaderProps = useMemo(() => {
    return {
      ...data,
      subComponents: data?.subComponents?.filter((d) => {
        return !d.isHeader;
      }),
    };
  }, [data]);
  return (
    <RecoilRoot>
      <div
        className={cx(styles.page, {
          [styles.dark]: theme === 'dark',
          [styles.light]: theme === 'light',
        })}
        style={backgroundColor ? { background: backgroundColor } : {}}
      >
        <GoogleFonts />
        <Head>
          <title>{seoTitle}</title>
          <meta name="description" content={seoDescription} key="desc" />
          {canonical && <link rel="canonical" href={canonical} />}
          {seoKeywords && <meta name="keywords" content={seoKeywords} />}
        </Head>
        {/* <Header
          sticky={headerSticky}
          black={!headerProps}
          hideLogin={hideLogin}
          chromeHref={chromeHref}
          headerStyleConfig={styleConfig?.headerStyleConfig}
        /> */}
        {headerProps && (
          <div className={styles.start}>
            <Render
              {...headerProps}
              isHeader
              renderWrapper={renderWrapper}
              isUaMobile={isUaMobile}
            />
          </div>
        )}
        <div className={cx(styles.content, contentClass)} style={padding ? { padding } : undefined}>
          <Render {...noHeaderProps} renderWrapper={renderWrapper} isUaMobile={isUaMobile} />
        </div>
        <Footer />
        {/* <Footer
          articleList={articleList}
          styleConfig={styleConfig?.footerStyleConfig}
        /> */}
      </div>
    </RecoilRoot>
  );
}
