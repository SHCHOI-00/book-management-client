// src/App.jsx
import React, { useState, useEffect } from 'react';
import BookList from './components/BookList';
import LoginForm from './components/LoginForm';
import AddBookForm from './components/AddBookForm';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // 처음 렌더링 시 토큰 확인
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      <h1>📚 도서 관리 시스템</h1>
      {isAuthenticated ? (
        <>
          <button onClick={handleLogout}>로그아웃</button>
          <AddBookForm onBookAdded={() => window.location.reload()} />
          <BookList />
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
