import { ChatMessage } from 'components/ValueDescComponent/HomeTemplatesBlock';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChatDemoShowCompletedContext } from './ChatDemoContext';
import styles from './ChatDemo.module.scss';

interface ChatDemoProps {
    activeTab: string;
    currentChatScript: ChatMessage[];
}

// 将脚本转为“已播放完成”的展示列表
function scriptToCompletedMessages(script: ChatMessage[]): Array<{
    type: string;
    text: string | React.ReactNode;
    isComplete: boolean;
    hasAudio: boolean;
    isAudioPlaying: boolean;
    isAudioLoading: boolean;
    isAudioPlayed: boolean;
}> {
    return (script ?? []).map((msg) => ({
        type: msg.type,
        text: msg.text,
        isComplete: true,
        hasAudio: msg.type !== 'system' && !!msg.audio,
        isAudioPlaying: false,
        isAudioLoading: false,
        isAudioPlayed: msg.type !== 'system' && !!msg.audio
    }));
}

export default function ChatDemo({ activeTab, currentChatScript }: ChatDemoProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [showOverlay, setShowOverlay] = useState(true); // 控制遮罩层显示
    const [displayedMessages, setDisplayedMessages] = useState<Array<{
        type: string;
        text: string | React.ReactNode;
        isComplete: boolean;
        hasAudio: boolean;
        isAudioPlaying: boolean;
        isAudioLoading: boolean;
        isAudioPlayed: boolean;
    }>>(() => scriptToCompletedMessages(currentChatScript));
    const [currentMessageIndex, setCurrentMessageIndex] = useState(-1);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isCompleted, setIsCompleted] = useState(true);
    const [typingTrigger, setTypingTrigger] = useState(0); // 用于触发打字效果

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const chatContentRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const preloadedAudiosRef = useRef<Map<string, HTMLAudioElement>>(new Map());

    // 使用 ref 来追踪状态，避免闭包问题
    const stateRef = useRef({
        isTyping: false,
        audioPlaying: false,
        messageInitialized: -1, // 已初始化的消息索引
        wasPlaying: false, // 记录切换前是否正在播放
        hasAutoPlayed: false, // 标记是否已经自动播放过
        isFirstMount: true, // 标记是否是首次挂载
    });

    // 生成固定的波形高度数组（基于索引）
    const generateWaveHeights = useCallback((index: number) => {
        // 使用简单的伪随机数生成器，基于索引作为种子
        const heights: number[] = [];
        let seed = index * 1000;
        for (let i = 0; i < 30; i++) {
            seed = (seed * 9301 + 49297) % 233280;
            heights.push((seed / 233280) * 70 + 30);
        }
        return heights;
    }, []);

    // 预加载所有音频文件
    const preloadAudios = useCallback((script: ChatMessage[]) => {
        script?.forEach((message) => {
            if (message.audio && !preloadedAudiosRef.current.has(message.audio)) {
                const audio = new Audio();
                audio.preload = 'auto';
                audio.src = message.audio;
                audio.load();
                preloadedAudiosRef.current.set(message.audio, audio);
            }
        });
    }, []);

    const clearTimer = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const stopAudio = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.onended = null;
            audioRef.current.oncanplaythrough = null;
            audioRef.current.onerror = null;
        }
        stateRef.current.audioPlaying = false;
    }, []);

    // 进入下一条消息
    const processNextMessage = useCallback((nextIndex: number) => {
        clearTimer();

        if (nextIndex >= currentChatScript.length) {
            setIsPlaying(false);
            setIsCompleted(true);
            return;
        }

        setCurrentMessageIndex(nextIndex);
        setCurrentCharIndex(0);
        stateRef.current.isTyping = false;
    }, [currentChatScript?.length, clearTimer]);

    const handlePlay = () => {
        if (!isPlaying) {
            if (isCompleted || currentMessageIndex === -1) {
                // 重新开始
                setDisplayedMessages([]);
                setCurrentCharIndex(0);
                setIsCompleted(false);
                stateRef.current.messageInitialized = -1;
                stateRef.current.isTyping = false;
                stateRef.current.audioPlaying = false;
                stopAudio();
                clearTimer();
                setCurrentMessageIndex(0);
            } else {
                // 恢复播放：如果消息已经初始化但未完成，需要恢复打字效果或音频
                const currentMessage = currentChatScript[currentMessageIndex];
                const isSystemMessage = currentMessage.type === 'system';
                const hasAudio = !isSystemMessage && !!currentMessage.audio;

                if (!isSystemMessage && displayedMessages[currentMessageIndex]) {
                    const messageText = currentMessage.text;
                    const currentText = displayedMessages[currentMessageIndex].text;

                    // 如果消息未完成打字，恢复打字效果（仅对字符串类型）
                    if (typeof messageText === 'string' && typeof currentText === 'string') {
                        if (currentText.length < messageText.length) {
                            stateRef.current.isTyping = true;
                            setTypingTrigger(prev => prev + 1);
                        }
                    }

                    // 如果有音频且音频被暂停，恢复音频播放（仅当音频未播放完成时）
                    if (hasAudio && audioRef.current && audioRef.current.paused && audioRef.current.src) {
                        const currentMsg = displayedMessages[currentMessageIndex];
                        // 如果音频已经播放完成，不再恢复播放
                        if (currentMsg && !currentMsg.isAudioPlayed) {
                            audioRef.current.play().catch(() => {
                                // 播放失败，忽略
                            });
                            stateRef.current.audioPlaying = true;
                            setDisplayedMessages(prev => {
                                const newMessages = [...prev];
                                if (newMessages[currentMessageIndex]) {
                                    newMessages[currentMessageIndex] = {
                                        ...newMessages[currentMessageIndex],
                                        isAudioPlaying: true
                                    };
                                }
                                return newMessages;
                            });
                        }
                    }
                }
            }
            setIsPlaying(true);
            stateRef.current.wasPlaying = true;
        } else {
            // 暂停
            setIsPlaying(false);
            stateRef.current.wasPlaying = false;
            clearTimer();
            // 注意：不要设置 isTyping = false，这样恢复时可以继续打字
            if (audioRef.current && !audioRef.current.paused) {
                audioRef.current.pause();
                stateRef.current.audioPlaying = false;
                setDisplayedMessages(prev => {
                    const newMessages = [...prev];
                    if (newMessages[currentMessageIndex] && newMessages[currentMessageIndex].hasAudio) {
                        newMessages[currentMessageIndex] = {
                            ...newMessages[currentMessageIndex],
                            isAudioPlaying: false
                        };
                    }
                    return newMessages;
                });
            }
        }
    };

    const handleMute = () => {
        setIsMuted(prev => {
            const newMuted = !prev;
            if (audioRef.current) {
                audioRef.current.muted = newMuted;
            }
            return newMuted;
        });
    };

    // 处理遮罩层播放按钮点击
    const handleOverlayPlay = () => {
        setShowOverlay(false);
        handlePlay();
    };

    // 主播放逻辑
    useEffect(() => {
        if (!isPlaying || currentMessageIndex < 0 || currentMessageIndex >= currentChatScript.length) {
            return;
        }

        const currentMessage = currentChatScript[currentMessageIndex];
        const isSystemMessage = currentMessage.type === 'system';
        const hasAudio = !isSystemMessage && !!currentMessage.audio;
        const msgIndex = currentMessageIndex;

        // 步骤1：初始化消息（只执行一次）
        if (stateRef.current.messageInitialized < msgIndex) {
            stateRef.current.messageInitialized = msgIndex;
            stateRef.current.isTyping = false;
            stateRef.current.audioPlaying = false;

            // 停止之前的音频
            stopAudio();

            if (isSystemMessage) {
                // 系统消息：直接显示，然后延迟进入下一条
                setDisplayedMessages(prev => [
                    ...prev,
                    {
                        type: currentMessage.type,
                        text: currentMessage.text,
                        isComplete: true,
                        hasAudio: false,
                        isAudioPlaying: false,
                        isAudioLoading: false,
                        isAudioPlayed: false
                    }
                ]);

                clearTimer();
                timerRef.current = setTimeout(() => {
                    processNextMessage(msgIndex + 1);
                }, 800);
                return;
            }

            // 检查是否是 React 元素且没有音频
            // 如果 text 不是字符串类型，则认为是 React 元素
            const isReactElement = typeof currentMessage.text !== 'string';
            if (!hasAudio && isReactElement) {
                // 如果没有音频且是 React 元素，直接展示完整消息
                setDisplayedMessages(prev => [
                    ...prev,
                    {
                        type: currentMessage.type,
                        text: currentMessage.text,
                        isComplete: true,
                        hasAudio: false,
                        isAudioPlaying: false,
                        isAudioLoading: false,
                        isAudioPlayed: false
                    }
                ]);
                clearTimer();
                timerRef.current = setTimeout(() => {
                    processNextMessage(msgIndex + 1);
                }, 800);
                return;
            }

            // 普通消息：添加空消息
            setDisplayedMessages(prev => [
                ...prev,
                {
                    type: currentMessage.type,
                    text: '',
                    isComplete: false,
                    hasAudio,
                    isAudioPlaying: false,
                    isAudioLoading: hasAudio,
                    isAudioPlayed: false
                }
            ]);

            // 如果有音频，开始加载
            if (hasAudio && currentMessage.audio) {
                clearTimer();
                timerRef.current = setTimeout(() => {
                    if (!isPlaying || stateRef.current.messageInitialized !== msgIndex) return;

                    if (audioRef.current) {
                        // 设置加载状态
                        setDisplayedMessages(prev => {
                            const newMessages = [...prev];
                            if (newMessages[msgIndex]) {
                                newMessages[msgIndex] = {
                                    ...newMessages[msgIndex],
                                    isAudioLoading: true
                                };
                            }
                            return newMessages;
                        });

                        audioRef.current.src = currentMessage.audio!;
                        audioRef.current.muted = isMuted;

                        const startTyping = () => {
                            if (stateRef.current.messageInitialized !== msgIndex) return;
                            stateRef.current.isTyping = true;
                            stateRef.current.audioPlaying = true;
                            setDisplayedMessages(prev => {
                                const newMessages = [...prev];
                                if (newMessages[msgIndex]) {
                                    newMessages[msgIndex] = {
                                        ...newMessages[msgIndex],
                                        isAudioLoading: false,
                                        isAudioPlaying: true
                                    };
                                }
                                return newMessages;
                            });
                            setTypingTrigger(prev => prev + 1); // 触发打字效果
                        };

                        audioRef.current.oncanplaythrough = () => {
                            if (stateRef.current.messageInitialized !== msgIndex) return;
                            // 加载完成，清除加载状态并开始播放
                            audioRef.current?.play()
                                .then(startTyping)
                                .catch(() => {
                                    // 播放失败，清除加载状态并直接开始打字
                                    setDisplayedMessages(prev => {
                                        const newMessages = [...prev];
                                        if (newMessages[msgIndex]) {
                                            newMessages[msgIndex] = {
                                                ...newMessages[msgIndex],
                                                isAudioLoading: false
                                            };
                                        }
                                        return newMessages;
                                    });
                                    stateRef.current.isTyping = true;
                                    setTypingTrigger(prev => prev + 1);
                                });
                        };

                        audioRef.current.onended = () => {
                            if (stateRef.current.messageInitialized !== msgIndex) return;
                            stateRef.current.audioPlaying = false;
                            setDisplayedMessages(prev => {
                                const newMessages = [...prev];
                                if (newMessages[msgIndex]) {
                                    newMessages[msgIndex] = {
                                        ...newMessages[msgIndex],
                                        isAudioPlaying: false,
                                        isAudioPlayed: true
                                    };
                                }
                                return newMessages;
                            });
                            // 如果打字已完成，进入下一条
                            if (!stateRef.current.isTyping) {
                                clearTimer();
                                timerRef.current = setTimeout(() => {
                                    processNextMessage(msgIndex + 1);
                                }, 500);
                            }
                        };

                        audioRef.current.onerror = () => {
                            if (stateRef.current.messageInitialized !== msgIndex) return;
                            // 加载失败，清除加载状态并直接开始打字
                            setDisplayedMessages(prev => {
                                const newMessages = [...prev];
                                if (newMessages[msgIndex]) {
                                    newMessages[msgIndex] = {
                                        ...newMessages[msgIndex],
                                        isAudioLoading: false
                                    };
                                }
                                return newMessages;
                            });
                            stateRef.current.isTyping = true;
                            setTypingTrigger(prev => prev + 1);
                        };

                        audioRef.current.load();
                    }
                }, 100);
                return;
            }

            // 没有音频且不是 React 元素，直接开始打字
            stateRef.current.isTyping = true;
            setTypingTrigger(prev => prev + 1);
            return;
        }

        // 步骤2：打字效果
        if (stateRef.current.isTyping && !isSystemMessage && displayedMessages[msgIndex]) {
            const messageText = currentMessage.text;

            // 只处理字符串类型的文本
            if (typeof messageText === 'string') {
                if (currentCharIndex < messageText.length) {
                    clearTimer();
                    timerRef.current = setTimeout(() => {
                        setDisplayedMessages(prev => {
                            const newMessages = [...prev];
                            if (newMessages[msgIndex]) {
                                newMessages[msgIndex] = {
                                    ...newMessages[msgIndex],
                                    text: messageText.substring(0, currentCharIndex + 1)
                                };
                            }
                            return newMessages;
                        });
                        setCurrentCharIndex(prev => prev + 1);
                    }, 15);
                } else {
                    // 打字完成
                    stateRef.current.isTyping = false;
                    setDisplayedMessages(prev => {
                        const newMessages = [...prev];
                        if (newMessages[msgIndex]) {
                            newMessages[msgIndex] = {
                                ...newMessages[msgIndex],
                                isComplete: true
                            };
                        }
                        return newMessages;
                    });

                    // 如果没有音频或音频已结束，进入下一条
                    if (!hasAudio || !stateRef.current.audioPlaying) {
                        clearTimer();
                        timerRef.current = setTimeout(() => {
                            processNextMessage(msgIndex + 1);
                        }, 500);
                    }
                    // 否则等待音频 onended 回调
                }
            } else {
                // 如果是 React 元素，不应该进入打字效果，直接标记完成
                stateRef.current.isTyping = false;
            }
        }
    }, [isPlaying, currentMessageIndex, currentCharIndex, isMuted, typingTrigger, displayedMessages, currentChatScript, clearTimer, stopAudio, processNextMessage]);

    // 预加载当前脚本的所有音频
    useEffect(() => {
        preloadAudios(currentChatScript);
    }, [currentChatScript, preloadAudios]);

    // 监听 activeTab/currentChatScript 变化，切换时展示该脚本的完整对话列表
    useEffect(() => {
        if (stateRef.current.isFirstMount) {
            stateRef.current.isFirstMount = false;
            preloadAudios(currentChatScript);
            return;
        }

        stopAudio();
        clearTimer();

        setDisplayedMessages(scriptToCompletedMessages(currentChatScript));
        setCurrentCharIndex(0);
        setCurrentMessageIndex(-1);
        setIsCompleted(true);
        setIsPlaying(false);
        setShowOverlay(true); // 切换tab时重新展示遮罩层
        stateRef.current.messageInitialized = -1;
        stateRef.current.isTyping = false;
        stateRef.current.audioPlaying = false;

        // 切换 tab 时滚动到顶部
        if (chatContentRef.current) {
            chatContentRef.current.scrollTop = 0;
        }
    }, [activeTab, stopAudio, clearTimer, preloadAudios, currentChatScript]);

    // 自动滚动到底部（初始化时子内容如 CalendarDemo 可能尚未完成布局，需延迟再滚一次）
    // 只有在播放过程中才滚动，未播放时（完整展示状态）保持顶部不滚动
    const scrollToBottom = useCallback(() => {
        const el = chatContentRef.current;
        if (!el) return;
        el.scrollTop = el.scrollHeight;
    }, []);

    useEffect(() => {
        // 只在播放过程中滚动到底部
        if (!isPlaying) {
            return;
        }
        scrollToBottom();
        let timeoutId: ReturnType<typeof setTimeout> | null = null;
        const rafId = requestAnimationFrame(() => {
            scrollToBottom();
            timeoutId = setTimeout(scrollToBottom, 150);
        });
        return () => {
            cancelAnimationFrame(rafId);
            if (timeoutId !== null) clearTimeout(timeoutId);
        };
    }, [displayedMessages, scrollToBottom, isPlaying]);

    // 清理
    useEffect(() => {
        return () => {
            clearTimer();
            stopAudio();
            // 清理预加载的音频
            preloadedAudiosRef.current.forEach((audio) => {
                audio.pause();
                audio.src = '';
                audio.load();
            });
            preloadedAudiosRef.current.clear();
        };
    }, [clearTimer, stopAudio]);

    const showCompletedState = useMemo(
        () =>
            displayedMessages.length === currentChatScript.length &&
            (currentMessageIndex < 0 || isCompleted),
        [displayedMessages.length, currentChatScript.length, currentMessageIndex, isCompleted]
    );

    return (
        <div className={styles.chatContainer}>
            <audio ref={audioRef} style={{ display: 'none' }} preload="auto" />

            {/* 遮罩层和播放按钮 */}
            {showOverlay && (
                <div className={styles.overlay} onClick={handleOverlayPlay} id={`${activeTab}DemoOverlayPlay`}>
                    <div className={styles.overlayCard}>
                        <button className={styles.overlayPlayBtn} style={{ pointerEvents: 'none' }}>
                            <svg width="28" height="28" viewBox="0 0 60 60" fill="none">
                                <path d="M20 15L45 30L20 45V15Z" fill="currentColor" />
                            </svg>
                        </button>
                        <div className={styles.overlayText}>
                            <div className={styles.overlayTitle}>Listen to a customer call</div>
                            <div className={styles.overlaySubtitle}>🔊 Contains audio · Tap to play Solvea demo</div>
                        </div>
                    </div>
                </div>
            )}

            <ChatDemoShowCompletedContext.Provider value={showCompletedState}>
            <div className={styles.chatContent} ref={chatContentRef}>
                {displayedMessages.map((message, index) => {
                    const isSystem = message.type === 'system';

                    if (isSystem) {
                        return (
                            <div key={index} className={styles.systemMessageWrapper}>
                                <div className={styles.systemMessage}>
                                    {message.text}
                                </div>
                            </div>
                        );
                    }

                    const isUserMessage = message.type === 'user';
                    const isComponentMessage = typeof message.text !== 'string';
                    return (
                        <div key={index} className={styles.messageWrapper}>
                            <div
                                className={`${styles.message} ${isUserMessage ? styles.userMessage : styles.assistantMessage
                                    } ${message.hasAudio ? styles.messageWithAudio : ''} ${isComponentMessage ? styles.componentMessage : ''}`}
                            >
                                <div className={`${styles.messageText} ${isComponentMessage ? styles.componentText : ''}`}>
                                    {typeof message.text === 'string' ? (
                                        <>
                                            {message.text}
                                            {message.isAudioLoading && (
                                                <span className={styles.audioLoading}>
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </span>
                                            )}
                                        </>
                                    ) : (
                                        message.text
                                    )}
                                </div>
                                {message.hasAudio && (
                                    <div className={styles.audioPlayer}>
                                        <svg
                                            className={styles.audioIcon}
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                        >
                                            <path
                                                d="M8 3L4 6H1v4h3l4 3V3z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M11 5c1 .8 1.5 1.5 1.5 3s-.5 2.2-1.5 3"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        {(() => {
                                            const waveHeights = generateWaveHeights(index);
                                            return (
                                                <div className={styles.waveform}>
                                                    {waveHeights.map((height, i) => (
                                                        <div
                                                            key={i}
                                                            className={`${styles.waveBar} ${message.isAudioPlaying && !message.isAudioPlayed ? styles.waveBarActive : ''
                                                                }`}
                                                            style={{
                                                                height: `${height}%`
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                            );
                                        })()}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 右下角控制按钮 - 只在遮罩层隐藏时显示 */}
            {!showOverlay && (
                <div className={styles.controls}>
                    <button
                        className={styles.controlBtn}
                        onClick={handlePlay}
                        id={`${activeTab}DemoPlay`}
                    >
                        {isPlaying ? (
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <rect x="5" y="4" width="3" height="12" rx="1" fill="currentColor" />
                                <rect x="12" y="4" width="3" height="12" rx="1" fill="currentColor" />
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M6 4L16 10L6 16V4Z" fill="currentColor" />
                            </svg>
                        )}
                    </button>
                    <button
                        className={styles.controlBtn}
                        onClick={handleMute}
                    >
                        {isMuted ? (
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 4L6 8H3v4h3l4 4V4z" fill="currentColor" />
                                <line x1="14" y1="7" x2="18" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <line x1="18" y1="7" x2="14" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 4L6 8H3v4h3l4 4V4z" fill="currentColor" />
                                <path d="M14 7c1.5 1 2 2 2 3s-.5 2-2 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        )}
                    </button>
                </div>
            )}
            </ChatDemoShowCompletedContext.Provider>
        </div>
    );
}
