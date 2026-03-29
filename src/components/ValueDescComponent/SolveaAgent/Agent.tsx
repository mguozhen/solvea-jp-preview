'use client';
import { Select } from 'antd';
import cx from 'classnames';
import { langOptions, SceneList2 } from 'pages/mod/Scene/data';
import { useEffect, useMemo, useState } from 'react';
import { getUrlQuery } from 'shulex-util';
import { getLangShort } from 'util/i18nOld/i18nOld';
import { getLoginUserInfo } from 'util/services';
import PartLabel from '../PartLabel';
import styles from './index.module.scss';
import Voice from './mod/Voice';

interface Props {
  partLabel: string;
  title: string;
  SceneList: AgentItem[];
}

export default function SolveaAgent(props: Props) {
  const { partLabel, title, SceneList } = props;
  const [, setCurrentType] = useState<'voice' | 'chat'>();
  const [currentAgent, setCurrentAgent] = useState<AgentItem>();
  const [currentLang, setCurrentLang] = useState<string>(getLangShort());
  const [isLogin, setIsLogin] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [, setShowSteps] = useState(false);

  const currentStepList = useMemo(() => {
    return SceneList.find((item) => item.agentId === currentAgent?.agentId)?.stepList;
  }, [currentAgent]);

  const getData = useMemo(
    () => (item: AgentItem | undefined, key: string, lang?: string) => {
      return item?.[lang || (currentLang as keyof AgentItem)]?.[key];
    },
    [currentLang],
  );

  useEffect(() => {
    setCurrentType((getUrlQuery('type') || 'voice') as 'voice' | 'chat');
    const scenarioTab = getUrlQuery('scenarioTab');
    const lang = getLangShort();
    setCurrentLang(lang);
    if (!!scenarioTab) {
      const item = SceneList[Number(scenarioTab) - 1];
      setCurrentAgent({
        ...item,
        assistantId: getData(item, 'assistantId'),
      });
    } else {
      setCurrentAgent(SceneList2[0]);
    }
    getLoginUserInfo().then((res) => {
      setIsLogin(!!res?.data?.accountId);
    });
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 800);
      if (window.innerWidth >= 800) {
        setShowSteps(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={styles.container}>
      {/* 段落标签 名称*/}
      <PartLabel partLabel={partLabel} />
      {/* 主标题 */}
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.agentList}>
        <div className={styles.agentListContent}>
          {SceneList?.map((item) => {
            return (
              <div
                key={item.agentId}
                className={cx(styles.agentListContentItem, {
                  [styles.agentListContentItemActive]: item.agentId === currentAgent?.agentId,
                })}
                onClick={() =>
                  setCurrentAgent({
                    ...item,
                    assistantId: getData(item, 'assistantId'),
                  })
                }
              >
                <img src={item.img} alt={item.title} className={styles.avatar} />
                <div className={styles.agentListContentItemContent}>
                  <div className={styles.agentListContentItemTitle}>{item.title}</div>
                  <div className={styles.agentListContentItemDesc}>{item.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.agentContainer}>
        <div
          className={cx(styles.StepContainer, {
            // [styles.chatStepContainer]: currentType === 'chat',
            // [styles.stepDrawer]: isMobile,
            // [styles.stepDrawerOpen]: isMobile && showSteps,
          })}
        >
          {/* 关闭步骤按钮 */}
          {/* {isMobile && (
            <CloseOutlined className={styles.stepClose} onClick={() => setShowSteps(false)} />
          )} */}
          <div className={styles.stepList}>
            {currentStepList?.map((step, idx) => (
              <div key={step.index || step.title || idx} className={styles.stepItem}>
                {!isMobile && (
                  <div className={styles.stepLine}>
                    <div className={styles.stepIcon}>
                      {step.image ? <img src={step.image} alt={step.title} /> : null}
                    </div>
                    {idx !== (currentAgent?.stepList?.length || 0) - 1 && (
                      <div className={styles.stepConnector} />
                    )}
                  </div>
                )}
                <div
                  className={cx(styles.stepCard, {
                    [styles.stepCardMobile]: isMobile,
                  })}
                >
                  <div className={styles.stepCardHeader}>
                    <div className={styles.stepNumber}>{idx + 1}</div>
                  </div>
                  <div className={styles.content}>
                    <div className={styles.stepTitle}>{step.title}</div>
                    <div className={styles.stepDesc}>{step.content}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.content}>
          {/* {isMobile && !showSteps && currentType === 'voice' && (
            <div className={styles.mobileStepToggle} onClick={() => setShowSteps(true)}>
              <MenuOutlined className={styles.mobileStepToggleIcon} />
            </div>
          )} */}
          <Select
            options={langOptions}
            defaultValue={getLangShort()}
            className={cx(styles.langSelect, {
              // [styles.langSelectChat]: currentType === 'chat',
            })}
            onChange={(value) => {
              setCurrentLang(value);
              setCurrentAgent({
                ...currentAgent,
                assistantId: getData(currentAgent, 'assistantId', value),
              } as AgentItem);
            }}
          />
          <Voice
            onSwitch={() => setCurrentType('chat')}
            currentAgent={currentAgent}
            isLogin={isLogin}
            phoneNumber={getData(currentAgent, 'phoneNumber')}
          />
        </div>
      </div>
    </div>
  );
}
