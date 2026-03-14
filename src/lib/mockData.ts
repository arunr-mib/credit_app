import { ClassifiedClient, NonAccrualClient, Comment } from '@/types';

export const classifiedClients: ClassifiedClient[] = [
  { id: 1, obligorName: 'Nexford Capital LLC 1', responsibilityCentre: 'Retail', pdGrade: 1, currentBalance: 100.00, projectedBalanceCurrQtr: 5000.00, projectedBalanceNextQtr: 5200.00, creditResolutionAssociate: 'Priya Sharma' },
  { id: 2, obligorName: 'Vaultex Group 3', responsibilityCentre: 'Mortgage Division', pdGrade: 3, currentBalance: 575.00, projectedBalanceCurrQtr: 6021.20, projectedBalanceNextQtr: 6230.60, creditResolutionAssociate: 'Marcus Webb' },
  { id: 3, obligorName: 'Nexford Capital LLC 5', responsibilityCentre: 'Sales Finance', pdGrade: 5, currentBalance: 1050.00, projectedBalanceCurrQtr: 7042.40, projectedBalanceNextQtr: 7261.20, creditResolutionAssociate: 'Priya Sharma', flagged: true },
  { id: 4, obligorName: 'Nexford Capital LLC 7', responsibilityCentre: 'Retail', pdGrade: 7, currentBalance: 1525.00, projectedBalanceCurrQtr: 8063.60, projectedBalanceNextQtr: 8291.80, creditResolutionAssociate: 'Marcus Webb' },
  { id: 5, obligorName: 'Vaultex Group 9', responsibilityCentre: 'Mortgage Division', pdGrade: 9, currentBalance: 2000.00, projectedBalanceCurrQtr: 9084.80, projectedBalanceNextQtr: 9322.40, creditResolutionAssociate: 'Priya Sharma' },
  { id: 6, obligorName: 'Nexford Capital LLC 11', responsibilityCentre: 'Sales Finance', pdGrade: 1, currentBalance: 2475.00, projectedBalanceCurrQtr: 10106.00, projectedBalanceNextQtr: 10353.00, creditResolutionAssociate: 'Marcus Webb' },
  { id: 7, obligorName: 'Nexford Capital LLC 13', responsibilityCentre: 'Retail', pdGrade: 3, currentBalance: 2950.00, projectedBalanceCurrQtr: 11127.20, projectedBalanceNextQtr: 11383.60, creditResolutionAssociate: 'Priya Sharma', flagged: true },
  { id: 8, obligorName: 'Vaultex Group 15', responsibilityCentre: 'Mortgage Division', pdGrade: 5, currentBalance: 3425.00, projectedBalanceCurrQtr: 12148.40, projectedBalanceNextQtr: 12414.20, creditResolutionAssociate: 'Marcus Webb' },
  { id: 9, obligorName: 'Nexford Capital LLC 17', responsibilityCentre: 'Sales Finance', pdGrade: 7, currentBalance: 3900.00, projectedBalanceCurrQtr: 13169.60, projectedBalanceNextQtr: 13444.80, creditResolutionAssociate: 'Priya Sharma' },
  { id: 10, obligorName: 'Vaultex Group 19', responsibilityCentre: 'Retail', pdGrade: 9, currentBalance: 4375.00, projectedBalanceCurrQtr: 14190.80, projectedBalanceNextQtr: 14476.40, creditResolutionAssociate: 'Marcus Webb' },
  { id: 11, obligorName: 'Meridian Trust 21', responsibilityCentre: 'Mortgage Division', pdGrade: 1, currentBalance: 4850.00, projectedBalanceCurrQtr: 15212.00, projectedBalanceNextQtr: 15506.00, creditResolutionAssociate: 'Priya Sharma' },
  { id: 12, obligorName: 'Nexford Capital LLC 23', responsibilityCentre: 'Sales Finance', pdGrade: 3, currentBalance: 5325.00, projectedBalanceCurrQtr: 16233.20, projectedBalanceNextQtr: 16536.60, creditResolutionAssociate: 'Marcus Webb' },
  { id: 13, obligorName: 'Nexford Capital LLC 25', responsibilityCentre: 'Retail', pdGrade: 5, currentBalance: 5800.00, projectedBalanceCurrQtr: 17254.40, projectedBalanceNextQtr: 17567.20, creditResolutionAssociate: 'Priya Sharma' },
];

export const nonAccrualClients: NonAccrualClient[] = [
  { id: 1, obligorName: 'Admin Holdings Inc', responsibilityCentre: 'Retail', pdGrade: 8, prevQtrEndBalance: 10150.00, repayments: 0.00, grossChargeOffs: 0.0, currentBalance: 10160.00, adjustedBalance: 10155.00, projPdGrade: 8, projRepayments: 0.00, projGrossChargeOffs: 0.0, projQtrEndBalance: 10720.00, projNextPdGrade: 8 },
  { id: 2, obligorName: 'Anagenex Corp', responsibilityCentre: 'Mortgage Division', pdGrade: 10, prevQtrEndBalance: 10511.40, repayments: 0.20, grossChargeOffs: -1.0, currentBalance: 10521.40, adjustedBalance: 10516.40, projPdGrade: 10, projRepayments: 0.20, projGrossChargeOffs: 0.0, projQtrEndBalance: 11081.40, projNextPdGrade: 10, flagged: true },
  { id: 3, obligorName: 'Arturo Intelligence Inc', responsibilityCentre: 'ID - Mid Stage', pdGrade: 12, prevQtrEndBalance: 10872.80, repayments: 0.00, grossChargeOffs: -2.0, currentBalance: 10882.80, adjustedBalance: 10877.80, projPdGrade: 12, projRepayments: 0.10, projGrossChargeOffs: 0.0, projQtrEndBalance: 11442.80, projNextPdGrade: 12 },
  { id: 4, obligorName: 'ActionIQ Inc', responsibilityCentre: 'Retail', pdGrade: 8, prevQtrEndBalance: 11234.20, repayments: 0.20, grossChargeOffs: -0.5, currentBalance: 11244.20, adjustedBalance: 11239.20, projPdGrade: 8, projRepayments: 0.00, projGrossChargeOffs: 0.0, projQtrEndBalance: 11804.20, projNextPdGrade: 8 },
  { id: 5, obligorName: 'Aescap Inc', responsibilityCentre: 'Mortgage Division', pdGrade: 10, prevQtrEndBalance: 11595.60, repayments: 0.20, grossChargeOffs: -1.5, currentBalance: 11605.60, adjustedBalance: 11600.60, projPdGrade: 10, projRepayments: 0.10, projGrossChargeOffs: 0.0, projQtrEndBalance: 12165.60, projNextPdGrade: 10 },
  { id: 6, obligorName: 'Brightfield Ventures', responsibilityCentre: 'Retail', pdGrade: 12, prevQtrEndBalance: 11957.00, repayments: 0.20, grossChargeOffs: 0.0, currentBalance: 11967.00, adjustedBalance: 11962.00, projPdGrade: 12, projRepayments: 0.10, projGrossChargeOffs: 0.0, projQtrEndBalance: 12527.00, projNextPdGrade: 12 },
  { id: 7, obligorName: 'Coretheon Systems', responsibilityCentre: 'Sales Finance', pdGrade: 8, prevQtrEndBalance: 12318.40, repayments: 0.00, grossChargeOffs: -1.0, currentBalance: 12328.40, adjustedBalance: 12323.40, projPdGrade: 8, projRepayments: 0.00, projGrossChargeOffs: 0.0, projQtrEndBalance: 12888.40, projNextPdGrade: 8 },
  { id: 8, obligorName: 'Deltaforce Capital', responsibilityCentre: 'ID - Mid Stage', pdGrade: 10, prevQtrEndBalance: 12679.80, repayments: 0.30, grossChargeOffs: -0.5, currentBalance: 12689.80, adjustedBalance: 12684.80, projPdGrade: 10, projRepayments: 0.20, projGrossChargeOffs: 0.0, projQtrEndBalance: 13249.80, projNextPdGrade: 10 },
  { id: 9, obligorName: 'Elara Financial Group', responsibilityCentre: 'Retail', pdGrade: 8, prevQtrEndBalance: 13041.20, repayments: 0.10, grossChargeOffs: -1.5, currentBalance: 13051.20, adjustedBalance: 13046.20, projPdGrade: 8, projRepayments: 0.00, projGrossChargeOffs: 0.0, projQtrEndBalance: 13611.20, projNextPdGrade: 8 },
  { id: 10, obligorName: 'Finova Solutions Ltd', responsibilityCentre: 'Mortgage Division', pdGrade: 12, prevQtrEndBalance: 13402.60, repayments: 0.20, grossChargeOffs: -2.0, currentBalance: 13412.60, adjustedBalance: 13407.60, projPdGrade: 12, projRepayments: 0.10, projGrossChargeOffs: 0.0, projQtrEndBalance: 13972.60, projNextPdGrade: 12 },
  { id: 11, obligorName: 'Greenpoint Asset Mgmt', responsibilityCentre: 'Sales Finance', pdGrade: 10, prevQtrEndBalance: 13764.00, repayments: 0.00, grossChargeOffs: -0.5, currentBalance: 13774.00, adjustedBalance: 13769.00, projPdGrade: 10, projRepayments: 0.20, projGrossChargeOffs: 0.0, projQtrEndBalance: 14334.00, projNextPdGrade: 10 },
  { id: 12, obligorName: 'Harborview Credit LLC', responsibilityCentre: 'Retail', pdGrade: 8, prevQtrEndBalance: 14125.40, repayments: 0.30, grossChargeOffs: -1.0, currentBalance: 14135.40, adjustedBalance: 14130.40, projPdGrade: 8, projRepayments: 0.00, projGrossChargeOffs: 0.0, projQtrEndBalance: 14695.40, projNextPdGrade: 8 },
  { id: 13, obligorName: 'Irongate Partners', responsibilityCentre: 'Mortgage Division', pdGrade: 12, prevQtrEndBalance: 14486.80, repayments: 0.20, grossChargeOffs: -2.0, currentBalance: 14496.80, adjustedBalance: 14491.80, projPdGrade: 12, projRepayments: 0.10, projGrossChargeOffs: 0.0, projQtrEndBalance: 15056.80, projNextPdGrade: 12 },
  { id: 14, obligorName: 'Jericho Holdings Corp', responsibilityCentre: 'ID - Mid Stage', pdGrade: 10, prevQtrEndBalance: 14848.20, repayments: 0.10, grossChargeOffs: -0.5, currentBalance: 14858.20, adjustedBalance: 14853.20, projPdGrade: 10, projRepayments: 0.20, projGrossChargeOffs: 0.0, projQtrEndBalance: 15418.20, projNextPdGrade: 10 },
  { id: 15, obligorName: 'Keystone Lending Group', responsibilityCentre: 'Sales Finance', pdGrade: 8, prevQtrEndBalance: 15209.60, repayments: 0.20, grossChargeOffs: -1.5, currentBalance: 15219.60, adjustedBalance: 15214.60, projPdGrade: 8, projRepayments: 0.00, projGrossChargeOffs: 0.0, projQtrEndBalance: 15779.60, projNextPdGrade: 8 },
  { id: 16, obligorName: 'Lakewood Capital Trust', responsibilityCentre: 'Retail', pdGrade: 12, prevQtrEndBalance: 15571.00, repayments: 0.30, grossChargeOffs: -0.5, currentBalance: 15581.00, adjustedBalance: 15576.00, projPdGrade: 12, projRepayments: 0.10, projGrossChargeOffs: 0.0, projQtrEndBalance: 16141.00, projNextPdGrade: 12 },
  { id: 17, obligorName: 'Mercer Bridge Finance', responsibilityCentre: 'Mortgage Division', pdGrade: 10, prevQtrEndBalance: 15932.40, repayments: 0.20, grossChargeOffs: -1.0, currentBalance: 15942.40, adjustedBalance: 15937.40, projPdGrade: 10, projRepayments: 0.20, projGrossChargeOffs: 0.0, projQtrEndBalance: 16502.40, projNextPdGrade: 10 },
  { id: 18, obligorName: 'Nautilus Credit Fund', responsibilityCentre: 'ID - Mid Stage', pdGrade: 8, prevQtrEndBalance: 16293.80, repayments: 0.00, grossChargeOffs: -2.0, currentBalance: 16303.80, adjustedBalance: 16298.80, projPdGrade: 8, projRepayments: 0.00, projGrossChargeOffs: 0.0, projQtrEndBalance: 16863.80, projNextPdGrade: 8 },
  { id: 19, obligorName: 'Olympus Asset Finance', responsibilityCentre: 'Sales Finance', pdGrade: 12, prevQtrEndBalance: 16655.20, repayments: 0.20, grossChargeOffs: -0.5, currentBalance: 16665.20, adjustedBalance: 16660.20, projPdGrade: 12, projRepayments: 0.10, projGrossChargeOffs: 0.0, projQtrEndBalance: 17225.20, projNextPdGrade: 12 },
  { id: 20, obligorName: 'Pinnacle Reserve Corp', responsibilityCentre: 'Retail', pdGrade: 10, prevQtrEndBalance: 17016.60, repayments: 0.30, grossChargeOffs: -1.5, currentBalance: 17026.60, adjustedBalance: 17021.60, projPdGrade: 10, projRepayments: 0.20, projGrossChargeOffs: 0.0, projQtrEndBalance: 17586.60, projNextPdGrade: 10 },
  { id: 21, obligorName: 'Quorum Capital Advisors', responsibilityCentre: 'Mortgage Division', pdGrade: 8, prevQtrEndBalance: 17378.00, repayments: 0.10, grossChargeOffs: -1.0, currentBalance: 17388.00, adjustedBalance: 17383.00, projPdGrade: 8, projRepayments: 0.00, projGrossChargeOffs: 0.0, projQtrEndBalance: 17948.00, projNextPdGrade: 8 },
];

export const mockCommentsByClientId: Record<number, Comment[]> = {
  1: [
    { id: 1, timestamp: '02/15/2026, 10:30 AM', author: 'Priya Sharma', text: 'Reviewed account, flagged for follow-up' },
    { id: 2, timestamp: '02/10/2026, 2:15 PM', author: 'Marcus Webb', text: 'Initial assessment complete' },
  ],
  2: [
    { id: 3, timestamp: '02/12/2026, 9:00 AM', author: 'Marcus Webb', text: 'Balance trending upward, monitoring closely' },
  ],
  3: [
    { id: 4, timestamp: '02/14/2026, 3:45 PM', author: 'Priya Sharma', text: 'Client contacted, restructuring plan discussed' },
    { id: 5, timestamp: '02/08/2026, 11:20 AM', author: 'Jordan Ellis', text: 'Documentation submitted to compliance team' },
  ],
};

export const leaders = ['Priya Sharma', 'Marcus Webb', 'Jordan Ellis', 'Taylor Kim'];
export const associates = ['Priya Sharma', 'Marcus Webb', 'Jordan Ellis', 'Taylor Kim'];
export const teamLeads = ['Priya Sharma', 'Marcus Webb', 'Jordan Ellis', 'Taylor Kim'];
export const responsibilityCentres = ['Retail', 'Mortgage Division', 'Sales Finance', 'ID - Mid Stage'];
export const riskUnits = ['Retail', 'Mortgage Division', 'Sales Finance', 'ID - Mid Stage', 'Corporate Banking'];
