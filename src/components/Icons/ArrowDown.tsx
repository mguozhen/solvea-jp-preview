import * as React from 'react';
import { SVGProps } from 'react';
const SvgArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 10 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m1.57.834 3.103 3.104L7.777.834a.797.797 0 1 1 1.128 1.128L5.233 5.634a.797.797 0 0 1-1.128 0L.433 1.962a.797.797 0 0 1 0-1.128.814.814 0 0 1 1.136 0Z"
      fill="#C3CAD9"
    />
  </svg>
);
export default SvgArrowDown;
