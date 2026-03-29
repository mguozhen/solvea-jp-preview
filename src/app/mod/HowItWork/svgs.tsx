import React from 'react';

export const Lin2 = ({ ...props }) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 163 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_2022_721)">
      <rect
        x={133}
        y={7.01953}
        width={3}
        height={58}
        fill="url(#paint0_linear_2022_721)"
      />
    </g>
    <g filter="url(#filter1_f_2022_721)">
      <rect
        x={133}
        y={7.01953}
        width={3}
        height={58}
        fill="url(#paint1_linear_2022_721)"
      />
    </g>
    <g filter="url(#filter2_d_2022_721)">
      <rect
        x={27}
        y={20.0195}
        width={3}
        height={37}
        fill="url(#paint2_linear_2022_721)"
      />
    </g>
    <g filter="url(#filter3_f_2022_721)">
      <rect
        x={27}
        y={20.0195}
        width={3}
        height={37}
        fill="url(#paint3_linear_2022_721)"
      />
    </g>
    {/* 底色层 */}
    <g opacity={0.2} filter="url(#filter4_g_2022_721)">
      <path
        d="M28 42.0195V42.0195C41.1649 47.7993 56.0427 48.3213 69.5804 43.4786L83.4685 38.5105C100.386 32.4588 119.059 33.7304 135 42.0195V42.0195"
        stroke="#57C564"
        strokeOpacity={0.53}
        strokeWidth={2}
      />
    </g>
    <g opacity={0.2} filter="url(#filter5_d_2022_721)">
      <path
        d="M28 42.0195V42.0195C41.1649 47.7993 56.0427 48.3213 69.5804 43.4786L83.4685 38.5105C100.386 32.4588 119.059 33.7304 135 42.0195V42.0195"
        stroke="#57C564"
        strokeOpacity={0.53}
        strokeWidth={6}
        shapeRendering="crispEdges"
      />
    </g>
    {/* 动画层 */}
    <g opacity={0.9} filter="url(#filter4_g_2022_721)">
      <path
        d="M28 42.0195V42.0195C41.1649 47.7993 56.0427 48.3213 69.5804 43.4786L83.4685 38.5105C100.386 32.4588 119.059 33.7304 135 42.0195V42.0195"
        stroke="url(#line2Gradient)"
        strokeOpacity={0.53}
        strokeWidth={2}
      >
        <animate
          attributeName="stroke-dasharray"
          values="0,200;200,0;0,200"
          dur="3s"
          repeatCount="indefinite"
          begin="0.5s"
        />
        <animate
          attributeName="stroke-dashoffset"
          values="0;-200;-400"
          dur="3s"
          repeatCount="indefinite"
          begin="0.5s"
        />
      </path>
    </g>
    <g opacity={0.9} filter="url(#filter5_d_2022_721)">
      <path
        d="M28 42.0195V42.0195C41.1649 47.7993 56.0427 48.3213 69.5804 43.4786L83.4685 38.5105C100.386 32.4588 119.059 33.7304 135 42.0195V42.0195"
        stroke="url(#line2Gradient)"
        strokeOpacity={0.53}
        strokeWidth={6}
        shapeRendering="crispEdges"
      >
        <animate
          attributeName="stroke-dasharray"
          values="0,200;200,0;0,200"
          dur="3s"
          repeatCount="indefinite"
          begin="0.5s"
        />
        <animate
          attributeName="stroke-dashoffset"
          values="0;-200;-400"
          dur="3s"
          repeatCount="indefinite"
          begin="0.5s"
        />
      </path>
    </g>
    <defs>
      <filter
        id="filter0_d_2022_721"
        x={129}
        y={7.01953}
        width={11}
        height={66}
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
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_2022_721"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_2022_721"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_f_2022_721"
        x={126.2}
        y={0.219531}
        width={16.6}
        height={71.6}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation={3.4}
          result="effect1_foregroundBlur_2022_721"
        />
      </filter>
      <filter
        id="filter2_d_2022_721"
        x={23}
        y={20.0195}
        width={11}
        height={45}
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
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_2022_721"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_2022_721"
          result="shape"
        />
      </filter>
      <filter
        id="filter3_f_2022_721"
        x={20.2}
        y={13.2195}
        width={16.6}
        height={50.6}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation={3.4}
          result="effect1_foregroundBlur_2022_721"
        />
      </filter>
      <filter
        id="filter4_g_2022_721"
        x={13.4977}
        y={19.638}
        width={136.063}
        height={42.2291}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feTurbulence
          type="fractalNoise"
          baseFrequency="1 1"
          numOctaves={3}
          seed={5400}
        />
        <feDisplacementMap
          in="shape"
          scale={28.200000762939453}
          xChannelSelector="R"
          yChannelSelector="G"
          result="displacedImage"
          width="100%"
          height="100%"
        />
        <feMerge result="effect1_texture_2022_721">
          <feMergeNode in="displacedImage" />
        </feMerge>
      </filter>
      <filter
        id="filter5_d_2022_721"
        x={0.593945}
        y={9.53804}
        width={161.99}
        height={70.4291}
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
          values="0 0 0 0 0.341361 0 0 0 0 0.773381 0 0 0 0 0.393955 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_2022_721"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_2022_721"
          result="shape"
        />
      </filter>
      <linearGradient
        id="paint0_linear_2022_721"
        x1={134.5}
        y1={7.01953}
        x2={134.5}
        y2={65.0195}
        gradientUnits="userSpaceOnUse"
      >
        <stop />
        <stop offset={0.524038} stopColor="#57C564" />
        <stop offset={0.971154} />
      </linearGradient>
      <linearGradient
        id="paint1_linear_2022_721"
        x1={134.5}
        y1={7.01953}
        x2={134.5}
        y2={65.0195}
        gradientUnits="userSpaceOnUse"
      >
        <stop />
        <stop offset={0.524038} stopColor="#57C564" />
        <stop offset={0.971154} />
      </linearGradient>
      <linearGradient
        id="paint2_linear_2022_721"
        x1={28.5}
        y1={20.0195}
        x2={28.5}
        y2={57.0195}
        gradientUnits="userSpaceOnUse"
      >
        <stop />
        <stop offset={0.524038} stopColor="#57C564" />
        <stop offset={0.971154} />
      </linearGradient>
      <linearGradient
        id="paint3_linear_2022_721"
        x1={28.5}
        y1={20.0195}
        x2={28.5}
        y2={57.0195}
        gradientUnits="userSpaceOnUse"
      >
        <stop />
        <stop offset={0.524038} stopColor="#57C564" />
        <stop offset={0.971154} />
      </linearGradient>
      <linearGradient
        id="line2Gradient"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="0%"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="#57C564" stopOpacity="0.3">
          <animate
            attributeName="stop-opacity"
            values="0.3;1;0.3"
            dur="3s"
            repeatCount="indefinite"
            begin="0.5s"
          />
        </stop>
        <stop offset="50%" stopColor="#57C564" stopOpacity="1">
          <animate
            attributeName="stop-opacity"
            values="1;0.3;1"
            dur="3s"
            repeatCount="indefinite"
            begin="0.5s"
          />
        </stop>
        <stop offset="100%" stopColor="#57C564" stopOpacity="0.3">
          <animate
            attributeName="stop-opacity"
            values="0.3;1;0.3"
            dur="3s"
            repeatCount="indefinite"
            begin="0.5s"
          />
        </stop>
      </linearGradient>
    </defs>
  </svg>
);

export const Line1 = ({ lineWidth = 568, strokeWidth = 6, ...props }) => (
  <svg
    width="1em"
    height="1em"
    viewBox={`0 ${Math.max(
      0,
      (568 - lineWidth) / 2,
    )} ${lineWidth} ${lineWidth}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_3014_732)">
      <rect
        x={lineWidth - 4}
        y="257"
        width="4"
        height="46"
        fill="url(#paint0_linear_3014_732)"
      />
    </g>
    <g filter="url(#filter1_f_3014_732)">
      <rect
        x={lineWidth - 4}
        y="257"
        width="4"
        height="46"
        fill="url(#paint1_linear_3014_732)"
      />
    </g>
    {/* 底色层 */}
    <g opacity="0.3" filter="url(#filter2_d_3014_732)">
      <path
        d={`M30 537V380C30 324.772 74.7715 280 130 280H${lineWidth}`}
        stroke="#656ECE"
        strokeWidth={strokeWidth}
      />
    </g>
    <g opacity="0.3" filter="url(#filter3_d_3014_732)">
      <path
        d={`M30 23V180C30 235.228 74.7715 280 130 280H${lineWidth}`}
        stroke="#656ECE"
        strokeWidth={strokeWidth}
      />
    </g>
    {/* 动画层 */}
    <g opacity="0.9" filter="url(#filter2_d_3014_732)">
      <path
        d={`M30 537V380C30 324.772 74.7715 280 130 280H${lineWidth}`}
        stroke="url(#line1Gradient)"
        strokeWidth={strokeWidth}
      >
        <animate
          attributeName="stroke-dasharray"
          values="0,1000;1000,0;0,1000"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-dashoffset"
          values="0;-1000;-2000"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>
    </g>
    <g opacity="0.9" filter="url(#filter3_d_3014_732)">
      <path
        d={`M30 23V180C30 235.228 74.7715 280 130 280H${lineWidth}`}
        stroke="url(#line1Gradient)"
        strokeWidth={strokeWidth}
      >
        <animate
          attributeName="stroke-dasharray"
          values="0,1000;1000,0;0,1000"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-dashoffset"
          values="0;-1000;-2000"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>
    </g>
    <defs>
      <filter
        id="filter0_d_3014_732"
        x={lineWidth - 4}
        y="257"
        width="12"
        height="54"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_3014_732"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_3014_732"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_f_3014_732"
        x={lineWidth - 6.8}
        y="250.2"
        width="17.6"
        height="59.6"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="3.4"
          result="effect1_foregroundBlur_3014_732"
        />
      </filter>
      <filter
        id="filter2_d_3014_732"
        x="0.799999"
        y="254.8"
        width={lineWidth - 4}
        height="312.4"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="13.1" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.396078 0 0 0 0 0.431373 0 0 0 0 0.807843 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_3014_732"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_3014_732"
          result="shape"
        />
      </filter>
      <filter
        id="filter3_d_3014_732"
        x="0.799999"
        y="0.799999"
        width={lineWidth - 4}
        height="312.4"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="13.1" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.396078 0 0 0 0 0.431373 0 0 0 0 0.807843 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_3014_732"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_3014_732"
          result="shape"
        />
      </filter>
      <linearGradient
        id="paint0_linear_3014_732"
        x1={lineWidth - 4}
        y1="257"
        x2={lineWidth - 4}
        y2="303"
        gradientUnits="userSpaceOnUse"
      >
        <stop />
        <stop offset="0.524038" stopColor="#656ECE" />
        <stop offset="0.971154" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_3014_732"
        x1={lineWidth - 4}
        y1="257"
        x2={lineWidth - 4}
        y2="303"
        gradientUnits="userSpaceOnUse"
      >
        <stop />
        <stop offset="0.524038" stopColor="#656ECE" />
        <stop offset="0.971154" />
      </linearGradient>
      <linearGradient
        id="line1Gradient"
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
          />
        </stop>
        <stop offset="50%" stopColor="#656ECE" stopOpacity="1">
          <animate
            attributeName="stop-opacity"
            values="1;0.3;1"
            dur="3s"
            repeatCount="indefinite"
          />
        </stop>
        <stop offset="100%" stopColor="#656ECE" stopOpacity="0.3">
          <animate
            attributeName="stop-opacity"
            values="0.3;1;0.3"
            dur="3s"
            repeatCount="indefinite"
          />
        </stop>
      </linearGradient>
    </defs>
  </svg>
);

export const Line3 = ({ ...props }) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 1037 703"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_f_523_981)">
      <rect
        x={27}
        y={324.02}
        width={3}
        height={87}
        fill="url(#paint0_linear_523_981)"
      />
    </g>
    <g filter="url(#filter1_d_523_981)">
      <rect
        x={27}
        y={324.02}
        width={3}
        height={87}
        fill="url(#paint1_linear_523_981)"
      />
    </g>
    {/* 底色层 */}
    <path
      d="M27.5 367.505C160.5 296.52 281.1 378.62 605.5 375.02C929.9 371.42 921.833 22.5048 915 24.0048"
      stroke="#F07AF9"
      strokeOpacity={0.2}
      strokeWidth={2}
    />
    <path
      d="M27.5 367.517C345 523.03 387.723 345.142 440 297.031C659.5 95.0195 1015.83 366.017 1009 367.517"
      stroke="#F07AF9"
      strokeOpacity={0.2}
      strokeWidth={2}
    />
    <path
      d="M27.5 367.515C216.5 363.52 256.004 181.451 347.5 238.52C495 330.52 503.5 367.515 682 367.515"
      stroke="#F07AF9"
      strokeOpacity={0.2}
      strokeWidth={2}
    />
    <path
      d="M27.5 367.494C59.8333 254.494 230 449.028 365 467.521C686.418 511.55 714.333 128.52 707.5 130.02"
      stroke="#F07AF9"
      strokeOpacity={0.2}
      strokeWidth={2}
    />
    <path
      d="M27.5 367.505C160.5 296.52 281.1 378.62 605.5 375.02C929.9 371.42 921.833 22.5048 915 24.0048"
      stroke="#F07AF9"
      strokeOpacity={0.2}
      strokeWidth={6}
    />
    <path
      d="M27.5 367.517C345 523.03 387.723 345.142 440 297.031C659.5 95.0195 1015.83 366.017 1009 367.517"
      stroke="#F07AF9"
      strokeOpacity={0.2}
      strokeWidth={6}
    />
    <path
      d="M27.5 367.515C216.5 363.52 256.004 181.451 347.5 238.52C495 330.52 503.5 367.515 682 367.515"
      stroke="#F07AF9"
      strokeOpacity={0.2}
      strokeWidth={6}
    />
    <path
      d="M27.5 367.494C59.8333 254.494 230 449.028 365 467.521C686.418 511.55 714.333 128.52 707.5 130.02"
      stroke="#F07AF9"
      strokeOpacity={0.2}
      strokeWidth={6}
    />
    {/* 动画层 */}
    <path
      d="M27.5 367.505C160.5 296.52 281.1 378.62 605.5 375.02C929.9 371.42 921.833 22.5048 915 24.0048"
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
    <path
      d="M27.5 367.517C345 523.03 387.723 345.142 440 297.031C659.5 95.0195 1015.83 366.017 1009 367.517"
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
    <path
      d="M27.5 367.515C216.5 363.52 256.004 181.451 347.5 238.52C495 330.52 503.5 367.515 682 367.515"
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
    <path
      d="M27.5 367.494C59.8333 254.494 230 449.028 365 467.521C686.418 511.55 714.333 128.52 707.5 130.02"
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
    <path
      d="M27.5 367.505C160.5 296.52 281.1 378.62 605.5 375.02C929.9 371.42 921.833 22.5048 915 24.0048"
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
      d="M27.5 367.517C345 523.03 387.723 345.142 440 297.031C659.5 95.0195 1015.83 366.017 1009 367.517"
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
      d="M27.5 367.515C216.5 363.52 256.004 181.451 347.5 238.52C495 330.52 503.5 367.515 682 367.515"
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
      d="M27.5 367.494C59.8333 254.494 230 449.028 365 467.521C686.418 511.55 714.333 128.52 707.5 130.02"
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
    <g filter="url(#filter2_dg_523_981)">
      <path
        d="M27.5 367.505C160.5 296.52 281.1 378.62 605.5 375.02C929.9 371.42 921.833 22.5048 915 24.0048"
        stroke="#F07AF9"
        strokeOpacity={0.36}
        strokeWidth={2}
        shapeRendering="crispEdges"
      />
    </g>
    <g filter="url(#filter3_dg_523_981)">
      <path
        d="M27.5 367.517C345 523.03 387.723 345.142 440 297.031C659.5 95.0195 1015.83 366.017 1009 367.517"
        stroke="#F07AF9"
        strokeOpacity={0.36}
        strokeWidth={2}
        shapeRendering="crispEdges"
      />
    </g>
    <g filter="url(#filter4_dg_523_981)">
      <path
        d="M27.5 367.515C216.5 363.52 256.004 181.451 347.5 238.52C495 330.52 503.5 367.515 682 367.515"
        stroke="#F07AF9"
        strokeOpacity={0.36}
        strokeWidth={2}
        shapeRendering="crispEdges"
      />
    </g>
    <g filter="url(#filter5_dg_523_981)">
      <path
        d="M27.5 367.494C59.8333 254.494 230 449.028 365 467.521C686.418 511.55 714.333 128.52 707.5 130.02"
        stroke="#F07AF9"
        strokeOpacity={0.36}
        strokeWidth={2}
        shapeRendering="crispEdges"
      />
    </g>
    <defs>
      <filter
        id="filter0_f_523_981"
        x={20.2}
        y={317.22}
        width={16.6}
        height={100.6}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation={3.4}
          result="effect1_foregroundBlur_523_981"
        />
      </filter>
      <filter
        id="filter1_d_523_981"
        x={23}
        y={324.02}
        width={11}
        height={95}
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
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_523_981"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_523_981"
          result="shape"
        />
      </filter>
      <filter
        id="filter2_dg_523_981"
        x={0.829296}
        y={0.798046}
        width={943.404}
        height={405.537}
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
          values="0 0 0 0 0.941687 0 0 0 0 0.479269 0 0 0 0 0.977257 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_523_981"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_523_981"
          result="shape"
        />
        <feTurbulence
          type="fractalNoise"
          baseFrequency="1 1"
          numOctaves={3}
          seed={5400}
        />
        <feDisplacementMap
          in="shape"
          scale={28.200000762939453}
          xChannelSelector="R"
          yChannelSelector="G"
          result="displacedImage"
          width="100%"
          height="100%"
        />
        <feMerge result="effect2_texture_523_981">
          <feMergeNode in="displacedImage" />
        </feMerge>
      </filter>
      <filter
        id="filter3_dg_523_981"
        x={0.860546}
        y={199.033}
        width={1035.44}
        height={262.165}
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
          values="0 0 0 0 0.941687 0 0 0 0 0.479269 0 0 0 0 0.977257 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_523_981"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_523_981"
          result="shape"
        />
        <feTurbulence
          type="fractalNoise"
          baseFrequency="1 1"
          numOctaves={3}
          seed={5400}
        />
        <feDisplacementMap
          in="shape"
          scale={28.200000762939453}
          xChannelSelector="R"
          yChannelSelector="G"
          result="displacedImage"
          width="100%"
          height="100%"
        />
        <feMerge result="effect2_texture_523_981">
          <feMergeNode in="displacedImage" />
        </feMerge>
      </filter>
      <filter
        id="filter4_dg_523_981"
        x={1.27851}
        y={204.255}
        width={706.921}
        height={194.46}
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
          values="0 0 0 0 0.941687 0 0 0 0 0.479269 0 0 0 0 0.977257 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_523_981"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_523_981"
          result="shape"
        />
        <feTurbulence
          type="fractalNoise"
          baseFrequency="1 1"
          numOctaves={3}
          seed={5400}
        />
        <feDisplacementMap
          in="shape"
          scale={28.200000762939453}
          xChannelSelector="R"
          yChannelSelector="G"
          result="displacedImage"
          width="100%"
          height="100%"
        />
        <feMerge result="effect2_texture_523_981">
          <feMergeNode in="displacedImage" />
        </feMerge>
      </filter>
      <filter
        id="filter5_dg_523_981"
        x={0.339062}
        y={106.815}
        width={735.204}
        height={395.431}
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
          values="0 0 0 0 0.941687 0 0 0 0 0.479269 0 0 0 0 0.977257 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_523_981"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_523_981"
          result="shape"
        />
        <feTurbulence
          type="fractalNoise"
          baseFrequency="1 1"
          numOctaves={3}
          seed={5400}
        />
        <feDisplacementMap
          in="shape"
          scale={28.200000762939453}
          xChannelSelector="R"
          yChannelSelector="G"
          result="displacedImage"
          width="100%"
          height="100%"
        />
        <feMerge result="effect2_texture_523_981">
          <feMergeNode in="displacedImage" />
        </feMerge>
      </filter>
      <linearGradient
        id="paint0_linear_523_981"
        x1={28.5}
        y1={324.02}
        x2={28.5}
        y2={411.02}
        gradientUnits="userSpaceOnUse"
      >
        <stop />
        <stop offset={0.524038} stopColor="#D358DC" />
        <stop offset={0.971154} />
      </linearGradient>
      <linearGradient
        id="paint1_linear_523_981"
        x1={28.5}
        y1={324.02}
        x2={28.5}
        y2={411.02}
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
