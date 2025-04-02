import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Auth from './pages/Auth';

function App() {
  const { user } = useAuthStore();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {user && <Navbar />}
        <Routes>
          <Route 
            path="/auth" 
            element={!user ? <Auth /> : <Navigate to="/" replace />} 
          />
          <Route 
            path="/" 
            element={user ? <Home /> : <Navigate to="/auth" replace />} 
          />
          <Route 
            path="/profile" 
            element={user ? <Profile /> : <Navigate to="/auth" replace />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;