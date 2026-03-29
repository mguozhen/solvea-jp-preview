'use client';
import React, { useEffect, useMemo, useState } from 'react';
import styles from './index.module.scss';
import { getUrlQuery } from 'shulex-util';
import Voice from './mod/Voice';
import Chat from './mod/Chat';
import { langOptions, SceneList2 } from 'pages/mod/Scene/data';
import i18n from '@/i18n';
import { getLangShort } from 'util/i18nOld/i18nOld';
import { Divider, Select } from 'antd';
import cx from 'classnames';
import { Chat3, Voice2 } from 'components/Icons';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { getLoginUserInfo } from 'util/services';

export default function Agent() {
  const [currentType, setCurrentType] = useState<'voice' | 'chat'>();
  const [currentAgent, setCurrentAgent] = useState<AgentItem>();
  const [currentLang, setCurrentLang] = useState<string>(getLangShort());
  const [mobileShowAgentList, setMobileShowAgentList] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const getData = useMemo(
    () => (item: AgentItem | undefined, key: string, lang?: string) => {
      return item?.[lang || (currentLang as keyof AgentItem)]?.[key];
    },
    [currentLang],
  );

  useEffect(() => {
    setCurrentType((getUrlQuery('type') || 'voice') as 'voice' | 'chat');
    const curId = getUrlQuery('id');
    const lang = getLangShort();
    setCurrentLang(lang);
    const item = SceneList2.find((item) => item.agentId === curId);
    if (curId && item) {
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

  return (
    <div className={styles.container}>
      <div className={styles.agentList}>
        <div className={styles.agentListTitle}>
          <span>{i18n('solvea.Agent_Test_Title')}</span>
        </div>
        <div className={styles.agentListContent}>
          {SceneList2.map((item) => {
            return (
              <div
                key={item.agentId}
                className={cx(styles.agentListContentItem, {
                  [styles.agentListContentItemActive]:
                    item.agentId === currentAgent?.agentId,
                })}
                onClick={() =>
                  setCurrentAgent({
                    ...item,
                    assistantId: getData(item, 'assistantId'),
                  })
                }
              >
                <div
                  className={styles.iconBox}
                  style={{ backgroundColor: item.color }}
                >
                  {currentType === 'voice' ? (
                    <Voice2 className={styles.icon} />
                  ) : (
                    <Chat3 className={styles.icon} />
                  )}
                </div>
                <div className={styles.agentListContentItemContent}>
                  <div className={styles.agentListContentItemTitle}>
                    {i18n(`solvea.${item.title}`)}
                  </div>
                  <div className={styles.agentListContentItemDesc}>
                    {i18n(`solvea.${item.desc}`)}
                  </div>
                </div>
              </div>
            );
          })}
          <Select
            options={langOptions}
            defaultValue={getLangShort()}
            style={{ width: '100%' }}
            className={styles.langSelect}
            onChange={(value) => {
              setCurrentLang(value);
              setCurrentAgent({
                ...currentAgent,
                assistantId: getData(currentAgent, 'assistantId', value),
              } as AgentItem);
            }}
          />
        </div>
        <div className={styles.agentListFooter}>
          <span>{i18n('solvea.Agent_Test_Call_Tips')}</span>
          <div className={styles.agentListFooterPhone}>
            {getData(currentAgent, 'phoneNumber')}
          </div>
        </div>
      </div>
      <div className={cx(styles.mobileList)}>
        <div className={styles.mobileListHeader}>
          <div className={styles.mobileListHeaderContent}>
            <div
              className={styles.iconBox}
              style={{ backgroundColor: currentAgent?.color }}
            >
              {currentType === 'voice' ? (
                <Voice2 className={styles.icon} />
              ) : (
                <Chat3 className={styles.icon} />
              )}
            </div>
            {currentAgent?.title && (
              <div>
                <span className={styles.mobileListHeaderTitle}>
                  {i18n(`solvea.${currentAgent?.title}`)}
                </span>
                {currentType === 'voice' && (
                  <div className={styles.mobileListHeaderPhone}>
                    {langOptions.find((item) => item.value === currentLang)
                      ?.label || 'English'}
                    <Divider
                      type="vertical"
                      style={{ backgroundColor: '#667383' }}
                    />
                    {getData(currentAgent, 'phoneNumber')}
                  </div>
                )}
              </div>
            )}
          </div>
          <MenuOutlined onClick={() => setMobileShowAgentList(true)} />
        </div>
        {mobileShowAgentList && (
          <div className={styles.agentList}>
            <div className={styles.agentListAction}>
              <CloseOutlined onClick={() => setMobileShowAgentList(false)} />
            </div>
            <div className={styles.agentListHeader}>
              <span>{i18n('solvea.Agent_Test_Title')}</span>
            </div>
            <div className={styles.agentListContent}>
              {SceneList2.map((item) => {
                return (
                  <div
                    key={item.agentId}
                    className={cx(styles.agentListContentItem, {
                      [styles.agentListContentItemActive]:
                        item.agentId === currentAgent?.agentId,
                    })}
                    onClick={() => {
                      setCurrentAgent({
                        ...item,
                        assistantId: getData(item, 'assistantId'),
                      });
                      setMobileShowAgentList(false);
                    }}
                  >
                    <div
                      className={styles.iconBox}
                      style={{ backgroundColor: item.color }}
                    >
                      {currentType === 'voice' ? (
                        <Voice2 className={styles.icon} />
                      ) : (
                        <Chat3 className={styles.icon} />
                      )}
                    </div>
                    <div className={styles.agentListContentItemContent}>
                      <div className={styles.agentListContentItemTitle}>
                        {i18n(`solvea.${item.title}`)}
                      </div>
                      <div className={styles.agentListContentItemDesc}>
                        {i18n(`solvea.${item.desc}`)}
                      </div>
                    </div>
                  </div>
                );
              })}
              <Select
                options={langOptions}
                value={currentLang}
                style={{ width: '100%' }}
                className={styles.langSelect}
                onChange={(value) => {
                  setCurrentLang(value);
                  setCurrentAgent({
                    ...currentAgent,
                    assistantId: getData(currentAgent, 'assistantId', value),
                  } as AgentItem);
                  setMobileShowAgentList(false);
                }}
              />
            </div>
            <div className={styles.agentListFooter}>
              <span>{i18n('solvea.Agent_Test_Call_Tips')}</span>
              <div className={styles.agentListFooterPhone}>
                {getData(currentAgent, 'phoneNumber')}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.content}>
        {currentType === 'voice' && (
          <Voice
            onSwitch={() => setCurrentType('chat')}
            currentAgent={currentAgent}
            isLogin={isLogin}
          />
        )}
        {currentType === 'chat' && (
          <Chat
            onSwitch={() => setCurrentType('voice')}
            currentAgent={currentAgent}
            isLogin={isLogin}
          />
        )}
      </div>
    </div>
  );
}
