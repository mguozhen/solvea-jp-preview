import { Col, Row } from 'antd';
import { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';

interface Props {
  title: string;
  numberOfRows: number;
  audioList: {
    avatarUrl: string;
    name: string;
    audioUrl: string;
    desc: string;
  }[];
}

export default function SolveaAudio(props: Props) {
  const { title, audioList, numberOfRows } = props;
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [loadedAudios, setLoadedAudios] = useState<Set<number>>(new Set());
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const colSpan = 24 / numberOfRows || 8;

  // 组件挂载后预加载所有音频的元数据
  useEffect(() => {
    audioRefs.current.forEach((audio, index) => {
      if (audio && !loadedAudios.has(index)) {
        audio.load();
        audio.addEventListener('loadedmetadata', () => {
          setLoadedAudios((prev) => new Set(prev).add(index));
        });
      }
    });
  }, [audioList]);

  const handlePlayClick = async (index: number) => {
    // 停止其他正在播放的音频
    if (playingIndex !== null && playingIndex !== index) {
      const prevAudio = audioRefs.current[playingIndex];
      if (prevAudio) {
        prevAudio.pause();
        prevAudio.currentTime = 0;
      }
    }

    const audio = audioRefs.current[index];
    if (audio) {
      if (audio.paused) {
        setLoadingIndex(index);
        setPlayingIndex(index);

        // 确保音频已加载
        if (audio.readyState < 2) {
          audio.load();
        }

        try {
          await audio.play();
          setLoadingIndex(null);
        } catch (error) {
          console.error('音频播放失败:', error);
          setPlayingIndex(null);
          setLoadingIndex(null);
        }
      } else {
        audio.pause();
        audio.currentTime = 0;
        setPlayingIndex(null);
        setLoadingIndex(null);
      }
    }
  };

  const handleAudioEnd = (_index: number) => {
    setPlayingIndex(null);
    setLoadingIndex(null);
  };

  // 鼠标悬停时预加载音频
  const handleMouseEnter = (index: number) => {
    const audio = audioRefs.current[index];
    if (audio && !loadedAudios.has(index)) {
      audio.load();
    }
  };

  const renderAudioItem = (item: Props['audioList'][0], index: number) => (
    <Col
      xs={24}
      sm={24}
      md={colSpan}
      lg={colSpan}
      key={`${item.name}-${index}`}
      className={styles.audioColWrapper}
      onMouseEnter={() => handleMouseEnter(index)}
    >
      <div className={styles.audioItem}>
        <div className={styles.audioItemAvatar}>
          <img
            src={item.avatarUrl}
            alt={item.name}
            loading="lazy"
            decoding="async"
          />
          <div className={styles.audioItemName}>{item.name}</div>
        </div>
        <div className={styles.audioItemContent}>
          <div className={styles.audioItemAudio}>
            <button
              className={`${styles.playButton} ${playingIndex === index ? styles.playing : ''} ${
                loadingIndex === index ? styles.loading : ''
              }`}
              onClick={() => handlePlayClick(index)}
              aria-label="play audio"
              disabled={loadingIndex === index}
            />
            <audio
              ref={(el) => {
                audioRefs.current[index] = el;
              }}
              src={item.audioUrl}
              preload="metadata"
              crossOrigin="anonymous"
              onEnded={() => handleAudioEnd(index)}
            />
          </div>
          <div className={styles.audioItemDesc}>{item.desc}</div>
        </div>
      </div>
    </Col>
  );

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <Row gutter={[8, 8]} className={styles.audioList}>
        {audioList.map((item, index) => renderAudioItem(item, index))}
      </Row>
    </div>
  );
}
