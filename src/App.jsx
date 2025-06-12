// src/App.jsx
import React, { useState, useEffect } from 'react';
import BookList from './components/BookList';
import AddBookForm from './components/AddBookForm';
import BorrowList from './components/BorrowList';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import './App.css'; // 스타일링 파일 import

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('list');
  const [showRegister, setShowRegister] = useState(false); // 회원가입 폼 표시 여부

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
      <h1>📚 도서 아나바다</h1>

      {isAuthenticated ? (
        <>
          <button onClick={handleLogout}>로그아웃</button>

          <div className="tab-buttons">
            <button
              className={activeTab === 'list' ? 'active' : ''}
              onClick={() => setActiveTab('list')}
            >
              📖 도서 목록
            </button>
            <button
              className={activeTab === 'add' ? 'active' : ''}
              onClick={() => setActiveTab('add')}
            >
              ➕ 도서 등록
            </button>
            <button
              className={activeTab === 'borrow' ? 'active' : ''}
              onClick={() => setActiveTab('borrow')}
            >
              📦 대출 목록
            </button>
          </div>

          <div className="component-box">
            {activeTab === 'list' && <BookList />}
            {activeTab === 'add' && <AddBookForm onBookAdded={() => setActiveTab('list')} />}
            {activeTab === 'borrow' && <BorrowList />}
          </div>
        </>
      ) : (
        <>
          {showRegister ? (
            <>
              <RegisterForm onRegister={() => setShowRegister(false)} />
              <p>
                이미 계정이 있으신가요?{' '}
                <button onClick={() => setShowRegister(false)}>로그인</button>
              </p>
            </>
          ) : (
            <>
              <LoginForm onLogin={handleLogin} />
              <p>
                계정이 없으신가요?{' '}
                <button onClick={() => setShowRegister(true)}>회원가입</button>
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
