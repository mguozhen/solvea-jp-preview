import * as React from 'react';
import { SVGProps } from 'react';
const SvgIntro5 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#intro5_svg__a)">
      <path
        d="M15 3a3 3 0 0 0-3-3H0v24h2V13h8v1a3 3 0 0 0 3 3h11V4h-9V3ZM2 2h10a1 1 0 0 1 1 1v8H2V2Zm20 4v9h-9a1 1 0 0 1-1-1v-1h3V6h7Z"
        fill="#2A2A2A"
      />
    </g>
    <defs>
      <clipPath id="intro5_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgIntro5;
