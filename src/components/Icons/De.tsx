import * as React from 'react';
import { SVGProps } from 'react';
const SvgDe = (props: SVGProps<SVGSVGElement>) => (
  <svg
    className="de_svg__icon"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    {...props}
  >
    <path
      d="M52.758 694.895a489.917 489.917 0 0 0 918.484 0L512 652.288 52.758 694.895z"
      fill="#FFDA44"
    />
    <path d="M512 34.771a489.917 489.917 0 0 0-459.242 319.4L512 396.777l459.242-42.608A489.962 489.962 0 0 0 512 34.727z" />
    <path
      d="M52.758 354.17a488.715 488.715 0 0 0-30.497 170.296c0 59.97 10.774 117.315 30.497 170.385h918.484a489.05 489.05 0 0 0 30.497-170.385c0-59.926-10.774-117.27-30.497-170.34H52.758z"
      fill="#D80027"
    />
  </svg>
);
export default SvgDe;
