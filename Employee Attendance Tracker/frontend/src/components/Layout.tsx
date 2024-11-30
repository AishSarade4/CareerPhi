import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, UserCircle } from "lucide-react";
import logo from "../photos/division.png";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-200">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Brand Name */}
            <div className="flex items-center">
              <img src={logo} alt="Avatar"  style={{ height:'50px' , width:'50px'}} />


              <h1 className=" m-3 text-3xl font-bold text-indigo-500">
                Attendance Tracker
              </h1>
            </div> 

            {/* User Section */}
            {user && (
              <div className="flex items-center space-x-4">
                {/* User Icon and Name */}
                <div className="flex items-center space-x-2">
                  <UserCircle className="h-6 w-6 text-gray-600" />
                  <span className="text-lg font-medium text-gray-700">
                    {user.name}
                  </span>
                </div>
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition duration-150"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {children}
      </main>
    </div>
  );
};
