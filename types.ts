export type AssetStatus = 'Available' | 'Assigned' | 'Maintenance' | 'Retired' | 'Broken' | 'Borrowed';

export interface Company {
  id: string;
  name: string;
  logo?: string;
  plan: 'Starter' | 'Professional' | 'Enterprise';
  settings: {
    allowP2P: boolean;
    requireAgreement: boolean;
    autoRotationDays: number;
  };
}

export interface Employee {
  id: string;
  companyId: string;
  employeeId: string;
  fullName: string;
  email: string;
  department: string;
  role: string;
  status: 'Active' | 'On Leave' | 'Terminated';
  trustScore: number; // 1-100
  createdAt: string;
}

export interface Asset {
  id: string;
  companyId: string;
  assetTag: string;
  name: string;
  category: string;
  serialNumber: string;
  model: string;
  purchaseDate: string;
  cost: number;
  status: AssetStatus;
  currentHolderId: string | null;
  condition: number; // 1-100
  trustScore: number; // calculated health/trust
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  location?: {
    lat: number;
    lng: number;
    lastUpdated: string;
  };
  createdAt: string;
}

export interface Assignment {
  id: string;
  assetId: string;
  employeeId: string;
  assignedAt: string;
  returnedAt: string | null;
  conditionOnAssign: string;
  conditionOnReturn: string | null;
  notes: string | null;
  agreementSigned: boolean;
  dueDate?: string;
}

export interface MaintenanceLog {
  id: string;
  assetId: string;
  serviceDate: string;
  description: string;
  cost: number;
  performedBy: string;
  nextServiceDate: string | null;
  type: 'Routine' | 'Repair' | 'Upgrade';
}

export interface Notification {
  id: string;
  companyId: string;
  userId: string;
  title: string;
  message: string;
  type: 'Info' | 'Warning' | 'Alert' | 'Success';
  read: boolean;
  createdAt: string;
}

export interface BorrowRequest {
  id: string;
  companyId: string;
  assetId: string;
  requesterId: string;
  startDate: string;
  endDate: string;
  purpose: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface AuditLog {
  id: string;
  companyId: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  details: string;
  timestamp: string;
}
