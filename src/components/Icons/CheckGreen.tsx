import * as React from 'react';
import { SVGProps } from 'react';
const SvgCheckGreen = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 22a9.97 9.97 0 0 0 7.071-2.929A9.97 9.97 0 0 0 22 12a9.969 9.969 0 0 0-2.929-7.071A9.969 9.969 0 0 0 12 2a9.969 9.969 0 0 0-7.071 2.929A9.969 9.969 0 0 0 2 12a9.969 9.969 0 0 0 2.929 7.071A9.969 9.969 0 0 0 12 22Z"
      fill="#00EC18"
      stroke="#00EC18"
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <path
      d="m8 12 3 3 6-6"
      stroke="#fff"
      strokeWidth={2}
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgCheckGreen;
