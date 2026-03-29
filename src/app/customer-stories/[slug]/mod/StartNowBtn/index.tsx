import { Button } from 'pages/mod/Button';
import { getLink } from 'util/getLink';
import styles from './index.module.scss';

export const StartNowBtn = ({
  title,
  desc,
  buttonText,
}: {
  title: string;
  desc: string;
  buttonText: string;
}) => {
  return (
    <div className={styles.guide}>
      <div className={styles.guideTitle}>{title}</div>
      {!!desc && <div className={styles.guideContent}>{desc}</div>}
      <a href={getLink('/contact')} target={'_blank'} className={styles.btn}>
        <Button>{buttonText}</Button>
      </a>
    </div>
  );
};
