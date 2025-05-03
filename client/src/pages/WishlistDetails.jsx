import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';

export default function WishlistDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', imageUrl: '', price: '' });
  const [inviteEmail, setInviteEmail] = useState('');
  const [wishlist, setWishlist] = useState({ name: '', membeIds: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await api.get(`/${id}/products`);
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to load products', err);
      setError('Failed to load products');
    }
  };

  const fetchWishlist = async () => {
    try {
      const res = await api.get(`/wishlists/${id}`);
      setWishlist(res.data);
    } catch (err) {
      console.error('Failed to load wishlist info', err);
      setError('Failed to load wishlist details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchProducts(), fetchWishlist()]);
  }, [id]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/${id}/products`, { ...form, wishlistId: id });
      setForm({ name: '', imageUrl: '', price: '' });
      setShowAddProduct(false);
      fetchProducts();
    } catch (err) {
      setError('Failed to add product: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleEditProduct = async (productId, updatedData) => {
    try {
      await api.put(`/products/${productId}`, updatedData);
      fetchProducts();
    } catch (err) {
      setError('Failed to update product: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${productId}`);
        fetchProducts();
      } catch (err) {
        setError('Failed to delete product: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    
    try {
      await api.put(`/wishlists/${id}/add-member`, { email: inviteEmail });
      alert("User invited successfully!");
      setInviteEmail('');
      fetchWishlist();
      setError(null);
    } catch (err) {
      setError('Failed to invite user: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleUpdateWishlist = async (updatedName) => {
    try {
      await api.put(`/wishlists/${id}`, { name: updatedName });
      fetchWishlist();
    } catch (err) {
      setError('Failed to update wishlist: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-6xl mx-auto py-12 px-4 text-center">
          <svg className="animate-spin h-12 w-12 text-indigo-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate('/dashboard')}
            className="text-indigo-600 hover:text-indigo-800 mr-4 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{wishlist.name}</h1>
              <p className="text-gray-600 mt-1">
                {wishlist.memberIds?.length || 0} {wishlist.memberIds?.length === 1 ? 'member' : 'members'}
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  const newName = prompt('Enter new wishlist name:', wishlist.name);
                  if (newName && newName !== wishlist.name) {
                    handleUpdateWishlist(newName);
                  }
                }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md transition duration-200 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Edit
              </button>
            </div>
          </div>

          {/* Invite Members */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Invite Members</h3>
            <form onSubmit={handleInvite} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email address"
                className="border border-gray-300 p-2 flex-1 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                required
              />
              <button 
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition duration-200"
              >
                Send Invite
              </button>
            </form>
          </div>

          {/* Products Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Products</h3>
              <button
                onClick={() => setShowAddProduct(!showAddProduct)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition duration-200 flex items-center"
              >
                {showAddProduct ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancel
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Product
                  </>
                )}
              </button>
            </div>

            {/* Add Product Form */}
            {showAddProduct && (
              <form onSubmit={handleAddProduct} className="bg-gray-50 p-4 rounded-md mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input
                      placeholder="Product name"
                      className="border border-gray-300 p-2 w-full rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input
                      placeholder="https://example.com/image.jpg"
                      className="border border-gray-300 p-2 w-full rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={form.imageUrl}
                      onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                      placeholder="Price"
                      type="number"
                      step="0.01"
                      className="border border-gray-300 p-2 w-full rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button 
                    type="submit" 
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition duration-200"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            )}

            {/* Product List */}
            {products.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No products added yet. Add your first product to get started!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onEdit={(updatedData) => handleEditProduct(product._id, updatedData)}
                    onDelete={() => handleDeleteProduct(product._id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}