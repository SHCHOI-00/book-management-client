// src/App.jsx
import React, { useState, useEffect } from 'react';
import BookList from './components/BookList';
import AddBookForm from './components/AddBookForm';
import BorrowList from './components/BorrowList';
import LoginForm from './components/LoginForm';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('list'); // 기본은 도서 목록 탭

  useEffect(() => {
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

          {/* 탭 버튼 */}
          <div style={{ marginTop: '20px' }}>
            <button onClick={() => setActiveTab('list')}>📖 도서 목록</button>
            <button onClick={() => setActiveTab('add')}>➕ 도서 등록</button>
            <button onClick={() => setActiveTab('borrow')}>📦 대출 목록</button>
          </div>

          {/* 탭별 콘텐츠 렌더링 */}
          <div style={{ marginTop: '20px' }}>
            {activeTab === 'list' && <BookList />}
            {activeTab === 'add' && <AddBookForm onBookAdded={() => setActiveTab('list')} />}
            {activeTab === 'borrow' && <BorrowList />}
          </div>
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
