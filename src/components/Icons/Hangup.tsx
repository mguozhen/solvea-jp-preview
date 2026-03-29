import * as React from 'react';
import { SVGProps } from 'react';
const SvgHangup = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 28 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.331 5.411c.424 0 .814.23 1.02.598l1.427 2.562c.187.335.196.74.024 1.084l-1.375 2.74s.398 2.041 2.066 3.702C14.16 17.76 16.2 18.15 16.2 18.15l2.75-1.37a1.17 1.17 0 0 1 1.088.024l2.578 1.428c.37.205.6.594.6 1.016v2.95c0 1.501-1.4 2.586-2.828 2.106-2.933-.986-7.486-2.864-10.371-5.74-2.886-2.875-4.77-7.411-5.76-10.334-.482-1.423.607-2.818 2.114-2.818h2.959Z"
      stroke="red"
      strokeWidth={2.333}
      strokeLinejoin="round"
    />
    <path
      opacity={0.01}
      d="M23.917 4.431h-7.584v7.557h7.584V4.43Z"
      fill="red"
    />
    <path
      d="m22.75 5.594-5.25 5.231M17.5 5.594l5.25 5.231"
      stroke="red"
      strokeWidth={2.333}
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgHangup;
