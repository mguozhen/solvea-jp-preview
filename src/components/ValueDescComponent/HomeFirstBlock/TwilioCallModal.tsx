'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import type { TwilioVoiceConfig } from './TwilioVoice';
import styles from './WebcallModal.module.scss';

const TwilioVoice = dynamic(() => import('./TwilioVoice'), { ssr: false });

interface Props {
  open: boolean;
  onClose: () => void;
  modalTitle?: string;
  voiceConfig?: TwilioVoiceConfig;
}

export default function TwilioCallModal({
  open,
  onClose,
  modalTitle = 'Talk to Solvea',
  voiceConfig,
}: Props) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <span className={styles.headerTitle}>{modalTitle}</span>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className={styles.voiceWrapper}>
          <TwilioVoice config={voiceConfig} />
        </div>
      </div>
    </div>
  );
}
