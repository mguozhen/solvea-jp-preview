import * as React from 'react';
import { SVGProps } from 'react';
const SvgThumb = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 33 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x={0.5} width={32} height={32} rx={8} fill="#ECFDF3" />
    <path
      d="M12.333 24.333h-2.5a1.667 1.667 0 0 1-1.666-1.666v-5.834a1.667 1.667 0 0 1 1.666-1.666h2.5m5.834-1.667v-3.333a2.5 2.5 0 0 0-2.5-2.5l-3.334 7.5v9.166h9.4a1.667 1.667 0 0 0 1.667-1.416l1.15-7.5a1.665 1.665 0 0 0-1.667-1.917h-4.716Z"
      stroke="#12B76A"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgThumb;
