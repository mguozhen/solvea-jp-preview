import * as React from 'react';
import { SVGProps } from 'react';
const SvgUser = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8 6.667A2.333 2.333 0 1 0 8 2a2.333 2.333 0 0 0 0 4.667ZM2 13.6v.4h12v-.4c0-1.493 0-2.24-.29-2.81a2.667 2.667 0 0 0-1.166-1.166c-.57-.29-1.317-.29-2.81-.29H6.266c-1.494 0-2.24 0-2.811.29-.502.256-.91.663-1.165 1.165C2 11.36 2 12.107 2 13.6Z"
      stroke="#000"
      strokeWidth={1.333}
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgUser;
