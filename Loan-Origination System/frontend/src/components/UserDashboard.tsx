import { useState, useEffect } from 'react';
import { FileTextIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import type { LoanApplication } from '../types/loan';

export default function UserDashboard() {
  const [loans, setLoans] = useState<LoanApplication[]>([]);

  useEffect(() => {
    fetchUserLoans();
  }, []);

  const fetchUserLoans = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/loans/user');
      if (!response.ok) throw new Error('Failed to fetch loans');
      const data = await response.json();
      setLoans(data);
    } catch (error) {
      toast.error('Failed to fetch your loans');
      console.error(error);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      submitted: 'bg-yellow-100 text-yellow-800',
      in_review: 'bg-blue-100 text-blue-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <FileTextIcon className="h-8 w-8 mr-2 text-indigo-600" />
            My Loan Applications
          </h1>
        </div>

        {loans.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <FileTextIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No applications</h3>
            <p className="mt-1 text-sm text-gray-500">
              You haven't submitted any loan applications yet.
            </p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <ul className="divide-y divide-gray-200">
              {loans.map((loan) => (
                <li key={loan.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Loan Amount: ${loan.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Purpose: {loan.purpose}
                      </p>
                    </div>
                    <div>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(loan.status)}`}>
                        {loan.status.replace('_', ' ').toUpperCase()}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(loan.createdAt || '').toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}