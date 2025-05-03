import { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import WishlistCard from '../components/WishlistCard';

export default function Dashboard() {
  const [wishlists, setWishlists] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchWishlists = async () => {
    setLoading(true);
    try {
      const res = await api.get('/wishlists');
      setWishlists(res.data);
      setError(null);
    } catch (err) {
      console.error('Failed to load wishlists', err);
      setError('Failed to load wishlists. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlists();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    try {
      await api.post('/wishlists', { name });
      setName('');
      fetchWishlists();
    } catch (err) {
      setError('Error creating wishlist: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this wishlist?')) {
      try {
        await api.delete(`/wishlists/${id}`);
        fetchWishlists();
      } catch (err) {
        setError('Error deleting wishlist: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">My Wishlists</h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleCreate} className="flex mb-8 gap-2">
            <input
              className="border border-gray-300 p-2 flex-1 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="New wishlist name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition duration-200"
              disabled={!name.trim()}
            >
              Create Wishlist
            </button>
          </form>

          {loading ? (
            <div className="text-center py-10">
              <svg className="animate-spin h-10 w-10 text-indigo-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : wishlists.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No wishlists found. Create one to get started!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlists.map((wishlist) => (
                <WishlistCard 
                  key={wishlist._id} 
                  wishlist={wishlist} 
                  onDelete={() => handleDelete(wishlist._id)}
                  onClick={() => navigate(`/wishlist/${wishlist._id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}