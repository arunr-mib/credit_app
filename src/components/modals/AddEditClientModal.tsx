'use client';

import { useState, useEffect } from 'react';
import { ClientFormData } from '@/types';
import { riskUnits } from '@/lib/mockData';

interface AddEditClientModalProps {
  mode: 'add' | 'edit';
  initialData?: Partial<ClientFormData>;
  onClose: () => void;
  onSave: (data: ClientFormData) => void;
}

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const DEFAULT_FORM: ClientFormData = {
  obligorName: '',
  accountNumber: '',
  riskUnit: '',
  pdGrade: '',
  repayments: '0',
  grossChargeOffs: '0',
  adjustedBalance: '0',
  q1PdGrade: '',
  q1Repayments: '0',
  q1GrossChargeOffs: '0',
  q1ProjectedQtrEndBalance: '0',
  q2PdGrade: '',
  q2Repayments: '0',
  q2GrossChargeOffs: '0',
  q2ProjectedQtrEndBalance: '0',
  priorQtrEndReserves: '0',
  projectedReserves: '0',
};

const InputField = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '0',
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
  placeholder?: string;
}) => (
  <div>
    <label className="block text-[11px] font-medium text-slate-600 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-800"
    />
  </div>
);

const SectionHeader = ({ title }: { title: string }) => (
  <div className="text-xs font-semibold text-slate-700 mt-4 mb-3 pb-1 border-b border-slate-200">
    {title}
  </div>
);

export default function AddEditClientModal({
  mode,
  initialData,
  onClose,
  onSave,
}: AddEditClientModalProps) {
  const [form, setForm] = useState<ClientFormData>({ ...DEFAULT_FORM, ...initialData });

  useEffect(() => {
    setForm({ ...DEFAULT_FORM, ...initialData });
  }, [initialData]);

  const update = (field: keyof ClientFormData) => (val: string) =>
    setForm((prev) => ({ ...prev, [field]: val }));

  const handleSave = () => {
    if (!form.obligorName.trim()) return;
    onSave(form);
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content" style={{ maxWidth: '680px' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
          <h2 className="text-sm font-semibold text-slate-800">
            {mode === 'add' ? 'Add Client' : 'Edit Client'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <XIcon />
          </button>
        </div>

        <div className="px-5 py-4">
          {/* Basic info */}
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="Obligor Name"
              value={form.obligorName}
              onChange={update('obligorName')}
              placeholder="Enter obligor name"
            />
            <InputField
              label="Account Number"
              value={form.accountNumber}
              onChange={update('accountNumber')}
              placeholder="Enter account number"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mt-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">Risk Unit</label>
              <select
                value={form.riskUnit}
                onChange={(e) => update('riskUnit')(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:border-blue-500 bg-white text-slate-700"
              >
                <option value="">Select Risk Unit</option>
                {riskUnits.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <InputField
              label="PD Grade"
              value={form.pdGrade}
              onChange={update('pdGrade')}
              type="number"
              placeholder="0"
            />
          </div>

          {/* Already Realized */}
          <SectionHeader title="Already Realized Section" />
          <div className="grid grid-cols-3 gap-3">
            <InputField label="Repayments" value={form.repayments} onChange={update('repayments')} type="number" />
            <InputField label="Gross Charge-offs" value={form.grossChargeOffs} onChange={update('grossChargeOffs')} type="number" />
            <InputField label="Adjusted Balance" value={form.adjustedBalance} onChange={update('adjustedBalance')} type="number" />
          </div>

          {/* Q1 Projections */}
          <SectionHeader title="Projections - Current Quarter - Q1" />
          <div className="grid grid-cols-2 gap-3">
            <InputField label="PD Grade" value={form.q1PdGrade} onChange={update('q1PdGrade')} type="number" />
            <InputField label="Repayments" value={form.q1Repayments} onChange={update('q1Repayments')} type="number" />
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <InputField label="Gross Charge-offs" value={form.q1GrossChargeOffs} onChange={update('q1GrossChargeOffs')} type="number" />
            <InputField label="Projected Qtr end balance" value={form.q1ProjectedQtrEndBalance} onChange={update('q1ProjectedQtrEndBalance')} type="number" />
          </div>

          {/* Q2 Projections */}
          <SectionHeader title="Projections - Upcoming Quarter - Q2" />
          <div className="grid grid-cols-2 gap-3">
            <InputField label="PD Grade" value={form.q2PdGrade} onChange={update('q2PdGrade')} type="number" />
            <InputField label="Repayments" value={form.q2Repayments} onChange={update('q2Repayments')} type="number" />
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <InputField label="Gross Charge-offs" value={form.q2GrossChargeOffs} onChange={update('q2GrossChargeOffs')} type="number" />
            <InputField label="Projected Qtr end balance" value={form.q2ProjectedQtrEndBalance} onChange={update('q2ProjectedQtrEndBalance')} type="number" />
          </div>

          {/* Specific Reserves */}
          <SectionHeader title="Specific Reserves" />
          <div className="grid grid-cols-2 gap-3">
            <InputField label="Prior quarter end reserves" value={form.priorQtrEndReserves} onChange={update('priorQtrEndReserves')} type="number" />
            <InputField label="Projected Reserves" value={form.projectedReserves} onChange={update('projectedReserves')} type="number" />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-5 py-3 border-t border-slate-200 sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium border border-slate-300 text-slate-700 rounded hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!form.obligorName.trim()}
            className="px-4 py-1.5 text-xs font-medium bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
