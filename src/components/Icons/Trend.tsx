import * as React from 'react';
import { SVGProps } from 'react';
const SvgTrend = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M35 35H7.667c-.934 0-1.4 0-1.757-.182a1.666 1.666 0 0 1-.728-.728C5 33.733 5 33.267 5 32.333V5m30 6.667-9.057 9.057c-.33.33-.495.495-.686.557a.833.833 0 0 1-.515 0c-.19-.062-.355-.227-.685-.557l-3.114-3.114c-.33-.33-.495-.495-.686-.557a.833.833 0 0 0-.515 0c-.19.061-.355.226-.685.556L11.667 25M35 11.667h-6.667m6.667 0v6.666"
      stroke="#344054"
      strokeWidth={3.333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgTrend;
