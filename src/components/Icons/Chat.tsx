import * as React from 'react';
import { SVGProps } from 'react';
const SvgChat = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.5 6.282a2 2 0 0 0 1.11-.336l2.89-1.927v9.263a1 1 0 0 1-1 1h-1v2h1a3 3 0 0 0 3-3V4.019c0-1.598-1.78-2.55-3.11-1.664L16.5 4.282h-7a3 3 0 0 0-3 3v1h2v-1a1 1 0 0 1 1-1h7Z"
      fill="#1A1D1F"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.25 18.72a2 2 0 0 1 1.25-.438h8a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-10a1 1 0 0 0-1 1v8.838l1.75-1.4Zm1.25 1.562h8a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3h-10a3 3 0 0 0-3 3v8.838c0 1.677 1.94 2.61 3.25 1.562l1.75-1.4Z"
      fill="#1A1D1F"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.5 14.282a1 1 0 0 1 1-1h6a1 1 0 0 1 0 2h-6a1 1 0 0 1-1-1Z"
      fill="#1A1D1F"
    />
  </svg>
);
export default SvgChat;
