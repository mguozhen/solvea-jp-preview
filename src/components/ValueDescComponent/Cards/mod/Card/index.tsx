import SvgCheckRight from 'components/Icons/CheckRight';
import styles from './index.module.scss';
import cx from 'classnames';
import SvgTrend from 'components/Icons/Trend';
import SvgChat from 'components/Icons/Chat';
import SvgCart from 'components/Icons/Cart';
import { FallOutlined, SmileOutlined } from '@ant-design/icons';

export interface CardProps extends BaseCSSProps {
  icon?: React.ReactNode;
  title?: string;
  content1?: string;
  content2?: string;
  contentList?: ContentItem[];
  btn?: {
    text?: string;
    href?: string;
  };
}

interface ContentItem {
  title: string;
  text: string;
}

const CardContent = (contents?: ContentItem[]) => {
  return (
    <div className={styles.contentsContainer}>
      {Array.isArray(contents) &&
        contents?.map((item, index) => {
          return (
            <div className={styles.item} key={index}>
              <div className={styles.title}>
                <SvgCheckRight className={styles.check} />
                <span>{item?.title}</span>
              </div>
              <div
                className={styles.text}
                dangerouslySetInnerHTML={{ __html: item?.text }}
              />
            </div>
          );
        })}
    </div>
  );
};

export default function Card(props: CardProps) {
  const {
    title,
    content1,
    content2,
    btn,
    icon,
    className,
    style,
    contentList,
  } = props;

  let list = [];
  if (contentList) {
    list = Array.isArray(contentList) ? contentList : JSON.parse(contentList);
  }

  const getIcon = (icon?: React.ReactNode) => {
    switch (icon) {
      case 'trend':
        return <SvgTrend className={styles.icon2} />;
      case 'chat':
        return <SvgChat className={styles.icon2} />;
      case 'cart':
        return <SvgCart className={styles.icon2} />;
      case 'fall':
        return <FallOutlined className={styles.icon3} />;
      case 'smile':
        return <SmileOutlined className={styles.icon3} />;
      default:
        return icon;
    }
  };

  return (
    <div className={cx(styles.container, className)} style={style}>
      {icon && <span className={styles.icon}>{getIcon(icon)}</span>}
      {title && (
        <div
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, '<br/>') }}
        />
      )}
      {content1 && <div className={styles.content}>{content1}</div>}
      {content2 && <div className={styles.content}>{content2}</div>}
      {Array.isArray(list) && list.length > 0 && CardContent(list)}
      {btn && (
        <a href={btn?.href} target="_blank" className={styles.btn}>
          {btn?.text}
        </a>
      )}
    </div>
  );
}
