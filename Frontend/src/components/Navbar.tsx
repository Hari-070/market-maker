import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart3, Search, Bell, UserCircle, LogOut, Home, Eye } from 'lucide-react';
// import { useAuthStore } from '../store/authStore';
import { message } from 'antd';

const Navbar = () => {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    navigate('/auth');
    localStorage.removeItem('token');
    message.success('You have successfully logged out.');
    
  };
  

  return (
    <nav className="bg-gradient-to-r from-blue-50 to-blue-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-700" />
              <span className="ml-2 text-2xl font-semibold text-blue-900">StockTracker</span>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-1 text-blue-700 hover:text-blue-900">
              <Home className="h-6 w-6" />
              <span className="hidden sm:inline-block font-semibold">Home</span>
            </Link>
            <Link to="/watchlist" className="flex items-center space-x-1 text-blue-700 hover:text-blue-900">
              <Eye className="h-6 w-6" />
              <span className="hidden sm:inline-block font-semibold">Watchlist</span>
            </Link>

            <div className="relative">
              <input
                type="text"
                placeholder="Search stocks..."
                className="w-64 px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-blue-500" />
            </div>

            {/* Notification Bell */}
            <button className="p-2 rounded-full hover:bg-blue-200">
              <Bell className="h-6 w-6 text-blue-600" />
            </button>

            {/* Profile Link */}
            <Link to="/profile" className="ml-4">
              <UserCircle className="h-8 w-8 text-blue-600" />
            </Link>

            {/* Logout Button */}
            <button 
              onClick={handleSignOut}
              className="ml-4 p-2 rounded-full hover:bg-blue-200"
            >
              <LogOut className="h-6 w-6 text-blue-600" />
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
