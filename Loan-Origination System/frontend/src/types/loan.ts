export interface LoanApplication {
    id?: string;
    name: string;
    email: string;
    amount: number;
    purpose: string;
    status: 'submitted' | 'in_review' | 'approved' | 'rejected';
    createdAt?: string;
  }
  
  export interface User {
    id: string;
    email: string;
    role: 'user' | 'admin';
  }