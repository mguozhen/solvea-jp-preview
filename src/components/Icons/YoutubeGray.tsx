import * as React from 'react';
import { SVGProps } from 'react';
const SvgYoutubeGray = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={24} height={24} rx={12} fill="#6F767E" />
    <path
      d="M18.988 8.565a1.79 1.79 0 0 0-1.259-1.26C16.612 7 12.141 7 12.141 7s-4.47 0-5.588.294c-.6.165-1.094.659-1.259 1.27C5 9.683 5 12 5 12s0 2.33.294 3.435a1.79 1.79 0 0 0 1.259 1.26C7.683 17 12.14 17 12.14 17s4.47 0 5.588-.294a1.79 1.79 0 0 0 1.26-1.259c.293-1.118.293-3.435.293-3.435s.012-2.33-.294-3.447Z"
      fill="#fff"
    />
    <path d="m10.718 14.141 3.717-2.14-3.717-2.142v4.282Z" fill="#6F767E" />
  </svg>
);
export default SvgYoutubeGray;
