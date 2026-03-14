'use client';

import { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
} from 'recharts';
import { classifiedClients } from '@/lib/mockData';

// ── Colours per responsibility centre ─────────────────────────────────────

const COLOURS: Record<string, string> = {
  Retail: '#2563eb',
  'Mortgage Division': '#16a34a',
  'Sales Finance': '#d97706',
  'ID - Mid Stage': '#7c3aed',
};

const LIGHT_COLOURS: Record<string, string> = {
  Retail: '#dbeafe',
  'Mortgage Division': '#dcfce7',
  'Sales Finance': '#fef3c7',
  'ID - Mid Stage': '#ede9fe',
};

// ── Helpers ────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtShort(n: number) {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

// ── Custom tooltip ─────────────────────────────────────────────────────────

interface TooltipPayload {
  name: string;
  value: number;
  payload: RiskUnitData;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

const CustomBarTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-xl p-3 min-w-[180px]">
      <div
        className="text-xs font-bold mb-2 pb-1 border-b"
        style={{ color: COLOURS[label ?? ''] ?? '#1e293b', borderColor: COLOURS[label ?? ''] ?? '#e2e8f0' }}
      >
        {label}
      </div>
      <div className="space-y-1">
        <div className="flex justify-between gap-4 text-xs">
          <span className="text-slate-500">Clients</span>
          <span className="font-semibold text-slate-800">{d.count}</span>
        </div>
        <div className="flex justify-between gap-4 text-xs">
          <span className="text-slate-500">Outstanding</span>
          <span className="font-semibold text-slate-800">${fmt(d.outstanding)}</span>
        </div>
        <div className="flex justify-between gap-4 text-xs">
          <span className="text-slate-500">Share</span>
          <span className="font-semibold" style={{ color: COLOURS[label ?? ''] }}>{d.percentage}%</span>
        </div>
        <div className="flex justify-between gap-4 text-xs">
          <span className="text-slate-500">Avg PD Grade</span>
          <span className="font-semibold text-slate-800">{d.avgPdGrade.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

// ── Custom pie label ───────────────────────────────────────────────────────

const RADIAN = Math.PI / 180;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderCustomPieLabel = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
  if (!percent || percent * 100 < 8) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight="700">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// ── Types ──────────────────────────────────────────────────────────────────

interface RiskUnitData {
  name: string;
  count: number;
  outstanding: number;
  percentage: number;
  avgPdGrade: number;
  projectedOutstanding: number;
}

// ── Stat card ──────────────────────────────────────────────────────────────

function RiskStatCard({ data, totalClients }: { data: RiskUnitData; totalClients: number }) {
  const color = COLOURS[data.name] ?? '#64748b';
  const lightColor = LIGHT_COLOURS[data.name] ?? '#f1f5f9';
  const clientPct = ((data.count / totalClients) * 100).toFixed(0);

  return (
    <div
      className="rounded-xl p-4 border flex flex-col gap-3 transition-transform hover:-translate-y-0.5 hover:shadow-md"
      style={{ borderColor: color, backgroundColor: lightColor }}
    >
      {/* Top: name + colour dot */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
          <span className="text-[11px] font-semibold text-slate-700">{data.name}</span>
        </div>
        <span
          className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white"
          style={{ backgroundColor: color }}
        >
          {data.percentage.toFixed(1)}%
        </span>
      </div>

      {/* Main number */}
      <div>
        <div className="num text-lg font-bold leading-tight" style={{ color }}>
          ${fmt(data.outstanding)}
        </div>
        <div className="text-[10px] text-slate-500 mt-0.5">Total Outstanding</div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-white/60 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${data.percentage}%`, backgroundColor: color }}
        />
      </div>

      {/* Bottom stats */}
      <div className="flex justify-between items-center">
        <div className="text-center">
          <div className="text-xs font-bold text-slate-800">{data.count}</div>
          <div className="text-[9px] text-slate-500">Clients ({clientPct}%)</div>
        </div>
        <div className="w-px h-6 bg-slate-300" />
        <div className="text-center">
          <div className="text-xs font-bold text-slate-800">{data.avgPdGrade.toFixed(1)}</div>
          <div className="text-[9px] text-slate-500">Avg PD Grade</div>
        </div>
        <div className="w-px h-6 bg-slate-300" />
        <div className="text-center">
          <div className="num text-xs font-bold text-slate-800">{fmtShort(data.projectedOutstanding)}</div>
          <div className="text-[9px] text-slate-500">Proj. Q1</div>
        </div>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

interface RiskUnitOverviewProps {
  clients?: typeof classifiedClients;
}

export default function RiskUnitOverview({ clients = classifiedClients }: RiskUnitOverviewProps) {
  const [open, setOpen] = useState(false);

  const { data, totalOutstanding, totalClients } = useMemo(() => {
    const map: Record<string, { count: number; outstanding: number; pdGradeSum: number; projected: number }> = {};

    clients.forEach((c) => {
      const rc = c.responsibilityCentre;
      if (!map[rc]) map[rc] = { count: 0, outstanding: 0, pdGradeSum: 0, projected: 0 };
      map[rc].count++;
      map[rc].outstanding += c.currentBalance;
      map[rc].pdGradeSum += c.pdGrade;
      map[rc].projected += c.projectedBalanceCurrQtr;
    });

    const totalOut = Object.values(map).reduce((s, v) => s + v.outstanding, 0);
    const totalC = clients.length;

    const data: RiskUnitData[] = Object.entries(map)
      .map(([name, stats]) => ({
        name,
        count: stats.count,
        outstanding: stats.outstanding,
        percentage: totalOut > 0 ? (stats.outstanding / totalOut) * 100 : 0,
        avgPdGrade: stats.count > 0 ? stats.pdGradeSum / stats.count : 0,
        projectedOutstanding: stats.projected,
      }))
      .sort((a, b) => b.outstanding - a.outstanding);

    return { data, totalOutstanding: totalOut, totalClients: totalC };
  }, [clients]);

  return (
    <div className="mx-4 mb-0 mt-0 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      {/* ── Collapsible header ─────────────────────────────────────────── */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-5 py-3 cursor-pointer group transition-colors"
        style={{ background: open ? '#0f1f3d' : '#1e3a8a' }}
      >
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
          </div>
          <div className="text-left">
            <div className="text-sm font-semibold text-white leading-tight">Risk Unit Overview</div>
            <div className="text-[11px] text-white/60 leading-tight">
              {data.length} responsibility centres · ${fmt(totalOutstanding)} total outstanding · {totalClients} clients
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Pill badges */}
          <div className="hidden md:flex items-center gap-1.5">
            {data.map((d) => (
              <span
                key={d.name}
                className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                style={{ backgroundColor: COLOURS[d.name] ?? '#64748b', color: 'white' }}
              >
                {d.name.split(' ')[0]}: {d.percentage.toFixed(0)}%
              </span>
            ))}
          </div>
          {/* Chevron */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.25s ease',
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {/* ── Expanded content ───────────────────────────────────────────── */}
      {open && (
        <div className="p-5 bg-slate-50/50 space-y-5">
          {/* Stat cards row */}
          <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${data.length}, 1fr)` }}>
            {data.map((d) => (
              <RiskStatCard key={d.name} data={d} totalClients={totalClients} />
            ))}
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-3 gap-4">
            {/* Bar chart — outstanding per centre */}
            <div className="col-span-2 bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-xs font-semibold text-slate-700">Outstanding vs Projected Balance</div>
                  <div className="text-[11px] text-slate-400">Current balance & Q1 projection by responsibility centre</div>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-2.5 rounded-sm inline-block" style={{ background: '#2563eb' }} />
                    Current
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-2.5 rounded-sm inline-block" style={{ background: '#93c5fd' }} />
                    Projected Q1
                  </span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={data} margin={{ top: 4, right: 16, left: 8, bottom: 4 }} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => fmtShort(v)}
                    width={48}
                  />
                  <Tooltip content={<CustomBarTooltip />} cursor={{ fill: '#f8fafc' }} />
                  <Bar dataKey="outstanding" name="Current Balance" radius={[4, 4, 0, 0]} maxBarSize={52}>
                    {data.map((entry) => (
                      <Cell key={entry.name} fill={COLOURS[entry.name] ?? '#64748b'} />
                    ))}
                  </Bar>
                  <Bar dataKey="projectedOutstanding" name="Projected Q1" radius={[4, 4, 0, 0]} maxBarSize={52}>
                    {data.map((entry) => (
                      <Cell key={entry.name} fill={COLOURS[entry.name] ? `${COLOURS[entry.name]}55` : '#94a3b8'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Donut chart — outstanding share */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col">
              <div className="mb-2">
                <div className="text-xs font-semibold text-slate-700">Outstanding Distribution</div>
                <div className="text-[11px] text-slate-400">Share by responsibility centre</div>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <ResponsiveContainer width="100%" height={190}>
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="45%"
                      innerRadius={52}
                      outerRadius={80}
                      dataKey="outstanding"
                      nameKey="name"
                      labelLine={false}
                      label={renderCustomPieLabel}
                      paddingAngle={2}
                    >
                      {data.map((entry) => (
                        <Cell
                          key={entry.name}
                          fill={COLOURS[entry.name] ?? '#64748b'}
                          stroke="white"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Legend
                      formatter={(value) => (
                        <span style={{ fontSize: 10, color: '#64748b' }}>{value}</span>
                      )}
                      iconSize={8}
                      iconType="circle"
                    />
                    <Tooltip
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      formatter={(value: any) => [`$${fmt(Number(value))}`, 'Outstanding']}
                      contentStyle={{
                        fontSize: 11,
                        border: '1px solid #e2e8f0',
                        borderRadius: 8,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Centre total */}
              <div className="mt-1 pt-2 border-t border-slate-100 text-center">
                <div className="num text-sm font-bold text-slate-800">${fmt(totalOutstanding)}</div>
                <div className="text-[10px] text-slate-400">Total outstanding across all centres</div>
              </div>
            </div>
          </div>

          {/* Summary table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr style={{ background: '#1e3a8a' }}>
                  <th className="px-4 py-2.5 text-left text-white font-semibold text-[11px]">Responsibility Centre</th>
                  <th className="px-4 py-2.5 text-center text-white font-semibold text-[11px]">Client Count</th>
                  <th className="px-4 py-2.5 text-right text-white font-semibold text-[11px]">Total Outstanding</th>
                  <th className="px-4 py-2.5 text-right text-white font-semibold text-[11px]">% of Portfolio</th>
                  <th className="px-4 py-2.5 text-right text-white font-semibold text-[11px]">Projected Q1</th>
                  <th className="px-4 py-2.5 text-center text-white font-semibold text-[11px]">Avg PD Grade</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d, i) => (
                  <tr key={d.name} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: COLOURS[d.name] ?? '#64748b' }}
                        />
                        <span className="font-medium text-slate-700">{d.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-center text-slate-700 font-medium">{d.count}</td>
                    <td className="px-4 py-2.5 text-right num text-slate-800 font-medium">${fmt(d.outstanding)}</td>
                    <td className="px-4 py-2.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="flex-1 max-w-[80px] h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${d.percentage}%`, backgroundColor: COLOURS[d.name] ?? '#64748b' }}
                          />
                        </div>
                        <span
                          className="num font-bold text-[11px] w-10 text-right"
                          style={{ color: COLOURS[d.name] ?? '#64748b' }}
                        >
                          {d.percentage.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-right num text-slate-600">{fmtShort(d.projectedOutstanding)}</td>
                    <td className="px-4 py-2.5 text-center">
                      <span
                        className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
                        style={{ backgroundColor: COLOURS[d.name] ?? '#64748b' }}
                      >
                        {d.avgPdGrade.toFixed(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ background: '#f8fafc' }} className="border-t border-slate-200">
                  <td className="px-4 py-2.5 font-bold text-slate-800 text-[11px]">TOTAL</td>
                  <td className="px-4 py-2.5 text-center font-bold text-slate-800">{totalClients}</td>
                  <td className="px-4 py-2.5 text-right num font-bold text-slate-800">${fmt(totalOutstanding)}</td>
                  <td className="px-4 py-2.5 text-right num font-bold text-slate-800">100.0%</td>
                  <td className="px-4 py-2.5 text-right num font-bold text-slate-600">
                    {fmtShort(data.reduce((s, d) => s + d.projectedOutstanding, 0))}
                  </td>
                  <td className="px-4 py-2.5 text-center">—</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
