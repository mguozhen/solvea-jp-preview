import * as React from 'react';
import { SVGProps } from 'react';
const SvgWaveSmall = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M3 10v4m4.5-8v12M12 3v18m4.5-15v12m4.5-8v4"
      stroke="#6C7275"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgWaveSmall;
