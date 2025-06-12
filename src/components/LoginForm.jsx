// src/components/LoginForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState(''); // ✅ username 상태 사용
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/auth/login', {
        username, // 
        password,
      });

      const token = res.data.token;
      localStorage.setItem('token', token);
      onLogin(); // 로그인 성공 후 화면 전환
    } catch (err) {
      console.error('로그인 실패:', err);
      alert('로그인 실패');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>로그인</h2>
      <input
        type="text"
        placeholder="아이디 (username)"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      /><br />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      /><br />
      <button type="submit">로그인</button>
    </form>
  );
}

export default LoginForm;
