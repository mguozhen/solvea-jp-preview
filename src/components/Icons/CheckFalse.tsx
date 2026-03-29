import * as React from 'react';
import { SVGProps } from 'react';
const SvgCheckFalse = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={24} height={24} rx={12} fill="#F97066" />
    <path
      d="m16.2 7.8-8.4 8.4m0-8.4 8.4 8.4"
      stroke="#fff"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgCheckFalse;
