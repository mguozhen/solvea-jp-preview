'use client';

import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Pagination, PaginationProps } from 'antd';
import { CustomerStories } from 'pages/customer-stories/mod/CustomerStories';
import { StoryCardProps } from 'pages/customer-stories/mod/StoryCard';
import { Line } from 'pages/mod/Line';
import ScrollingBrandWall from 'pages/mod/ScrollingBrandWall';
import React, { useMemo, useState } from 'react';
import styles from './index.module.scss';

export const StoriesPage = ({
  data,
  className,
  header,
}: {
  data: StoryCardProps[];
  className?: string;
  header?: React.ReactNode;
}) => {
  const pageSize = 30;
  const [currentPage, setCurrentPage] = useState(1);
  const [industry, setIndustry] = useState<string[]>([]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 滚动到stories区域
    const storiesElement = document.getElementById('stories');
    if (storiesElement) {
      storiesElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return (
        <div className={styles.paginationItem}>
          <ArrowLeftOutlined className={styles.leftIcon} />
          Previous
        </div>
      );
    }
    if (type === 'next') {
      return (
        <div className={styles.paginationItem}>
          Next
          <ArrowRightOutlined className={styles.rightIcon} />
        </div>
      );
    }
    return originalElement;
  };

  const onSelectIndustry = (values: any) => {
    if (industry.includes(values)) {
      return;
    }
    setIndustry([...industry, values]);
    setCurrentPage(1);
  };

  const onDeselectIndustry = (values: any) => {
    if (!industry.includes(values)) {
      return;
    }
    setIndustry(industry.filter((v) => v !== values));
    setCurrentPage(1);
  };

  const onClearIndustry = () => {
    if (!industry.length) {
      return;
    }
    setIndustry([]);
    setCurrentPage(1);
  };

  const currentData = useMemo(() => {
    let currentData: StoryCardProps[] = data ?? [];
    if (!data.length) return currentData;
    if (industry.length) {
      currentData = currentData.filter((item) => {
        const industryString =
          (item?.indicator ?? []).filter((v) => v.value === 'Industries')?.[0]?.desc ?? '';
        return industry.some((v) => industryString.includes(v));
      });
    }
    if (currentPage) {
      // 计算当前页的数据
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = currentPage * pageSize;
      currentData = currentData?.slice(startIndex, endIndex) ?? [];
    }
    return currentData;
  }, [data, industry, currentPage]);

  return (
    <main className={`${styles.main} side-fade ${className}`}>
      {header}
      <Line />
      <ScrollingBrandWall />
      <Line />
      <CustomerStories
        data={currentData}
        endIndex={currentData.length}
        needFilter
        industry={industry}
        onSelectIndustry={onSelectIndustry}
        onDeselectIndustry={onDeselectIndustry}
        onClearIndustry={onClearIndustry}
      />
      {currentData.length > 0 && (
        <div className={styles.paginationContainer}>
          <Pagination
            current={currentPage}
            total={currentData?.length ?? 0}
            pageSize={pageSize}
            onChange={handlePageChange}
            showSizeChanger={false}
            itemRender={itemRender}
          />
        </div>
      )}
    </main>
  );
};
