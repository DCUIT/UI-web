"use client"

import React, { useRef, useState } from 'react';

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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    value: number;
    index: number;
  } | null>(null);

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const strokePath = buildPath(data, width, height);
  const areaPath = `${strokePath} L ${width} ${height} L 0 ${height} Z`;

  function handleMove(e: React.MouseEvent<SVGSVGElement>) {
    const rect = (e.target as Element).closest('svg')!.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const rel = Math.max(0, Math.min(1, mouseX / rect.width));
    const idx = Math.round(rel * (data.length - 1));
    const value = data[idx];
    const x = (idx / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    // position tooltip slightly above the point
    setTooltip({ x, y: y - 10, value, index: idx });
  }

  function handleLeave() {
    setTooltip(null);
  }

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        aria-label="Mini chart"
        role="img"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="w-full h-auto"
      >
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#chartGradient)" />
        <path d={strokePath} fill="none" stroke="#0284c7" strokeWidth={3} strokeLinecap="round" />
        {data.map((value, index) => {
          const x = (index / (data.length - 1)) * width;
          const y = height - ((value - min) / range) * height;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r={4}
              fill="#0ea5e9"
              stroke="#ffffff"
              strokeWidth={1.5}
            />
          );
        })}
      </svg>

      {tooltip && (
        <div
          className="pointer-events-none absolute z-50 -translate-x-1/2 rounded-md border bg-white px-3 py-1 text-sm shadow-md dark:bg-slate-900 dark:border-slate-800"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="font-semibold text-slate-900 dark:text-white">{tooltip.value}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Point #{tooltip.index + 1}</div>
        </div>
      )}
    </div>
  );
}
