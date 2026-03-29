'use client';
import React, { useEffect, useCallback } from 'react';
import styles from './index.module.scss';
import EnForm from 'components/EnForm';

interface Props {
  formId?: string;
  // eslint-disable-next-line no-unused-vars
  open: boolean;
  onOpenChange: (_open: boolean) => void;
  reportLink: string;
}

export default function SolveaFormModal(props: Props) {
  const {
    formId = '00221155-2faa-43b2-9bb9-ca7625c50cee',
    open,
    onOpenChange,
    reportLink,
  } = props;

  // 关闭弹框
  const handleClose = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  // ESC键关闭
  useEffect(() => {
    if (!open) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, handleClose]);

  if (!open) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBackdrop} onClick={handleClose} />
      <div className={styles.modalContent}>
        <button
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Close"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={styles.formContainer}>
          <div className={styles.formWrapper}>
            <EnForm formId={formId} formType="download" reportLink={reportLink} />
          </div>
        </div>
      </div>
    </div>
  );
}
