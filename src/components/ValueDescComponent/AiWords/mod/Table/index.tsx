import React from 'react';
import styles from './index.module.scss';
import cx from 'classnames';
// import { Table } from '@/components/Table/AntdTable';

interface AIWordsTableProps {
  className?: string;
  style?: React.CSSProperties;
  data?: Array<{
    word?: string;
    frequency?: number;
  }>;
}

/**
 * 词频统计之后展示的列表
 */
export default function AIWordsTable(props: AIWordsTableProps) {
  const { className, style } = props;

  return (
    <div className={cx(styles.container, className)} style={style}>
      {/* <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        size="small"
      /> */}
      <div>Table component not available</div>
    </div>
  );
}
