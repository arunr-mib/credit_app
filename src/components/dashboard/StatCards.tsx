import { TabType } from '@/types';

interface StatCardsProps {
  activeTab: TabType;
}

function formatAmount(value: number): string {
  return value.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

// Trend badge component
function TrendBadge({ pct, up }: { pct: string; up: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-semibold leading-none"
      style={{
        background: up ? 'rgba(134,239,172,0.25)' : 'rgba(252,165,165,0.25)',
        color: up ? '#86efac' : '#fca5a5',
      }}
    >
      {up ? '↗' : '↙'} {pct}
    </span>
  );
}

// Icons
const BarChartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="9" width="4" height="12" rx="1" />
    <rect x="10" y="5" width="4" height="16" rx="1" />
    <rect x="17" y="1" width="4" height="20" rx="1" />
  </svg>
);
const TrendIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);
const WalletIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
  </svg>
);
const DollarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);
const GridIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);
const BriefcaseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
);
const ArrowUpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);
const DocumentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

// Classified / Principal Recovery / Suspects — 2 card layout
function ClassifiedStatCards() {
  return (
    <div className="px-4 py-3 bg-white border-b border-gray-200">
      <div className="flex gap-4">
        {/* Current Balance */}
        <div
          className="flex-1 rounded-xl p-4 text-white flex flex-col justify-between min-h-[90px] relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%)', boxShadow: '0 2px 8px rgba(30,64,175,0.25)' }}
        >
          <div className="flex items-start justify-between">
            <div className="opacity-80"><BarChartIcon /></div>
            <TrendBadge pct="4.7%" up={true} />
          </div>
          <div>
            <div className="num text-xl font-bold leading-tight">$88,176.8</div>
            <div
              className="text-[10px] mt-1 pt-1 leading-tight"
              style={{ borderTop: '1px solid rgba(255,255,255,0.2)', opacity: 0.75 }}
            >
              Current balance as of 21/01/2026
            </div>
          </div>
        </div>

        {/* Projected Balance */}
        <div
          className="flex-1 rounded-xl p-4 text-white flex flex-col justify-between min-h-[90px] relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%)', boxShadow: '0 2px 8px rgba(30,64,175,0.25)' }}
        >
          <div className="flex items-start justify-between">
            <div className="opacity-80"><TrendIcon /></div>
            <TrendBadge pct="4.7%" up={true} />
          </div>
          <div>
            <div className="num text-xl font-bold leading-tight">$92,217.8</div>
            <div
              className="text-[10px] mt-1 pt-1 leading-tight"
              style={{ borderTop: '1px solid rgba(255,255,255,0.2)', opacity: 0.75 }}
            >
              Projected balance as of 21/01/2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Non-Accrual — 7 card layout
interface NonAccrualCard {
  bg: string;
  shadow: string;
  icon: React.ReactNode;
  value: string;
  label: string;
  date: string;
  trendPct: string;
  trendUp: boolean;
}

function NonAccrualStatCards() {
  const cards: NonAccrualCard[] = [
    {
      bg: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)',
      shadow: 'rgba(30,64,175,0.28)',
      icon: <WalletIcon />,
      value: `$${formatAmount(88176.8)}`,
      label: 'Previous quarter end balance',
      date: 'as of 12/31/2025',
      trendPct: '—',
      trendUp: true,
    },
    {
      bg: 'linear-gradient(135deg, #0f1f3d 0%, #1a2f5a 100%)',
      shadow: 'rgba(15,31,61,0.35)',
      icon: <DollarIcon />,
      value: `$${formatAmount(92217.8)}`,
      label: 'Current balance',
      date: 'as of 21/01/2026',
      trendPct: '4.6%',
      trendUp: true,
    },
    {
      bg: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)',
      shadow: 'rgba(29,78,216,0.28)',
      icon: <TrendIcon />,
      value: `$${formatAmount(98217.8)}`,
      label: 'Projected balance',
      date: 'as of 21/01/2026',
      trendPct: '6.5%',
      trendUp: true,
    },
    {
      bg: 'linear-gradient(135deg, #b45309 0%, #d97706 100%)',
      shadow: 'rgba(180,83,9,0.28)',
      icon: <GridIcon />,
      value: `$${formatAmount(177651.6)}`,
      label: 'Previous qtr + Total Reserves',
      date: 'as of 12/31/2025',
      trendPct: '—',
      trendUp: true,
    },
    {
      bg: 'linear-gradient(135deg, #92400e 0%, #b45309 100%)',
      shadow: 'rgba(146,64,14,0.3)',
      icon: <BriefcaseIcon />,
      value: `$${formatAmount(79651.6)}`,
      label: 'Projected Total Reserves',
      date: 'as of 21/01/2026',
      trendPct: '1.2%',
      trendUp: false,
    },
    {
      bg: 'linear-gradient(135deg, #15803d 0%, #16a34a 100%)',
      shadow: 'rgba(21,128,61,0.28)',
      icon: <ArrowUpIcon />,
      value: '$123.45',
      label: 'Total Gross Charge-Offs',
      date: 'as of 21/01/2026',
      trendPct: '0.3%',
      trendUp: true,
    },
    {
      bg: 'linear-gradient(135deg, #166534 0%, #15803d 100%)',
      shadow: 'rgba(22,101,52,0.3)',
      icon: <DocumentIcon />,
      value: '$123.45',
      label: 'Total Net Charge-Offs',
      date: 'as of 21/01/2026',
      trendPct: '0.3%',
      trendUp: true,
    },
  ];

  return (
    <div className="px-4 py-3 bg-white border-b border-gray-200">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {cards.map((card, i) => (
          <div
            key={i}
            className="rounded-xl p-3 text-white flex flex-col justify-between flex-shrink-0"
            style={{
              background: card.bg,
              boxShadow: `0 2px 8px ${card.shadow}`,
              minWidth: '148px',
              minHeight: '100px',
            }}
          >
            {/* Top row: icon + trend badge */}
            <div className="flex items-start justify-between mb-1">
              <div className="opacity-80">{card.icon}</div>
              {card.trendPct !== '—' && (
                <TrendBadge pct={card.trendPct} up={card.trendUp} />
              )}
            </div>
            {/* Value */}
            <div className="num text-[15px] font-bold leading-tight">{card.value}</div>
            {/* Label + date */}
            <div
              className="mt-1.5 pt-1.5"
              style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}
            >
              <div className="text-[9px] opacity-85 leading-tight">{card.label}</div>
              <div className="text-[9px] opacity-65 leading-tight mt-0.5 italic">{card.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StatCards({ activeTab }: StatCardsProps) {
  if (activeTab === 'non-accrual') {
    return <NonAccrualStatCards />;
  }
  return <ClassifiedStatCards />;
}
