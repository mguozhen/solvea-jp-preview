import * as React from 'react';
import { SVGProps } from 'react';
const SvgArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 10 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="#2B2B2B" d="M0 .399h3.332v3.332H0z" />
    <path
      fill="#2B2B2B"
      d="M3.33 3.065h3.332v3.332H3.33zM6.668 5.731H10v3.332H6.668zM3.33 8.397h3.332v3.332H3.33z"
    />
    <path fill="#2B2B2B" d="M0 11.063h3.332v3.332H0z" />
  </svg>
);
export default SvgArrow;
