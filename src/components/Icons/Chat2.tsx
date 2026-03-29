import * as React from 'react';
import { SVGProps } from 'react';
const SvgChat2 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11 12.667H7.333V10H12V7.333h2.667v5.334H13l-1 1-1-1Z"
      stroke="#2B2B2B"
      strokeWidth={1.333}
      strokeLinejoin="round"
    />
    <path
      d="M1.333 2H12v8H5.667l-1.334 1.333L3 10H1.333V2Z"
      stroke="#2B2B2B"
      strokeWidth={1.333}
      strokeLinejoin="round"
    />
    <path d="M4 7.333h2M4 4.667h4" stroke="#2B2B2B" strokeWidth={1.333} />
  </svg>
);
export default SvgChat2;
