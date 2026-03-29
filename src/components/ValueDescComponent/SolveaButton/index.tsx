import { Button } from 'pages/mod/Button';
import styles from './index.module.scss';

interface Props {
  button: {
    text: string;
    href: string;
  };
  btnType?: 'whiteBtn' | 'defaultBtn';
  className?: string;
  classNames?: {
    content?: string;
    text?: string;
    arrow?: string;
  };
}

export default function SolveaButton(props: Props) {
  const { button, btnType = 'defaultBtn', className, classNames } = props;
  const { href: buttonHref } = button;

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
    <a href={button.href} className={`${className}`} onClick={handleClickAnchor}>
      <Button
        className={`${styles.button} ${btnType === 'whiteBtn' ? styles.whiteBtn : ''}`}
        classNames={{
          content: `${styles.buttonContent} ${classNames?.content}`,
          text: `${styles.buttonText} ${classNames?.text}`,
          arrow: `${styles.buttonArrow} ${classNames?.arrow}`,
        }}
      >
        {button.text}
      </Button>
    </a>
  );
}
