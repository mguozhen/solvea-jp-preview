import cx from 'classnames';
import styles from './index.module.scss';

interface Props extends BaseCSSProps {
  title?: string;
  content?: string;
  href?: string;
  image?: string;
  step?: number;
  type?: 'odd' | 'even';
  imageAlt?: string;
  showNumber?: boolean;
  theme?: 'dark' | 'light';
}

/**
 * @param props
 * @returns
 */
export default function Step(props: Props) {
  const {
    className,
    style,
    content,
    title,
    image,
    href,
    step,
    type,
    imageAlt = 'shulex-img',
    showNumber,
    theme,
  } = props;

  return (
    <div
      className={cx(styles.container, className, {
        [styles.even]: type === 'even',
        [styles.dark]: theme === 'dark',
      })}
      style={style}
    >
      {image && (
        <div className={styles.imgContainer}>
          <img
            src={image}
            alt={imageAlt}
            title={imageAlt}
            className={styles.img}
          />
          {showNumber && <div className={styles.stepNum}>0{step}</div>}
        </div>
      )}

      <div className={styles.content}>
        {title && (
          <div
            className={styles.title}
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}
        {content && (
          <h3
            className={styles.content}
            style={href ? { marginBottom: 40 } : {}}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
        {href && (
          <a href={href} target="_blank" className={styles.a}>
            <span>Learn more</span>
            <span>{'>'}</span>
          </a>
        )}
      </div>
    </div>
  );
}
