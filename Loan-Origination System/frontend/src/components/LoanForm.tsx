import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { LoanApplication } from '../types/loan';

export default function LoanForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<LoanApplication>();

  const onSubmit = async (data: LoanApplication) => {
    try {
      const response = await fetch('http://localhost:3000/api/loans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error('Failed to submit loan application');
      
      toast.success('Loan application submitted successfully!');
      reset();
    } catch (error) {
      toast.error('Failed to submit loan application');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-8 py-6">
         
          <h2 className="text-center text-2xl font-bold text-gray-900 mb-8 text-purple-700 p-2">
            Loan Application
          </h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-indigo-500"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Loan Amount ($)
              </label>
              <input
                type="number"
                {...register('amount', {
                  required: 'Amount is required',
                  min: { value: 1000, message: 'Minimum amount is $1,000' },
                  max: { value: 50000, message: 'Maximum amount is $50,000' },
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-indigo-500"
              />
              {errors.amount && (
                <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Loan Purpose
              </label>
              <textarea
                {...register('purpose', { required: 'Purpose is required' })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-purple-500"
              />
              {errors.purpose && (
                <p className="mt-1 text-sm text-red-600">{errors.purpose.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}