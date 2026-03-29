import { useEffect } from 'react';
import { parseJSON } from 'shulex-util';
import { logSubmittedForm } from 'util/common';
import { submitFormToBaiduTJ } from 'util/document';

function useCnTallyListener() {
  useEffect(() => {
    // 监听跨窗口消息事件
    const handleMessage = (event) => {
      try {
        // 国内表单
        if (event.origin === 'https://tally.so') {
          if (parseJSON(event.data)?.event === 'Tally.FormSubmitted') {
            submitFormToBaiduTJ?.(parseJSON(event.data)?.payload?.id);
            logSubmittedForm();

            const dom: HTMLDivElement = document.querySelector(
              '#baidu-tj-submit',
            ) as HTMLDivElement;
            if (dom) {
              dom.click();
            }
          }
        }
      } catch (error) {
        console.log('hyx error', error);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('message', handleMessage);

      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }
  }, []);
}

export default useCnTallyListener;
