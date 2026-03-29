import * as React from 'react';
import { SVGProps } from 'react';
const SvgListItemFinish = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={24} height={24} rx={12} fill="#C5BFFF" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.805 7.529c.26.26.26.682 0 .943l-7.334 7.333a.667.667 0 0 1-.942 0l-3.334-3.333a.667.667 0 1 1 .943-.943L10 14.39l6.862-6.862c.26-.26.682-.26.943 0Z"
      fill="#0E0C15"
    />
  </svg>
);
export default SvgListItemFinish;
