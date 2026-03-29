import * as React from 'react';
import { SVGProps } from 'react';
const SvgFacebook = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 48 45"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#facebook_svg__a)">
      <path
        d="M25.093 40.91H9.765A1.767 1.767 0 0 1 8 39.143V10.677C8 9.7 8.79 8.91 9.767 8.91h28.466c.976 0 1.767.79 1.767 1.767v28.466c0 .976-.79 1.767-1.767 1.767H30.08V28.518h4.16l.621-4.83H30.08v-3.085c0-1.397.387-2.35 2.393-2.35h2.558v-4.32c-.443-.06-1.96-.191-3.727-.191-3.688 0-6.212 2.25-6.212 6.384v3.56h-4.17v4.83h4.17V40.91h.001Z"
        fill="#fff"
      />
    </g>
    <defs>
      <clipPath id="facebook_svg__a">
        <path fill="#fff" transform="translate(8 8.91)" d="M0 0h32v32H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgFacebook;
