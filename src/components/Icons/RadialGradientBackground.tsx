interface Props {
  width?: number;
  height?: number;
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export default function RadialGradientBackground({
  width = 477,
  height = 474,
  className,
  primaryColor = '#F07AF9',
  secondaryColor = '#F7F7F7',
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 477 474"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <ellipse
        cx="238.5"
        cy="237"
        rx="238.5"
        ry="237"
        fill="url(#paint0_radial_2332_1226)"
        fillOpacity="0.3"
      />
      <defs>
        <radialGradient
          id="paint0_radial_2332_1226"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(0.671536 178.25 -179.378 0.667312 238.5 237)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={primaryColor} />
          <stop offset="1" stopColor={secondaryColor} />
        </radialGradient>
      </defs>
    </svg>
  );
}
