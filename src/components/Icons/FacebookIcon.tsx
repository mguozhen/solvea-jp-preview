import * as React from 'react';
import { SVGProps } from 'react';
const SvgFacebookIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15 0c8.284 0 15 6.716 15 15 0 8.284-6.716 15-15 15-8.284 0-15-6.716-15-15C0 6.716 6.716 0 15 0Z"
      fill="#1877F2"
    />
    <path
      d="M16.808 29.874V18.32h3.218l.427-4.067h-3.645l.006-2.036c0-1.06.1-1.628 1.604-1.628h2.013V6.52h-3.22c-3.866 0-5.227 1.973-5.227 5.291v2.441h-2.41v4.067h2.41v11.39a14.68 14.68 0 0 0 4.824.164Z"
      fill="#fff"
    />
  </svg>
);
export default SvgFacebookIcon;
