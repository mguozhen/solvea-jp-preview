import * as React from 'react';
import { SVGProps } from 'react';
const SvgArrowRightSmall = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 7 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M.292.294a.996.996 0 0 0 0 1.41l3.88 3.88-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L1.703.284c-.38-.38-1.02-.38-1.41.01Z"
      fill="#DADEE6"
    />
  </svg>
);
export default SvgArrowRightSmall;
