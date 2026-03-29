import * as React from 'react';
import { SVGProps } from 'react';
const SvgVoice = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10.333 3.667a2.333 2.333 0 1 0-4.666 0V8a2.333 2.333 0 1 0 4.666 0V3.667Z"
      stroke="#000"
      strokeWidth={1.333}
      strokeLinejoin="round"
    />
    <path
      d="M3 7.667a5 5 0 1 0 10 0M8 12.667v2"
      stroke="#000"
      strokeWidth={1.333}
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgVoice;
