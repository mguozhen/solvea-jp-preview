import React from 'react';
import styles from './index.module.scss';
import { Modal } from 'antd';
import ActionButton from 'components/ValueDescComponent/ActionButton';
import SvgLogoVocWhite from 'components/Icons/LogoVocWhite';
import { ACTION_BTN_DEFAULT_COLOR } from 'theme/color';
interface Props {
  open?: boolean;
  onClose?: () => void;
}
export default function GuideModal(props: Props) {
  const { open = false, onClose } = props;
  const url = 'https://cdn.shulex-voc.com/assets/1690805482971/modal.png';
  return (
    <Modal
      width={800}
      open={open}
      onCancel={onClose}
      onOk={onClose}
      centered
      wrapClassName={styles.container}
      footer={null}
      // closable={false}
    >
      <div className={styles.modalInner}>
        <div className={styles.left}>
          <SvgLogoVocWhite className={styles.logo} />
          <div className={styles.item}>#1 AI Research Tool</div>
          <div className={styles.item}>&bull;&nbsp;Customer Analyze</div>
          <div className={styles.item}>&bull;&nbsp;Review Analyze</div>
          <div className={styles.item}>&bull;&nbsp;Product Research</div>
          <img
            className={styles.img}
            src={url}
            alt="shulex-img"
            title="shulex-img"
          />
        </div>
        <div className={styles.right}>
          <div className={styles.text}>Boost your business with the #1 ChatGPT tool</div>
          <div className={styles.text2}>A Saas platform for global voice of customer and product research. More efficient, less cost and stay ahead!</div>
          <ActionButton
            className={styles.btn}
            title="sign up"
            href="https://apps.voc.ai/app"
            hideArrow
            target="_blank"
            theme={ACTION_BTN_DEFAULT_COLOR}
          />
        </div>
      </div>
    </Modal>
  );
}
