import * as React from 'react';
import { SVGProps } from 'react';
const SvgYoutubeSimple = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 32 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      y={0.282}
      width={32}
      height={32}
      rx={16}
      fill="#1971F5"
      fillOpacity={0.1}
    />
    <g
      clipPath="url(#youtubeSimple_svg__a)"
      stroke="#E5E0FF"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M23.027 12.562a1.853 1.853 0 0 0-1.293-1.333c-1.147-.28-5.734-.28-5.734-.28s-4.586 0-5.733.306a1.852 1.852 0 0 0-1.293 1.333 19.332 19.332 0 0 0-.307 3.527c-.008 1.192.095 2.381.307 3.554a1.853 1.853 0 0 0 1.293 1.28c1.147.306 5.733.306 5.733.306s4.587 0 5.734-.306a1.853 1.853 0 0 0 1.293-1.334 19.34 19.34 0 0 0 .307-3.5 19.34 19.34 0 0 0-.307-3.553v0Z" />
      <path d="m14.5 18.295 3.833-2.18-3.833-2.18v4.36Z" />
    </g>
    <defs>
      <clipPath id="youtubeSimple_svg__a">
        <path fill="#fff" transform="translate(8 8.282)" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgYoutubeSimple;
