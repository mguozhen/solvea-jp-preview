import * as React from 'react';
import { SVGProps } from 'react';
const SvgCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#check_svg__a)" strokeLinejoin="round">
      <path
        d="M8 14.667c1.841 0 3.508-.746 4.714-1.953A6.646 6.646 0 0 0 14.667 8c0-1.84-.746-3.508-1.953-4.714A6.646 6.646 0 0 0 8 1.333c-1.84 0-3.507.747-4.714 1.953A6.646 6.646 0 0 0 1.333 8c0 1.841.747 3.508 1.953 4.714A6.646 6.646 0 0 0 8 14.667Z"
        fill="#333"
        stroke="#333"
      />
      <path d="m5.333 8 2 2 4-4" stroke="#fff" />
    </g>
    <defs>
      <clipPath id="check_svg__a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgCheck;
