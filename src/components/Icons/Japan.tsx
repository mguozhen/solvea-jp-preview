import * as React from 'react';
import { SVGProps } from 'react';
const SvgJapan = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#japan_svg__a)">
      <path
        d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Z"
        fill="#F0F0F0"
      />
      <path
        d="M12 17.218a5.217 5.217 0 1 0 0-10.435 5.217 5.217 0 0 0 0 10.435Z"
        fill="#D80027"
      />
    </g>
    <defs>
      <clipPath id="japan_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgJapan;
