import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await api.get('/auth/profile');
        setUser(res.data);
      } catch (err) {
        console.error('Failed to load user profile', err);
      }
    };

    if (localStorage.getItem('token')) {
      fetchUserProfile();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="bg-indigo-700 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/dashboard" className="text-2xl font-bold flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Shared Wishlist
        </Link>
        
        <div className="flex items-center space-x-4">
          {user && (
            <div className="hidden md:flex items-center">
              <span className="mr-4">Hello, {user.name}</span>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="bg-indigo-800 hover:bg-indigo-900 text-white px-4 py-2 rounded-md transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}