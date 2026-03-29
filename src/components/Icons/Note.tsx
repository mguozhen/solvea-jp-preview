import * as React from 'react';
import { SVGProps } from 'react';
const SvgNote = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 33 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x={0.5} width={32} height={32} rx={8} fill="#FFF6ED" />
    <path
      d="M15.667 9.333H9.833A1.667 1.667 0 0 0 8.167 11v11.667a1.667 1.667 0 0 0 1.666 1.666H21.5a1.667 1.667 0 0 0 1.667-1.666v-5.834m-1.25-8.75a1.768 1.768 0 1 1 2.5 2.5L16.5 18.5l-3.333.833L14 16l7.917-7.917Z"
      stroke="#EC4A0A"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgNote;
