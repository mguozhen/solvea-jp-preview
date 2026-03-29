import * as React from 'react';
import { SVGProps } from 'react';
const SvgFacebookGray = (props: SVGProps<SVGSVGElement>) => (
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
      d="m15.476 12.885.414-2.73h-2.593v-1.77c0-.748.361-1.476 1.523-1.476H16V4.584S14.93 4.4 13.907 4.4c-2.137 0-3.533 1.308-3.533 3.674v2.081H8v2.73h2.374v6.6a9.309 9.309 0 0 0 2.923 0v-6.6h2.179Z"
      fill="#fff"
    />
  </svg>
);
export default SvgFacebookGray;
