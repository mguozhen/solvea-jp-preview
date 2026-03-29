import * as React from 'react';
import { SVGProps } from 'react';
const SvgQuotation = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.78 15.99A8.742 8.742 0 1 1 .04 24.732L0 23.482C0 13.828 7.827 6 17.483 6v4.995a12.406 12.406 0 0 0-8.83 3.658c-.454.454-.869.937-1.242 1.444.446-.07.903-.107 1.37-.107Zm22.479 0a8.742 8.742 0 1 1-8.742 8.742l-.039-1.25C22.478 13.828 30.305 6 39.961 6v4.995a12.406 12.406 0 0 0-8.83 3.658c-.454.454-.869.937-1.242 1.444.446-.07.903-.107 1.37-.107Z"
      fill="url(#quotation_svg__a)"
      opacity={0.9}
    />
    <defs>
      <linearGradient
        id="quotation_svg__a"
        x1={-3.114}
        y1={-4.774}
        x2={86.647}
        y2={9.287}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3A8EF6" />
        <stop offset={1} stopColor="#6F3AFA" />
      </linearGradient>
    </defs>
  </svg>
);
export default SvgQuotation;
