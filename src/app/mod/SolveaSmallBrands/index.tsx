import cx from 'classnames';
import ScrollingBrandWall from 'pages/mod/ScrollingBrandWall';
import { Line } from '../Line';
import styles from './index.module.scss';

interface Props {
  title: string;
  showTopLine?: boolean;
  showBottomLine?: boolean;
}

export default function SolveaSmallBrands(props: Props) {
  const { title, showTopLine = true, showBottomLine = true } = props;

  return (
    <div className={cx(styles.blackBg, styles.logoBox)}>
      <div className={cx(styles.block, styles.brandsBox)} data-aos="fade">
        {showTopLine && <Line />}
        <div className={styles.titleAndBrands}>
          {title && <div className={styles.title}>{title}</div>}
          <ScrollingBrandWall />
        </div>
        {showBottomLine && <Line />}
      </div>
    </div>
  );
}
