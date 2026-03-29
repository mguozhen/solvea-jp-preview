import { RadialGradientBackground } from 'components/Icons';
import { Button } from 'pages/mod/Button';
import React from 'react';
import styles from './index.module.scss';

interface Props {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  h1?: boolean; // 是否是h1标签
  primaryColor?: string;
  secondaryColor?: string;
}
export default function SolveaBottomCTA(props: Props) {
  const {
    title,
    description,
    buttonText,
    buttonHref,
    h1 = true,
    primaryColor = '#F07AF9',
    secondaryColor = '#F7F7F7',
  } = props;

  const handleClickAnchor = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // 检查 href 是否是锚点（以 # 开头）
    if (buttonHref.startsWith('#')) {
      e.preventDefault();

      const targetId = buttonHref.substring(1); // 移除 # 符号
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // 获取元素的计算样式，获取padding-top
        const computedStyle = window.getComputedStyle(targetElement);
        const paddingTop = parseFloat(computedStyle.paddingTop) || 0;

        // 获取元素距离页面顶部的位置
        const elementTop = targetElement.getBoundingClientRect().top + window.scrollY;

        // 滚动到元素顶部减去padding（即滚动到padding的开始位置）
        window.scrollTo({
          top: elementTop - paddingTop,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <div className={styles.container}>
      <RadialGradientBackground
        className={styles.backgroundSvg}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
      {h1 ? <h1 className={styles.title}>{title}</h1> : <h2 className={styles.title}>{title}</h2>}
      <div className={styles.description}>{description}</div>
      <a href={buttonHref} onClick={handleClickAnchor} className={styles.btn}>
        <Button className={styles.button}>{buttonText}</Button>
      </a>
    </div>
  );
}
