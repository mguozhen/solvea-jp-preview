import * as React from 'react';
import { SVGProps } from 'react';
const SvgStorage = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fill="#000"
      d="M0 0h3.2v3.2H0zM0 12.8h3.2V16H0zM6.4 0h3.2v3.2H6.4zM6.4 6.4h3.2v3.2H6.4zM6.4 12.8h3.2V16H6.4zM12.801 0h3.2v3.2h-3.2zM12.801 6.4h3.2v3.2h-3.2zM12.801 12.8h3.2V16h-3.2zM0 6.4h3.2v3.2H0z"
    />
  </svg>
);
export default SvgStorage;
