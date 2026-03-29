'use client';

import { createContext } from 'react';

/** 为 true 时表示对话以“已播放完成”的静态列表展示，子组件（如 CalendarDemo）应直接展示完成态，不播放动画 */
export const ChatDemoShowCompletedContext = createContext(false);
