import React from 'react';

interface RightLineProps { }

export const RightLine: React.FC<RightLineProps> = ({ }) => {
  // 内容从 x=15 开始，缩短50%后最右边到约 x=518，填满画布
  // viewBox设置为内容范围，让内容在x轴上填满，内容靠左对齐
  return (
    <svg
      width="100%"
      height="260px"
      viewBox="15 0 518.25 725"
      fill="none"
      preserveAspectRatio="xMinYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 头部光晕 */}
      <g filter="url(#filter0_f_523_981)">
        <rect x={0} y={314.02} width={20} height={100} fill="url(#paint0_linear_523_981)" />
      </g>
      <g filter="url(#filter1_d_523_981)">
        <rect x={0} y={314.02} width={20} height={100} fill="url(#paint1_linear_523_981)" />
      </g>

      {/* 底色层 */}
      {/* 线条1: 从左上向右上弯曲的曲线 (前50% - 底色) */}
      <path
        d="M20 367.505C94 332.0125 154.3 373.0625 316.5 371.2625C478.7 369.4625 474.6665 195.0049 471.25 195.7549"
        stroke="#F07AF9"
        strokeOpacity={0.2}
        strokeWidth={2}
      />
      {/* 线条2: 从中间向右下再向右上弯曲的曲线 (前50% - 底色) */}
      <path
        d="M20 367.517C186.25 445.2735 207.6115 356.3295 233.75 332.274C343.5 231.2685 518.165 366.767 518.25 367.517"
        stroke="#F07AF9"
        strokeOpacity={0.2}
        strokeWidth={2}
      />
      {/* 线条3: 从中间向右上再向右下弯曲的曲线 (前50% - 底色) */}
      <path
        d="M20 367.515C122 365.5175 141.752 274.483 187.5 303.0175C261.25 349.0175 265.5 367.515 354.75 367.515"
        stroke="#F07AF9"
        strokeOpacity={0.2}
        strokeWidth={2}
      />
      {/* 线条4: 从中间向右下再向右上弯曲的曲线 (前50% - 底色) */}
      <path
        d="M20 367.494C43.66665 310.994 128.75 408.261 196.25 417.5075C356.959 439.522 370.9165 248.007 367.5 248.757"
        stroke="#F07AF9"
        strokeOpacity={0.2}
        strokeWidth={2}
      />
      {/* 底色层 - 粗线 */}
      <path
        d="M20 367.505C94 332.0125 154.3 373.0625 316.5 371.2625C478.7 369.4625 474.6665 195.0049 471.25 195.7549"
        stroke="#F07AF9"
        strokeOpacity={0.2}
        strokeWidth={6}
      />
      <path
        d="M20 367.517C186.25 445.2735 207.6115 356.3295 233.75 332.274C343.5 231.2685 518.165 366.767 518.25 367.517"
        stroke="#F07AF9"
        strokeOpacity={0.2}
        strokeWidth={6}
      />
      <path
        d="M20 367.515C122 365.5175 141.752 274.483 187.5 303.0175C261.25 349.0175 265.5 367.515 354.75 367.515"
        stroke="#F07AF9"
        strokeOpacity={0.2}
        strokeWidth={6}
      />
      <path
        d="M20 367.494C43.66665 310.994 128.75 408.261 196.25 417.5075C356.959 439.522 370.9165 248.007 367.5 248.757"
        stroke="#F07AF9"
        strokeOpacity={0.2}
        strokeWidth={6}
      />

      {/* 动画层：线条的前50%部分 */}
      {/* 线条1: 从左上向右上弯曲的曲线 (前50%) */}
      <path
        d="M20 367.505C94 332.0125 154.3 373.0625 316.5 371.2625C478.7 369.4625 474.6665 195.0049 471.25 195.7549"
        stroke="url(#line3Gradient)"
        strokeOpacity={0.36}
        strokeWidth={2}
      >
        <animate
          attributeName="stroke-dasharray"
          values="0,250;250,0;0,250"
          dur="3s"
          repeatCount="indefinite"
          begin="1s"
        />
        <animate
          attributeName="stroke-dashoffset"
          values="0;-250;-500"
          dur="3s"
          repeatCount="indefinite"
          begin="1s"
        />
      </path>

      {/* 线条2: 从中间向右下再向右上弯曲的曲线 (前50%) */}
      <path
        d="M20 367.517C186.25 445.2735 207.6115 356.3295 233.75 332.274C343.5 231.2685 518.165 366.767 518.25 367.517"
        stroke="url(#line3Gradient)"
        strokeOpacity={0.36}
        strokeWidth={2}
      >
        <animate
          attributeName="stroke-dasharray"
          values="0,250;250,0;0,250"
          dur="3s"
          repeatCount="indefinite"
          begin="1s"
        />
        <animate
          attributeName="stroke-dashoffset"
          values="0;-250;-500"
          dur="3s"
          repeatCount="indefinite"
          begin="1s"
        />
      </path>

      {/* 线条3: 从中间向右上再向右下弯曲的曲线 (前50%) */}
      <path
        d="M20 367.515C122 365.5175 141.752 274.483 187.5 303.0175C261.25 349.0175 265.5 367.515 354.75 367.515"
        stroke="url(#line3Gradient)"
        strokeOpacity={0.36}
        strokeWidth={2}
      >
        <animate
          attributeName="stroke-dasharray"
          values="0,250;250,0;0,250"
          dur="3s"
          repeatCount="indefinite"
          begin="1s"
        />
        <animate
          attributeName="stroke-dashoffset"
          values="0;-250;-500"
          dur="3s"
          repeatCount="indefinite"
          begin="1s"
        />
      </path>

      {/* 线条4: 从中间向右下再向右上弯曲的曲线 (前50%) */}
      <path
        d="M20 367.494C43.66665 310.994 128.75 408.261 196.25 417.5075C356.959 439.522 370.9165 248.007 367.5 248.757"
        stroke="url(#line3Gradient)"
        strokeOpacity={0.36}
        strokeWidth={2}
      >
        <animate
          attributeName="stroke-dasharray"
          values="0,250;250,0;0,250"
          dur="3s"
          repeatCount="indefinite"
          begin="1s"
        />
        <animate
          attributeName="stroke-dashoffset"
          values="0;-250;-500"
          dur="3s"
          repeatCount="indefinite"
          begin="1s"
        />
      </path>

      <defs>
        <filter
          id="filter0_f_523_981"
          x={10.2}
          y={307.22}
          width={16.6}
          height={110.6}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation={3.4} result="effect1_foregroundBlur_523_981" />
        </filter>
        <filter
          id="filter1_d_523_981"
          x={13}
          y={314.02}
          width={11}
          height={105}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_523_981" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_523_981"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_523_981"
          x1={18.5}
          y1={314.02}
          x2={18.5}
          y2={421.02}
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset={0.524038} stopColor="#D358DC" />
          <stop offset={0.971154} />
        </linearGradient>
        <linearGradient
          id="paint1_linear_523_981"
          x1={18.5}
          y1={314.02}
          x2={18.5}
          y2={421.02}
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset={0.524038} stopColor="#D358DC" />
          <stop offset={0.971154} />
        </linearGradient>
        <linearGradient
          id="line3Gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#F07AF9" stopOpacity="0.3">
            <animate
              attributeName="stop-opacity"
              values="0.3;1;0.3"
              dur="3s"
              repeatCount="indefinite"
              begin="1s"
            />
          </stop>
          <stop offset="50%" stopColor="#F07AF9" stopOpacity="1">
            <animate
              attributeName="stop-opacity"
              values="1;0.3;1"
              dur="3s"
              repeatCount="indefinite"
              begin="1s"
            />
          </stop>
          <stop offset="100%" stopColor="#F07AF9" stopOpacity="0.3">
            <animate
              attributeName="stop-opacity"
              values="0.3;1;0.3"
              dur="3s"
              repeatCount="indefinite"
              begin="1s"
            />
          </stop>
        </linearGradient>
      </defs>
    </svg>
  );
};
