import * as React from 'react';
import { SVGProps } from 'react';
const SvgMenuArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14 8H2M10 4l4 4-4 4"
      stroke="#707070"
      strokeWidth={1.333}
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgMenuArrow;
