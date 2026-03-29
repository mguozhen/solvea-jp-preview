import * as React from 'react';
import { SVGProps } from 'react';
const SvgProfile = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={20} height={20} rx={8} fill="#F0F9FF" />
    <g clipPath="url(#profile_svg__a)">
      <path
        d="M12.917 15.25v-1.167a2.333 2.333 0 0 0-2.333-2.333H5.917a2.333 2.333 0 0 0-2.333 2.333v1.167m12.833 0v-1.167a2.333 2.333 0 0 0-1.75-2.257m-2.333-7a2.334 2.334 0 0 1 0 4.52m-1.75-2.263a2.333 2.333 0 1 1-4.667 0 2.333 2.333 0 0 1 4.667 0Z"
        stroke="#0086C9"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="profile_svg__a">
        <path fill="#fff" transform="translate(3 3)" d="M0 0h14v14H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgProfile;
