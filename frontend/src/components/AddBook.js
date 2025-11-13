import React, { useState } from 'react';
import axios from '../services/api';
// import { useNavigate } from 'react-router-dom';
import './AddBook.css';

export default function AddBook() {
  const [form, setForm] = useState({ title:'', author:'', description:'' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
//   const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/books', form);
      setMessage('Book added');
      setError('');
      setForm({ title:'', author:'', description:'' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add book');
      setMessage('');
    }
  };

  return (
    <div className="addbook-page">
      <h2>ADD BOOKS HERE</h2>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}
