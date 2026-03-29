import { Tabs } from 'antd';
import GetStartedBtn from 'components/ValueDescComponent/GetStartedBtn';
import LabelMod from 'components/ValueDescComponent/LabelMod';
import WithAnimation from 'components/WithAnimation';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';

interface Props {
  label: string;
  title: string;
  tabs: {
    key: string;
    label: string;
    desc: string;
    children: string;
  }[];
  button: {
    text: string;
    link: string;
  };
}

export default function HowItWorksBlock(props: Props) {
  const { label, title, tabs, button } = props;
  const [blockInView, setBlockInView] = useState(false);
  const [activeKey, setActiveKey] = useState<string>(tabs[0].key);
  const [loadedTabKeys, setLoadedTabKeys] = useState<Set<string>>(() => new Set());
  const [videoInView, setVideoInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const currentTab = tabs.find((tab) => tab.key === activeKey);
  const currentDesc = currentTab?.desc || '';

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setBlockInView(true);
        }
      },
      { rootMargin: '150px', threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!blockInView) return;
    const el = tabsContainerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVideoInView(true);
        }
      },
      { rootMargin: '100px', threshold: 0.01 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [blockInView]);

  const handleContentLoad = useCallback((tabKey: string) => {
    setLoadedTabKeys((prev) => new Set(prev).add(tabKey));
  }, []);

  const mobileChildren = {
    Contact:
      'https://cdn.shulex-voc.com/shulex/upload/2026-02-26/faf8db0b-4901-428e-b5f8-7baf9b33e65b.webp',
    Deploy:
      'https://cdn.shulex-voc.com/shulex/upload/2026-02-26/3e044b29-8bd0-4611-b32e-3e1462d4a6e7.webp',
    Analytics:
      'https://cdn.shulex-voc.com/shulex/upload/2026-02-26/1e5de426-9951-4858-8934-3933321ae89f.webp',
  };

  if (!blockInView) {
    return (
      <div ref={sectionRef} className={styles.sectionWrapper}>
        <div className={styles.blockPlaceholder} aria-hidden />
      </div>
    );
  }

  return (
    <div ref={sectionRef} className={styles.sectionWrapper}>
      <WithAnimation animationType="fadeInUp" delay={0} duration={800}>
        <div className={styles.container}>
          <LabelMod text={label} />
          <div className={styles.title}>{title}</div>
          <div key={activeKey} className={styles.desc}>
            {currentDesc}
          </div>
          <div ref={tabsContainerRef} className={styles.tabs}>
            <Tabs
              activeKey={activeKey}
              onChange={setActiveKey}
              centered
              destroyInactiveTabPane={false}
              items={tabs.map((tab) => {
                const isVideo = tab.children.toLowerCase().endsWith('.mp4');
                const isActive = activeKey === tab.key;
                return {
                  key: tab.key,
                  label: tab.label,
                  children: isVideo ? (
                    <div className={styles.tabContentWrapper}>
                      {isActive && (
                        <video
                          className={styles.tabMedia}
                          width={1280}
                          height={720}
                          style={{
                            opacity: loadedTabKeys.has(tab.key) ? 1 : 0,
                            transition: 'opacity 0.3s ease',
                          }}
                          src={videoInView ? tab.children : undefined}
                          autoPlay
                          muted
                          loop
                          playsInline
                          controls={false}
                          preload={videoInView ? 'metadata' : 'none'}
                          onCanPlay={() => handleContentLoad(tab.key)}
                        />
                      )}
                      {(!isActive || !loadedTabKeys.has(tab.key)) && (
                        <div className={styles.tabContentPlaceholder} aria-hidden />
                      )}
                    </div>
                  ) : (
                    <div className={styles.tabContentWrapper}>
                      {isActive ? (
                        <picture>
                          <source
                            srcSet={mobileChildren[tab.key]}
                            media="(max-width: 768px)"
                            type="image/webp"
                          />
                          <img
                            className={styles.tabMedia}
                            width={1280}
                            height={720}
                            style={{
                              width: '100%',
                              height: 'auto',
                              display: 'block',
                              objectFit: 'contain',
                              opacity: loadedTabKeys.has(tab.key) ? 1 : 0,
                              transition: 'opacity 0.3s ease',
                            }}
                            src={tab.children}
                            alt={tab.label}
                            loading="lazy"
                            decoding="async"
                            onLoad={() => handleContentLoad(tab.key)}
                          />
                        </picture>
                      ) : null}
                      {(!isActive || !loadedTabKeys.has(tab.key)) && (
                        <div className={styles.tabContentPlaceholder} aria-hidden />
                      )}
                    </div>
                  ),
                };
              })}
            />
          </div>
          <GetStartedBtn
            link={button.link}
            text={button.text}
            type="black"
            className={styles.button}
            id="functionCta"
          />
        </div>
      </WithAnimation>
    </div>
  );
}
