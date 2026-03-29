import React from 'react';

interface LeftLineProps { }

export const LeftLine: React.FC<LeftLineProps> = ({ }) => {
  return (
    <svg
      width="100%"
      height="260px"
      viewBox="0 0 504 550"
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_8519_2045)">
        <rect x="375" y="261.2" width="40" height="37" fill="url(#paint0_linear_8519_2045)" />
      </g>
      <g filter="url(#filter1_f_8519_2045)">
        <rect x="375" y="261.2" width="3" height="37" fill="url(#paint1_linear_8519_2045)" />
      </g>
      {/* 头部光晕 - 右侧 */}
      <g filter="url(#filter0_f_523_981_left)">
        <rect x={484} y={225} width={20} height={100} fill="url(#paint0_linear_523_981_left)" />
      </g>
      <g filter="url(#filter1_d_523_981_left)">
        <rect x={484} y={225} width={20} height={100} fill="url(#paint1_linear_523_981_left)" />
      </g>
      {/* 底色层 */}
      {/* 线条1: 水平直线 */}
      <path
        d="M0 280.2 L500 280.2"
        stroke="#656ECE"
        strokeOpacity={0.2}
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
      />
      {/* 线条2: 从下方向上弯曲的曲线 */}
      <path
        d="M-4 600V700C-4 323.972 40.7715 279.2 200 279.2H277.639H363"
        stroke="#656ECE"
        strokeOpacity={0.2}
        strokeWidth={2}
      />
      {/* 线条3: 从上方向下弯曲的曲线 */}
      <path
        d="M-4 22.2002V-100C-4 234.429 40.7715 279.2 200 279.2H277.639H375"
        stroke="#656ECE"
        strokeOpacity={0.2}
        strokeWidth={2}
      />
      {/* 线条1: 水平直线 (粗线) */}
      <path
        d="M0 280.2 L500 280.2"
        stroke="#656ECE"
        strokeOpacity={0.2}
        strokeWidth={6}
        vectorEffect="non-scaling-stroke"
      />
      {/* 线条2: 从下方向上弯曲的曲线 (粗线) */}
      <path
        d="M-4 600V700C-4 323.972 40.7715 279.2 200 279.2H277.639H363"
        stroke="#656ECE"
        strokeOpacity={0.2}
        strokeWidth={6}
      />
      {/* 线条3: 从上方向下弯曲的曲线 (粗线) */}
      <path
        d="M-4 22.2002V-100C-4 234.429 40.7715 279.2 200 279.2H277.639H375"
        stroke="#656ECE"
        strokeOpacity={0.2}
        strokeWidth={6}
      />
      {/* 动画层 */}
      {/* 线条1: 水平直线 (动画层) */}
      <path
        d="M0 280.2 L500 280.2"
        stroke="url(#line3Gradient)"
        strokeOpacity={0.36}
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
      >
        <animate
          attributeName="stroke-dasharray"
          values="0,500;500,0;0,500"
          dur="3s"
          repeatCount="indefinite"
          begin="1s"
        />
        <animate
          attributeName="stroke-dashoffset"
          values="0;-500;-1000"
          dur="3s"
          repeatCount="indefinite"
          begin="1s"
        />
      </path>
      {/* 线条2: 从下方向上弯曲的曲线 (动画层) */}
      <path
        d="M-4 600V700C-4 323.972 40.7715 279.2 200 279.2H277.639H363"
        stroke="url(#line3Gradient)"
        strokeOpacity={0.36}
        strokeWidth={2}
      >
        <animate
          attributeName="stroke-dasharray"
          values="0,500;500,0;0,500"
          dur="3s"
          repeatCount="indefinite"
          begin="1s"
        />
        <animate
          attributeName="stroke-dashoffset"
          values="0;-500;-1000"
          dur="3s"
          repeatCount="indefinite"
          begin="1s"
        />
      </path>
      {/* 线条3: 从上方向下弯曲的曲线 (动画层) */}
      <path
        d="M-4 22.2002V-100C-4 234.429 40.7715 279.2 200 279.2H277.639H375"
        stroke="url(#line3Gradient)"
        strokeOpacity={0.36}
        strokeWidth={2}
      >
        <animate
          attributeName="stroke-dasharray"
          values="0,500;500,0;0,500"
          dur="3s"
          repeatCount="indefinite"
          begin="1s"
        />
        <animate
          attributeName="stroke-dashoffset"
          values="0;-500;-1000"
          dur="3s"
          repeatCount="indefinite"
          begin="1s"
        />
      </path>
      {/* 线条1: 水平直线 (动画层-粗线) */}
      <path
        d="M0 280.2 L500 280.2"
        stroke="url(#line3Gradient)"
        strokeOpacity={0.36}
        strokeWidth={6}
        vectorEffect="non-scaling-stroke"
      >
        <animate
          attributeName="stroke-dasharray"
          values="0,500;500,0;0,500"
          dur="3s"
          repeatCount="indefinite"
          begin="1s"
        />
        <animate
          attributeName="stroke-dashoffset"
          values="0;-500;-1000"
          dur="3s"
          repeatCount="indefinite"
          begin="1s"
        />
      </path>
      {/* 线条2: 从下方向上弯曲的曲线 (动画层-粗线) */}
      <path
        d="M-4 600V700C-4 323.972 40.7715 279.2 200 279.2H277.639H363"
        stroke="url(#line3Gradient)"
        strokeOpacity={0.36}
        strokeWidth={6}
      >
        <animate
          attributeName="stroke-dasharray"
          values="0,500;500,0;0,500"
          dur="3s"
          repeatCount="indefinite"
          begin="1s"
        />
        <animate
          attributeName="stroke-dashoffset"
          values="0;-500;-1000"
          dur="3s"
          repeatCount="indefinite"
          begin="1s"
        />
      </path>
      <path
        d="M-4 22.2002V-100C-4 234.429 40.7715 279.2 200 279.2H277.639H375"
        stroke="url(#line3Gradient)"
        strokeOpacity={0.36}
        strokeWidth={6}
      >
        <animate
          attributeName="stroke-dasharray"
          values="0,500;500,0;0,500"
          dur="3s"
          repeatCount="indefinite"
          begin="1s"
        />
        <animate
          attributeName="stroke-dashoffset"
          values="0;-500;-1000"
          dur="3s"
          repeatCount="indefinite"
          begin="1s"
        />
      </path>
      {/* 线条1: 水平直线 (滤镜层) */}
      <g filter="url(#filter2_dg_8519_2045)">
        <path
          d="M0 280.2 L500 280.2"
          stroke="#656ECE"
          strokeOpacity={0.36}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
          shapeRendering="crispEdges"
        />
      </g>
      {/* 线条2: 从下方向上弯曲的曲线 (滤镜层) */}
      <g filter="url(#filter3_dg_8519_2045)">
        <path
          d="M-4 600V700C-4 323.972 40.7715 279.2 200 279.2H277.639H363"
          stroke="#656ECE"
          strokeOpacity={0.36}
          strokeWidth={2}
          shapeRendering="crispEdges"
        />
      </g>
      {/* 线条3: 从上方向下弯曲的曲线 (滤镜层) */}
      <g filter="url(#filter4_dg_8519_2045)">
        <path
          d="M-4 22.2002V-100C-4 234.429 40.7715 279.2 200 279.2H277.639H375"
          stroke="#656ECE"
          strokeOpacity={0.36}
          strokeWidth={2}
          shapeRendering="crispEdges"
        />
      </g>
      <defs>
        <filter
          id="filter2_dg_8519_2045"
          x={-50}
          y={-50}
          width={600}
          height={400}
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
          <feGaussianBlur stdDeviation={13.1} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.396 0 0 0 0 0.431 0 0 0 0 0.808 0 0 0 1 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_8519_2045" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_8519_2045"
            result="shape"
          />
          <feTurbulence type="fractalNoise" baseFrequency="1 1" numOctaves={3} seed={5400} />
          <feDisplacementMap
            in="shape"
            scale={28.200000762939453}
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacedImage"
            width="100%"
            height="100%"
          />
          <feMerge result="effect2_texture_8519_2045">
            <feMergeNode in="displacedImage" />
          </feMerge>
        </filter>
        <filter
          id="filter3_dg_8519_2045"
          x={-50}
          y={-50}
          width={600}
          height={400}
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
          <feGaussianBlur stdDeviation={13.1} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.396 0 0 0 0 0.431 0 0 0 0 0.808 0 0 0 1 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_8519_2045" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_8519_2045"
            result="shape"
          />
          <feTurbulence type="fractalNoise" baseFrequency="1 1" numOctaves={3} seed={5400} />
          <feDisplacementMap
            in="shape"
            scale={28.200000762939453}
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacedImage"
            width="100%"
            height="100%"
          />
          <feMerge result="effect2_texture_8519_2045">
            <feMergeNode in="displacedImage" />
          </feMerge>
        </filter>
        <filter
          id="filter4_dg_8519_2045"
          x={-50}
          y={-50}
          width={600}
          height={400}
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
          <feGaussianBlur stdDeviation={13.1} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.396 0 0 0 0 0.431 0 0 0 0 0.808 0 0 0 1 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_8519_2045" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_8519_2045"
            result="shape"
          />
          <feTurbulence type="fractalNoise" baseFrequency="1 1" numOctaves={3} seed={5400} />
          <feDisplacementMap
            in="shape"
            scale={28.200000762939453}
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacedImage"
            width="100%"
            height="100%"
          />
          <feMerge result="effect2_texture_8519_2045">
            <feMergeNode in="displacedImage" />
          </feMerge>
        </filter>
        <linearGradient
          id="line3Gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#656ECE" stopOpacity="0.3">
            <animate
              attributeName="stop-opacity"
              values="0.3;1;0.3"
              dur="3s"
              repeatCount="indefinite"
              begin="1s"
            />
          </stop>
          <stop offset="50%" stopColor="#656ECE" stopOpacity="1">
            <animate
              attributeName="stop-opacity"
              values="1;0.3;1"
              dur="3s"
              repeatCount="indefinite"
              begin="1s"
            />
          </stop>
          <stop offset="100%" stopColor="#656ECE" stopOpacity="0.3">
            <animate
              attributeName="stop-opacity"
              values="0.3;1;0.3"
              dur="3s"
              repeatCount="indefinite"
              begin="1s"
            />
          </stop>
        </linearGradient>
        <filter
          id="filter0_f_523_981_left"
          x={494.2}
          y={218.2}
          width={16.6}
          height={110.6}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation={3.4} result="effect1_foregroundBlur_523_981_left" />
        </filter>
        <filter
          id="filter1_d_523_981_left"
          x={497}
          y={225}
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
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_523_981_left" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_523_981_left"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_523_981_left"
          x1={494}
          y1={225}
          x2={494}
          y2={325}
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset={0.524038} stopColor="#656ECE" />
          <stop offset={0.971154} />
        </linearGradient>
        <linearGradient
          id="paint1_linear_523_981_left"
          x1={494}
          y1={225}
          x2={494}
          y2={325}
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset={0.524038} stopColor="#656ECE" />
          <stop offset={0.971154} />
        </linearGradient>
      </defs>
    </svg>
  );
};
