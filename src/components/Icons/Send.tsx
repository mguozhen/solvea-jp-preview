import * as React from 'react';
import { SVGProps } from 'react';
const SvgSend = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      clipPath="url(#send_svg__a)"
      stroke="#fff"
      strokeWidth={1.833}
      strokeLinejoin="round"
    >
      <path d="M27.98 16.314 11.084 8.58l5.228 7.736-4.857 8.102 16.526-8.104ZM16.313 16.32h3.667" />
    </g>
    <defs>
      <clipPath id="send_svg__a">
        <path
          fill="#fff"
          transform="rotate(45 7.243 20.07)"
          d="M0 0h22v22H0z"
        />
      </clipPath>
    </defs>
  </svg>
);
export default SvgSend;
