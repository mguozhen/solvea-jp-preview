'use client';

import i18n, { getLang } from '@/i18n';
import { CloseOutlined, RightOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import TrackingProfound from 'components/Header/mod/tracking/profound';
import HoverText from 'components/HoverText';
import { DropArrow } from 'components/Icons';
import GetStartedBtn from 'components/ValueDescComponent/GetStartedBtn';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { Close, Collapse, LogoFX } from 'pages/mod/svgs/icons';
import { useEffect, useState } from 'react';
import { getLink } from 'util/getLink';
import { getUserInfo } from 'util/services';
import styles from './index.module.scss';

const TwilioCallModal = dynamic(
  () => import('components/ValueDescComponent/HomeFirstBlock/TwilioCallModal'),
  { ssr: false },
);

const Header = () => {
  // getLang() 内部使用 typeof window !== 'undefined'，在服务端和客户端首次渲染
  // 会返回不同值，导致 isJp/isEs/isDe 结构不同，触发 hydration mismatch。
  // 用 useState 固定初始值（服务端 & 客户端首次渲染一致），mount 后再更新为实际 lang。
  const [lang, setLang] = useState('en-US');
  const isJp = 'ja-JP' === lang;
  const isEs = 'es-ES' === lang;
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/agent-for-ent') {
      localStorage.setItem('currentTab', 'slg');
    } else if (pathname === '/' || pathname === '/pricing') {
      localStorage.setItem('currentTab', 'plg');
    }
  }, [pathname]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLangOptions, setShowLangOptions] = useState(false);
  const [currentHost, setCurrentHost] = useState('https://solvea.cx');
  const [loginJumpUrl, setLoginJumpUrl] = useState('https://app.solvea.cx/#/auth/login');
  const [registerJumpUrl, setRegisterJumpUrl] = useState('https://app.solvea.cx/#/auth/register');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [expandedThirdLevel, setExpandedThirdLevel] = useState<string | null>(null);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  const [twilioOpen, setTwilioOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  /** 避免首屏用默认 false 渲染 LOGIN，异步鉴权后再切到 My Account 造成闪动 */
  const [authResolved, setAuthResolved] = useState(false);

  useEffect(() => {
    // 在客户端挂载后获取 host 和实际 lang
    const host =
      (typeof window !== 'undefined' && window.location.host.includes('localhost')) ||
      window.location.host.includes('staging')
        ? 'https://staging.solvea.cx'
        : 'https://solvea.cx';
    setCurrentHost(host);
    setLang(getLang());
    const papPartnerId = localStorage.getItem('pap_partner_id');
    if (papPartnerId) {
      setLoginJumpUrl(`https://app.solvea.cx/?partner=${papPartnerId}#/auth/login`);
      setRegisterJumpUrl(`https://app.solvea.cx/?partner=${papPartnerId}#/auth/register`);
    }
    void (async () => {
      try {
        const user = await getUserInfo();
        setIsLogin(!!user);
      } catch {
        setIsLogin(false);
      } finally {
        setAuthResolved(true);
      }
    })();
  }, []);

  const toggleMenu = () => {
    // 防止滚动穿透
    if (!isMenuOpen) {
      // 菜单即将打开,禁止背景滚动
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      // 菜单即将关闭,恢复背景滚动
      document.body.style.overflow = '';
      document.body.style.height = 'auto';
      // 关闭菜单时重置展开状态
      setExpandedMobileMenu(null);
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMobileSubMenu = (linkText: string) => {
    setExpandedMobileMenu(expandedMobileMenu === linkText ? null : linkText);
  };

  const navLinks = [
    {
      text: 'Navigation_Solutions',
      children: [
        {
          text: 'Navigation_Solution_Retail',
          href: `${currentHost}/solution/retail`,
          children: [
            {
              label: 'Navigation_Industry_Furniture',
              href: `${currentHost}/industry/furniture`,
            },
            {
              label: 'Navigation_Industry_Electronics',
              href: `${currentHost}/industry/electronics`,
            },
            {
              label: 'Navigation_Industry_Retail',
              href: `${currentHost}/industry/retail`,
            },
            {
              label: 'Navigation_Industry_Automotive',
              href: `${currentHost}/industry/automotive`,
            },
          ],
        },
        {
          text: 'Navigation_Solution_Hotel',
          href: `${currentHost}/solution/hotel`,
        },
        {
          text: 'Navigation_Solution_Real_Estate',
          href: `${currentHost}/solution/real-estate`,
        },
        {
          text: 'Navigation_Solution_Medspa',
          href: `${currentHost}/solution/medspa`,
        },
        {
          text: 'Navigation_Solution_Home_Services',
          href: `${currentHost}/solution/home-services`,
        },
        {
          text: 'Navigation_Solution_Barber_Shop',
          href: `${currentHost}/solution/barber-shop`,
        },
        {
          text: 'Navigation_Solution_Restaurant',
          href: `${currentHost}/solution/restaurant`,
        },
        {
          text: 'Navigation_Solution_Freelancer',
          href: `${currentHost}/solution/freelancer`,
        },
        {
          text: 'Navigation_Solution_Software',
          href: `${currentHost}/solution/software`,
        },
      ],
    },
    ...(isJp || isEs
      ? []
      : [
          {
            text: 'Home_footer_resources2',
            href: getLink(`/customer-stories`),
          },
        ]),
    {
      text: 'Navigation_docs',
      href: 'https://solvea.cx/docs',
    },
    {
      text: 'Home_footer_resources6',
      href: getLink(`/pricing`),
    },
    {
      text: 'Navigation_Enterprise',
      href: 'https://solvea.cx/contact',
    },
  ];

  // 生成语言链接
  const getLangLink = (targetLang: 'en-US' | 'ja-JP' | 'es-ES' | 'de-DE') => {
    // 获取当前路径并清理语言前缀
    let cleanPath = pathname || '/';
    cleanPath = cleanPath.replace(/^\/(jp|es|cn|de|fr|pt)/, '');
    if (cleanPath === '') {
      cleanPath = '/';
    }

    // 根据目标语言生成新路径，不添加 _nolang 参数，通过 cookie 防止重定向
    if (targetLang === 'en-US') {
      return cleanPath === '/' ? '/' : cleanPath;
    } else if (targetLang === 'ja-JP') {
      return `/jp${cleanPath === '/' ? '' : cleanPath}`;
    } else if (targetLang === 'es-ES') {
      return `/es${cleanPath === '/' ? '' : cleanPath}`;
    } else if (targetLang === 'de-DE') {
      return `/de${cleanPath === '/' ? '' : cleanPath}`;
    }
    return '/';
  };

  const handleLangPageClose = () => {
    setShowLangOptions(false);
    document.body.style.overflow = '';
  };

  const renderPopLinkContent = (links: any) => {
    // 只有hover时才选中
    const activeCategory = hoveredCategory;
    const activeChild = activeCategory
      ? links.find((child: any) => child?.text === activeCategory)
      : null;

    return (
      <div
        className={styles.popLinkTwoColumn}
        onMouseLeave={() => {
          setHoveredCategory(null);
          setExpandedThirdLevel(null);
        }}
      >
        {/* 左侧：二级菜单 */}
        <div className={styles.popLinkSidebar}>
          {links.map((child: any, index: number) => (
            <div
              key={`${child?.text}-${index}`}
              className={`${styles.popLinkSidebarItem} ${
                activeCategory === child?.text ? styles.active : ''
              }`}
              onMouseEnter={() => {
                setHoveredCategory(child?.text);
                setExpandedThirdLevel(null);
              }}
            >
              <a href={child?.href} className={styles.popLinkSidebarText}>
                {i18n(`solvea.${child?.text}`)}
              </a>
              {child?.children?.length > 0 && (
                <RightOutlined className={styles.popLinkSidebarArrow} />
              )}
            </div>
          ))}
        </div>

        {/* 右侧：三级内容 - 只在有activeChild时显示 */}
        {activeChild?.children && activeChild.children.length > 0 && (
          <div className={styles.popLinkMainContent}>
            <div className={styles.popLinkList}>
              {activeChild.children.map((grandChild: any) => (
                <div key={grandChild?.label} className={styles.popLinkListWrapper}>
                  {grandChild?.children && grandChild.children.length > 0 ? (
                    <div
                      className={`${styles.popLinkListItem} ${styles.hasChildren} ${
                        expandedThirdLevel === grandChild?.label ? styles.active : ''
                      }`}
                      onMouseEnter={() => setExpandedThirdLevel(grandChild?.label)}
                    >
                      <div className={styles.popLinkListItemLabel}>
                        {i18n(`solvea.${grandChild?.label}`)}
                      </div>
                      {grandChild?.children?.length > 0 && (
                        <RightOutlined className={styles.popLinkListItemArrow} />
                      )}
                    </div>
                  ) : (
                    <a
                      href={grandChild?.href}
                      className={styles.popLinkListItem}
                      onMouseEnter={() => setExpandedThirdLevel(null)}
                    >
                      <div className={styles.popLinkListItemLabel}>
                        {i18n(`solvea.${grandChild?.label}`)}
                      </div>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 右侧第三列：四级子菜单区域 */}
        {expandedThirdLevel && (
          <div className={styles.popLinkThirdColumn}>
            {activeChild?.children
              ?.find((item: any) => item.label === expandedThirdLevel)
              ?.children?.map((subItem: any) => (
                <a href={subItem?.href} key={subItem?.label} className={styles.popLinkThirdItem}>
                  {i18n(`solvea.${subItem?.label}`)}
                </a>
              ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <TrackingProfound />
      <header className={`${styles.header} ${isMenuOpen ? styles.menuOpen : ''}`}>
        <div className={styles.container}>
          <a href={getLink('/')}>
            <LogoFX className={styles.logo} />
          </a>

          <nav className={styles.navLinks}>
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.text} className={styles.navLink}>
                  <Popover
                    arrow={false}
                    rootClassName={styles.popLinkRoot}
                    placement="bottomLeft"
                    content={
                      <div className={styles.popLinkContent}>
                        {renderPopLinkContent(link.children)}
                      </div>
                    }
                    onOpenChange={(visible) => {
                      if (!visible) {
                        setHoveredCategory(null);
                        setExpandedThirdLevel(null);
                      }
                    }}
                  >
                    <div className={styles.dropMenu}>
                      <HoverText as="div">{i18n(`solvea.${link.text}`)}</HoverText>
                      <DropArrow style={{ width: 16 }} />
                    </div>
                  </Popover>
                </div>
              ) : (
                <a key={link.text} href={link.href} className={styles.navLink}>
                  <HoverText as="div">{i18n(`solvea.${link.text}`)}</HoverText>
                </a>
              ),
            )}
          </nav>

          <div className={styles.rightAction}>
            {!isMenuOpen && (
              <>
                <button
                  className={styles.phoneInfo}
                  onClick={() => setTwilioOpen(true)}
                  id="navigatorCall"
                >
                  <img
                    src="https://cdn.shulex-voc.com/shulex/upload/2026-02-04/da8f7452-2e8f-4eac-8026-53a62f243be8.png"
                    alt=""
                    className={styles.phoneIcon}
                  />
                  <div className={styles.phoneInfoText}>
                    <div className={styles.phoneNumber}>+1 903 564 0866</div>
                    <div className={styles.phoneInfoDesc}>{i18n('solvea.Header_Try_Solvea')}</div>
                  </div>
                </button>
                {authResolved ? (
                  isLogin ? (
                    <a className={styles.loginButton} href="https://app.solvea.cx">
                      {i18n('solvea.Header_My_Account')}
                    </a>
                  ) : (
                    <>
                      <a href={loginJumpUrl} className={styles.loginButton} id="navigatorLogin">
                        {i18n('solvea.Header_Login')}
                      </a>
                      <GetStartedBtn
                        link={registerJumpUrl}
                        showIcon={false}
                        className={styles.tryForFreeButton}
                        text={i18n('solvea.Header_Signup_Free')}
                        type="black"
                        id="navigatorSignup"
                      />
                    </>
                  )
                ) : (
                  <div className={styles.authCtaPlaceholder} aria-hidden />
                )}
              </>
            )}
            <button
              className={`${styles.mobileMenuButton}`}
              onClick={toggleMenu}
              aria-label="mobileMenuButton"
            >
              {isMenuOpen ? <Close /> : <Collapse />}
            </button>
          </div>
        </div>

        <div className={styles.mobileMenuOverlay}>
          <div className={styles.mobileMenuContent}>
            <nav className={styles.mobileNavLinks}>
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.text} className={styles.mobileNavLink}>
                    {/* 显示一级菜单标题,添加点击展开功能 */}
                    <div
                      className={styles.mobileNavLinkTitle}
                      onClick={() => toggleMobileSubMenu(link.text)}
                    >
                      {i18n(`solvea.${link.text}`)}
                      <RightOutlined
                        className={`${styles.mobileNavArrow} ${
                          expandedMobileMenu === link.text ? styles.expanded : ''
                        }`}
                      />
                    </div>
                    {/* 子菜单:只在展开时显示 */}
                    {expandedMobileMenu === link.text && (
                      <div className={styles.mobileSubMenuContent}>
                        {link.children.map((child: any) => (
                          <div key={child?.text || 'no-text'}>
                            {/* 只有当child.text存在时才显示二级标题 */}
                            {child?.text && (
                              <a
                                href={child?.href}
                                className={styles.mobileNavLinkSub}
                                onClick={toggleMenu}
                              >
                                {i18n(`solvea.${child?.text}`)}
                              </a>
                            )}
                            {/* 显示三级菜单项 */}
                            {child?.children?.map((grandChild: any) => (
                              <a
                                key={grandChild?.label}
                                href={grandChild?.href}
                                className={styles.mobileNavLinkChild}
                                onClick={toggleMenu}
                              >
                                {i18n(`solvea.${grandChild?.label}`)}
                              </a>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={link.text}
                    href={link?.href}
                    className={styles.mobileNavLink}
                    onClick={toggleMenu}
                  >
                    {i18n(`solvea.${link?.text}`)}
                  </a>
                ),
              )}
              {authResolved ? (
                isLogin ? (
                  <a className={styles.mobileAuthBtn} href="https://app.solvea.cx">
                    {i18n('solvea.Header_My_Account')}
                  </a>
                ) : (
                  <>
                    <a href={loginJumpUrl} className={styles.mobileAuthBtn} onClick={toggleMenu}>
                      {i18n('solvea.Header_Login')}
                    </a>
                    <a href={registerJumpUrl} className={styles.mobileAuthBtn} onClick={toggleMenu}>
                      {i18n('solvea.Header_Signup_Free')}
                    </a>
                  </>
                )
              ) : (
                <>
                  <div className={styles.mobileAuthBtnPlaceholder} aria-hidden />
                  <div className={styles.mobileAuthBtnPlaceholder} aria-hidden />
                </>
              )}
            </nav>
          </div>
        </div>

        {/* 语言选择页面 */}
        {showLangOptions && (
          <div className={styles.langSelectPage}>
            <div className={styles.langSelectPageContent}>
              <div className={styles.langSelectHeader}>
                <a href={getLink('/')}>
                  <LogoFX className={styles.logo} />
                </a>
                <CloseOutlined onClick={handleLangPageClose} className={styles.langSelectClose} />
              </div>
              <div className={styles.langSelectList}>
                <a
                  href={getLangLink('en-US')}
                  className={`${styles.langSelectItem} ${lang === 'en-US' ? styles.active : ''}`}
                >
                  <span className={styles.langSelectText}>English</span>
                  {lang === 'en-US' && <RightOutlined className={styles.langSelectArrow} />}
                </a>
                <a
                  href={getLangLink('ja-JP')}
                  className={`${styles.langSelectItem} ${lang === 'ja-JP' ? styles.active : ''}`}
                >
                  <span className={styles.langSelectText}>日本語</span>
                  {lang === 'ja-JP' && <RightOutlined className={styles.langSelectArrow} />}
                </a>
                <a
                  href={getLangLink('es-ES')}
                  className={`${styles.langSelectItem} ${lang === 'es-ES' ? styles.active : ''}`}
                >
                  <span className={styles.langSelectText}>Español</span>
                  {lang === 'es-ES' && <RightOutlined className={styles.langSelectArrow} />}
                </a>
                <a
                  href={getLangLink('de-DE')}
                  className={`${styles.langSelectItem} ${lang === 'de-DE' ? styles.active : ''}`}
                >
                  <span className={styles.langSelectText}>Deutsch</span>
                  {lang === 'de-DE' && <RightOutlined className={styles.langSelectArrow} />}
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
      <TwilioCallModal open={twilioOpen} onClose={() => setTwilioOpen(false)} />
    </>
  );
};

export default Header;
