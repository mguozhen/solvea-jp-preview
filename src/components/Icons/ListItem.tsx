import * as React from 'react';
import { SVGProps } from 'react';
const SvgListItem = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      clipPath="url(#listItem_svg__a)"
      fillRule="evenodd"
      clipRule="evenodd"
      fill="#909AA8"
    >
      <path d="M3.802 4.125a8.711 8.711 0 0 1 6.18-2.563c.63 0 1.246.067 1.84.195a.833.833 0 0 1-.35 1.63 7.1 7.1 0 0 0-1.49-.158A7.047 7.047 0 0 0 4.98 5.304l-.589-.59.589.59a7.062 7.062 0 0 0-2.072 5.008c0 1.957.79 3.726 2.072 5.01a7.047 7.047 0 0 0 5.003 2.074 7.047 7.047 0 0 0 5.004-2.075 7.07 7.07 0 0 0 1.915-3.516.832.832 0 1 1 1.628.349 8.738 8.738 0 0 1-2.366 4.346 8.711 8.711 0 0 1-6.18 2.563c-2.414 0-4.6-.98-6.181-2.563l.588-.59-.588.59a8.73 8.73 0 0 1-2.56-6.188 8.73 8.73 0 0 1 2.56-6.187Z" />
      <path d="M17.98 5.14a.798.798 0 0 1 0 1.179l-7.099 6.666a.929.929 0 0 1-1.255 0L6.52 10.07a.798.798 0 0 1 0-1.179.929.929 0 0 1 1.255 0l2.479 2.327 6.47-6.077a.929.929 0 0 1 1.256 0Z" />
    </g>
    <defs>
      <clipPath id="listItem_svg__a">
        <path fill="#fff" transform="translate(0 .313)" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgListItem;
