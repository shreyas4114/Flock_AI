import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/signup', form);
      localStorage.setItem('token', res.data.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Signup failed: ' + err.response?.data?.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80 space-y-4">
        <h2 className="text-xl font-bold">Sign Up</h2>
        <input name="name" onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" />
        <input name="email" onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded" />
        <input name="password" type="password" onChange={handleChange} placeholder="Password" className="w-full p-2 border rounded" />
        <button className="bg-blue-600 text-white p-2 rounded w-full">Sign Up</button>
      </form>
    </div>
  );
}
