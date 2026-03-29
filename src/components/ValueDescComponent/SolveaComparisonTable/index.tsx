'use client';

import { useClientSize } from '@/app/useClientSize.hook';
import { Table } from 'antd';
import { ColumnType } from 'antd/es/table';
import React from 'react';
import PartLabel from '../PartLabel';
import styles from './index.module.scss';

interface Props {
  partLabel: string;
  title: string;
  tableColumnList: {
    title: string;
    dataIndex: string;
    key: string;
    width: string;
    className?: string;
  }[];
  tableList: string[];
}

const SolveaComparisonTable: React.FC<Props> = (props) => {
  const { partLabel, title, tableColumnList, tableList } = props;
  const { isMobile } = useClientSize();

  const columns = tableColumnList.map((item) => {
    const newColumn: ColumnType<any> = {
      ...item,
    };

    if (item.className === 'feature') {
      newColumn.render = (text: string) => {
        return <div className={styles.feature}>{text}</div>;
      };
      newColumn.fixed = 'left';
    } else if (item.className === 'ourCompany') {
      newColumn.render = (text: string) => {
        return <div className={styles.ourCompany}>{text}</div>;
      };
    } else if (item.className === 'competitorCompany') {
      newColumn.render = (text: string) => {
        return <div className={styles.competitorCompany}>{text}</div>;
      };
    }

    return newColumn;
  });

  const dataSource = tableList.map((item, index) => {
    return {
      ...JSON.parse(item),
      key: index,
    };
  });

  return (
    <div className={styles.container}>
      <PartLabel partLabel={partLabel} type="themeOne" />
      <div className={styles.title}>{title}</div>
      <Table
        scroll={isMobile ? { x: '600px' } : undefined}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        bordered={false}
        rowKey="key"
        className={styles.comparisonTable}
      />
    </div>
  );
};

export default SolveaComparisonTable;
