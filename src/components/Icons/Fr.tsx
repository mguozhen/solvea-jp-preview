import * as React from 'react';
import { SVGProps } from 'react';
const SvgFr = (props: SVGProps<SVGSVGElement>) => (
  <svg
    className="fr_svg__icon"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    {...props}
  >
    <path
      d="M679.338 36.448v949.888c194.048-71.552 337.024-255.36 337.024-475.008.128-219.52-142.848-403.456-337.024-474.88"
      fill="#ED2939"
    />
    <path
      d="M679.338 36.448c-51.072-20.48-107.136-30.72-168.448-30.72-56.192 0-117.504 10.24-168.576 30.592v949.888c51.072 20.48 107.264 30.592 168.576 30.592s117.504-10.24 168.576-30.592V36.448z"
      fill="#FAFAFA"
    />
    <path
      d="M347.434 986.336V36.448C153.386 107.872 10.41 291.808 10.41 511.328c0 219.648 137.856 403.456 337.024 475.008"
      fill="#002395"
    />
  </svg>
);
export default SvgFr;
