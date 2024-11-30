import { useState, useEffect } from 'react';
import { ClipboardListIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import type { LoanApplication } from '../types/loan';

export default function AdminDashboard() {
  const [loans, setLoans] = useState<LoanApplication[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/loans');
      if (!response.ok) throw new Error('Failed to fetch loans');
      const data = await response.json();
      setLoans(data);
    } catch (error) {
      toast.error('Failed to fetch loans');
      console.error(error);
    }
  };

  const updateLoanStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/loans/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) throw new Error('Failed to update loan status');
      
      toast.success(`Loan ${status} successfully`);
      fetchLoans();
    } catch (error) {
      toast.error('Failed to update loan status');
      console.error(error);
    }
  };

  const filteredLoans = loans.filter(loan => 
    filter === 'all' ? true : loan.status === filter
  );

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <ClipboardListIcon className="h-8 w-8 mr-2 text-indigo-600" />
            Loan Applications
          </h1>
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">All Applications</option>
            <option value="submitted">Submitted</option>
            <option value="in_review">In Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredLoans.map((loan) => (
              <li key={loan.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {loan.name}
                      </p>
                      <div className="ml-2 flex-shrink-0">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(loan.status)}`}>
                          {loan.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          ${loan.amount.toLocaleString()}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          {loan.email}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>
                          {new Date(loan.createdAt || '').toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-6 flex items-center space-x-3">
                    <button
                      onClick={() => updateLoanStatus(loan.id!, 'approved')}
                      className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <CheckCircleIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => updateLoanStatus(loan.id!, 'rejected')}
                      className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <XCircleIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}