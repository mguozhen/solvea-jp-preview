import * as React from 'react';
import { SVGProps } from 'react';
const SvgSearch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <ellipse cx={8.589} cy={8.737} rx={8.062} ry={8.112} fill="#fff" />
    <path
      d="M18.034 19.333a1.239 1.239 0 0 1-.833-.36l-1.91-2.232a1.02 1.02 0 0 1-.075-1.426.914.914 0 0 1 1.301 0l2.401 1.92c.346.355.453.88.273 1.342-.18.463-.614.775-1.107.798l-.05-.042Z"
      fill="#fff"
    />
  </svg>
);
export default SvgSearch;
