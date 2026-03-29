'use client';

import { CustomerStories } from 'pages/customer-stories/mod/CustomerStories';
import styles from 'pages/glossary/index.module.scss';
import React, { useState } from 'react';
import { StoryCardProps } from 'pages/customer-stories/mod/StoryCard';
import { Pagination, PaginationProps } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

export const List = ({ list }: { list: StoryCardProps[] }) => {
  const pageSize = 30;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 滚动到stories区域
    const storiesElement = document.getElementById('stories');
    if (storiesElement) {
      storiesElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 计算当前页的数据
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const currentPageData = list.slice(startIndex, endIndex);

  const itemRender: PaginationProps['itemRender'] = (
    _,
    type,
    originalElement,
  ) => {
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

  return (
    <>
      <CustomerStories
        data={currentPageData}
        endIndex={currentPageData.length}
      />
      {/* {list.length > pageSize && ( */}
      <div className={styles.paginationContainer}>
        <Pagination
          current={currentPage}
          total={list.length}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
          itemRender={itemRender}
        />
      </div>
      {/* )} */}
    </>
  );
};
