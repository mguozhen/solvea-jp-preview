import * as React from 'react';
import { SVGProps } from 'react';
const SvgQrExample = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.667 2H2v4.667h4.667V2ZM6.667 9.333H2V14h4.667V9.333ZM14 2H9.333v4.667H14V2Z"
      stroke="#000"
      strokeWidth={1.333}
      strokeLinejoin="round"
    />
    <path
      d="M9.667 9.333V14M13.667 9.333V14"
      stroke="#000"
      strokeWidth={1.333}
      strokeLinecap="round"
    />
  </svg>
);
export default SvgQrExample;
