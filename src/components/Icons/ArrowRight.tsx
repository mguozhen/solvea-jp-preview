import * as React from 'react';
import { SVGProps } from 'react';
const SvgArrowRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m14.844 10.833-3.88 3.88 1.179 1.179 5.892-5.893-5.892-5.893-1.179 1.179 3.882 3.882H2.084v1.666h12.76Z"
      fill="#fff"
    />
  </svg>
);
export default SvgArrowRight;
