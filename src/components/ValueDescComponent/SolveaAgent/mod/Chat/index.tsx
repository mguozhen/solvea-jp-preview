import i18n from '@/i18n';
import { Input } from 'antd';
import { Send, Voice } from 'components/Icons';
import { throttle } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { parseJSON } from 'shulex-util';
import MessageList from '../MessageList';
import ModalUsage from '../Modal';
import styles from './index.module.scss';

export default function Chat({
  onSwitch,
  currentAgent,
  isLogin,
}: {
  onSwitch: () => void;
  currentAgent?: AgentItem;
  isLogin: boolean;
}) {
  const [value, setValue] = useState<string>();
  const [chatId, setChatId] = useState('');
  const [loading, setLoading] = useState(false);
  const [streamLoading, setStreamLoading] = useState(false);
  const [streamMessage, setStreamMessage] = useState('');
  const [showModalUsage, setShowModalUsage] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<any[]>([
    {
      role: 'system',
      content: 'Hello, how can I help you today?',
    },
  ]);
  const onSend = throttle((e: any) => {
    const v = e.target.value || value;
    if (loading || streamLoading || !v) return;
    setLoading(true);
    fetch('https://apps.voc.ai/api_v2/gpt/bot/23720/chat/stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;',
      },
      body: JSON.stringify({
        chatId: chatId,
        messages: [
          {
            role: 'USER',
            content: v,
          },
        ],
        option: {
          language: 'AUTO',
          token: '68A44858E4B0F4189BFC1E13',
        },
        metadata: {
          __active_agent_id: currentAgent?.agentId ? +currentAgent?.agentId : undefined,
        },
        touchPoint: 'LIVE_CHAT',
      }),
    })
      .then((response) => {
        if (response?.status !== 200) {
          throw new Error(response?.statusText);
        }
        return response.body;
      })
      .then(async (body: any) => {
        setLoading(false);
        const reader = body.getReader();
        const decoder = new TextDecoder();
        let partialMessage: string | undefined = '';
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            console.log('done.');
            break; // 读取完毕
          } else {
            // 将当前读取的数据解码为文本
            const chunk = decoder.decode(value, { stream: true });
            // 将当前部分消息与新读取的数据拼接起来
            const message = partialMessage + chunk;
            // 拆分消息
            const messages = message.split('\n');
            // 最后一条消息可能是不完整的，需要留作下次读取时使用
            partialMessage = messages.pop();
            // 处理完整的消息
            let shouldStop = false;
            for (const msg of messages) {
              if (shouldStop) break;

              const chatStr = msg.trim().replace('data:', '');
              if (chatStr) {
                const chat = parseJSON(chatStr) || {};
                console.log('chatccc', chat);
                if (chat.isEnd) {
                  setStreamMessage('');
                  setChatId(chat?.data?.chatId || '');
                  if (chat?.data?.type === 'MESSAGE') {
                    setMessages((prev) => [
                      ...prev,
                      {
                        role: 'assistant',
                        content: chat?.data?.content || '',
                      },
                    ]);
                  }

                  setTimeout(() => {
                    setLoading(false);
                    setStreamLoading(false);
                  }, 100);
                  shouldStop = true;
                  break;
                } else {
                  setStreamLoading(true);
                  chat?.data && setStreamMessage((prev) => prev + chat.data);
                }
              }
            }
          }
        }
        // handleAssistantMsgSend();
      })
      .catch(() => {
        setLoading(false);
        setStreamLoading(false);
      });
    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        content: value,
      },
    ]);
    setValue(undefined);
  }, 100);

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    console.log('currentAgent', currentAgent);
    setMessages([
      {
        role: 'system',
        content: 'Hello, how can I help you today?',
      },
    ]);
    setValue(undefined);
    setChatId('');
    setLoading(false);
    setStreamLoading(false);
  }, [currentAgent]);

  useEffect(() => {
    const scrollToBottom = () => {
      if (contentRef.current) {
        contentRef.current.scrollTo({
          top: contentRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    };

    // 使用 setTimeout 确保 DOM 更新后再滚动
    const timeoutId = setTimeout(scrollToBottom, 100);

    return () => clearTimeout(timeoutId);
  }, [messages, streamMessage, streamLoading]);

  useEffect(() => {
    if (messages.length === 5 && !isLogin) {
      setShowModalUsage(true);
    }
  }, [messages.length, isLogin]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content} ref={contentRef}>
          <div className={styles.contentInner}>
            <MessageList
              messages={messages}
              loading={loading}
              streamLoading={streamLoading}
              streamMessage={streamMessage}
            />
          </div>
        </div>{' '}
        <div className={styles.tipText}>
          <span style={{ color: currentAgent?.color }}>Tips: </span>
          {i18n(`solvea.${currentAgent?.tips}`)}
        </div>
        <div className={styles.bottom}>
          <Input.TextArea
            value={value}
            autoSize={{ minRows: 1, maxRows: 5 }}
            placeholder="If you have any questions, please tell me"
            onPressEnter={(e) => {
              // 允许换行，只有在不按下 shift 的情况下才发送
              if (e.nativeEvent.isComposing) {
                return; // 如果正在输入法输入，不发送
              }
              if (!e.shiftKey) {
                e.preventDefault(); // 阻止换行
                onSend(e);
              }
              // 如果按下 shift，则允许换行，不发送
            }}
            onChange={onChange}
            className={styles.input}
          />
          <div className={styles.sendIconWrapper} onClick={onSend}>
            <Send className={styles.sendIcon} />
          </div>
          <div className={styles.switchVoice} onClick={onSwitch}>
            <Voice className={styles.voiceIcon} />
          </div>
        </div>
      </div>
      <ModalUsage open={showModalUsage} onClose={() => setShowModalUsage(false)} />
    </div>
  );
}
