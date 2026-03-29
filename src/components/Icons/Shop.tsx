import * as React from 'react';
import { SVGProps } from 'react';
const SvgShop = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 33 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x={0.5} width={32} height={32} rx={8} fill="#FFFAEB" />
    <path
      d="m9 11 2.5-3.333h10L24 11M9 11v11.667a1.667 1.667 0 0 0 1.667 1.666h11.666A1.666 1.666 0 0 0 24 22.667V11M9 11h15m-4.167 3.333a3.333 3.333 0 0 1-6.666 0"
      stroke="#DC6803"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgShop;
