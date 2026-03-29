import * as React from 'react';
import { SVGProps } from 'react';
const SvgTwitter = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#twitter_svg__a)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.333 30h23.334A3.333 3.333 0 0 0 30 26.667V3.333A3.333 3.333 0 0 0 26.667 0H3.333A3.333 3.333 0 0 0 0 3.333v23.334A3.333 3.333 0 0 0 3.333 30Z"
        fill="#2DAAE1"
      />
      <path
        d="M24.618 9.033a7.879 7.879 0 0 1-2.267.622 3.957 3.957 0 0 0 1.736-2.183 7.883 7.883 0 0 1-2.507.957 3.946 3.946 0 0 0-6.724 3.6 11.204 11.204 0 0 1-8.133-4.123 3.927 3.927 0 0 0-.535 1.984c0 1.37.697 2.577 1.756 3.284a3.929 3.929 0 0 1-1.788-.493v.05A3.948 3.948 0 0 0 9.321 16.6a4.003 4.003 0 0 1-1.783.069 3.951 3.951 0 0 0 3.687 2.74 7.917 7.917 0 0 1-5.843 1.633 11.168 11.168 0 0 0 6.05 1.774c7.257 0 11.226-6.013 11.226-11.227 0-.171-.003-.341-.012-.51a8.04 8.04 0 0 0 1.972-2.046Z"
        fill="#fff"
      />
    </g>
    <defs>
      <clipPath id="twitter_svg__a">
        <path fill="#fff" d="M0 0h30v30H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgTwitter;
