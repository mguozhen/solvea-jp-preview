import * as React from 'react';
import { SVGProps } from 'react';
const SvgChat3 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.375 14.25H8.25v-3h5.25v-3h3v6h-1.875L13.5 15.375l-1.125-1.125Z"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
    <path
      d="M1.5 2.25h12v9H6.375l-1.5 1.5-1.5-1.5H1.5v-9Z"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
    <path d="M4.5 8.25h2.25M4.5 5.25H9" stroke="#fff" strokeWidth={1.5} />
  </svg>
);
export default SvgChat3;
