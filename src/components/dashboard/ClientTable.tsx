'use client';

import { ClassifiedClient, NonAccrualClient, SortConfig, TabType } from '@/types';

interface ClientTableProps {
  activeTab: TabType;
  classifiedClients: ClassifiedClient[];
  nonAccrualClients: NonAccrualClient[];
  sortConfig: SortConfig;
  onSort: (field: string) => void;
  onComment: (clientId: number) => void;
  onEdit: (client: ClassifiedClient | NonAccrualClient) => void;
  onDelete: (clientId: number) => void;
}

const SortIcon = ({ field, sortConfig }: { field: string; sortConfig: SortConfig }) => {
  const active = sortConfig.field === field;
  return (
    <span className={`inline-flex flex-col ml-1 ${active ? 'text-blue-300' : 'text-slate-400'}`}>
      <svg width="8" height="5" viewBox="0 0 8 5" fill="currentColor">
        <path d="M4 0l4 5H0z" opacity={active && sortConfig.direction === 'asc' ? 1 : 0.4} />
      </svg>
      <svg width="8" height="5" viewBox="0 0 8 5" fill="currentColor" className="mt-0.5">
        <path d="M4 5L0 0h8z" opacity={active && sortConfig.direction === 'desc' ? 1 : 0.4} />
      </svg>
    </span>
  );
};

const CommentIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const EditIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const TrashIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

function fmt(val: number): string {
  return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const thBase = 'px-3 py-2 text-left text-[11px] font-semibold text-white whitespace-nowrap cursor-pointer select-none hover:bg-blue-800 transition-colors';
const groupTh = 'px-3 py-1.5 text-center text-[11px] font-bold text-white border-b border-blue-600 uppercase tracking-wide';
const tdBase = 'px-3 py-2 text-xs text-slate-700 whitespace-nowrap border-b border-slate-100';
const tdNum = 'px-3 py-2 text-xs text-slate-700 whitespace-nowrap border-b border-slate-100 num text-right';

export default function ClientTable({
  activeTab,
  classifiedClients,
  nonAccrualClients,
  sortConfig,
  onSort,
  onComment,
  onEdit,
  onDelete,
}: ClientTableProps) {
  const isNonAccrual = activeTab === 'non-accrual';

  if (!isNonAccrual) {
    // Classified / Principal Recovery / Suspects — same column layout
    return (
      <div className="table-container">
        <table className="w-full border-collapse sticky-header bg-white">
          <thead>
            <tr className="bg-[#1e3a8a]">
              <th colSpan={3} className={`${groupTh} border-r border-blue-700`}>Client Details</th>
              <th colSpan={1} className={`${groupTh} border-r border-blue-700`}>Already Realized</th>
              <th colSpan={2} className={`${groupTh} border-r border-blue-700`}>Projections</th>
              <th colSpan={4} className={groupTh}>General</th>
            </tr>
            <tr className="bg-[#1e3a8a]">
              <th className={`${thBase} border-r border-blue-700`} onClick={() => onSort('obligorName')}>
                Obligor Name <SortIcon field="obligorName" sortConfig={sortConfig} />
              </th>
              <th className={`${thBase} border-r border-blue-700`} onClick={() => onSort('responsibilityCentre')}>
                Responsibility Centre <SortIcon field="responsibilityCentre" sortConfig={sortConfig} />
              </th>
              <th className={`${thBase} border-r border-blue-700 text-center`} onClick={() => onSort('pdGrade')}>
                PD Grade <SortIcon field="pdGrade" sortConfig={sortConfig} />
              </th>
              <th className={`${thBase} border-r border-blue-700 text-right`} onClick={() => onSort('currentBalance')}>
                Current Balance <SortIcon field="currentBalance" sortConfig={sortConfig} />
              </th>
              <th className={`${thBase} border-r border-blue-600 text-right`} onClick={() => onSort('projectedBalanceCurrQtr')}>
                Projected Balance : Current Quarter <SortIcon field="projectedBalanceCurrQtr" sortConfig={sortConfig} />
              </th>
              <th className={`${thBase} border-r border-blue-700 text-right`} onClick={() => onSort('projectedBalanceNextQtr')}>
                Projected Balance : Current Quarter+1 <SortIcon field="projectedBalanceNextQtr" sortConfig={sortConfig} />
              </th>
              <th className={`${thBase} border-r border-blue-600`}>Credit Resolution Associate</th>
              <th className={`${thBase} border-r border-blue-600 text-center`}>Comments</th>
              <th className={`${thBase} border-r border-blue-600 text-center`}>Edit</th>
              <th className={`${thBase} text-center`}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {classifiedClients.map((client, idx) => (
              <tr
                key={client.id}
                className={`table-row-animate hover:brightness-95 transition-all ${
                  client.flagged ? 'bg-[#fef9c3]' : idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                }`}
                style={{ animationDelay: `${idx * 20}ms` }}
              >
                <td className={`${tdBase} font-medium text-blue-800`}>{client.obligorName}</td>
                <td className={tdBase}>{client.responsibilityCentre}</td>
                <td className={`${tdBase} text-center font-medium`}>{client.pdGrade}</td>
                <td className={tdNum}>${fmt(client.currentBalance)}</td>
                <td className={tdNum}>${fmt(client.projectedBalanceCurrQtr)}</td>
                <td className={tdNum}>${fmt(client.projectedBalanceNextQtr)}</td>
                <td className={tdBase}>{client.creditResolutionAssociate}</td>
                <td className={`${tdBase} text-center`}>
                  <button
                    onClick={() => onComment(client.id)}
                    className="p-1.5 rounded bg-slate-100 text-slate-500 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                    title="View Comments"
                  >
                    <CommentIcon />
                  </button>
                </td>
                <td className={`${tdBase} text-center`}>
                  <button
                    onClick={() => onEdit(client)}
                    className="p-1.5 rounded bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-800 transition-colors"
                    title="Edit Client"
                  >
                    <EditIcon />
                  </button>
                </td>
                <td className={`${tdBase} text-center`}>
                  <button
                    onClick={() => onDelete(client.id)}
                    className="p-1.5 rounded bg-red-100 text-red-500 hover:bg-red-200 hover:text-red-700 transition-colors"
                    title="Delete Client"
                  >
                    <TrashIcon />
                  </button>
                </td>
              </tr>
            ))}
            {classifiedClients.length === 0 && (
              <tr>
                <td colSpan={10} className="px-4 py-10 text-center text-slate-400 text-sm">
                  No records found. Try adjusting your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }

  // Non-Accrual table
  return (
    <div className="table-container">
      <table className="w-full border-collapse sticky-header bg-white">
        <thead>
          <tr className="bg-[#1e3a8a]">
            <th colSpan={3} className={`${groupTh} border-r border-blue-700`}>Client Details</th>
            <th colSpan={5} className={`${groupTh} border-r border-blue-700`}>Already Realized Section</th>
            <th colSpan={5} className={groupTh}>Projections - Current Quarter</th>
          </tr>
          <tr className="bg-[#1e3a8a]">
            <th className={`${thBase} border-r border-blue-700`} onClick={() => onSort('obligorName')}>
              Obligor Name <SortIcon field="obligorName" sortConfig={sortConfig} />
            </th>
            <th className={`${thBase} border-r border-blue-700`} onClick={() => onSort('responsibilityCentre')}>
              Responsibility Centre <SortIcon field="responsibilityCentre" sortConfig={sortConfig} />
            </th>
            <th className={`${thBase} border-r border-blue-700 text-center`} onClick={() => onSort('pdGrade')}>
              PD Grade <SortIcon field="pdGrade" sortConfig={sortConfig} />
            </th>
            <th className={`${thBase} border-r border-blue-600 text-right`} onClick={() => onSort('prevQtrEndBalance')}>
              Previous quarter end balance <SortIcon field="prevQtrEndBalance" sortConfig={sortConfig} />
            </th>
            <th className={`${thBase} border-r border-blue-600 text-right`} onClick={() => onSort('repayments')}>
              Repayments <SortIcon field="repayments" sortConfig={sortConfig} />
            </th>
            <th className={`${thBase} border-r border-blue-600 text-right`} onClick={() => onSort('grossChargeOffs')}>
              Gross Charge-offs <SortIcon field="grossChargeOffs" sortConfig={sortConfig} />
            </th>
            <th className={`${thBase} border-r border-blue-600 text-right`} onClick={() => onSort('currentBalance')}>
              Current Balance <SortIcon field="currentBalance" sortConfig={sortConfig} />
            </th>
            <th className={`${thBase} border-r border-blue-700 text-right`} onClick={() => onSort('adjustedBalance')}>
              Adjusted Balance <SortIcon field="adjustedBalance" sortConfig={sortConfig} />
            </th>
            <th className={`${thBase} border-r border-blue-600 text-center`} onClick={() => onSort('projPdGrade')}>
              PD Grade <SortIcon field="projPdGrade" sortConfig={sortConfig} />
            </th>
            <th className={`${thBase} border-r border-blue-600 text-right`} onClick={() => onSort('projRepayments')}>
              Repayments <SortIcon field="projRepayments" sortConfig={sortConfig} />
            </th>
            <th className={`${thBase} border-r border-blue-600 text-right`} onClick={() => onSort('projGrossChargeOffs')}>
              Gross Charge-offs <SortIcon field="projGrossChargeOffs" sortConfig={sortConfig} />
            </th>
            <th className={`${thBase} border-r border-blue-600 text-right`} onClick={() => onSort('projQtrEndBalance')}>
              Quarter-end Balance <SortIcon field="projQtrEndBalance" sortConfig={sortConfig} />
            </th>
            <th className={`${thBase} text-center`} onClick={() => onSort('projNextPdGrade')}>
              PD Grade <SortIcon field="projNextPdGrade" sortConfig={sortConfig} />
            </th>
          </tr>
        </thead>
        <tbody>
          {nonAccrualClients.map((client, idx) => (
            <tr
              key={client.id}
              className={`table-row-animate hover:brightness-95 transition-all ${
                client.flagged ? 'bg-[#fef9c3]' : idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
              }`}
              style={{ animationDelay: `${idx * 20}ms` }}
            >
              <td className={`${tdBase} font-medium text-blue-800`}>{client.obligorName}</td>
              <td className={tdBase}>{client.responsibilityCentre}</td>
              <td className={`${tdBase} text-center font-medium`}>{client.pdGrade}</td>
              <td className={tdNum}>${fmt(client.prevQtrEndBalance)}</td>
              <td className={tdNum}>${fmt(client.repayments)}</td>
              <td className={`${tdNum} ${client.grossChargeOffs < 0 ? 'text-red-600' : ''}`}>{client.grossChargeOffs.toFixed(1)}</td>
              <td className={tdNum}>${fmt(client.currentBalance)}</td>
              <td className={tdNum}>${fmt(client.adjustedBalance)}</td>
              <td className={`${tdBase} text-center font-medium`}>{client.projPdGrade}</td>
              <td className={tdNum}>${fmt(client.projRepayments)}</td>
              <td className={tdNum}>{client.projGrossChargeOffs.toFixed(1)}</td>
              <td className={tdNum}>${fmt(client.projQtrEndBalance)}</td>
              <td className={`${tdBase} text-center font-medium`}>{client.projNextPdGrade}</td>
            </tr>
          ))}
          {nonAccrualClients.length === 0 && (
            <tr>
              <td colSpan={13} className="px-4 py-10 text-center text-slate-400 text-sm">
                No records found. Try adjusting your filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
