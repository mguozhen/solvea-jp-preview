'use client';
import { Popover } from 'antd';
import cx from 'classnames';
import HoverText from 'components/HoverText';
import { DropArrow } from 'components/Icons';
import { useMemo, useState } from 'react';
import { useI18n } from 'src/i18n';
import styles from './index.module.scss';

interface HeaderLangSwapProps {
  className?: string;
}

export default function HeaderLangSwap({ className }: HeaderLangSwapProps) {
  const { locale } = useI18n();
  const [open, setOpen] = useState(false);

  const curSelected = useMemo(() => {
    switch (locale) {
      case 'ja-JP':
        return (
          <>
            <HoverText className={styles.iconText}>日本語</HoverText>
          </>
        );
      case 'es-ES':
        return (
          <>
            <HoverText className={styles.iconText}>Español</HoverText>
          </>
        );
      case 'de-DE':
        return (
          <>
            <HoverText className={styles.iconText}>Deutsch</HoverText>
          </>
        );
      case 'en-US':
      default:
        return (
          <>
            <HoverText className={styles.iconText}>English</HoverText>
          </>
        );
    }
  }, [locale]);

  const link = [
    {
      label: 'English',
      href: '/',
    },
    {
      label: '日本語',
      href: '/jp',
    },
    {
      label: 'Español',
      href: '/es',
    },
    {
      label: 'Deutsch',
      href: '/de',
    },
  ];

  return (
    <div className={cx(styles.container, className)}>
      <Popover
        arrow={false}
        trigger="hover"
        placement="top"
        align={{ offset: [0, -15] }}
        open={open}
        onOpenChange={setOpen}
        rootClassName={styles.popLinkRoot}
        content={
          <div className={styles.popLinkContent}>
            {link.map((child: any) => (
              <div className={styles.popLinkItem} key={child?.label || child?.href}>
                <div className={styles.popLinkItemContent}>
                  <div className={styles.popLinkItemInfo}>
                    <a href={child?.href}>
                      <div className={styles.popLinkItemChild}>
                        <div className={styles.popLinkItemLabel}>{child?.label}</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
      >
        <div className={styles.iconTextContainer}>
          {curSelected || 'English'}
          <DropArrow
            className={cx(styles.arrow, open && styles.arrowOpen)}
            style={{ width: 16, marginLeft: 8 }}
          />
        </div>
      </Popover>
    </div>
  );
}
