import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart3, Search, Bell, UserCircle, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Navbar = () => {
  const { signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">StockTracker</span>
            </Link>
          </div>
          
          <div className="flex items-center">
            <div className="relative mx-4">
              <input
                type="text"
                placeholder="Search stocks..."
                className="w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell className="h-6 w-6 text-gray-600" />
            </button>
            
            <Link to="/profile" className="ml-4">
              <UserCircle className="h-8 w-8 text-gray-600" />
            </Link>

            <button 
              onClick={handleSignOut}
              className="ml-4 p-2 rounded-full hover:bg-gray-100"
            >
              <LogOut className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;