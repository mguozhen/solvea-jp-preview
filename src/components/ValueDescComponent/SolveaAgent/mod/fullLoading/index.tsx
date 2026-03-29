import React, { useRef, useEffect } from 'react';
import styles from './index.module.scss';

interface SiriAnimationProps {
  width?: number;
  height?: number;
  className?: string;
  amplitude?: number; // 振幅控制，0-1之间
  speed?: number; // 运动速度控制，0-2之间，1为正常速度
}

const SiriAnimation: React.FC<SiriAnimationProps> = ({
  width = 95,
  height = 95,
  className = '',
  amplitude = 0.5,
  speed = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>();
  const amplitudeRef = useRef(amplitude);
  const speedRef = useRef(speed);
  const smoothSpeedRef = useRef(speed); // 平滑后的速度值
  const divRef = useRef<HTMLDivElement>(null);

  // 更新振幅和速度引用，不触发重新渲染
  useEffect(() => {
    amplitudeRef.current = amplitude;
    speedRef.current = speed;

    // 直接设置transform值 - 最大振幅时尺寸为95，其他情况缩小
    if (divRef.current) {
      const scale = 0.4 + amplitude * 0.6; // 从0.4到1.0的缩放范围，最大振幅时为1.0（95px）
      const scaleValue = scale.toFixed(2);
      divRef.current.style.transform = `scale(${scaleValue})`;
    }
  }, [amplitude, speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置画布尺寸
    canvas.width = width;
    canvas.height = height;

    // 动态计算尺寸相关的参数
    const sizeRatio = Math.min(width, height) / 200; // 基于200px的缩放比例
    const baseSize = 40 * sizeRatio; // 基础尺寸
    const sizeIncrement = 80 * sizeRatio; // 尺寸增量
    const noiseAmplitude = 120 * sizeRatio; // 噪声幅度
    const centerOffset = 20 * sizeRatio; // 中心偏移
    const directionOffset = 40 * sizeRatio; // 方向偏移
    const translateOffset = 15 * sizeRatio; // 平移偏移

    // 设置画布样式
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';

    // 设置背景色
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);

    // 动画变量 - 直接在这里管理，不依赖React状态
    let globalAngle = 0;
    let lastTime = 0;
    const targetFPS = 30; // 目标帧率：30fps (保持固定帧率)
    const frameInterval = 1000 / targetFPS;
    let timeAccumulator = 0; // 时间累积器，用于平滑的速度控制

    // 噪声函数实现
    const noise = (x: number, y: number, z: number): number => {
      // 简单的伪随机噪声函数
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
      const Z = Math.floor(z) & 255;

      x -= Math.floor(x);
      y -= Math.floor(y);
      z -= Math.floor(z);

      const u = fade(x);
      const v = fade(y);
      const w = fade(z);

      const A = p[X] + Y;
      const AA = p[A] + Z;
      const AB = p[A + 1] + Z;
      const B = p[X + 1] + Y;
      const BA = p[B] + Z;
      const BB = p[B + 1] + Z;

      return lerp(
        w,
        lerp(
          v,
          lerp(u, grad(p[AA], x, y, z), grad(p[BA], x - 1, y, z)),
          lerp(u, grad(p[AB], x, y - 1, z), grad(p[BB], x - 1, y - 1, z)),
        ),
        lerp(
          v,
          lerp(
            u,
            grad(p[AA + 1], x, y, z - 1),
            grad(p[BA + 1], x - 1, y, z - 1),
          ),
          lerp(
            u,
            grad(p[AB + 1], x, y - 1, z - 1),
            grad(p[BB + 1], x - 1, y - 1, z - 1),
          ),
        ),
      );
    };

    // 辅助函数
    const fade = (t: number): number => t * t * t * (t * (t * 6 - 15) + 10);
    const lerp = (t: number, a: number, b: number): number => a + t * (b - a);
    const grad = (hash: number, x: number, y: number, z: number): number => {
      const h = hash & 15;
      const u = h < 8 ? x : y;
      const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
      return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    };

    // 噪声查找表
    const p: number[] = [];
    for (let i = 0; i < 256; i++) {
      p[i] = Math.floor(Math.random() * 256);
    }
    for (let i = 0; i < 256; i++) {
      p[256 + i] = p[i];
    }

    // 从角度创建向量
    const fromAngle = (angle: number) => ({
      x: Math.cos(angle),
      y: Math.sin(angle),
    });

    // 设置向量大小
    const setMag = (vector: { x: number; y: number }, magnitude: number) => {
      const len = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
      if (len !== 0) {
        vector.x = (vector.x / len) * magnitude;
        vector.y = (vector.y / len) * magnitude;
      }
      return vector;
    };

    // 绘制函数
    const draw = () => {
      // 清除画布为透明
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 设置混合模式为ADD，让线条融合成面
      ctx.globalCompositeOperation = 'screen';

      // 移动到画布中心偏右下
      ctx.translate(
        canvas.width / 2 + translateOffset,
        canvas.height / 2 + translateOffset,
      );

      // 创建圆形裁剪路径
      ctx.beginPath();
      ctx.arc(0, 0, canvas.width / 2, 0, Math.PI * 2);
      ctx.clip();

      // 第一条丝绸 - 粉红色，360度随机运动
      ctx.strokeStyle = 'rgba(238, 68, 121, 0.15)';
      for (let i = 0; i < 360; i += 0.5) {
        const ang =
          ((noise(0, i / 300, globalAngle * 1.5) * 900 + i) * Math.PI) / 180.0;
        const pos = fromAngle(ang);

        // 动态计算最小尺寸：基础尺寸 + 振幅相关的增量
        const minSizeIncrement = amplitudeRef.current * sizeIncrement; // 振幅越大，最小尺寸越大
        const minSize = baseSize + minSizeIncrement;

        const magn =
          minSize +
          noise(0, i / 80, -globalAngle * 4) *
            noiseAmplitude *
            amplitudeRef.current *
            (1 + Math.sin((i * Math.PI) / 180));
        setMag(pos, magn);

        // 第一条丝绸：360度随机运动方向
        const centerOffsetValue =
          noise(50, i / 100, globalAngle * 2) * centerOffset - centerOffset / 2;
        const directionOffsetValue =
          noise(150, i / 100, globalAngle * 2) * directionOffset -
          directionOffset / 2;

        // 起点在中心附近，终点360度随机方向
        const startX = centerOffsetValue;
        const startY = centerOffsetValue;
        const endX = pos.x / 2 + directionOffsetValue;
        const endY = pos.y / 2 + directionOffsetValue;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      // 第二条丝绸 - 青色，360度随机运动
      ctx.strokeStyle = 'rgba(15, 206, 247, 0.15)';
      for (let i = 0; i < 360; i += 0.5) {
        const ang =
          ((noise(200, i / 300, globalAngle * 1.5) * 900 + i) * Math.PI) /
          180.0;
        const pos = fromAngle(ang);

        // 动态计算最小尺寸：基础尺寸 + 振幅相关的增量
        const minSizeIncrement = amplitudeRef.current * sizeIncrement; // 振幅越大，最小尺寸越大
        const minSize = baseSize + minSizeIncrement;

        const magn =
          minSize +
          noise(200, i / 80, -globalAngle * 4) *
            noiseAmplitude *
            amplitudeRef.current *
            (1 + Math.sin((i * Math.PI) / 180));
        setMag(pos, magn);

        // 第二条丝绸：360度随机运动方向
        const centerOffsetValue =
          noise(250, i / 100, globalAngle * 2) * centerOffset -
          centerOffset / 2;
        const directionOffsetValue =
          noise(350, i / 100, globalAngle * 2) * directionOffset -
          directionOffset / 2;

        // 起点在中心附近，终点360度随机方向
        const startX = centerOffsetValue;
        const startY = centerOffsetValue;
        const endX = pos.x / 2 + directionOffsetValue;
        const endY = pos.y / 2 + directionOffsetValue;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      // 第三条丝绸 - 浅蓝色，360度随机运动
      ctx.strokeStyle = 'rgba(102, 228, 245, 0.15)';
      for (let i = 0; i < 360; i += 0.5) {
        const ang =
          ((noise(400, i / 300, globalAngle * 1.5) * 900 + i) * Math.PI) /
          180.0;
        const pos = fromAngle(ang);

        // 动态计算最小尺寸：基础尺寸 + 振幅相关的增量
        const minSizeIncrement = amplitudeRef.current * sizeIncrement; // 振幅越大，最小尺寸越大
        const minSize = baseSize + minSizeIncrement;

        const magn =
          minSize +
          noise(400, i / 80, -globalAngle * 4) *
            noiseAmplitude *
            amplitudeRef.current *
            (1 + Math.sin((i * Math.PI) / 180));
        setMag(pos, magn);

        // 第三条丝绸：360度随机运动方向
        const centerOffsetValue =
          noise(450, i / 100, globalAngle * 2) * centerOffset -
          centerOffset / 2;
        const directionOffsetValue =
          noise(550, i / 100, globalAngle * 2) * directionOffset -
          directionOffset / 2;

        // 起点在中心附近，终点360度随机方向
        const startX = centerOffsetValue;
        const startY = centerOffsetValue;
        const endX = pos.x / 2 + directionOffsetValue;
        const endY = pos.y / 2 + directionOffsetValue;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      // 第四条丝绸 - 紫色，360度随机运动
      ctx.strokeStyle = 'rgba(183, 144, 230, 0.15)';
      for (let i = 0; i < 360; i += 0.5) {
        const ang =
          ((noise(600, i / 300, globalAngle * 1.5) * 900 + i) * Math.PI) /
          180.0;
        const pos = fromAngle(ang);

        // 动态计算最小尺寸：基础尺寸 + 振幅相关的增量
        const minSizeIncrement = amplitudeRef.current * sizeIncrement; // 振幅越大，最小尺寸越大
        const minSize = baseSize + minSizeIncrement;

        const magn =
          minSize +
          noise(600, i / 80, -globalAngle * 4) *
            noiseAmplitude *
            amplitudeRef.current *
            (1 + Math.sin((i * Math.PI) / 180));
        setMag(pos, magn);

        // 第四条丝绸：360度随机运动方向
        const centerOffsetValue =
          noise(650, i / 100, globalAngle * 2) * centerOffset -
          centerOffset / 2;
        const directionOffsetValue =
          noise(750, i / 100, globalAngle * 2) * directionOffset -
          directionOffset / 2;

        // 起点在中心附近，终点360度随机方向
        const startX = centerOffsetValue;
        const startY = centerOffsetValue;
        const endX = pos.x / 2 + directionOffsetValue;
        const endY = pos.y / 2 + directionOffsetValue;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      // 重置变换
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };

    // 动画循环 - 使用固定帧率，只通过动画参数控制速度
    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= frameInterval) {
        // 平滑速度过渡，避免突然变化
        const targetSpeed = speedRef.current;
        const currentSmoothSpeed = smoothSpeedRef.current;
        const speedDiff = targetSpeed - currentSmoothSpeed;
        const lerpFactor = 0.05; // 调整这个值来控制过渡速度，越小越平滑

        smoothSpeedRef.current = currentSmoothSpeed + speedDiff * lerpFactor;

        // 使用时间累积器，避免角度跳跃
        timeAccumulator += smoothSpeedRef.current * 0.008;
        globalAngle = timeAccumulator;

        draw();
        lastTime = currentTime;
      }
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate(0);

    // 清理函数
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [width, height]); // 移除了amplitude依赖

  return (
    <div className={`${styles.siriAnimation} ${className}`} ref={divRef}>
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          background: 'transparent',
          position: 'relative',
          zIndex: 9,
          width: width * 0.9,
          height: height * 0.9,
        }}
      />
      <div className={styles.back}>
        <div className={styles.red}></div>
        <div className={styles.purple}></div>
        <div className={styles.blue}></div>
      </div>
    </div>
  );
};

export default SiriAnimation;
