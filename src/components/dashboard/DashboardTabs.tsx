'use client';

import { TabType } from '@/types';

interface DashboardTabsProps {
  activeTab: TabType;
  onChange: (tab: TabType) => void;
}

const tabs: { id: TabType; label: string }[] = [
  { id: 'classified', label: 'Classified' },
  { id: 'non-accrual', label: 'Non-Accrual' },
  { id: 'principal-recovery', label: 'Principal Recovery & Active Charge-Offs' },
  { id: 'suspects', label: 'Suspects' },
];

export default function DashboardTabs({ activeTab, onChange }: DashboardTabsProps) {
  return (
    <div className="bg-white border-b border-slate-200 px-4">
      <div className="flex items-center gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`px-4 py-3 text-xs font-medium transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id ? 'tab-active' : 'tab-inactive'
            }`}
          >
            <span
              className={`inline-block w-2.5 h-2.5 rounded-sm ${
                activeTab === tab.id ? 'bg-blue-600' : 'bg-slate-400'
              }`}
            />
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
