import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import './BookList.css';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  const fetchBooks = async () => {
    try {
      const res = await axios.get('/books');
      setBooks(res.data);
    } catch (err) {
      setError('Failed fetching books');
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="booklist-page">
      <h2>Book List</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="books-container">
        {books.map(b => (
          <div className="book-card" key={b._id}>
            <strong>{b.title}</strong> — {b.author || 'Unknown'}
            <div>{b.description}</div>
            <small>Added by: {b.createdBy?.name || 'N/A'}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
