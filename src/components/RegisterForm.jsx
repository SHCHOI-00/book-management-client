// src/components/RegisterForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/auth/register', {
        username,
        password,
        role: isAdmin ? 'admin' : 'user',
      });
      alert('회원가입 성공!');
      onRegister();
    } catch (err) {
      console.error('회원가입 실패:', err);
      alert('회원가입 실패');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>회원가입</h2>
      <input
        type="text"
        placeholder="아이디"
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
      <label>
        <input
          type="checkbox"
          checked={isAdmin}
          onChange={() => setIsAdmin(!isAdmin)}
        /> 관리자 권한으로 가입
      </label>
      <br />
      <button type="submit">회원가입</button>
    </form>
  );
}

export default RegisterForm;
