import * as React from 'react';
import { SVGProps } from 'react';
const SvgTwitterGray = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={24} height={24} rx={12} fill="#6F767E" />
    <path
      d="M19.333 6a7.267 7.267 0 0 1-2.093 1.02 2.987 2.987 0 0 0-5.24 2v.667a7.107 7.107 0 0 1-6-3.02s-2.667 6 3.333 8.666a7.76 7.76 0 0 1-4.667 1.333C10.666 20 18 16.666 18 9c0-.186-.019-.371-.053-.553A5.147 5.147 0 0 0 19.332 6Z"
      fill="#fff"
    />
  </svg>
);
export default SvgTwitterGray;
