import React from 'react';
import styles from './index.module.scss';
import cx from 'classnames';
import GuideCard from 'components/GuideCard';
import i18n from '@/i18n';
import { getLink } from 'util/getLink';

interface CardItem {
  title: string;
  describtion: string;
  list: string[];
  image: string;
  link: string;
  revised?: boolean;
}

interface ThinkWorkTexts {
  title?: string;
}

interface Props {
  className?: string;
  cardList?: CardItem[];
  texts?: ThinkWorkTexts;
}

export default function ThinkWork(props: Props) {
  const { className, cardList: propsCardList, texts } = props;

  // 默认数据
  const defaultCardList: CardItem[] = [
    {
      title: i18n('layout.Smarter_Pre_Sales_Recs'),
      describtion: i18n('layout.Solvea_Understands_Consumer_Intent'),
      list: [
        i18n('layout.Always_on_engage'),
        i18n('layout.Thoughtful_Responses'),
      ],
      image:
        'https://cdn.shulex-voc.com/shulex/upload/2025-04-14/95e22b06-402a-42f6-93ab-19e083ea472c.png',
      link: getLink('/contact'),
    },
    {
      title: i18n('layout.Accelerate_Sales_Inquiries'),
      describtion: i18n('layout.Pre-sales_Response'),
      list: [
        i18n('layout.Solvea_Order_Check'),
        i18n('layout.Logistics_Response_Tailoring'),
      ],
      image:
        'https://cdn.shulex-voc.com/shulex/upload/2025-04-14/cf8e51fc-8fa2-4618-b385-4b3d6d86522e.png',
      revised: true,
      link: getLink('/contact'),
    },
    {
      title: i18n('layout.Resolve_Post-Sales_Issues'),
      describtion: i18n('layout.AI_workflows_benefits'),
      list: [
        i18n('layout.Enterprise_Knowledge_Run'),
        i18n('layout.Preserve_Service_Quality'),
      ],
      image:
        'https://cdn.shulex-voc.com/shulex/upload/2025-04-14/7666fc60-4b38-4c88-bcbb-4d7be6bf062b.png',
      link: getLink('/contact'),
    },
    {
      title: i18n('layout.Understand_Consumers_Brand_Services'),
      describtion: i18n('layout.Solvea_support_analysis'),
      list: [
        i18n('layout.Real-time_Issue_Detection'),
        i18n('layout.Service_Quality_Evaluation'),
      ],
      image:
        'https://cdn.shulex-voc.com/shulex/upload/2025-04-14/65f5e882-afb8-4aa4-b8b6-6fac5b2b4d12.png',
      revised: true,
      link: getLink('/contact'),
    },
  ];

  // 使用传入的数据或默认数据
  const cardList = propsCardList || defaultCardList;

  // 使用传入的文案或默认文案
  const title = texts?.title || i18n('layout.Thinks_Human_Works_Team');

  return (
    <div className={cx(styles.content, className)} data-aos="fade">
      <h2 className={styles.title}>{title}</h2>
      {cardList.map((item, index) => (
        <GuideCard
          key={index}
          title={item.title}
          describtion={item.describtion}
          list={item.list}
          revised={item.revised}
          image={item.image}
          link={item.link}
        />
      ))}
    </div>
  );
}
