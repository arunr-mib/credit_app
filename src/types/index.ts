export type TabType = 'classified' | 'non-accrual' | 'principal-recovery' | 'suspects';

export interface ClassifiedClient {
  id: number;
  obligorName: string;
  responsibilityCentre: string;
  pdGrade: number;
  currentBalance: number;
  projectedBalanceCurrQtr: number;
  projectedBalanceNextQtr: number;
  creditResolutionAssociate: string;
  flagged?: boolean;
}

export interface NonAccrualClient {
  id: number;
  obligorName: string;
  responsibilityCentre: string;
  pdGrade: number;
  prevQtrEndBalance: number;
  repayments: number;
  grossChargeOffs: number;
  currentBalance: number;
  adjustedBalance: number;
  projPdGrade: number;
  projRepayments: number;
  projGrossChargeOffs: number;
  projQtrEndBalance: number;
  projNextPdGrade: number;
  flagged?: boolean;
}

export interface Comment {
  id: number;
  timestamp: string;
  author: string;
  text: string;
}

export interface ClientFormData {
  obligorName: string;
  accountNumber: string;
  riskUnit: string;
  pdGrade: string;
  repayments: string;
  grossChargeOffs: string;
  adjustedBalance: string;
  q1PdGrade: string;
  q1Repayments: string;
  q1GrossChargeOffs: string;
  q1ProjectedQtrEndBalance: string;
  q2PdGrade: string;
  q2Repayments: string;
  q2GrossChargeOffs: string;
  q2ProjectedQtrEndBalance: string;
  priorQtrEndReserves: string;
  projectedReserves: string;
}

export interface FilterState {
  search: string;
  commercialBank: boolean;
  generalBank: boolean;
  leader: string;
  associate: string;
  teamLead: string;
  responsibility: string;
  loadDate: string;
  activeMode: 'auto' | 'manual-addition' | 'manual-movement';
}

export type SortDirection = 'asc' | 'desc' | null;

export interface SortConfig {
  field: string;
  direction: SortDirection;
}
