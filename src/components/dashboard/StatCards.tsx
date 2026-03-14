import { TabType } from '@/types';

interface StatCardsProps {
  activeTab: TabType;
}

function formatAmount(value: number): string {
  return value.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

// Icons as SVG strings
const BarChartIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="9" width="4" height="12" rx="1" />
    <rect x="10" y="5" width="4" height="16" rx="1" />
    <rect x="17" y="1" width="4" height="20" rx="1" />
  </svg>
);

const TrendIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const WalletIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
  </svg>
);

const DollarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const GridIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="12" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

const DocumentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

export default function StatCards({ activeTab }: StatCardsProps) {
  if (activeTab === 'classified' || activeTab === 'principal-recovery' || activeTab === 'suspects') {
    return (
      <div className="flex gap-4 px-4 py-3 bg-[#0f1f3d]">
        {/* Card 1 - Current Balance */}
        <div className="flex-1 stat-card-blue rounded-lg p-4 text-white flex items-center gap-3 min-h-[80px]">
          <div className="opacity-80">
            <BarChartIcon />
          </div>
          <div>
            <div className="num text-2xl font-bold leading-tight">$88,176.8</div>
            <div className="text-xs opacity-80 mt-0.5">Current balance as of 21/01/2026</div>
          </div>
        </div>
        {/* Card 2 - Projected Balance */}
        <div className="flex-1 stat-card-blue rounded-lg p-4 text-white flex items-center gap-3 min-h-[80px]">
          <div className="opacity-80">
            <TrendIcon />
          </div>
          <div>
            <div className="num text-2xl font-bold leading-tight">$92,217.8</div>
            <div className="text-xs opacity-80 mt-0.5">Projected balance as of 21/01/2026</div>
          </div>
        </div>
      </div>
    );
  }

  // Non-Accrual: 7 stat cards
  const cards = [
    {
      className: 'stat-card-blue',
      icon: <WalletIcon />,
      value: formatAmount(88176.8),
      label: 'Previous quarter end balance as of 12/31/2025',
    },
    {
      className: 'stat-card-navy',
      icon: <DollarIcon />,
      value: formatAmount(92217.8),
      label: 'Current balance as of 21/01/2026',
    },
    {
      className: 'stat-card-blue',
      icon: <TrendIcon />,
      value: formatAmount(98217.8),
      label: 'Projected balance as of 21/01/2026',
    },
    {
      className: 'stat-card-yellow',
      icon: <GridIcon />,
      value: formatAmount(177651.6),
      label: 'Previous quarter and Total Reserves as of 12/31/2025',
    },
    {
      className: 'stat-card-gold',
      icon: <BriefcaseIcon />,
      value: formatAmount(79651.6),
      label: 'Projected Total Reserves as of 21/01/2026',
    },
    {
      className: 'stat-card-green',
      icon: <ArrowUpIcon />,
      value: '$123.45',
      label: 'Total Gross Charge-Offs as of 21/01/2026',
    },
    {
      className: 'stat-card-green',
      icon: <DocumentIcon />,
      value: '$123.45',
      label: 'Total Net Charge-Offs as of 21/01/2026',
    },
  ];

  return (
    <div className="flex gap-2 px-4 py-3 bg-[#0f1f3d] overflow-x-auto">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`${card.className} rounded-lg p-3 text-white flex items-start gap-2 min-w-[145px] flex-shrink-0`}
        >
          <div className="opacity-80 mt-0.5 flex-shrink-0">{card.icon}</div>
          <div>
            <div className="num text-base font-bold leading-tight">${card.value.replace('$', '')}</div>
            <div className="text-[10px] opacity-80 mt-0.5 leading-tight">{card.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
