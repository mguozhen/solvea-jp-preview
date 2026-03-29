import cx from 'classnames';
import { Line } from 'pages/mod/Line';
import { useMemo } from 'react';
import styles from './index.module.scss';

interface Props {
  chartLabel: string;
  chartData: {
    label: string;
    value: number;
    color: string;
  }[];
  description: string;
  chartType: string;
}
export default function Chart(props: Props) {
  const { chartLabel, chartData, description, chartType } = props;

  const chartContent = useMemo(() => {
    if (chartType === 'bar') {
      return (
        <>
          <Line />
          <div className={cx(styles.barChartContainer)}>
            {chartData.map((item, index) => {
              return (
                <div key={index} className={styles.chartItemContainer}>
                  <div
                    key={index}
                    className={styles.chartItem}
                    style={{
                      width: item.value,
                      backgroundColor: item.color,
                      height: '100%',
                    }}
                  />
                  <div className={styles.valueText}>{item.value}</div>
                </div>
              );
            })}
          </div>
          <Line />
          {/* 描述 */}
          <div className={cx(styles.description, styles.barDescriptionContainer)}>
            {description}
          </div>
        </>
      );
    }
    return (
      <>
        {/* 图表容器 */}
        <div className={styles.chartContainer}>
          {chartData.map((item, index) => {
            return (
              <div
                key={index}
                className={styles.chartItem}
                style={{
                  width: item.value,
                  backgroundColor: item.color,
                  height: '100%',
                }}
              >
                <span className={styles.valueText}>{item.value}</span>
              </div>
            );
          })}
        </div>
        <Line />
        {/* 描述 */}
        <div className={styles.description}>{description}</div>
        <Line />
      </>
    );
  }, [chartType, chartData, description]);

  return (
    <>
      {/* 分割线 */}
      <Line />
      {/* 图表内容 */}
      <div className={styles.chartSection}>
        {/* 图表标签 */}
        <div className={styles.chartLabel}>
          {/* 图表标签标题 */}
          <div className={styles.chartLabelTitle}>{chartLabel}</div>
          {/* 坐标名称及颜色 */}
          <div className={styles.legend}>
            {chartData.map((item, index) => (
              <div key={index} className={styles.legendItem}>
                <div className={styles.legendColor} style={{ backgroundColor: item.color }} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        {chartContent}
      </div>
    </>
  );
}
