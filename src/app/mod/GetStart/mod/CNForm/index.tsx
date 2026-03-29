'use client';

import Script from 'next/script';
import { Button } from 'antd';

// Available options
type PopupOptions = {
  key?: string;
  layout?: 'default' | 'modal';
  width?: number;
  alignLeft?: boolean;
  hideTitle?: boolean;
  overlay?: boolean;
  emoji?: {
    text: string;
    animation:
      | 'none'
      | 'wave'
      | 'tada'
      | 'heart-beat'
      | 'spin'
      | 'flash'
      | 'bounce'
      | 'rubber-band'
      | 'head-shake';
  };
  autoClose?: number;
  showOnce?: boolean;
  doNotShowAfterSubmit?: boolean;
  customFormUrl?: string;
  hiddenFields?: {
    [key: string]: any;
  };
  onOpen?: () => void;
  onClose?: () => void;
  onPageView?: (_page: number) => void;
  onSubmit?: (_payload: any) => void;
};
declare const Tally: TallyType;
interface TallyType {
  openPopup(_id: string, _opts?: PopupOptions);
  closePopup(_id: string);
}

const formId = 'w8KoQo';

export default function CNForm() {
  return (
    <div>
      <Script src="https://tally.so/widgets/embed.js" strategy="afterInteractive" />
      <Button
        onClick={() => {
          Tally.openPopup(formId, {
            hiddenFields: {
              ref: 'source',
              email: 'officialwebsite',
            },
            onOpen: () => {
              // The popup was opened, mark the form as seen
              // ...
            },
            onClose: () => {
              // The popup was closed
              // ...
            },
            onPageView: () => {
              // Log the page view
              // ...
            },
            onSubmit: () => {
              // Form was submitted, use the answers payload in your application
              // ...
              Tally.closePopup(formId);
            },
          });
        }}
      >
        Get Started
      </Button>
    </div>
  );
}
