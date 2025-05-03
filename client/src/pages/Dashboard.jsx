import { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const [wishlists, setWishlists] = useState([]);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const fetchWishlists = async () => {
    try {
      const res = await api.get('/wishlists');
      setWishlists(res.data);
    } catch (err) {
      console.error('Failed to load wishlists', err);
    }
  };

  useEffect(() => {
    fetchWishlists();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/wishlists', { name });
      setName('');
      fetchWishlists();
    } catch (err) {
      alert('Error creating wishlist');
    }
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">My Wishlists</h2>

        <form onSubmit={handleCreate} className="flex mb-4 gap-2">
          <input
            className="border p-2 flex-1 rounded"
            placeholder="New wishlist name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-4 rounded">Add</button>
        </form>

        <ul className="space-y-2">
          {wishlists.map((w) => (
            <li
              key={w._id}
              onClick={() => navigate(`/wishlist/${w._id}`)}
              className="p-3 bg-gray-100 hover:bg-blue-100 cursor-pointer rounded"
            >
              {w.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
}
