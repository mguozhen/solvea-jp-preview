export const Line = ({
                       width = '100%',
                       height = 0.5,
                       direction = 'horizontal',
                       className,
                       color = '#000',
                     }: {
  width?: number | string;
  height?: number;
  className?: string;
  direction?: 'horizontal' | 'vertical';
  color?: string;
}) => {
  let size = direction === 'horizontal' ? [width, height] : [height, width];
  size = size.map(s => typeof s === 'number' ? Math.max(s, 1) : s);
  return <svg width={size[0]} height={size[1]} viewBox={`0 0 1 1`}
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg" style={{display: 'block'}} className={className}>
    <line x1="0" y1="0" x2={direction === 'horizontal' ? 1 : 0} y2={direction === 'horizontal' ? 0 : 1} stroke={color} strokeWidth={height} />
  </svg>;
};
