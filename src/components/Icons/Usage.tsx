import * as React from 'react';
import { SVGProps } from 'react';
const SvgUsage = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={20} height={20} rx={8} fill="#EEF4FF" />
    <g
      clipPath="url(#usage_svg__a)"
      stroke="#444CE7"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15.25 8.833c0 4.083-5.25 7.583-5.25 7.583s-5.25-3.5-5.25-7.583a5.25 5.25 0 1 1 10.5 0Z" />
      <path d="M10 10.583a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5Z" />
    </g>
    <defs>
      <clipPath id="usage_svg__a">
        <path fill="#fff" transform="translate(3 3)" d="M0 0h14v14H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgUsage;
