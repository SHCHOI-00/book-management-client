// src/components/AddBookForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

function AddBookForm({ onBookAdded }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:3000/books', {
        title,
        author,
        isbn,
        available: true // 기본값 설정 (선택적)
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('도서 등록 성공');
      setTitle('');
      setAuthor('');
      setIsbn('');
      onBookAdded(); // 목록 갱신
    } catch (err) {
      console.error('도서 등록 실패:', err);
      alert('도서 등록 실패');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>도서 등록</h2>
      <input
        type="text"
        placeholder="도서 제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      /><br />
      <input
        type="text"
        placeholder="저자"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      /><br />
      <input
        type="text"
        placeholder="ISBN"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
        required
      /><br />
      <button type="submit">등록</button>
    </form>
  );
}

export default AddBookForm;
