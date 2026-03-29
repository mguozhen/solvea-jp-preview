import * as React from 'react';
import { SVGProps } from 'react';
const SvgFacebookSimple = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 32 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      y={0.282}
      width={32}
      height={32}
      rx={16}
      fill="#1971F5"
      fillOpacity={0.1}
    />
    <g clipPath="url(#facebookSimple_svg__a)">
      <path
        d="M20 9.615h-2a3.333 3.333 0 0 0-3.334 3.333v2h-2v2.667h2v5.333h2.667v-5.333h2L20 14.948h-2.667v-2a.667.667 0 0 1 .667-.666h2V9.615Z"
        stroke="#E5E0FF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="facebookSimple_svg__a">
        <path fill="#fff" transform="translate(8 8.282)" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgFacebookSimple;
