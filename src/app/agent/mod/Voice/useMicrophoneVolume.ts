import { useEffect, useState } from 'react';

export function useMicrophoneVolume() {
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let source: MediaStreamAudioSourceNode | null = null;
    let rafId: number;

    async function init() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 512;

        source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const updateVolume = () => {
          if (!analyser) return;
          analyser.getByteFrequencyData(dataArray);

          // 获取音量 (0 - 255)，再归一化到 0 - 1
          const sum = dataArray.reduce((a, b) => a + b, 0);
          const avg = sum / dataArray.length;
          const normalizedVolume = avg / 255;

          // 小于 0.1 的音量当作 0 处理
          const finalVolume = normalizedVolume < 0.1 ? 0 : normalizedVolume;
          setVolume(finalVolume);

          rafId = requestAnimationFrame(updateVolume);
        };

        updateVolume();
      } catch (err) {
        console.error('麦克风访问失败:', err);
      }
    }

    init();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (source) source.disconnect();
      if (analyser) analyser.disconnect();
      if (audioContext) audioContext.close();
    };
  }, []);

  return volume;
}
