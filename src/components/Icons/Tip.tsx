import * as React from 'react';
import { SVGProps } from 'react';
const SvgTip = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#tip_svg__a)">
      <path
        d="M8 14.666c1.84 0 3.508-.746 4.714-1.952A6.646 6.646 0 0 0 14.667 8c0-1.841-.747-3.508-1.953-4.714A6.646 6.646 0 0 0 8 1.333c-1.841 0-3.508.746-4.714 1.953A6.646 6.646 0 0 0 1.333 8c0 1.84.746 3.507 1.953 4.714A6.646 6.646 0 0 0 8 14.666Z"
        stroke="#333"
        strokeWidth={1.333}
        strokeLinejoin="round"
      />
      <path
        d="M8 9.541V8.208a2 2 0 1 0-2-2"
        stroke="#333"
        strokeWidth={1.333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 12.542a.833.833 0 1 0 0-1.667.833.833 0 0 0 0 1.667Z"
        fill="#333"
      />
    </g>
    <defs>
      <clipPath id="tip_svg__a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgTip;
