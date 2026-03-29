import * as React from 'react';
import { SVGProps } from 'react';
const SvgLines = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 470 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path stroke="#EAECF0" d="M469 12v8M313 12v8M157 12v8M1 12v8" />
    <path stroke="#EAECF0" strokeLinecap="square" d="M1 11.5h468" />
    <path stroke="#EAECF0" d="M234.5 0v12" />
  </svg>
);
export default SvgLines;
