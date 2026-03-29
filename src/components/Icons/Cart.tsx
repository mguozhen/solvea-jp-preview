import * as React from 'react';
import { SVGProps } from 'react';
const SvgCart = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.334 23.333h21.893c1.688 0 2.532 0 3.204-.314a3.333 3.333 0 0 0 1.43-1.28c.387-.634.48-1.472.666-3.15l.975-8.775c.057-.513.086-.769.003-.967a.833.833 0 0 0-.367-.41c-.188-.104-.445-.104-.96-.104H7.5m-4.167-5h2.081c.441 0 .662 0 .834.084a.833.833 0 0 1 .361.34c.095.166.108.386.136.826l1.51 24.167c.028.44.042.66.136.827a.833.833 0 0 0 .361.339c.173.084.393.084.834.084h22.08M12.5 35.833h.017m14.983 0h.017m-14.183 0a.833.833 0 1 1-1.667 0 .833.833 0 0 1 1.667 0Zm15 0a.833.833 0 1 1-1.667 0 .833.833 0 0 1 1.666 0Z"
      stroke="#344054"
      strokeWidth={3.333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgCart;
