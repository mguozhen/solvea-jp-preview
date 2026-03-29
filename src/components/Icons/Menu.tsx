import * as React from 'react';
import { SVGProps } from 'react';
const SvgMenu = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M3 12h18M3 6h18M3 18h18"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgMenu;
