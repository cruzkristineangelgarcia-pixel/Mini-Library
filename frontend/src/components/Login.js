
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login({ setUser }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess('');
  try {
    const res = await axios.post('/auth/login', form);

    const loggedUser = res.data.user;
    setUser(loggedUser);

    setSuccess('Login successful! Redirecting...');

    setTimeout(() => {
      // redirect based on role
      if (loggedUser.role === 'admin') {
        navigate('/add'); // admin goes to AddBook page
      } else {
        navigate('/'); // normal user goes to BookList
      }
    }, 1000);

  } catch (err) {
    setError(err.response?.data?.message || 'Login failed');
  }
};


  return (
    <div className="card">
      <h2>Login</h2>
      {success && <div className="success-message">{success}</div>}
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <div className="extra-link">
        Don't have an account yet? <Link to="/register">Register</Link>
      </div>
    </div>
  );
}
