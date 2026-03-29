import React from 'react';
import { Modal } from 'antd';
import styles from './index.module.scss';
import i18n from '@/i18n';
import { Button } from 'pages/mod/Button';

export default function ModalUsage({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Modal
      width={694}
      open={open}
      onCancel={onClose}
      onOk={onClose}
      centered
      maskClosable={false}
      wrapClassName={styles.container}
      footer={null}
    >
      <div>
        <div className={styles.title}>{i18n('solvea.Modal_Usage_Title')}</div>
        <ul className={styles.content}>
          <li className={styles.item}>{i18n('solvea.Modal_Usage_Desc1')}</li>
          <li className={styles.item}>{i18n('solvea.Modal_Usage_Desc2')}</li>
          <li className={styles.item}>{i18n('solvea.Modal_Usage_Desc3')}</li>
        </ul>
        <a href="/contact">
          <Button
            className={styles.btn}
            classNames={{ content: styles.btnContent }}
          >
            {i18n('docs.Docs_Links_Questions_Value')}
          </Button>
        </a>
        <img
          src="https://cdn.shulex-voc.com/shulex/upload/2025-10-13/2dc03645-1398-4d42-9b39-da470cb43480.png"
          className={styles.img}
        />
        <div className={styles.continueText} onClick={onClose}>
          {i18n('solvea.Modal_Usage_Continue_Test')}
        </div>
      </div>
    </Modal>
  );
}
