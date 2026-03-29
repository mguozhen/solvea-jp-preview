import * as React from 'react';
import { SVGProps } from 'react';
const SvgPause = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={32} height={32} rx={16} fill="#141718" />
    <rect x={12} y={10} width={3} height={12} rx={1.5} fill="#FEFEFE" />
    <rect x={17} y={10} width={3} height={12} rx={1.5} fill="#FEFEFE" />
  </svg>
);
export default SvgPause;
