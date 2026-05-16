type MiniChartProps = {
  width?: number;
  height?: number;
  data?: number[];
};

const defaultData = [18, 24, 16, 28, 34, 30, 38, 42, 37, 44];

function buildPath(data: number[], width: number, height: number) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  return data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');
}

export default function MiniChart({ width = 360, height = 120, data = defaultData }: MiniChartProps) {
  const strokePath = buildPath(data, width, height);
  const areaPath = `${strokePath} L ${width} ${height} L 0 ${height} Z`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-label="Mini chart" role="img">
      <defs>
        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#chartGradient)" />
      <path d={strokePath} fill="none" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
      {data.map((value, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - ((value - Math.min(...data)) / (Math.max(...data) - Math.min(...data) || 1)) * height;
        return <circle key={index} cx={x} cy={y} r="4" fill="#0ea5e9" stroke="#ffffff" strokeWidth="1.5" />;
      })}
    </svg>
  );
}
