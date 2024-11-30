import { useState } from 'react';
import * as React from 'react';
import { register } from '../services/api';
import toast from 'react-hot-toast';

interface SignUpForm {
  name: string;
  email: string;
  role: string;
  password: string;
  confirmPassword: string;
}

const SignUpPage: React.FC = () => {
  const [form, setForm] = useState<SignUpForm>({
    name: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Call API to create new user
      const { token } = await register(form.name, form.email, form.password, form.role);
      localStorage.setItem('token', token);
      toast.success('User created successfully');
      window.location.href = '/login';
      
    } catch (error) {
      setError('Error creating user');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <div className="min-h-screen   flex items-center justify-center">
      <div className="p-8 rounded-lg  w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-black-500 mb-6">Sign Up</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input 
              type="text" 
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Role:</label>
            <input 
              type="text" 
              name="role" 
              value={form.role} 
              onChange={handleChange} 
              className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input 
              type="email" 
              name="email" 
              value={form.email} 
              onChange={handleChange} 
              className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input 
              type="password" 
              name="password" 
              value={form.password} 
              onChange={handleChange} 
              className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password:</label>
            <input 
              type="password" 
              name="confirmPassword" 
              value={form.confirmPassword} 
              onChange={handleChange} 
              className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button 
            type="submit" 
            className="w-full py-2 bg-indigo-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
