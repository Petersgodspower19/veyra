import React, { useState, useRef } from 'react';
import { ChartDataPoint, Timeframe } from '../../types';
import { formatCurrency } from '../../data/mockData';

interface InteractiveChartProps {
  data: ChartDataPoint[];
  timeframe: Timeframe;
  onTimeframeChange?: (tf: Timeframe) => void;
  height?: number;
  showTimeframeSelector?: boolean;
  accentColor?: string;
  initialValue?: number;
  showMetrics?: boolean;
}

export const InteractiveChart: React.FC<InteractiveChartProps> = ({
  data,
  timeframe,
  onTimeframeChange,
  height = 280,
  showTimeframeSelector = true,
  accentColor = '#C8F135',
  showMetrics = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredPoint, setHoveredPoint] = useState<ChartDataPoint | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);

  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const paddingY = 24;
  const paddingX = 12;

  // Render SVG points (0 to 1000 width scale for fluid SVG)
  const svgWidth = 1000;
  const effectiveHeight = height - paddingY * 2;

  const pointsArray = data.map((point, index) => {
    const x = paddingX + (index / (data.length - 1)) * (svgWidth - paddingX * 2);
    const y = height - paddingY - ((point.value - min) / range) * effectiveHeight;
    return { x, y, point };
  });

  // Build SVG path with smooth cubic bezier curves
  const makeSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return '';
    if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;
    let d = `M ${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
    }
    return d;
  };

  const linePath = makeSmoothPath(pointsArray);
  const areaPath = `${linePath} L ${svgWidth - paddingX},${height} L ${paddingX},${height} Z`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const ratio = mouseX / rect.width;

    const approxIndex = Math.round(ratio * (data.length - 1));
    const clampedIndex = Math.max(0, Math.min(approxIndex, data.length - 1));
    const matched = pointsArray[clampedIndex];

    if (matched) {
      setHoveredPoint(matched.point);
      setHoverPos({
        x: (matched.x / svgWidth) * rect.width,
        y: matched.y,
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
    setHoverPos(null);
  };

  const timeframes: Timeframe[] = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];

  const currentDisplayValue = hoveredPoint
    ? hoveredPoint.value
    : data[data.length - 1]?.value || 0;
  const startValue = data[0]?.value || 1;
  const diff = currentDisplayValue - startValue;
  const diffPercent = (diff / startValue) * 100;
  const isPositive = diff >= 0;

  return (
    <div className="w-full flex flex-col">
      {/* Optional top metric readout when hovering or metrics enabled */}
      {showMetrics && (
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
          <div>
            <div className="text-xs font-medium text-[#8F96A3] tracking-wide uppercase">
              {hoveredPoint ? `Valuation (${hoveredPoint.timestamp})` : 'Total Portfolio Value'}
            </div>
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-3xl lg:text-4xl font-semibold tracking-tight text-white font-mono-num">
                {formatCurrency(currentDisplayValue)}
              </span>
              <span
                className={`text-sm font-semibold font-mono-num px-2 py-0.5 rounded ${
                  isPositive ? 'text-[#10B981] bg-[#10B981]/10' : 'text-[#F43F5E] bg-[#F43F5E]/10'
                }`}
              >
                {isPositive ? '+' : ''}
                {formatCurrency(diff)} ({isPositive ? '+' : ''}
                {diffPercent.toFixed(2)}%)
              </span>
            </div>
          </div>

          {showTimeframeSelector && onTimeframeChange && (
            <div className="flex items-center bg-[#13161F] p-1 rounded-xl border border-white/[0.07]">
              {timeframes.map((tf) => (
                <button
                  key={tf}
                  onClick={() => onTimeframeChange(tf)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    timeframe === tf
                      ? 'bg-[#C8F135] text-[#090A0E] shadow-sm font-bold'
                      : 'text-[#8F96A3] hover:text-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SVG Interactive Chart Canvas */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full cursor-crosshair select-none"
        style={{ height }}
      >
        {/* Subtle Horizontal Grid lines with price levels */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none py-4 opacity-40">
          <div className="w-full border-b border-white/[0.06] flex justify-end">
            <span className="text-[10px] text-[#5A6272] pr-2 -translate-y-3 font-mono-num">
              {formatCurrency(max)}
            </span>
          </div>
          <div className="w-full border-b border-white/[0.04] flex justify-end">
            <span className="text-[10px] text-[#5A6272] pr-2 -translate-y-3 font-mono-num">
              {formatCurrency((max + min) / 2)}
            </span>
          </div>
          <div className="w-full border-b border-white/[0.06] flex justify-end">
            <span className="text-[10px] text-[#5A6272] pr-2 -translate-y-3 font-mono-num">
              {formatCurrency(min)}
            </span>
          </div>
        </div>

        <svg
          viewBox={`0 0 ${svgWidth} ${height}`}
          preserveAspectRatio="none"
          className="w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0.22" />
              <stop offset="70%" stopColor={accentColor} stopOpacity="0.04" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          <path d={areaPath} fill="url(#chartFill)" />
          <path
            d={linePath}
            fill="none"
            stroke={accentColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Hover Crosshair & Indicator */}
        {hoverPos && hoveredPoint && (
          <>
            <div
              className="absolute top-0 bottom-0 w-[1px] bg-white/25 pointer-events-none border-dashed border-l border-white/40"
              style={{ left: hoverPos.x }}
            />
            <div
              className="absolute w-3.5 h-3.5 rounded-full border-2 border-[#090A0E] pointer-events-none -translate-x-1/2 -translate-y-1/2 shadow-lg"
              style={{
                left: hoverPos.x,
                top: hoverPos.y,
                backgroundColor: accentColor,
              }}
            />
            {/* Tooltip badge */}
            <div
              className="absolute pointer-events-none -translate-x-1/2 -translate-y-full mb-3 bg-[#161922] border border-white/10 px-2.5 py-1.5 rounded-lg shadow-xl text-center min-w-[100px] z-20"
              style={{
                left: Math.max(60, Math.min(hoverPos.x, (containerRef.current?.clientWidth || 300) - 60)),
                top: Math.max(34, hoverPos.y - 12),
              }}
            >
              <div className="text-[10px] text-[#8F96A3] font-medium uppercase tracking-wider">
                {hoveredPoint.timestamp}
              </div>
              <div className="text-xs font-bold text-white font-mono-num mt-0.5">
                {formatCurrency(hoveredPoint.value)}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom X-Axis labels */}
      <div className="flex justify-between items-center pt-2 px-2 text-[11px] text-[#5A6272] font-mono-num select-none">
        {data.length > 0 && (
          <>
            <span>{data[0].timestamp}</span>
            <span>{data[Math.floor(data.length / 2)]?.timestamp}</span>
            <span>{data[data.length - 1].timestamp}</span>
          </>
        )}
      </div>
    </div>
  );
};
