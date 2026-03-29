import styles from './index.module.scss';

interface Metric {
  title: string;
  value: string;
}

interface Props {
  title: string;
  metrics: Metric[];
}

export default function SolveaKeyMetrics(props: Props) {
  const { title, metrics } = props;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <div className={styles.metricsContainer}>
          {metrics.map((metric, index) => (
            <div key={index} className={styles.metricItem}>
              <div className={styles.metricValue}>{metric.value}</div>
              <div className={styles.metricTitle}>{metric.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
