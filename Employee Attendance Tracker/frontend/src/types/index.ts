export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'employee' | 'manager';
}

export interface AttendanceRecord {
  _id: string;
  userId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: 'present' | 'absent';
}

export interface AuthResponse {
  token: string;
  user: User;
}