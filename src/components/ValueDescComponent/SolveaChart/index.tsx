import { Button } from 'pages/mod/Button';
import Chart from '../Chart';
import PartLabel from '../PartLabel';
import styles from './index.module.scss';

interface Props {
  partLabel: string;
  title: string;
  chartLabel: string;
  chartData: {
    label: string;
    value: number;
    color: string;
  }[];
  description: string;
  href?: string;
  text?: string;
  chartType?: string;
}

export default function SolveaChart(props: Props) {
  const {
    partLabel,
    title,
    chartLabel,
    chartData,
    description,
    text,
    href,
    chartType = 'stack',
  } = props;

  return (
    <div className={styles.container}>
      {/* 段落标签 名称*/}
      <PartLabel partLabel={partLabel} />
      {/* 主标题 */}
      {title && <div className={styles.title}>{title}</div>}
      {/* 图表 */}
      <Chart
        chartLabel={chartLabel}
        chartData={chartData}
        description={description}
        chartType={chartType}
      />
      {/* 按钮 */}
      <a href={href} target="_blank" className={styles.buttonLink}>
        <Button
          className={styles.button}
          classNames={{
            content: styles.content,
            text: styles.text,
            arrow: styles.arrow,
          }}
        >
          {text}
        </Button>
      </a>
    </div>
  );
}
