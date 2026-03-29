import * as React from 'react';
import { SVGProps } from 'react';
const SvgCheckPure = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m7.937 12.854 8.84-8.839 1.178 1.179L7.937 15.21 2.045 9.318 3.223 8.14l4.714 4.714Z"
      fill="#475467"
    />
  </svg>
);
export default SvgCheckPure;
