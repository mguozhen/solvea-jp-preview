'use client';
import React, { useState } from 'react';
import styles from './index.module.scss';
import { QrExample } from 'components/Icons';
import { getLangShort } from 'util/i18nOld/i18nOld';

const QR_IMG =
  'https://cdn.shulex-voc.com/shulex/upload/2025-07-16/aa4eb791-1c0b-4b59-9755-f76e088897d1.png';

const ContactUsFloat: React.FC = () => {
  const [hover, setHover] = useState(false);
  if (getLangShort() !== 'cn') return null;

  return (
    <div
      className={styles.contactUsFloat}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={styles.button}>
        <QrExample className={styles.qrExample} />
        <span className={styles.text}>联系我们</span>
      </div>
      {hover && (
        <div className={styles.qrBox}>
          <img
            src={QR_IMG}
            alt="扫码领跨境AI客服员工落地指南"
            className={styles.qrImg}
          />
          <div className={styles.qrText}>扫码领跨境AI客服员工落地指南</div>
        </div>
      )}
    </div>
  );
};

export default ContactUsFloat;
