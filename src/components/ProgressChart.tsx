import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { DailyProgressState, getLast7DaysProgress, DayProgressStat } from '../utils/dailyProgress';
import { TrendingUp, BookOpen, Bookmark, Calendar } from 'lucide-react';

interface ProgressChartProps {
  progress: DailyProgressState;
  className?: string;
  compact?: boolean;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    dataKey: string;
  }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const articles = payload.find((p) => p.dataKey === 'articole')?.value || 0;
    const words = payload.find((p) => p.dataKey === 'cuvinte')?.value || 0;

    return (
      <div className="bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-lg border border-[#DFDAD0] text-xs space-y-2 min-w-[140px]">
        <div className="font-semibold text-[#191E24] border-b border-[#F0ECE4] pb-1 font-serif">
          {label}
        </div>
        <div className="space-y-1 font-mono">
          <div className="flex items-center justify-between text-amber-800">
            <span className="flex items-center gap-1.5 font-sans">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Articole:</span>
            </span>
            <span className="font-bold tabular-nums">{articles}</span>
          </div>
          <div className="flex items-center justify-between text-blue-800">
            <span className="flex items-center gap-1.5 font-sans">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Cuvinte:</span>
            </span>
            <span className="font-bold tabular-nums">{words}</span>
          </div>
          <div className="pt-1 border-t border-[#F0ECE4] flex items-center justify-between text-[#191E24] font-medium font-sans">
            <span>Total:</span>
            <span className="font-mono font-bold tabular-nums">{articles + words}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const ProgressChart: React.FC<ProgressChartProps> = ({
  progress,
  className = '',
  compact = false
}) => {
  const [chartType, setChartType] = useState<'grouped' | 'stacked'>('grouped');

  const chartData = getLast7DaysProgress(progress);

  // Compute 7-day stats
  const totalArticles7Days = chartData.reduce((acc, curr) => acc + curr.articole, 0);
  const totalWords7Days = chartData.reduce((acc, curr) => acc + curr.cuvinte, 0);
  const averageDaily = ((totalArticles7Days + totalWords7Days) / 7).toFixed(1);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header with Title and Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#EAE5DC]">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#7C858F]">
            <Calendar className="w-3.5 h-3.5 text-amber-700" />
            <span>Activitate Ultimele 7 Zile</span>
          </div>
          <h4 className="text-base sm:text-lg font-serif font-bold text-[#191E24]">
            Evoluția Învățării (Articole & Vocabular)
          </h4>
        </div>

        {/* Chart View Toggle */}
        <div className="flex items-center bg-[#EFECE6] p-0.5 rounded-lg text-xs self-start sm:self-auto font-medium">
          <button
            type="button"
            onClick={() => setChartType('grouped')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              chartType === 'grouped'
                ? 'bg-white text-[#191E24] shadow-xs font-semibold'
                : 'text-[#626A72] hover:text-[#191E24]'
            }`}
          >
            Alăturate
          </button>
          <button
            type="button"
            onClick={() => setChartType('stacked')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              chartType === 'stacked'
                ? 'bg-white text-[#191E24] shadow-xs font-semibold'
                : 'text-[#626A72] hover:text-[#191E24]'
            }`}
          >
            Suprapuse
          </button>
        </div>
      </div>

      {/* 3-metric quick summary cards */}
      <div className="grid grid-cols-3 gap-2.5 pt-1">
        <div className="bg-[#FAF8F5] rounded-xl p-2.5 border border-[#EAE5DC] text-center space-y-0.5">
          <span className="text-[11px] text-[#7C858F] block truncate">Articole (7z)</span>
          <span className="font-mono text-base font-bold text-amber-800 tabular-nums">
            {totalArticles7Days}
          </span>
        </div>
        <div className="bg-[#FAF8F5] rounded-xl p-2.5 border border-[#EAE5DC] text-center space-y-0.5">
          <span className="text-[11px] text-[#7C858F] block truncate">Cuvinte (7z)</span>
          <span className="font-mono text-base font-bold text-blue-800 tabular-nums">
            {totalWords7Days}
          </span>
        </div>
        <div className="bg-[#FAF8F5] rounded-xl p-2.5 border border-[#EAE5DC] text-center space-y-0.5">
          <span className="text-[11px] text-[#7C858F] block truncate">Medie zilnică</span>
          <span className="font-mono text-base font-bold text-[#191E24] tabular-nums">
            {averageDaily}
          </span>
        </div>
      </div>

      {/* Recharts Chart Canvas */}
      <div className={`w-full ${compact ? 'h-52' : 'h-64'} pt-2`}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            barGap={4}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAE5DC" />
            <XAxis
              dataKey="dayName"
              tickLine={false}
              axisLine={{ stroke: '#DFDAD0' }}
              tick={{ fontSize: 11, fill: '#646C76', fontFamily: 'inherit' }}
            />
            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#8C959F', fontFamily: 'monospace' }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(0, 0, 0, 0.04)' }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: '11px', paddingBottom: '8px' }}
              formatter={(value) => (
                <span className="text-[#525A62] font-medium mr-2">
                  {value === 'articole' ? 'Articole citite' : 'Cuvinte salvate'}
                </span>
              )}
            />
            <Bar
              dataKey="articole"
              name="articole"
              fill="#D97706"
              radius={chartType === 'stacked' ? [0, 0, 0, 0] : [4, 4, 0, 0]}
              stackId={chartType === 'stacked' ? 'a' : undefined}
              maxBarSize={28}
            />
            <Bar
              dataKey="cuvinte"
              name="cuvinte"
              fill="#2563EB"
              radius={[4, 4, 0, 0]}
              stackId={chartType === 'stacked' ? 'a' : undefined}
              maxBarSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footnote on LocalStorage persistence */}
      <div className="flex items-center justify-between text-[11px] text-[#7C858F] pt-1">
        <span className="flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-emerald-600" />
          <span>Grafic sincronizat automat cu activitatea ta zilnică</span>
        </span>
        <span className="font-mono text-[10px]">Stocat local</span>
      </div>
    </div>
  );
};
