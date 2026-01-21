
export enum UserRole {
  PUBLIC = "Public/Donor",
  ORPHANAGE_ADMIN = "Orphanage Admin",
  INSPECTOR = "Inspector",
  GOVERNMENT = "Government Authority",
}

export interface ViewState {
  page: 'dashboard' | 'orphanage' | 'inspector';
  params?: Record<string, any>;
}

export interface Orphanage {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  description: string;
  isVerified: boolean;
  registrationId: string;
  childrenCount: number;
  needs: { item: string; quantity: number; priority: 'High' | 'Medium' | 'Low' }[];
  fundUtilization: { category: string; percentage: number }[]; // Public funds
}

export interface Donation {
  id: string;
  orphanageId: string;
  donor: string; // Could be 'Anonymous' or a name
  type: 'Monetary' | 'In-Kind';
  amount?: number; // for monetary
  items?: { item: string; quantity: number }[]; // for in-kind
  date: string;
}

export interface InspectionReport {
    id: string;
    orphanageId: string;
    inspectorId: string;
    date: string;
    status: 'Pending' | 'Completed' | 'Action Required';
    summary: string;
    scores: {
        hygiene: number;
        safety: number;
        nutrition: number;
        compliance: number;
    };
}

export interface VisitorBooking {
    id: string;
    orphanageId: string;
    visitorName: string;
    visitDate: string; // YYYY-MM-DD
    timeSlot: '10:00-11:00' | '14:00-15:00';
    status: 'Confirmed' | 'Cancelled';
}

export interface FundAllocation {
    id: string;
    orphanageId: string;
    source: 'Government' | 'Public Donation';
    amount: number;
    usageCategory: 'Food' | 'Education' | 'Healthcare' | 'Infrastructure';
    date: string;
    proofUrl: string; // Link to uploaded receipt/bill
}
