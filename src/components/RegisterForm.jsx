import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/auth/register', {
        username,
        password,
      });

      const token = res.data.token;
      localStorage.setItem('token', token);
      onRegister(); // 회원가입 후 로그인 처리
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
      <button type="submit">회원가입</button>
    </form>
  );
}

export default RegisterForm;
