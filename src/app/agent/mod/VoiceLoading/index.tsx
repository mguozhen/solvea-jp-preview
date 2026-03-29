import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';

interface VoiceLoadingProps {
  playbackSpeed?: number; // 播放速度控制
}

export default function VoiceLoading({
  playbackSpeed = 1.0,
}: VoiceLoadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const animationRef = useRef<any>(null);

  useEffect(() => {
    const ins = Lottie.loadAnimation({
      loop: true,
      autoplay: true,
      container: ref.current!,
      path: 'https://cdn.shulex-voc.com/assets/solveaCx/pub/voice-loading.json',
    });

    animationRef.current = ins;

    return () => ins.destroy();
  }, []);

  // 当播放速度改变时，更新动画速度
  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.setSpeed(playbackSpeed);
    }
  }, [playbackSpeed]);

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        height: '100%',
      }}
    ></div>
  );
}
