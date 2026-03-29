import * as React from 'react';
import { SVGProps } from 'react';
const SvgFile = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 18 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M1 1h16v14.783C17 18.653 14.459 21 11.353 21H1V1Z"
      stroke="#000"
      strokeWidth={2}
    />
    <path
      d="M4.913 7.087h7.957M4.913 10.565h7.957M4.913 14.043h6.217"
      stroke="#000"
      strokeWidth={2}
    />
  </svg>
);
export default SvgFile;
