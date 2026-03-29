'use client';
import React, { useEffect, useRef, memo } from 'react';
import styles from './index.module.scss';

interface LoadingProps {
  size?: number;
  className?: string;
  color?: string;
  backgroundColor?: string;
  particleCount?: number;
  particleSize?: number;
  rotationSpeed?: number; // 新增整体旋转速度
}

const Loading = memo(function Loading({
  size = 200,
  className = '',
  color = '#2F8DFF',
  backgroundColor = 'transparent',
  particleCount = 400,
  particleSize = 3,
  rotationSpeed = 0.2, // 每秒旋转 0.2 弧度
}: LoadingProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  class Particle {
    x: number;
    y: number;
    z: number;
    size: number;
    opacity: number;
    theta: number;
    phi: number;
    baseRadius: number;
    centerX: number;
    centerY: number;
    centerZ: number;
    originalX: number;
    originalY: number;
    originalZ: number;

    constructor(
      canvasWidth: number,
      canvasHeight: number,
      index: number,
      total: number,
      size: number,
    ) {
      this.centerX = canvasWidth / 2;
      this.centerY = canvasHeight / 2;
      this.centerZ = 0;
      this.baseRadius = Math.min(canvasWidth, canvasHeight) * 0.3;
      this.size = size;
      this.opacity = 1;

      // 均匀球面分布
      const goldenRatio = (1 + Math.sqrt(5)) / 2;
      const i = index + 0.5;
      this.theta = (2 * Math.PI * i) / goldenRatio;
      this.phi = Math.acos(1 - (2 * (index + 0.5)) / total);

      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.originalX = 0;
      this.originalY = 0;
      this.originalZ = 0;
      this.updatePosition();
    }

    update(time: number, rotationAngle: number) {
      const breath = 0.05;
      const radiusFactor = 1 + Math.sin(time * 1.2) * breath;
      const radius = this.baseRadius * radiusFactor;

      // 应用整体旋转
      const thetaRotated = this.theta + rotationAngle;

      // 计算原始位置
      this.originalX =
        this.centerX + radius * Math.sin(this.phi) * Math.cos(thetaRotated);
      this.originalY =
        this.centerY + radius * Math.sin(this.phi) * Math.sin(thetaRotated);
      this.originalZ = this.centerZ + radius * Math.cos(this.phi);

      // 不均匀挤压效果
      const squeezeIntensity = 0.4; // 降低整体强度
      const squeezeFrequency = 0.8; // 降低频率让效果更自然

      // 基于粒子位置的不均匀挤压
      const positionFactor = Math.sin(this.phi) * Math.cos(thetaRotated * 2);
      const timeFactor = Math.sin(
        time * squeezeFrequency + rotationAngle * 0.3,
      );

      // 不同区域的挤压强度不同
      const squeezeStrength =
        (1 + positionFactor * 0.5) * timeFactor * squeezeIntensity;

      // 计算粒子到中心的距离和方向
      const distanceFromCenter = Math.sqrt(
        Math.pow(this.originalX - this.centerX, 2) +
          Math.pow(this.originalY - this.centerY, 2) +
          Math.pow(this.originalZ - this.centerZ, 2),
      );

      // 计算从中心到粒子的单位方向向量
      const dirX = (this.originalX - this.centerX) / distanceFromCenter;
      const dirY = (this.originalY - this.centerY) / distanceFromCenter;
      const dirZ = (this.originalZ - this.centerZ) / distanceFromCenter;

      // 不均匀的径向挤压 - 不同位置挤压程度不同
      const radialSqueeze = squeezeStrength * radius * 0.15;

      // 添加方向性挤压 - 模拟外部压力
      const pressureX =
        Math.sin(time * squeezeFrequency * 1.2) *
        squeezeIntensity *
        radius *
        0.1;
      const pressureY =
        Math.cos(time * squeezeFrequency * 1.1) *
        squeezeIntensity *
        radius *
        0.1;
      const pressureZ =
        Math.sin(time * squeezeFrequency * 0.9) *
        squeezeIntensity *
        radius *
        0.08;

      // 应用不均匀挤压效果
      this.x =
        this.originalX -
        dirX * radialSqueeze +
        pressureX * Math.cos(thetaRotated);
      this.y =
        this.originalY -
        dirY * radialSqueeze +
        pressureY * Math.sin(thetaRotated);
      this.z =
        this.originalZ - dirZ * radialSqueeze + pressureZ * Math.cos(this.phi);

      const depthScale = 350 / (350 + this.z);
      this.opacity = 0.3 + 0.7 * depthScale * radiusFactor;
    }

    updatePosition() {
      this.x =
        this.centerX +
        this.baseRadius * Math.sin(this.phi) * Math.cos(this.theta);
      this.y =
        this.centerY +
        this.baseRadius * Math.sin(this.phi) * Math.sin(this.theta);
      this.z = this.centerZ + this.baseRadius * Math.cos(this.phi);

      // 初始化原始位置
      this.originalX = this.x;
      this.originalY = this.y;
      this.originalZ = this.z;
    }

    draw(
      ctx: CanvasRenderingContext2D,
      canvasWidth: number,
      canvasHeight: number,
      color: string,
    ) {
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;
      const perspective = 350;
      const scale = perspective / (perspective + this.z);
      const x2d = centerX + (this.x - centerX) * scale;
      const y2d = centerY + (this.y - centerY) * scale;

      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = color;
      const drawSize = this.size * scale;
      ctx.beginPath();
      ctx.arc(x2d, y2d, drawSize, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;

    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(
        new Particle(size, size, i, particleCount, particleSize),
      );
    }

    const animate = () => {
      const time = Date.now() * 0.001;
      const rotationAngle = time * rotationSpeed; // 整体旋转角度
      ctx.clearRect(0, 0, size, size);

      const sortedParticles = [...particlesRef.current].sort(
        (a, b) => a.z - b.z,
      );
      sortedParticles.forEach((p) => {
        p.update(time, rotationAngle);
        p.draw(ctx, size, size, color);
      });

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationIdRef.current !== null)
        cancelAnimationFrame(animationIdRef.current);
    };
  }, [size, color, backgroundColor, particleCount, particleSize, rotationSpeed]);

  return (
    <div className={`${styles.loadingContainer} ${className}`}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        style={{
          width: size,
          height: size,
          background: backgroundColor,
        }}
      />
    </div>
  );
});

export default Loading;
