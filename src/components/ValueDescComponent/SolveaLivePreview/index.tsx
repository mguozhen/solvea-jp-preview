import { useState } from 'react';
import { LeftLine } from './LeftLine';
import { RightLine } from './RightLine';
import styles from './index.module.scss';

interface Props {
  title: string;
  buttonHref: string;
  defaultValue: string;
}

export default function SolveaLivePreview(props: Props) {
  const { title, buttonHref, defaultValue, } = props;
  const [inputValue, setInputValue] = useState<string>(() => {
    return defaultValue ?? '';
  });

  const onBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleClick = () => {
    localStorage.setItem('userInput', inputValue);
    window.open(`${buttonHref}?generate=${inputValue}`, '_blank');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>
        <div className={styles.line}>
          <LeftLine />
        </div>
        <div className={styles.inputBox}>
          <textarea placeholder="Enter your prompt here" className={styles.textarea} onBlur={onBlur} defaultValue={defaultValue} />
          <a target="_blank" className={styles.inputButton} onClick={handleClick}>
            <img
              src={
                'https://cdn.shulex-voc.com/shulex/upload/2026-01-14/20a84a50-60d8-453e-ac8a-e0922923c633.png'
              }
              alt="arrowTopWhite"
            />
          </a>
        </div>
        <div className={styles.line}>
          <RightLine />
        </div>
      </div>
    </div>
  );
}
