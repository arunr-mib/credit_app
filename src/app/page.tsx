'use client';

import { useState, useMemo } from 'react';
import {
  TabType,
  ClassifiedClient,
  NonAccrualClient,
  FilterState,
  SortConfig,
  ClientFormData,
  Comment,
} from '@/types';
import {
  classifiedClients as initialClassified,
  nonAccrualClients as initialNonAccrual,
  mockCommentsByClientId,
} from '@/lib/mockData';
import DashboardTabs from '@/components/dashboard/DashboardTabs';
import StatCards from '@/components/dashboard/StatCards';
import RiskUnitOverview from '@/components/dashboard/RiskUnitOverview';
import FilterBar from '@/components/dashboard/FilterBar';
import ClientTable from '@/components/dashboard/ClientTable';
import Pagination from '@/components/dashboard/Pagination';
import AddEditClientModal from '@/components/modals/AddEditClientModal';
import CommentsModal from '@/components/modals/CommentsModal';

// ── Navbar ──────────────────────────────────────────────────────────────────

const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1.5">
    <path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.25C17.25 23.15 21 18.25 21 13V7z" />
  </svg>
);

const ChevronDown = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

function Navbar() {
  const [reportsOpen, setReportsOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <nav
      style={{ backgroundColor: '#0f1f3d' }}
      className="flex items-center justify-between px-4 h-11 flex-shrink-0 relative z-20"
    >
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <ShieldIcon />
          <span className="text-white font-bold text-sm tracking-wide">CreditResolve</span>
        </div>

        <div className="flex items-center gap-0.5">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
            </svg>
            Dashboard
          </button>

          <div className="relative">
            <button
              onClick={() => { setReportsOpen(!reportsOpen); setAdminOpen(false); }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              Reports <ChevronDown />
            </button>
            {reportsOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded shadow-lg border border-slate-200 min-w-[120px] z-30">
                <button className="block w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50">Summary</button>
                <button className="block w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50">Details</button>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => { setAdminOpen(!adminOpen); setReportsOpen(false); }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
              </svg>
              Administration <ChevronDown />
            </button>
            {adminOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded shadow-lg border border-slate-200 min-w-[140px] z-30">
                <button className="block w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50">User Management</button>
                <button className="block w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50">Settings</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          Help
        </button>
        <button className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          Not Logged In
        </button>
      </div>
    </nav>
  );
}

// ── Default filter state ─────────────────────────────────────────────────────

const DEFAULT_FILTERS: FilterState = {
  search: '',
  commercialBank: true,
  generalBank: false,
  leader: '',
  associate: '',
  teamLead: '',
  responsibility: '',
  loadDate: '21/01/2026',
  activeMode: 'manual-addition',
};

// ── Main Page ────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('classified');
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ field: '', direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [classifiedData, setClassifiedData] = useState<ClassifiedClient[]>(initialClassified);
  const [nonAccrualData, setNonAccrualData] = useState<NonAccrualClient[]>(initialNonAccrual);
  const [commentsMap, setCommentsMap] = useState<Record<number, Comment[]>>(mockCommentsByClientId);

  const [addEditModal, setAddEditModal] = useState<{
    open: boolean;
    mode: 'add' | 'edit';
    client?: ClassifiedClient | NonAccrualClient;
  }>({ open: false, mode: 'add' });

  const [commentsModal, setCommentsModal] = useState<{
    open: boolean;
    clientId: number;
    clientName: string;
  }>({ open: false, clientId: 0, clientName: '' });

  // ── Filter & sort ──────────────────────────────────────────────────────────

  function applyFiltersAndSort<T extends ClassifiedClient | NonAccrualClient>(data: T[]): T[] {
    let result = [...data];

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (c) =>
          c.obligorName.toLowerCase().includes(q) ||
          c.responsibilityCentre.toLowerCase().includes(q)
      );
    }

    if (filters.responsibility) {
      result = result.filter((c) => c.responsibilityCentre === filters.responsibility);
    }

    if (sortConfig.field && sortConfig.direction) {
      result.sort((a, b) => {
        const aVal = (a as unknown as Record<string, unknown>)[sortConfig.field];
        const bVal = (b as unknown as Record<string, unknown>)[sortConfig.field];
        let cmp = 0;
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          cmp = aVal - bVal;
        } else {
          cmp = String(aVal).localeCompare(String(bVal));
        }
        return sortConfig.direction === 'asc' ? cmp : -cmp;
      });
    }

    return result;
  }

  const filteredClassified = useMemo(
    () => applyFiltersAndSort(classifiedData),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [classifiedData, filters, sortConfig]
  );

  const filteredNonAccrual = useMemo(
    () => applyFiltersAndSort(nonAccrualData),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nonAccrualData, filters, sortConfig]
  );

  const activeData = activeTab === 'non-accrual' ? filteredNonAccrual : filteredClassified;
  const totalRecords = activeData.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));

  const pagedClassified = filteredClassified.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const pagedNonAccrual = filteredNonAccrual.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleFilterChange = (updates: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
    setCurrentPage(1);
  };

  const handleClear = () => {
    setFilters(DEFAULT_FILTERS);
    setSortConfig({ field: '', direction: null });
    setCurrentPage(1);
  };

  const handleSort = (field: string) => {
    setSortConfig((prev) => ({
      field,
      direction:
        prev.field === field
          ? prev.direction === 'asc' ? 'desc' : prev.direction === 'desc' ? null : 'asc'
          : 'asc',
    }));
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSortConfig({ field: '', direction: null });
  };

  const handleOpenComments = (clientId: number) => {
    const client =
      activeTab === 'non-accrual'
        ? nonAccrualData.find((c) => c.id === clientId)
        : classifiedData.find((c) => c.id === clientId);
    setCommentsModal({ open: true, clientId, clientName: client?.obligorName ?? '' });
  };

  const handleAddComment = (text: string) => {
    const { clientId } = commentsModal;
    const now = new Date();
    const timestamp = `${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}/${now.getFullYear()}, ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    const newComment: Comment = { id: Date.now(), timestamp, author: 'Priya Sharma', text };
    setCommentsMap((prev) => ({
      ...prev,
      [clientId]: [newComment, ...(prev[clientId] ?? [])],
    }));
  };

  const handleDeleteComment = (commentId: number) => {
    const { clientId } = commentsModal;
    setCommentsMap((prev) => ({
      ...prev,
      [clientId]: (prev[clientId] ?? []).filter((c) => c.id !== commentId),
    }));
  };

  const handleDeleteClient = (clientId: number) => {
    if (!confirm('Delete this client record?')) return;
    if (activeTab === 'non-accrual') {
      setNonAccrualData((prev) => prev.filter((c) => c.id !== clientId));
    } else {
      setClassifiedData((prev) => prev.filter((c) => c.id !== clientId));
    }
  };

  const handleSaveClient = (data: ClientFormData) => {
    if (addEditModal.mode === 'add') {
      const newId = Date.now();
      if (activeTab === 'non-accrual') {
        const newClient: NonAccrualClient = {
          id: newId,
          obligorName: data.obligorName,
          responsibilityCentre: data.riskUnit || 'Retail',
          pdGrade: Number(data.pdGrade) || 0,
          prevQtrEndBalance: 0,
          repayments: Number(data.repayments) || 0,
          grossChargeOffs: Number(data.grossChargeOffs) || 0,
          currentBalance: Number(data.adjustedBalance) || 0,
          adjustedBalance: Number(data.adjustedBalance) || 0,
          projPdGrade: Number(data.q1PdGrade) || 0,
          projRepayments: Number(data.q1Repayments) || 0,
          projGrossChargeOffs: Number(data.q1GrossChargeOffs) || 0,
          projQtrEndBalance: Number(data.q1ProjectedQtrEndBalance) || 0,
          projNextPdGrade: Number(data.q2PdGrade) || 0,
        };
        setNonAccrualData((prev) => [...prev, newClient]);
      } else {
        const newClient: ClassifiedClient = {
          id: newId,
          obligorName: data.obligorName,
          responsibilityCentre: data.riskUnit || 'Retail',
          pdGrade: Number(data.pdGrade) || 0,
          currentBalance: Number(data.adjustedBalance) || 0,
          projectedBalanceCurrQtr: Number(data.q1ProjectedQtrEndBalance) || 0,
          projectedBalanceNextQtr: Number(data.q2ProjectedQtrEndBalance) || 0,
          creditResolutionAssociate: 'Priya Sharma',
        };
        setClassifiedData((prev) => [...prev, newClient]);
      }
    } else if (addEditModal.mode === 'edit' && addEditModal.client) {
      const id = addEditModal.client.id;
      if (activeTab === 'non-accrual') {
        setNonAccrualData((prev) =>
          prev.map((c) =>
            c.id === id
              ? { ...c, obligorName: data.obligorName, responsibilityCentre: data.riskUnit || c.responsibilityCentre, pdGrade: Number(data.pdGrade) || c.pdGrade }
              : c
          )
        );
      } else {
        setClassifiedData((prev) =>
          prev.map((c) =>
            c.id === id
              ? {
                  ...c,
                  obligorName: data.obligorName,
                  responsibilityCentre: data.riskUnit || c.responsibilityCentre,
                  pdGrade: Number(data.pdGrade) || c.pdGrade,
                  currentBalance: Number(data.adjustedBalance) || c.currentBalance,
                  projectedBalanceCurrQtr: Number(data.q1ProjectedQtrEndBalance) || c.projectedBalanceCurrQtr,
                  projectedBalanceNextQtr: Number(data.q2ProjectedQtrEndBalance) || c.projectedBalanceNextQtr,
                }
              : c
          )
        );
      }
    }
    setAddEditModal({ open: false, mode: 'add' });
  };

  const editInitialData: Partial<ClientFormData> | undefined = (() => {
    if (!addEditModal.client) return undefined;
    const c = addEditModal.client;
    if ('creditResolutionAssociate' in c) {
      const cc = c as ClassifiedClient;
      return {
        obligorName: cc.obligorName,
        riskUnit: cc.responsibilityCentre,
        pdGrade: String(cc.pdGrade),
        adjustedBalance: String(cc.currentBalance),
        q1ProjectedQtrEndBalance: String(cc.projectedBalanceCurrQtr),
        q2ProjectedQtrEndBalance: String(cc.projectedBalanceNextQtr),
      };
    } else {
      const nc = c as NonAccrualClient;
      return {
        obligorName: nc.obligorName,
        riskUnit: nc.responsibilityCentre,
        pdGrade: String(nc.pdGrade),
        repayments: String(nc.repayments),
        grossChargeOffs: String(nc.grossChargeOffs),
        adjustedBalance: String(nc.adjustedBalance),
        q1PdGrade: String(nc.projPdGrade),
        q1Repayments: String(nc.projRepayments),
        q1GrossChargeOffs: String(nc.projGrossChargeOffs),
        q1ProjectedQtrEndBalance: String(nc.projQtrEndBalance),
        q2PdGrade: String(nc.projNextPdGrade),
      };
    }
  })();

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: '#f0f4f8' }}>
      <Navbar />
      <DashboardTabs activeTab={activeTab} onChange={handleTabChange} />
      <StatCards activeTab={activeTab} />
      {activeTab === 'classified' && (
        <div className="mt-3">
          <RiskUnitOverview clients={classifiedData} />
        </div>
      )}
      <FilterBar
        activeTab={activeTab}
        filters={filters}
        totalRecords={totalRecords}
        onFilterChange={handleFilterChange}
        onClear={handleClear}
        onAddClient={() => setAddEditModal({ open: true, mode: 'add' })}
      />
      <div className="flex-1 overflow-hidden flex flex-col bg-white">
        <ClientTable
          activeTab={activeTab}
          classifiedClients={pagedClassified}
          nonAccrualClients={pagedNonAccrual}
          sortConfig={sortConfig}
          onSort={handleSort}
          onComment={handleOpenComments}
          onEdit={(client) => setAddEditModal({ open: true, mode: 'edit', client })}
          onDelete={handleDeleteClient}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalRecords={totalRecords}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }}
        />
      </div>

      {addEditModal.open && (
        <AddEditClientModal
          mode={addEditModal.mode}
          initialData={editInitialData}
          onClose={() => setAddEditModal({ open: false, mode: 'add' })}
          onSave={handleSaveClient}
        />
      )}

      {commentsModal.open && (
        <CommentsModal
          clientName={commentsModal.clientName}
          comments={commentsMap[commentsModal.clientId] ?? []}
          onClose={() => setCommentsModal({ open: false, clientId: 0, clientName: '' })}
          onAddComment={handleAddComment}
          onDeleteComment={handleDeleteComment}
        />
      )}
    </div>
  );
}
