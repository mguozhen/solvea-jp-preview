import * as React from 'react';
import { SVGProps } from 'react';
const SvgQuestionTip = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={30} height={30} rx={8} fill="#2B72FD" />
    <path
      d="m21.333 8.667-4.434 12.667-2.533-5.7-5.7-2.534 12.667-4.433Z"
      stroke="#fff"
      strokeWidth={1.333}
      strokeLinejoin="round"
    />
    <path
      d="m21.334 8.667-6.967 6.967"
      stroke="#fff"
      strokeWidth={1.333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgQuestionTip;
