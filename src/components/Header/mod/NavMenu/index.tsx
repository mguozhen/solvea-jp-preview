import React, { useState } from 'react';
import cx from 'classnames';
import SvgArrowDown from 'components/Icons/ArrowDown';
import NavLink from '../NavLink';
import styles from './index.module.scss';
import { NavData } from '../navigation';

interface Props {
  text: string;
  href?: string;
  sum?: string;
  subItems: Array<NavData>;
  column?: number;
  target?: string;
  menuListClassName?: string;
}

function NavMenu(props: Props) {
  const {
    text,
    href,
    subItems: children,
    sum,
    column = 2,
    menuListClassName,
    target,
  } = props;

  const [show, setShow] = useState<Record<string, boolean>>({});
  return (
    <div className={styles.navItemBox} key={text}>
      {children?.length ? (
        <div className={styles.itemTitle}>
          {text}
          <SvgArrowDown className={styles.arrowIcon} />
        </div>
      ) : (
        <NavLink
          text={text}
          href={href}
          sum={sum}
          target={target}
          style={{ padding: 0 }}
        />
      )}
      {children?.length > 0 && (
        <div className={cx(styles.menuList, menuListClassName)}>
          <div className={styles.menuListContainer}>
            <ul style={{ gridTemplateColumns: `repeat(${column},1fr)` }}>
              {children?.map((item) => {
                const {
                  href,
                  name,
                  logo,
                  description,
                  qrCode,
                  children: sChildren,
                } = item;
                if ((sChildren || [])?.length > 0) {
                  return (
                    <li
                      className={cx(styles.menuItem, styles.vertical)}
                      key={item.name}
                    >
                      <div
                        className={styles.subfolder}
                        onMouseOver={() => {
                          setShow({ ...show, [item.name]: true });
                        }}
                        onMouseLeave={() => {
                          setShow({ ...show, [item.name]: false });
                        }}
                      >
                        <div className={styles.inner}>
                          {item?.logo}
                          <div>{item.name}</div>
                        </div>
                      </div>
                      <div className={styles.items}>
                        {sChildren?.map((item) => {
                          const { href, name } = item;
                          return (
                            <a
                              className={styles.link}
                              href={href}
                              key={href}
                              // target={target || '_blank'}
                            >
                              {name}
                            </a>
                          );
                        })}
                      </div>
                    </li>
                  );
                }
                return (
                  <li
                    className={styles.menuItem}
                    key={item.name}
                  >
                    <NavLink
                      text={name}
                      href={href}
                      logo={logo}
                      description={description}
                      qrCode={qrCode}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavMenu;
