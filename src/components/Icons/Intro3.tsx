import * as React from 'react';
import { SVGProps } from 'react';
const SvgIntro3 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#intro3_svg__a)">
      <path
        d="M21 4.25h-6v-1a3 3 0 0 0-6 0v1H3a3 3 0 0 0-3 3v17h24v-17a3 3 0 0 0-3-3Zm-10-1a1 1 0 0 1 2 0v3h-2v-3Zm11 19H2v-15a1 1 0 0 1 1-1h6v2h6v-2h6a1 1 0 0 1 1 1v15Zm-18-2h7v-10H4v10Zm2-8h3v6H6v-6Zm7 2h7v2h-7v-2Zm0-4h7v2h-7v-2Zm0 8h5v2h-5v-2Z"
        fill="#fff"
      />
    </g>
    <defs>
      <clipPath id="intro3_svg__a">
        <path fill="#fff" transform="translate(0 .25)" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgIntro3;
