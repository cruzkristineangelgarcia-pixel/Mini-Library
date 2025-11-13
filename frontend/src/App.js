
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import './App.css';

function Header({ user, logout }) {
  const location = useLocation();
  return (
    <header>
      <h1>Seraph's Library</h1>
      <div className="nav-buttons">
        {user ? (
          <>
            {user.role === 'admin' && <Link to="/add">Add Book</Link>}
            <Link to="/">Books</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
            <Link to="/register" className={location.pathname === '/register' ? 'active' : ''}>Register</Link>
          </>
        )}
      </div>
    </header>
  );
}

function App() {
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Header user={user} logout={logout} />
      <div className="card-container">
        <Routes>
          <Route path="/" element={user ? <BookList /> : <Navigate to="/login" />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/add" element={user && user.role === 'admin' ? <AddBook /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
