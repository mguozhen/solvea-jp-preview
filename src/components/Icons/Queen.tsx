import * as React from 'react';
import { SVGProps } from 'react';
const SvgQueen = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.324 3.95a.743.743 0 0 0-.886.178l-1.579 1.7-1.678-3.763V2.06a.75.75 0 0 0-1.362.005L4.141 5.83 2.563 4.128a.75.75 0 0 0-1.298.644L2.328 9.64a.75.75 0 0 0 .737.609h6.87a.75.75 0 0 0 .737-.61l1.063-4.868c0-.005 0-.01.004-.015a.744.744 0 0 0-.415-.807ZM9.938 9.485l-.002.015H3.065l-.003-.015L2 4.625l.007.008 1.969 2.12a.375.375 0 0 0 .617-.102L6.5 2.375l1.908 4.277a.375.375 0 0 0 .617.103l1.97-2.121.005-.009-1.062 4.86Z"
      fill="#686868"
    />
  </svg>
);
export default SvgQueen;
