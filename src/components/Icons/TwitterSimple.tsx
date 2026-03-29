import * as React from 'react';
import { SVGProps } from 'react';
const SvgTwitterSimple = (props: SVGProps<SVGSVGElement>) => (
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
    <g clipPath="url(#twitterSimple_svg__a)">
      <path
        d="M23.333 10.282a7.268 7.268 0 0 1-2.093 1.02 2.986 2.986 0 0 0-5.24 2v.666a7.107 7.107 0 0 1-6-3.02s-2.667 6 3.333 8.667a7.76 7.76 0 0 1-4.667 1.333c6 3.334 13.334 0 13.334-7.666 0-.186-.019-.371-.053-.554a5.147 5.147 0 0 0 1.386-2.446v0Z"
        stroke="#E5E0FF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="twitterSimple_svg__a">
        <path fill="#fff" transform="translate(8 8.282)" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgTwitterSimple;
