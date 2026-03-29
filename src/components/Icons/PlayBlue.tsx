import * as React from 'react';
import { SVGProps } from 'react';
const SvgPlayBlue = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#playBlue_svg__a)">
      <rect
        x={8}
        y={6}
        width={48}
        height={48}
        rx={24}
        fill="#2A85FF"
        shapeRendering="crispEdges"
      />
      <path
        d="M36.67 27.845c1.643.967 1.643 3.343 0 4.31l-6.736 3.962c-1.667.98-3.768-.221-3.768-2.155v-7.924c0-1.934 2.101-3.135 3.768-2.155l6.736 3.962Z"
        fill="#fff"
      />
    </g>
    <defs>
      <filter
        id="playBlue_svg__a"
        x={0}
        y={0}
        width={64}
        height={64}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={2} />
        <feGaussianBlur stdDeviation={4} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
        <feBlend
          mode="multiply"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_83_10254"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_83_10254"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgPlayBlue;
