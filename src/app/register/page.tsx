'use client';
import styles from './index.module.scss';
import React, { useEffect, useState } from 'react';
import i18n from '@/i18n';
import { Line } from 'pages/mod/Line';
import RegisterForm from './RegisterForm';

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

export default function RegisterPage() {
  const [storedEmail, setStoredEmail] = useState<string>('');

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('registerEmail');
    setStoredEmail(storedEmail || '');
  }, []);

  return (
    <main className={`${styles.container} side-fade`}>
      <div className={styles.formContainer}>
        <div className={styles.formWrapper}>
          <BgSvg className={styles.bgSvg} />
          <div className={styles.contentWrapper}>
            <div className={styles.codeContent}>
              <div className={styles.sTitle}>
                {i18n('solvea.Layout_header_contact')}
              </div>
              <div className={styles.pTitle}>
                {i18n('solvea.Register_Verify_Account')}
              </div>
              <div className={styles.desc}>
                {i18n('solvea.Register_Verify_Code')}
                {storedEmail}
              </div>
              <RegisterForm />
            </div>
            <Svg className={styles.svg} />
          </div>
        </div>
      </div>
      <Line />
    </main>
  );
};
