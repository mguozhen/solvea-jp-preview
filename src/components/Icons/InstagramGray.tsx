import * as React from 'react';
import { SVGProps } from 'react';
const SvgInstagramGray = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={24} height={24} rx={12} fill="#6F767E" />
    <g
      clipPath="url(#instagramGray_svg__a)"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15.334 5.333H8.667a3.333 3.333 0 0 0-3.333 3.334v6.667a3.333 3.333 0 0 0 3.333 3.333h6.667a3.333 3.333 0 0 0 3.333-3.334V8.668a3.333 3.333 0 0 0-3.334-3.333Z" />
      <path d="M14.667 11.58a2.667 2.667 0 1 1-5.276.783 2.667 2.667 0 0 1 5.276-.783ZM15.666 8.334h.007" />
    </g>
    <defs>
      <clipPath id="instagramGray_svg__a">
        <path fill="#fff" transform="translate(4 4)" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgInstagramGray;
