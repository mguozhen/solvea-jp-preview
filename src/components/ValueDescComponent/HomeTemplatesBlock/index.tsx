'use client';

import cx from 'classnames';
import CalendarDemo from 'components/ValueDescComponent/HomeTemplatesBlock/CalendarDemo';
import LabelMod from 'components/ValueDescComponent/LabelMod';
import SvgClinicFrontDesk from 'components/ValueDescComponent/SvgMod/templatesSvg/ClinicFrontDesk';
import SvgCommunity from 'components/ValueDescComponent/SvgMod/templatesSvg/Community';
import SvgECommerce from 'components/ValueDescComponent/SvgMod/templatesSvg/ECommerce';
import SvgHairSalon from 'components/ValueDescComponent/SvgMod/templatesSvg/HairSalon';
import SvgHomeService from 'components/ValueDescComponent/SvgMod/templatesSvg/HomeService';
import SvgHotelFrontDesk from 'components/ValueDescComponent/SvgMod/templatesSvg/HotelFrontDesk';
import SvgLawFirm from 'components/ValueDescComponent/SvgMod/templatesSvg/LawFirm';
import SvgRealEstate from 'components/ValueDescComponent/SvgMod/templatesSvg/RealEstate';
import SvgRestaurant from 'components/ValueDescComponent/SvgMod/templatesSvg/Restaurant';
import SvgSoftwareCompany from 'components/ValueDescComponent/SvgMod/templatesSvg/softwareCompany';
import { useEffect, useMemo, useRef, useState } from 'react';
import ChatDemo from './ChatDemo/ChatDemo';
import styles from './index.module.scss';
import TemplatesContent from './TemplatesContent';

export interface ChatMessage {
  type: 'assistant' | 'user' | 'system';
  speaker?: string;
  text?: string | React.ReactNode;
  audio?: string;
  hideTabList?: boolean;
}

interface Props {
  label: string;
  title: string;
  tabs: {
    icon: string;
    title: string;
    key: string;
  }[];
  tabsContent: {
    label: string;
    value: {
      title: string;
      desc: string;
      indicator: {
        name: string;
        value: string;
      }[];
      industryIcon: string[];
      flowList: {
        icon: string;
        title: string;
        des: string;
      }[];
      button: {
        text: string;
        link: string;
      };
      chatScript: {
        type: string;
        speaker: string;
        text: string;
        audio: string;
        imgUrl: string;
        date?: {
          type: 'single' | 'dateRange' | 'timeRange';
          date: {
            year: number;
            month: number;
            day: number;
          };
          time: {
            hour: number;
            minute: number;
            period: string;
          };
          end: {
            year: number;
            month: number;
            day: number;
            hour: number;
            minute: number;
            period: string;
          };
          start: {
            hour: number;
            minute: number;
            period: string;
            year: number;
            month: number;
            day: number;
          };
        };
      }[];
    };
  }[];
  hideTabList?: boolean;
  defaultActiveTab?: string;
  scriptNote?: string;
}

const svgMap = (color: string, icon: string): React.ReactNode => {
  const map: Record<string, React.ReactNode> = {
    SvgECommerce: <SvgECommerce color={color} />,
    SvgHotelFrontDesk: <SvgHotelFrontDesk color={color} />,
    SvgRealEstate: <SvgRealEstate color={color} />,
    SvgClinicFrontDesk: <SvgClinicFrontDesk color={color} />,
    SvgSoftwareCompany: <SvgSoftwareCompany color={color} />,
    SvgHairSalon: <SvgHairSalon color={color} />,
    SvgRestaurant: <SvgRestaurant color={color} />,
    SvgCommunity: <SvgCommunity color={color} />,
    SvgLawFirm: <SvgLawFirm color={color} />,
    SvgHomeService: <SvgHomeService color={color} />,
  };
  return map[icon];
};

function DesktopTemplatesBlock(props: Omit<Props, 'scriptNote'>) {
  const { label, title, tabs, tabsContent, hideTabList = false, defaultActiveTab } = props;
  const [activeTab, setActiveTab] = useState<string>(defaultActiveTab ?? tabs[0].key);
  const [showLeftMask, setShowLeftMask] = useState(false);
  const [showRightMask, setShowRightMask] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultActiveTab !== undefined) {
      setActiveTab(defaultActiveTab);
    }
  }, [defaultActiveTab]);

  const currentTemplatesListContent = useMemo(() => {
    const currentTabContent = tabsContent.find((item) => item.label === activeTab);
    const chatScriptItem = currentTabContent?.value?.chatScript;
    if (!chatScriptItem) {
      return null;
    }
    const chatScript: ChatMessage[] = chatScriptItem.map((item) => {
      const res: ChatMessage = {
        type: item.type as 'assistant' | 'user' | 'system',
      };
      if (item?.speaker) {
        res.speaker = item.speaker;
      }
      if (item?.audio) {
        res.audio = item.audio;
      }
      let text = item?.text;
      if (item?.imgUrl) {
        text = (
          <picture>
            <img
              src={item?.imgUrl}
              width={400}
              height={'auto'}
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              loading="lazy"
              decoding="async"
              alt=""
            />
          </picture>
        ) as any;
      }
      if (item?.date?.type) {
        if (item?.date?.type === 'single') {
          text = (
            <CalendarDemo type="single" date={item?.date?.date} time={item?.date?.time as any} />
          ) as any;
        } else if (item?.date?.type === 'dateRange') {
          text = (
            <CalendarDemo
              type="dateRange"
              start={item?.date?.start as any}
              end={item?.date?.end as any}
            />
          ) as any;
        } else if (item?.date?.type === 'timeRange') {
          text = (
            <CalendarDemo
              type="timeRange"
              date={item?.date?.date}
              start={item?.date?.start as any}
              end={item?.date?.end as any}
            />
          ) as any;
        }
      }
      if (text) {
        res.text = text;
      }
      return res;
    });

    return {
      ...currentTabContent.value,
      chatScript,
    };
  }, [activeTab, tabsContent]);

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const hasScroll = scrollWidth > clientWidth;
    setShowLeftMask(hasScroll && scrollLeft > 0);
    setShowRightMask(hasScroll && scrollLeft < scrollWidth - clientWidth - 1);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const check = () => {
        requestAnimationFrame(() => {
          checkScrollPosition();
        });
      };

      check();
      setTimeout(check, 0);
      setTimeout(check, 100);

      container.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);
      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, [hideTabList]);

  const renderIndustryIcon = (color: string, icon: string) => {
    const iconMap = {
      SvgECommerce: <SvgECommerce color={color} />,
      SvgHotelFrontDesk: <SvgHotelFrontDesk color={color} />,
      SvgRealEstate: <SvgRealEstate color={color} />,
      SvgClinicFrontDesk: <SvgClinicFrontDesk color={color} />,
      SvgSoftwareCompany: <SvgSoftwareCompany color={color} />,
      SvgHairSalon: <SvgHairSalon color={color} />,
      SvgRestaurant: <SvgRestaurant color={color} />,
      SvgCommunity: <SvgCommunity color={color} />,
      SvgLawFirm: <SvgLawFirm color={color} />,
      SvgHomeService: <SvgHomeService color={color} />,
    };
    return iconMap[icon as keyof typeof iconMap];
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <LabelMod text={label} />
        <div className={styles.title}>{title}</div>
        {!hideTabList && (
          <div className={styles.tabListWrapper}>
            {showLeftMask && <div className={styles.maskLeft} />}
            <div className={styles.tabList} ref={scrollContainerRef}>
              {tabs.map((item) => {
                const isActive = activeTab === item.key;
                const iconColor = isActive ? '#0B0B0B' : '#8A8A8A';
                return (
                  <div
                    key={item.key}
                    className={cx(styles.tabItem, { [styles.tabItemActive]: isActive })}
                    onClick={() => setActiveTab(item.key)}
                  >
                    <div className={styles.tabItemIcon}>
                      {renderIndustryIcon(iconColor, item.icon)}
                    </div>
                    <div className={styles.tabItemTitle}>{item.title}</div>
                  </div>
                );
              })}
            </div>
            {showRightMask && <div className={styles.maskRight} />}
          </div>
        )}
      </div>
      <TemplatesContent
        currentTemplatesListContent={currentTemplatesListContent}
        activeTab={activeTab}
      />
    </div>
  );
}

export default function HomeTemplatesBlock(props: Props) {
  const { label, title, tabs, tabsContent, hideTabList, defaultActiveTab, scriptNote } = props;

  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const [activeTab, setActiveTab] = useState<string>(defaultActiveTab ?? tabs[0].key);
  const demoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultActiveTab !== undefined) setActiveTab(defaultActiveTab);
  }, [defaultActiveTab]);

  const handleTabClick = (key: string) => {
    setActiveTab(key);
    setTimeout(() => {
      demoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 50);
  };

  const currentContent = useMemo(() => {
    const found = tabsContent.find((item) => item.label === activeTab);
    if (!found) return null;
    const chatScript: ChatMessage[] = (found.value.chatScript ?? []).map((item) => {
      const res: ChatMessage = { type: item.type as 'assistant' | 'user' | 'system' };
      if (item?.speaker) res.speaker = item.speaker;
      if (item?.audio) res.audio = item.audio;
      let text = item?.text;
      if (item?.imgUrl) {
        text = (
          <picture>
            <img
              src={item.imgUrl}
              width={400}
              height={'auto' as any}
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              loading="lazy"
              decoding="async"
              alt=""
            />
          </picture>
        ) as any;
      }
      if (item?.date?.type === 'single') {
        text = (
          <CalendarDemo
            type="single"
            date={item.date.date}
            time={item.date.time as any}
          />
        ) as any;
      } else if (item?.date?.type === 'dateRange') {
        text = (
          <CalendarDemo
            type="dateRange"
            start={item.date.start as any}
            end={item.date.end as any}
          />
        ) as any;
      } else if (item?.date?.type === 'timeRange') {
        text = (
          <CalendarDemo
            type="timeRange"
            date={item.date.date}
            start={item.date.start as any}
            end={item.date.end as any}
          />
        ) as any;
      }
      if (text) res.text = text;
      return res;
    });
    return { ...found.value, chatScript };
  }, [activeTab, tabsContent]);

  const scriptNoteEl = scriptNote ? (
    <p className={styles.scriptNote}>{scriptNote}</p>
  ) : null;

  if (!mounted) {
    return (
      <div className={styles.ssrPlaceholder}>
        <LabelMod text={label} />
        <div className={styles.ssrTitle}>{title}</div>
      </div>
    );
  }

  if (!isMobile) {
    return (
      <div>
        <DesktopTemplatesBlock
          label={label}
          title={title}
          tabs={tabs}
          tabsContent={tabsContent}
          hideTabList={hideTabList}
          defaultActiveTab={defaultActiveTab}
        />
        {scriptNoteEl}
      </div>
    );
  }

  return (
    <div className={styles.mobileContainer}>
      <div className={styles.mobileHeader}>
        <LabelMod text={label} />
        <div className={styles.mobileTitle}>{title}</div>
      </div>

      <div className={styles.industryGrid}>
        {tabs.map((item) => {
          const isActive = activeTab === item.key;
          const iconColor = isActive ? '#0B0B0B' : '#8A8A8A';
          return (
            <div
              key={item.key}
              className={cx(styles.gridCard, { [styles.gridCardActive]: isActive })}
              onClick={() => handleTabClick(item.key)}
            >
              <div className={styles.gridIcon}>{svgMap(iconColor, item.icon)}</div>
              <div className={styles.gridLabel}>{item.title}</div>
            </div>
          );
        })}
      </div>

      <div className={styles.mobileDemoWrapper} ref={demoRef}>
        <ChatDemo
          activeTab={activeTab}
          currentChatScript={currentContent?.chatScript as ChatMessage[]}
        />
      </div>

      {scriptNoteEl}
    </div>
  );
}
