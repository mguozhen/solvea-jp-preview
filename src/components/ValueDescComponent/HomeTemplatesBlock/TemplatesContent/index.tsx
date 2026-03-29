import i18n from '@/i18n';
import GetStartedBtn from 'components/ValueDescComponent/GetStartedBtn';
import DataExSvg from 'components/ValueDescComponent/SvgMod/templatesSvg/DataExSvg';
import PhoneSvg from 'components/ValueDescComponent/SvgMod/templatesSvg/PhoneSvg';
import RefreshSvg from 'components/ValueDescComponent/SvgMod/templatesSvg/RefreshSvg';
import UserSvg from 'components/ValueDescComponent/SvgMod/templatesSvg/UserSvg';
import { useEffect, useRef, useState } from 'react';
import { ChatMessage } from '..';
import ChatDemo from '../ChatDemo/ChatDemo';
import styles from '../index.module.scss';

interface Props {
  currentTemplatesListContent: any;
  activeTab: string;
}

export default function TemplatesContent(props: Props) {
  const { currentTemplatesListContent, activeTab } = props;
  const rightColRef = useRef<HTMLDivElement>(null);
  const [isRightInView, setIsRightInView] = useState(false);

  useEffect(() => {
    const el = rightColRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setIsRightInView(true);
      },
      { rootMargin: '100px', threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // 渲染流程图标
  const renderFlowIcon = (icon: string) => {
    const iconMap = {
      PhoneSvg: <PhoneSvg />,
      RefreshSvg: <RefreshSvg />,
      DataExSvg: <DataExSvg />,
      UserSvg: <UserSvg />,
    };
    return iconMap[icon];
  };

  return (
    <div className={styles.content}>
      <div className={styles.left}>
        <div className={styles.title}>{currentTemplatesListContent?.title}</div>
        <div className={styles.desc}>{currentTemplatesListContent?.desc}</div>
        <div className={styles.industryIconList}>
          {i18n('solvea.Value_integration')}
          {currentTemplatesListContent?.industryIcon.map((item, index) => (
            <picture key={index}>
              <img
                src={item}
                alt={item}
                width={'auto'}
                height={24}
                loading="lazy"
                decoding="async"
              />
            </picture>
          ))}
        </div>
        <div className={styles.indicator}>
          <div className={styles.indicatorTitle}>{i18n('solvea.Value_metrics')}</div>
          <div className={styles.indicatorList}>
            {currentTemplatesListContent?.indicator?.map((item, index) => (
              <div key={index} className={styles.indicatorItem}>
                <div className={styles.indicatorItemValue}>{item.value}</div>
                <div className={styles.indicatorItemName}>{item.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.flowList}>
          {currentTemplatesListContent?.flowList.map((item, index) => (
            <div key={index} className={styles.flowItem}>
              <div className={styles.flowItemIcon}>{renderFlowIcon(item.icon)}</div>
              <div className={styles.flowItemContent}>
                <div className={styles.flowItemTitle}>{item.title}</div>
                <div className={styles.flowItemDes}>{item.des}</div>
              </div>
            </div>
          ))}
        </div>
        <GetStartedBtn
          text={currentTemplatesListContent?.button.text || ''}
          link={currentTemplatesListContent?.button.link || ''}
          type="black"
          className={styles.button}
          id={`${activeTab}Demo`}
        />
      </div>
      <div className={styles.right} ref={rightColRef}>
        {isRightInView ? (
          <ChatDemo
            activeTab={activeTab}
            currentChatScript={currentTemplatesListContent?.chatScript as ChatMessage[]}
          />
        ) : (
          <div className={styles.chatDemoPlaceholder} aria-hidden />
        )}
      </div>
    </div>
  );
}
