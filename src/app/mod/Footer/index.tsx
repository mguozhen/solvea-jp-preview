'use client';

import i18n, { getLang } from '@/i18n';
import HeaderLangSwap from 'components/HeaderLangSwap';
import { useEffect, useState } from 'react';
import { Logo, Solvea } from '../svgs/icons';
import styles from './index.module.scss';

export const Footer = () => {
  const lang = getLang();
  const isEn = 'en-US' === lang;

  const [currentHost, setCurrentHost] = useState('https://solvea.cx');

  useEffect(() => {
    // 在客户端挂载后获取 host
    const host =
      (typeof window !== 'undefined' && window.location.host.includes('localhost')) ||
      window.location.host.includes('staging')
        ? 'https://staging.solvea.cx'
        : 'https://solvea.cx';
    setCurrentHost(host);
  }, []);

  const footerLinks = [
    {
      title: 'Home_footer_security',
      links: [
        {
          url: 'https://cdn.shulex-voc.com/assets/1697169674614/Vanta_trust.png',
          href: 'https://www.vanta.com/integrations?built-by=Partner',
        },
        {
          url: 'https://cdn.shulex-voc.com/shulex/upload/2026-02-04/a80615f9-329e-4b7b-a9a0-11054122419b.png',
          href: 'https://www.cert-assure.com/serchresult.php?type=Management+System+Certification&certificate=USA-SOC2-220513',
        },
        {
          url: 'https://cdn.shulex-voc.com/shulex/upload/2026-02-04/baa1550d-f09a-4e53-91e2-89ed6f7cc1b3.png',
          href: 'https://www.cert-assure.com/serchresult.php?type=Management+System+Certification&certificate=USA-I-270513',
        },
      ],
    },
    isEn
      ? {
          title: 'Home_footer_resources',
          links: [
            {
              text: 'Home_footer_resources2',
              href: `${currentHost}/customer-stories`,
            },
            {
              text: 'Home_footer_resources5',
              href: `${currentHost}/glossary`,
            },
            {
              text: 'Footer-decagon',
              href: `${currentHost}/compare/decagon`,
            },
            {
              text: 'Footer-sierra',
              href: `${currentHost}/compare/sierra`,
            },
            {
              text: 'Footer-ada',
              href: `${currentHost}/compare/ada`,
            },
            {
              text: 'Footer-zendesk',
              href: `${currentHost}/compare/zendesk`,
            },
          ],
        }
      : {},
    {
      title: 'Home_footer_socials',
      links: [
        {
          text: 'Home_footer_socials1',
          href: `https://x.com/SolveaCX`,
          icon: 'https://cdn.shulex-voc.com/shulex/upload/2026-02-10/d27d7f4e-466d-4141-9c34-f7e58caf1589.png',
          id: 'twitter',
        },
        {
          text: 'Home_footer_socials2',
          href: `https://www.linkedin.com/company/solvea-cx/`,
          icon: 'https://cdn.shulex-voc.com/shulex/upload/2026-02-10/ba2a956b-d733-4134-8b43-7313fe895720.png',
          id: 'linkedin',
        },
        {
          text: 'Home_footer_socials3',
          href: `http://www.youtube.com/@SolveaCX`,
          icon: 'https://cdn.shulex-voc.com/shulex/upload/2026-02-10/2b3f8b4e-dfc0-4871-9d41-ca8cf64722ab.png',
          id: 'youtube',
        },
        {
          text: 'Home_footer_social4',
          href: 'https://discord.gg/Q6D5U8GJvE',
          icon: 'https://cdn.shulex-voc.com/shulex/upload/2026-02-10/c2421052-9e75-4566-8a75-74966a5eaae9.png',
          id: 'discord',
        },
      ],
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <Logo className={styles.logo} />
        <div className={styles.linksContainer}>
          {footerLinks.map((section: any) => {
            if (!section?.title) return null;
            return (
              <div key={section.title} className={styles.linkSection}>
                <h3 className={styles.sectionTitle}>{i18n(`solvea.${section.title}`)}</h3>
                {section?.links?.[0]?.url ? (
                  <div className={styles.companyLogo}>
                    <div className={styles.companyLogoList}>
                      {section?.links?.map((link, index) => (
                        <a
                          key={link.href ?? index}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.companyLogoItem}
                        >
                          <img
                            src={link.url}
                            alt={link.text ?? 'Partner logo'}
                            loading="lazy"
                            decoding="async"
                          />
                        </a>
                      ))}
                    </div>
                    <a className={styles.companyLogoLink} href="mailto:support@solvea.cx">
                      support@solvea.cx
                    </a>
                  </div>
                ) : (
                  <ul className={styles.linksList}>
                    {section?.links?.map((link) => (
                      <li key={link.text}>
                        {link.icon ? (
                          <img
                            src={link.icon}
                            alt={link.text}
                            className={styles.socialIcon}
                            loading="lazy"
                            decoding="async"
                          />
                        ) : null}
                        {/* @ts-ignore */}
                        <a
                          href={link.href}
                          className={styles.link}
                          target={link.target}
                          id={link.id}
                        >
                          {i18n(`solvea.${link.text}`)}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.footerLogo}>
        <Solvea className={styles.solveaLogo} />
      </div>
      <div className={styles.divider}></div>
      <div className={styles.legalLinks}>
        <a href="/terms-and-condition" className={styles.legalLink}>
          {i18n('solvea.Layout_footer_Terms_and_conditions')}
        </a>

        <a href="/privacy-policy" className={styles.legalLink}>
          {i18n('solvea.Layout_footer_Privacy_policy')}
        </a>

        {lang !== 'zh-CN' && (
          <div className={styles.footerLangSwap}>
            <HeaderLangSwap className={styles.footerLangSwapInner} />
          </div>
        )}

        <span className={styles.copyright}>&copy;{new Date().getFullYear()} Solvea</span>
      </div>
    </footer>
  );
};
