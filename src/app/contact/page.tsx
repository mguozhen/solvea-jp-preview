import styles from './index.module.scss';
import EnForm from 'components/EnForm';
import { generateHrefLangConfig } from 'components/Header/mod/HrefLang';
import React from 'react';
import { Metadata } from 'next';
import i18n, { getLang, setLang } from '@/i18n';
import { Line } from 'pages/mod/Line';
import { headers } from 'next/headers';
import { SITE_WITH_PORTAL } from '@/constant/base';
import { decodePathnameToCanonical, getPathNameLang } from 'util/common';
import JpTallyForm from 'components/JpTallyForm';
import { getSupportEmail } from 'util/getSupportEmail';
import SolveaSmallBrands from 'pages/mod/SolveaSmallBrands';

const Svg = ({ className }: { className?: string }) => {
  return (
    <svg
      width="354"
      height="318"
      viewBox="0 0 354 318"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="161.078"
        y="0.230225"
        width="192.923"
        height="106.44"
        fill="#131313"
      />
      <rect
        x="161.078"
        y="105.008"
        width="113.093"
        height="106.44"
        fill="#131313"
      />
      <rect y="211.449" width="161.323" height="106.44" fill="#131313" />
    </svg>
  );
};

const BgSvg = ({ className }: { className?: string }) => {
  return (
    <svg
      preserveAspectRatio={'xMidYMid slice'}
      className={className}
      width="1440"
      height="1027"
      viewBox="0 0 1440 1027"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        y1="107.822"
        x2="1440"
        y2="107.822"
        stroke="#CACAB9"
        strokeWidth="0.355711"
      />
      <line
        x1="739.178"
        x2="739.178"
        y2="963"
        stroke="#CACAB9"
        strokeWidth="0.355711"
      />
      <line
        x1="1361.18"
        y1="-7.77431e-09"
        x2="1361.18"
        y2="1027"
        stroke="#CACAB9"
        strokeWidth="0.355711"
      />
      <line
        x1="0.000123511"
        y1="511.822"
        x2="1440"
        y2="512.822"
        stroke="#CACAB9"
        strokeWidth="0.355711"
      />
      <line
        y1="82.8221"
        x2="1440"
        y2="82.8221"
        stroke="#CACAB9"
        strokeWidth="0.355711"
      />
      <path
        d="M389.797 767.869H395.06V770.699H389.797V775.963H386.967V770.699H381.703V767.869H386.967V762.605H389.797V767.869Z"
        fill="#EEEEE6"
      />
      <path
        d="M740.094 510.264H745.357V513.094H740.094V518.357H737.264V513.094H732V510.264H737.264V505H740.094V510.264Z"
        fill="#3D3D3D"
      />
      <path
        d="M779.969 726.264H785.232V729.094H779.969V734.357H777.139V729.094H771.875V726.264H777.139V721H779.969V726.264Z"
        fill="#EEEEE6"
      />
      <path
        d="M1362.09 930.264H1367.36V933.094H1362.09V938.357H1359.26V933.094H1354V930.264H1359.26V925H1362.09V930.264Z"
        fill="#2B2B2B"
      />
      <path
        d="M1053.52 806.537H1058.78V809.367H1053.52V814.631H1050.69V809.367H1045.42V806.537H1050.69V801.273H1053.52V806.537Z"
        fill="#EEEEE6"
      />
      <rect x="1419" y="93" width="17" height="51" fill="#F07AF9" />
    </svg>
  );
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const pathname = decodePathnameToCanonical(headerList.get('voc-pathname') || '/contact');
  const origin = headerList.get('voc-host') || '';
  const currentLang = getPathNameLang(pathname, origin) as string;
  setLang(currentLang);

  return {
    title: i18n('solvea.Contact_Meta_Title'),
    description: i18n('solvea.Contact_Meta_Desc'),
    alternates: generateHrefLangConfig(pathname, currentLang, SITE_WITH_PORTAL),
  };
}

export default function ContactPage() {
  const headerList = headers();
  const pathname = headerList.get('voc-pathname') || '';
  const origin = headerList.get('voc-host') || '';
  setLang(getPathNameLang(pathname, origin) as any);

  const lang = getLang();
  const isJp = 'ja-JP' === lang;
  const isEs = 'es-ES' === lang;

  const formId = isEs
    ? '830daff6-13b6-4dd5-9332-b578b17f8ed2'
    : 'f28afb68-9f23-414b-a86e-77d2276a69a4';

  return (
    <main className={`${styles.container} side-fade`}>
      <div className={styles.formContainer}>
        <div className={styles.formWrapper}>
          <BgSvg className={styles.bgSvg} />
          <div className={styles.contentWrapper}>
            {isJp ? (
              <JpTallyForm className={styles.tallyForm} />
            ) : (
              <div className={styles.form}>
                <div className={styles.sTitle}>
                  {i18n('solvea.Layout_header_contact')}
                </div>
                <h1 className={styles.pTitle}>
                  {i18n('solvea.Contact_title')}
                </h1>
                <EnForm formId={formId} />
              </div>
            )}
            <Svg className={styles.svg} />
          </div>
        </div>
      </div>
      <Line />
      <SolveaSmallBrands title={i18n('solvea.Logo_Wall_Trusted_by')} />
      <Line />
      <div className={styles.contact}>
        <div className={styles.office}>
          {i18n('solvea.Contact_Our_Offices')}
        </div>
        <div className={styles.infos}>
          <div className={styles.info}>
            <div className={styles.title}>
              {i18n('solvea.Contact_address_company')}
            </div>
            <div className={styles.addr}>{i18n('solvea.Contact_address')}</div>
          </div>
          <a href={`mailto:${getSupportEmail()}`} className={styles.email}>
            {getSupportEmail()}
          </a>
        </div>
      </div>
    </main>
  );
};
