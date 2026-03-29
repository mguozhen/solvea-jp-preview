import * as React from 'react';
import { SVGProps } from 'react';
const SvgWave1 = (props: SVGProps<SVGSVGElement>) => (
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
      d="M7.489 3.054c-.113-.527-.865-.527-.978 0L5.317 8.628A3 3 0 0 1 2.383 11H1a1 1 0 1 1 0-2h1.383a1 1 0 0 0 .978-.79l1.194-5.575C5.12 0 8.88 0 9.445 2.635l3.066 14.31c.113.528.865.528.978 0l1.194-5.574A3 3 0 0 1 17.617 9H19a1 1 0 1 1 0 2h-1.383a1 1 0 0 0-.978.79l-1.194 5.575c-.565 2.635-4.325 2.635-4.89 0L7.49 3.054Z"
      fill="#1A1D1F"
    />
  </svg>
);
export default SvgWave1;
