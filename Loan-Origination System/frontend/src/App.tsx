import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HomeIcon, UserIcon, ShieldIcon } from 'lucide-react';
import LoanForm from './components/LoanForm';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link
                  to="/"
                  className="flex items-center px-4 text-gray-900 hover:text-indigo-600"
                >
                  <HomeIcon className="h-5 w-5 mr-1" />
                  Home
                </Link>
                <Link
                  to="/dashboard"
                  className="flex items-center px-4 text-gray-900 hover:text-indigo-600"
                >
                  <UserIcon className="h-5 w-5 mr-1" />
                  My Loans
                </Link>
                <Link
                  to="/admin"
                  className="flex items-center px-4 text-gray-900 hover:text-indigo-600"
                >
                  <ShieldIcon className="h-5 w-5 mr-1" />
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<LoanForm />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;