'use client';
import i18n from '@/i18n';
import {
  AudioMutedOutlined,
  AudioOutlined,
  LoadingOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import Vapi from '@vapi-ai/web';
import { Spin } from 'antd';
import cx from 'classnames';
import { Call3, Hangup } from 'components/Icons';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import MessageList from '../MessageList';
import ModalUsage from '../Modal';
import VoiceLoading from '../VoiceLoading';
import styles from './index.module.scss';

const vapi = new Vapi('bcf1a22d-edf2-452c-977e-d5a5223118e4');
const Voice = memo(function Voice({
  onSwitch: _onSwitch,
  currentAgent,
  isLogin,
  phoneNumber,
}: {
  onSwitch: () => void;
  currentAgent?: AgentItem;
  isLogin: boolean;
  phoneNumber: string;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [streamLoading, setStreamLoading] = useState(false);
  const [streamContent, setStreamContent] = useState<string>('');
  const messagesListRef = useRef<any[]>([]);
  const streamMessageRef = useRef<any>();
  const [muted, setMuted] = useState(true);
  const [currentCallAssistant, setCurrentCallAssistant] = useState<string>();
  const [volume, setVolume] = useState(0);
  const [showModalUsage, setShowModalUsage] = useState(false);
  // const ccc = useMicrophoneVolume();
  // console.log('volume', volume, ccc);

  const [callStatus, setCallStatus] = useState<'start' | 'end' | 'calling' | 'in-progress'>(
    'start',
  );
  const onStart = async () => {
    await vapi.stop();
    setTimeout(() => {
      messagesListRef.current = [];
      setCallStatus('calling');
      setStreamContent('');
      streamMessageRef.current = null;
      setCurrentCallAssistant(currentAgent?.assistantId);
      setStreamLoading(false);
      vapi.start(currentAgent?.assistantId || '');
      setMuted(true);
      vapi.setMuted(true);
    }, 10);
  };

  const isCurrentAssistant = useMemo(() => {
    return currentCallAssistant === currentAgent?.assistantId;
  }, [currentCallAssistant, currentAgent?.assistantId]);

  // 文本替换配置
  const textReplacements: Array<{
    from: string | string[];
    to: string;
  }> = [
    { from: ['Sylvia', 'xxx2'], to: 'Solvea' },
    // 可以添加更多替换规则
  ];

  // 处理文本替换的函数
  const processTextReplacements = (text: string) => {
    if (!text || !textReplacements.length) return text;

    let processedText = text;
    textReplacements.forEach(({ from, to }) => {
      if (Array.isArray(from)) {
        // 对于数组，使用 join 创建单个正则表达式
        if (from.length > 0) {
          const combinedPattern = from
            .map(
              (pattern) => pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), // 转义特殊字符
            )
            .join('|');
          const regex = new RegExp(combinedPattern, 'gi'); // 添加 'i' 标志表示不区分大小写
          processedText = processedText.replace(regex, to);
        }
      } else {
        // 单个字符串，直接替换
        const regex = new RegExp(
          from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
          'gi', // 添加 'i' 标志表示不区分大小写
        );
        processedText = processedText.replace(regex, to);
      }
    });

    return processedText;
  };

  const pushMessage = (message: any) => {
    const { role, transcript, transcriptType } = message;
    // 判断是否是同一个角色
    const isSameRole = streamMessageRef.current?.role === role;

    if (isSameRole && streamMessageRef.current) {
      // 相同角色 - 合并到当前流式消息
      if (transcriptType === 'partial') {
        setStreamLoading(true);
        const newContent = (streamMessageRef.current.final || '') + transcript;
        const processedContent = processTextReplacements(newContent);
        streamMessageRef.current.content = processedContent;
        setStreamContent(processedContent); // 触发重新渲染
      } else if (transcriptType === 'final') {
        setStreamLoading(false);
        const finalContent = (streamMessageRef.current.final || '') + transcript + ' ';
        streamMessageRef.current.final = finalContent;
        const processedContent = processTextReplacements(finalContent);
        streamMessageRef.current.content = processedContent;
        setStreamContent(processedContent); // 触发重新渲染
      }
    } else {
      // 角色变化 - 处理前一条消息并开始新的流式消息

      // 1. 如果有前一条流式消息，将其加入消息列表
      if (streamMessageRef.current) {
        messagesListRef.current = [
          ...messagesListRef.current,
          {
            role: streamMessageRef.current.role,
            content: processTextReplacements(
              streamMessageRef.current.final || streamMessageRef.current.content,
            ),
          },
        ];
      }

      // 2. 开始新的流式消息
      const processedTranscript = processTextReplacements(transcript);
      streamMessageRef.current = {
        role,
        final: transcriptType === 'final' ? transcript : '',
        content: processedTranscript,
      };

      // 3. 如果是 final 消息，立即加入列表
      if (transcriptType === 'final') {
        messagesListRef.current = [
          ...messagesListRef.current,
          {
            role,
            content: processedTranscript,
          },
        ];
        streamMessageRef.current = null; // 清空流式消息
        setStreamContent(''); // 清空流式内容状态
      } else {
        // 4. 如果是 partial 消息，设置加载状态
        setStreamLoading(true);
        setStreamContent(processedTranscript); // 设置流式内容状态
      }
    }

    console.log('streamMessageRef', streamMessageRef.current);
    console.log('messagesListRef', messagesListRef.current);
  };

  useEffect(() => {
    vapi.on('speech-start', () => {
      console.log('Speech has started');
    });

    vapi.on('speech-end', () => {
      console.log('Speech has ended');
    });

    vapi.on('call-start', () => {
      console.log('Call has started');
    });

    vapi.on('call-end', () => {
      console.log('Call has stopped');
    });

    // vapi.on('volume-level', (volume) => {
    //   console.log(`Assistant volume level: ${volume}`);
    //   setVolume(volume === 0 ? 0 : 0.5 + volume * 2);
    // });

    // Function calls and transcripts will be sent via messages
    vapi.on('message', (message) => {
      if (message.role === 'user' && message.type === 'speech-update') {
        setVolume(message.status === 'started' ? 2 : 0);
      }

      if (message.type === 'transcript') {
        setCallStatus('in-progress');
        if (message.transcriptType === 'partial') {
          pushMessage(message);
        }
        if (message.transcriptType === 'final') {
          pushMessage(message);
        }
      } else if (message.type === 'function-call') {
        setStreamLoading(false);
        // addMessage('system', `Function called: ${message.functionCall.name}`);
      } else if (message.type === 'hang') {
        setStreamLoading(false);
        // addMessage('system', 'Call ended by assistant');
      } else if (message.type === 'conversation-update') {
        // console.log('conversation-update', message.conversation);
        // messagesListRef.current = message.conversation?.filter(
        //   (item) => item.role == 'user' || item.role == 'assistant',
        // );
      }
      if (message.status === 'in-progress') {
        setCallStatus('in-progress');
      }
      if (message.status === 'ended') {
        setCallStatus('start');
      }
    });

    vapi.on('error', (e) => {
      console.error(e);
    });
    return () => {
      console.log('stop');
      vapi.stop();
    };
  }, []);

  useEffect(() => {
    console.log('scroll');
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
  }, [streamContent]); // 使用状态而不是 ref

  useEffect(() => {
    // setCallStatus('start');
    // vapi.stop();
  }, [currentAgent?.assistantId]);

  useEffect(() => {
    if (messagesListRef.current?.length === 5 && !isLogin) {
      setShowModalUsage(true);
      vapi.setMuted(true);
    }
  }, [messagesListRef.current?.length, isLogin]);

  return (
    <div className={styles.container}>
      <div
        className={cx(styles.content, {
          [styles.contentNoPadding]: callStatus !== 'in-progress' || !isCurrentAssistant,
        })}
        ref={contentRef}
      >
        <div className={styles.contentInner}>
          {callStatus === 'in-progress' && isCurrentAssistant && (
            <MessageList
              messages={messagesListRef.current}
              streamLoading={streamLoading}
              streamMessage={streamContent}
              role={streamMessageRef.current?.role}
              type="voice"
            />
          )}
          {(callStatus !== 'in-progress' || !isCurrentAssistant) && (
            <div style={{ textAlign: 'center' }}>
              <h2>{i18n('solvea.Voice_Assistant_Title')}</h2>
              <div>
                <video
                  src="https://cdn.shulex-voc.com/assets/1757676142430/voice2.mp4"
                  style={{ width: 400, marginTop: 50 }}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.footer}>
        {callStatus === 'in-progress' && isCurrentAssistant && (
          <div
            className={styles.hangup}
            onClick={() => {
              vapi.stop();
              setCallStatus('start');
            }}
          >
            <Hangup className={styles.hangupIcon} />
          </div>
        )}

        {/* <div style={{ width: 200, height: 40 }}>
          <VoiceLoading playbackSpeed={volume} />
        </div> */}
        {callStatus === 'in-progress' && isCurrentAssistant && (
          <div
            className={cx(styles.hangup, styles.audioBtn)}
            onClick={() => {
              vapi.setMuted(muted);
              setMuted(!muted);
            }}
          >
            <div style={{ width: 80, height: 40 }}>
              <VoiceLoading playbackSpeed={volume} />
            </div>
            {muted ? (
              <AudioOutlined className={styles.audioIcon} />
            ) : (
              <AudioMutedOutlined className={styles.audioIcon} />
            )}
          </div>
        )}
        {(callStatus === 'start' || !isCurrentAssistant) && (
          <div className={styles.callingBtn} onClick={onStart}>
            <div className={styles.callingBtnCon}>
              <Call3 className={styles.hangupIcon} />
              <span>{i18n('solvea.Voice_Call_Assistant_Btn')}</span>
            </div>
          </div>
        )}
        {phoneNumber && (
          <div className={styles.phoneNumber}>
            <PhoneOutlined className={styles.phoneNumberIcon} />
            <span>{`${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3)}`}</span>
          </div>
        )}
        {/* {callStatus === 'start' && (
          <div className={cx(styles.callingBtn, styles.chatBtn)} onClick={onSwitch}>
            <div className={styles.callingBtnCon}>
              <Keyboard className={styles.hangupIcon} />
              <span>{i18n('solvea.Solutions_Chat')}</span>
            </div>
          </div>
        )} */}
        {callStatus === 'calling' && isCurrentAssistant && (
          <div className={styles.callingBtn} onClick={onStart}>
            <div className={styles.callingBtnCon}>
              <Spin indicator={<LoadingOutlined spin style={{ color: '#fff' }} />} />
              <span>{i18n('solvea.Voice_Call_Assistant_Btn')}</span>
              <span className={styles.callingBtnLoading}></span>
            </div>
          </div>
        )}
      </div>
      {callStatus === 'in-progress' && isCurrentAssistant && (
        <div className={styles.tipText}>
          <span style={{ color: currentAgent?.color }}>Tips: </span>
          {i18n(`solvea.${currentAgent?.tips}`)}
        </div>
      )}
      <ModalUsage
        open={showModalUsage}
        onClose={() => {
          setShowModalUsage(false);
          vapi.setMuted(false);
        }}
      />
    </div>
  );
});

export default Voice;
