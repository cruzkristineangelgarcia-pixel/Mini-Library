

import React, { useState } from 'react';
import axios from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; // reuse login card styling

export default function Register({ setUser }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user', // default role
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess('');
  try {
    await axios.post('/auth/register', form);

    setSuccess('Registration successful! Redirecting to login...');

    // redirect to login page instead of automatically logging in
    setTimeout(() => navigate('/login'), 1000);

  } catch (err) {
    setError(err.response?.data?.message || 'Registration failed');
  }
};


  return (
    <div className="card">
      <h2>Register</h2>
      {success && <div className="success-message">{success}</div>}
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          required
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Register</button>
      </form>
      <div className="extra-link">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
