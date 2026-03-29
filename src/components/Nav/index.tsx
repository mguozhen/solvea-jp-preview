'use client';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';

const isProd = process.env.APP_ENV === 'production';

export const Nav = ({ className = '' }: { className?: string }) => {
  const [location, setLocation] = useState<Location>();
  const [host, setHost] = useState<string>('');

  useEffect(() => {
    setLocation(window.location);
    setHost(window.location.host.split('.').slice(1).join('.'));
  }, []);

  const lang = location?.pathname?.split('/')[1] || '';
  const langMap = ['cn', 'jp', 'de', 'fr', 'es', 'pt'];

  return (
    <nav className={`${styles.desktopNav} ${className}`}>
      <a
        href={`https://${location?.host || ''}/${
          langMap.includes(lang) ? lang : ''
        }`}
        target={'_blank'}
      >
        Solvea
      </a>
      <a
        href={`https://insight${isProd ? '' : '-staging'}.${host ?? 'voc.ai'}/${
          langMap.includes(lang) ? lang : ''
        }`}
        target={'_blank'}
      >
        Insight
      </a>
    </nav>
  );
};

export default Nav;
