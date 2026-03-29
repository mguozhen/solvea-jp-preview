import * as React from 'react';
import { SVGProps } from 'react';
const SvgPlus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#plus_svg__a)">
      <rect width={24} height={24} rx={12} fill="url(#plus_svg__b)" />
      <path
        d="M12 8v8M8 12h8"
        stroke="#F3F5F7"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </g>
    <defs>
      <linearGradient
        id="plus_svg__b"
        x1={12}
        y1={0}
        x2={12}
        y2={24}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#7F8689" />
        <stop offset={1} stopColor="#6C7275" />
      </linearGradient>
      <filter
        id="plus_svg__a"
        x={0}
        y={-1}
        width={24}
        height={25}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={-1} />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix values="0 0 0 0 0.363104 0 0 0 0 0.401094 0 0 0 0 0.420088 0 0 0 1 0" />
        <feBlend in2="shape" result="effect1_innerShadow_329_976" />
      </filter>
    </defs>
  </svg>
);
export default SvgPlus;
