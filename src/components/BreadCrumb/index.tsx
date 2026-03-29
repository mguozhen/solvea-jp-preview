import React from 'react';
import cx from 'classnames';
import styles from './index.module.scss';
import Head from 'next/head';

export interface Crumb {
  label: string;
  key?: string | number;
  route?: string;
  /**
   * 可以单独指定文字颜色
   */
  color?: string;
}

interface Props extends BaseCSSProps {
  data: Crumb[];
  theme?: 'dark' | 'light';
}

export default function BreadCrumb(props: Props) {
  const { className, style, data, theme = 'dark' } = props;

  const listElement =
    (Array.isArray(data) &&
      data.map((item, index) => {
        const { label, route } = item;
        const obj = {
          '@type': 'ListItem',
          position: index + 1,
        };

        return route
          ? Object.assign(obj, {
              item: {
                '@id': route,
                name: label,
              },
            })
          : Object.assign(obj, {
              item: {
                name: label,
              },
            });
      })) ||
    [];
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: listElement,
            }),
          }}
        ></script>
      </Head>
      <nav
        className={cx(styles.container, className, {
          [styles.dark]: theme === 'dark',
          [styles.light]: theme === 'light',
        })}
        style={style}
        aria-label="breadcrumb"
        role="navigation"
      >
        <ol itemScope itemType="https://schema.org/BreadcrumbList">
          {Array.isArray(data) &&
            data.map((item, index) => {
              const { color } = item;
              return (
                <li
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                  className={cx(styles.item, {
                    [styles.last]: index === data.length - 1,
                  })}
                  style={color ? { color } : undefined}
                  key={index}
                >
                  {item.route && (
                    <>
                      <a itemProp="item" href={item.route}>
                        <span itemProp="name">{item.label}</span>
                      </a>
                      <meta itemProp="position" content={String(index + 1)} />
                    </>
                  )}
                  {!item.route && (
                    <>
                      <span itemProp="name">{item.label}</span>
                      <meta itemProp="position" content={String(index + 1)} />
                    </>
                  )}
                  {index !== data.length - 1 && (
                    <span className={styles.separator}>{'>'}</span>
                  )}
                </li>
              );
            })}
        </ol>
      </nav>
    </>
  );
}
