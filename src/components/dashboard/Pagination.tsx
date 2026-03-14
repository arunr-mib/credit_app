'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalRecords: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const PAGE_SIZES = [10, 25, 50, 100];

export default function Pagination({
  currentPage,
  totalPages,
  pageSize,
  totalRecords,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalRecords);

  const pages: (number | '...')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push('...');
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-between px-4 py-2.5 bg-white border-t border-slate-200">
      <div className="text-xs text-slate-500">
        Showing <span className="font-medium text-slate-700">{start}–{end}</span> of{' '}
        <span className="font-medium text-slate-700">{totalRecords}</span> records
      </div>

      <div className="flex items-center gap-1">
        {/* First page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="px-2 py-1 text-xs rounded border border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
          title="First page"
        >
          «
        </button>
        {/* Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 text-xs rounded border border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
        >
          ‹
        </button>

        {/* Page numbers */}
        {pages.map((page, i) =>
          page === '...' ? (
            <span key={`ellipsis-${i}`} className="px-2 py-1 text-xs text-slate-400">
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                currentPage === page
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-slate-300 hover:bg-slate-100 text-slate-700'
              }`}
            >
              {page}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 text-xs rounded border border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
        >
          ›
        </button>
        {/* Last page */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 text-xs rounded border border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
          title="Last page"
        >
          »
        </button>
      </div>

      {/* Page size selector */}
      <div className="flex items-center gap-2 text-xs text-slate-600">
        <span>Rows per page:</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="px-2 py-1 border border-slate-300 rounded text-xs focus:outline-none focus:border-blue-500 bg-white"
        >
          {PAGE_SIZES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
