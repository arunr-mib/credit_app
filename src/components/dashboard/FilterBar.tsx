'use client';

import { FilterState, TabType } from '@/types';
import { leaders, associates, teamLeads, responsibilityCentres } from '@/lib/mockData';

interface FilterBarProps {
  activeTab: TabType;
  filters: FilterState;
  totalRecords: number;
  onFilterChange: (updates: Partial<FilterState>) => void;
  onClear: () => void;
  onAddClient: () => void;
}

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ChevronIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function FilterBar({
  activeTab,
  filters,
  totalRecords,
  onFilterChange,
  onClear,
  onAddClient,
}: FilterBarProps) {
  const showManualMovement = activeTab === 'classified';

  return (
    <div className="bg-white border-b border-slate-200">
      {/* Top row: date, bank type, record count */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-xs text-slate-700 font-medium hover:text-blue-700">
            <span className="text-slate-500">■</span>
            <span>Load date as of</span>
            <span className="font-semibold text-slate-800">{filters.loadDate}</span>
            <ChevronIcon />
          </button>
          <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.commercialBank}
              onChange={(e) => onFilterChange({ commercialBank: e.target.checked })}
              className="w-3.5 h-3.5 accent-blue-600"
            />
            Commercial Bank clients
          </label>
          <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.generalBank}
              onChange={(e) => onFilterChange({ generalBank: e.target.checked })}
              className="w-3.5 h-3.5 accent-blue-600"
            />
            General Bank clients
          </label>
        </div>
        <div className="text-xs text-slate-600 font-medium">
          Total Records Count : <span className="font-bold text-slate-800">{totalRecords}</span>
        </div>
      </div>

      {/* Bottom row: search + action buttons + dropdowns */}
      <div className="flex items-center gap-2 px-4 py-2 flex-wrap">
        {/* Search */}
        <div className="relative">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Global Search - Search for Any value"
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded w-52 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Mode buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onFilterChange({ activeMode: 'auto' })}
            className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors ${
              filters.activeMode === 'auto'
                ? 'bg-slate-700 text-white border-slate-700'
                : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
            }`}
          >
            Auto Population
          </button>
          <button
            onClick={() => onFilterChange({ activeMode: 'manual-addition' })}
            className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors ${
              filters.activeMode === 'manual-addition'
                ? 'bg-amber-400 text-white border-amber-400'
                : 'bg-white text-slate-600 border-slate-300 hover:bg-amber-50'
            }`}
          >
            Manual Addition
          </button>
          {showManualMovement && (
            <button
              onClick={() => onFilterChange({ activeMode: 'manual-movement' })}
              className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors ${
                filters.activeMode === 'manual-movement'
                  ? 'bg-slate-700 text-white border-slate-700'
                  : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
              }`}
            >
              Manual Movement
            </button>
          )}
        </div>

        {/* Dropdowns */}
        <select
          value={filters.leader}
          onChange={(e) => onFilterChange({ leader: e.target.value })}
          className="px-2 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:border-blue-500 bg-white text-slate-600 min-w-[120px]"
        >
          <option value="">Select Leader</option>
          {leaders.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>

        <select
          value={filters.associate}
          onChange={(e) => onFilterChange({ associate: e.target.value })}
          className="px-2 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:border-blue-500 bg-white text-slate-600 min-w-[120px]"
        >
          <option value="">Select Associate</option>
          {associates.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>

        <select
          value={filters.teamLead}
          onChange={(e) => onFilterChange({ teamLead: e.target.value })}
          className="px-2 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:border-blue-500 bg-white text-slate-600 min-w-[120px]"
        >
          <option value="">Select TeamLead</option>
          {teamLeads.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <select
          value={filters.responsibility}
          onChange={(e) => onFilterChange({ responsibility: e.target.value })}
          className="px-2 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:border-blue-500 bg-white text-slate-600 min-w-[140px]"
        >
          <option value="">Select Responsibility...</option>
          {responsibilityCentres.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        {/* Clear */}
        <button
          onClick={onClear}
          className="px-3 py-1.5 text-xs font-medium bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Clear
        </button>

        {/* Add Client */}
        <button
          onClick={onAddClient}
          className="px-3 py-1.5 text-xs font-medium bg-green-700 text-white rounded hover:bg-green-800 transition-colors"
        >
          Add Client
        </button>
      </div>
    </div>
  );
}
