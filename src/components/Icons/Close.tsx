import * as React from 'react';
import { SVGProps } from 'react';
const SvgClose = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 0C3.576 0 0 3.576 0 8c0 4.424 3.576 8 8 8 4.424 0 8-3.576 8-8 0-4.424-3.576-8-8-8Zm3.44 11.44a.797.797 0 0 1-1.128 0L8 9.128 5.688 11.44a.797.797 0 1 1-1.128-1.128L6.872 8 4.56 5.688A.797.797 0 1 1 5.688 4.56L8 6.872l2.312-2.312a.797.797 0 1 1 1.128 1.128L9.128 8l2.312 2.312a.812.812 0 0 1 0 1.128Z"
      fill="#C3CAD9"
    />
  </svg>
);
export default SvgClose;
