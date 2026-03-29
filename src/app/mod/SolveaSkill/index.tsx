import React from 'react';
import styles from './index.module.scss';
import cx from 'classnames';
import SvgIntro1 from 'components/Icons/Intro1';
import SvgIntro2 from 'components/Icons/Intro2';
import SvgIntro3 from 'components/Icons/Intro3';
import SvgIntro5 from 'components/Icons/Intro5';
import SvgIntro7 from 'components/Icons/Intro7';
import SvgIntro8 from 'components/Icons/Intro8';
import SvgQueen from 'components/Icons/Queen';
import SvgArrowTopWhite from 'components/Icons/ArrowTopWhite';
import SvgIntro9 from 'components/Icons/Intro9';
import SvgIntro10 from 'components/Icons/Intro10';
import i18n from '@/i18n';

interface SkillItem {
  background: 'purple' | 'black';
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

interface SolveaSkillTexts {
  title?: string;
  titleDesc?: string;
  qa?: string;
  q1?: string;
  a1?: string;
}

interface Props {
  className?: string;
  title?: string;
  leftSkills?: SkillItem[];
  rightSkills?: SkillItem[];
  texts?: SolveaSkillTexts;
}

export default function SolveaSkill(props: Props) {
  const {
    className,
    leftSkills: propsLeftSkills,
    rightSkills: propsRightSkills,
    texts,
    title,
  } = props;

  // 默认左侧技能数据
  const defaultLeftSkills: SkillItem[] = [
    {
      background: 'purple',
      icon: SvgIntro1,
      label: i18n('layout.Answering_FAQs'),
    },
    {
      background: 'black',
      icon: SvgIntro2,
      label: i18n('layout.HandlingMultiLanguageSupport'),
    },
    {
      background: 'purple',
      icon: SvgIntro9,
      label: i18n('layout.Routing_Tickets_to_the_Right_Team'),
    },
    {
      background: 'black',
      icon: SvgIntro3,
      label: i18n('layout.Providing_Order_and_Account_Information'),
    },
  ];

  // 默认右侧技能数据
  const defaultRightSkills: SkillItem[] = [
    {
      background: 'purple',
      icon: SvgIntro5,
      label: i18n('layout.Detecting_and_Flagging_Policy_Violations'),
    },
    {
      background: 'black',
      icon: SvgIntro7,
      label: i18n('layout.Onboarding_and_Educating_Users'),
    },
    {
      background: 'purple',
      icon: SvgIntro10,
      label: i18n('layout.Escalating_Complex_Cases'),
    },
    {
      background: 'black',
      icon: SvgIntro8,
      label: i18n('layout.Learning_from_Human_Agent_Responses'),
    },
  ];

  // 使用传入的数据或默认数据
  const left = propsLeftSkills || defaultLeftSkills;
  const right = propsRightSkills || defaultRightSkills;

  // 使用传入的文案或默认文案
  const defaultTitle = title || i18n('layout.Home_Skill_title');
  const titleDesc = texts?.titleDesc || i18n('layout.Home_Skill_title_desc');
  const qa = texts?.qa || i18n('layout.Home_Skill_QA');
  const q1 = texts?.q1 || i18n('layout.Home_Skill_Q1');
  const a1 = texts?.a1 || i18n('layout.Home_Skill_A1');

  const renderColumnItem = (itemList: SkillItem[]) => {
    return (
      <div className={styles.column}>
        {itemList?.map((v, index) => {
          return (
            <div key={index} className={styles.item}>
              <div
                className={cx(
                  styles.iconBox,
                  v.background === 'purple' && styles.purple,
                )}
              >
                <v.icon className={styles.itemIcon} />
              </div>
              <div className={styles.itemLabel}>{v.label}</div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className={cx(styles.block, styles.container, className)}
      data-aos="fade"
      style={{ maxWidth: 1200 }}
    >
      <h2 className={styles.title} data-aos="fade">
        {defaultTitle}
      </h2>
      <div className={styles.content}>
        <div className={styles.left} data-aos="fade-right">
          {renderColumnItem(left)}
        </div>
        <div className={styles.center} data-aos="fade-top">
          <div className={styles.topLabelBox}>
            <SvgQueen className={styles.queenIcon} />
            <div className={styles.topLabel}>{titleDesc}</div>
          </div>
          <img
            className={styles.avatar}
            src="https://cdn.shulex-voc.com/shulex/upload/2025-04-17/46bd3df6-73ef-41fd-b1e0-7a7527d3ccb0.png"
            alt="avatar"
          />
          <div className={styles.name}>Solvea</div>
          <div className={styles.desc}>{qa}</div>
          <div className={styles.inputBox}>
            <div className={styles.inputBoxLabel}>{q1}</div>
            <div className={styles.inputGo}>
              <SvgArrowTopWhite className={styles.goIcon} />
            </div>
          </div>
          <img
            className={styles.userGroup}
            src="https://cdn.shulex-voc.com/shulex/upload/2025-04-17/b7158a07-c387-4bf9-820b-514686da7cf4.png"
            alt="userGroup"
          />
          <div className={styles.userGroupTip}>{a1}</div>
        </div>
        <div className={styles.right} data-aos="fade-left">
          {renderColumnItem(right)}
        </div>
      </div>
    </div>
  );
}
