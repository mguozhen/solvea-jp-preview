import React, { useState } from 'react';
import cx from 'classnames';
import styles from './index.module.scss';
import { Button } from 'pages/mod/Button';
import { isSubmittedForm } from 'util/common';
import SolveaFormModal from '../SolveaFormModal';

export interface TitleBannerProps {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  subTitle?: string;
  h1?: boolean; // 是否是h1标签
  textColor?: string;
  img?: string;
  btns?: {
    buttonText: string;
    buttonHref: string;
    formId: string;
    reportLink: string;
    className?: string;
    tag?: string;
  }[];
  theme?: 'dark' | 'light';
}

// 标题块加背景图
export default function TitleBanner(props: TitleBannerProps) {
  const { className, style, title, subTitle, theme, btns, h1, img, textColor } =
    props;
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div
      className={cx(styles.container, className, {
        [styles.darkTheme]: theme === 'light',
        [styles.dark]: theme === 'dark',
      })}
      style={{
        ...style,
        ...(img
          ? {
              backgroundImage: `url(${img})`,
            }
          : {}), // 背景图片
      }}
    >
      <div className={styles.main}>
        {title && h1 && (
          <div className={cx(styles.title)} style={{ color: textColor }}>
            {title}
          </div>
        )}
        {title && !h1 && (
          <h2 className={cx(styles.title)} style={{ color: textColor }}>
            {title}
          </h2>
        )}
        {subTitle && (
          <div className={cx(styles.subTitle)} style={{ color: textColor }}>
            {subTitle}
          </div>
        )}
        {btns && (
          <div className={styles.buttons}>
            {btns.map((btn, index) => {
              // 判断是否显示按钮
              const showButton =
                btn?.buttonText && (btn?.buttonHref || btn?.formId);

              // 处理弹框按钮点击
              const handleModalButtonClick = () => {
                if (isSubmittedForm()) {
                  window.open(btn?.reportLink, '_blank');
                } else {
                  setModalOpen(true);
                }
              };

              // 渲染按钮组件
              const renderButton = () => (
                <Button
                  className={styles.button}
                  classNames={{
                    content: styles.buttonContent,
                    text: styles.buttonText,
                    arrow: styles.buttonArrow,
                    svg: styles.buttonSvg,
                  }}
                >
                  {btn.buttonText}
                </Button>
              );

              return (
                <div key={index}>
                  {/* 按钮 */}
                  {showButton && (
                    <>
                      {btn?.buttonHref ? (
                        <a
                          href={btn?.buttonHref}
                          target="_blank"
                          className={styles.buttonLink}
                        >
                          {renderButton()}
                        </a>
                      ) : (
                        <div
                          className={styles.buttonLink}
                          onClick={handleModalButtonClick}
                        >
                          {renderButton()}
                        </div>
                      )}
                    </>
                  )}

                  {/* 表单弹框（仅在有 formId 时渲染） */}
                  {btn?.formId && (
                    <SolveaFormModal
                      formId={btn?.formId}
                      open={modalOpen}
                      onOpenChange={setModalOpen}
                      reportLink={btn?.reportLink}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
