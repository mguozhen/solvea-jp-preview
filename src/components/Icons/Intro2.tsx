import * as React from 'react';
import { SVGProps } from 'react';
const SvgIntro2 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#intro2_svg__a)">
      <path
        d="M14.2 17.012a12.148 12.148 0 0 1-6.454-6.469l3.406-3.406L4.887.872l-3.17 3.171A5.893 5.893 0 0 0 0 8.25c0 7.248 9.252 16.5 16.5 16.5a5.892 5.892 0 0 0 4.207-1.716l3.171-3.171-6.265-6.265-3.413 3.414Zm5.094 4.608a3.91 3.91 0 0 1-2.794 1.13C10.267 22.75 2 14.483 2 8.25a3.91 3.91 0 0 1 1.13-2.793L4.887 3.7l3.437 3.437-2.935 2.935.246.614a14.37 14.37 0 0 0 8.446 8.436l.606.231 2.926-2.927 3.437 3.437-1.756 1.757ZM24 3.25v4.5h-2V4.193l-5.59 5.591L15 8.37l5.615-5.62H17v-2h4.53A2.488 2.488 0 0 1 24 3.25Z"
        fill="#fff"
      />
    </g>
    <defs>
      <clipPath id="intro2_svg__a">
        <path fill="#fff" transform="translate(0 .75)" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgIntro2;
