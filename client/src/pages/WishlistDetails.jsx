import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';

export default function WishlistDetails() {
  const { id } = useParams(); // wishlist ID from URL
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', imageUrl: '', price: '' });
  const [inviteEmail, setInviteEmail] = useState('');
  const [wishlistName, setWishlistName] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await api.get(`/${id}/products`);
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to load products', err);
    }
  };

  const fetchWishlist = async () => {
    try {
      const res = await api.get(`/wishlists/${id}`);
      setWishlistName(res.data.name);
    } catch (err) {
      console.error('Failed to load wishlist info', err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchWishlist();
  }, [id]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/${id}/products`, { ...form, wishlistId: id });
      setForm({ name: '', imageUrl: '', price: '' });
      fetchProducts();
    } catch (err) {
      alert('Failed to add product');
    }
  };

  const handleInvite = async () => {
    try {
      await api.put(`/wishlists/${id}/add-member`, { email: inviteEmail });
      setInviteEmail('');
      alert('User invited!');
    } catch (err) {
      alert('Failed to invite user');
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">{wishlistName}</h2>

        {/* Product Form */}
        <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4">
          <input
            placeholder="Name"
            className="border p-2 rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="Image URL"
            className="border p-2 rounded"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          />
          <input
            placeholder="Price"
            type="number"
            className="border p-2 rounded"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <button className="bg-green-600 text-white rounded">Add</button>
        </form>

        {/* Invite Member */}
        <div className="flex gap-2 mb-6">
          <input
            placeholder="Invite user by email"
            className="border p-2 flex-1 rounded"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
          />
          <button onClick={handleInvite} className="bg-blue-600 text-white px-4 rounded">Invite</button>
        </div>

        {/* Product List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p._id} className="bg-gray-100 p-3 rounded shadow-sm">
              <img src={p.imageUrl} alt={p.name} className="h-40 object-cover rounded mb-2" />
              <h3 className="text-lg font-bold">{p.name}</h3>
              <p className="text-gray-700">${p.price}</p>
              <p className="text-sm text-gray-500 mt-1">Added by: {p.addedBy?.name || 'Unknown'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
