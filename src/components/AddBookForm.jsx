// src/components/AddBookForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

function AddBookForm({ onBookAdded }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [error, setError] = useState('');

  const validateInputs = () => {
    if (!title.trim() || !author.trim() || !isbn.trim()) {
      setError('모든 필드를 입력해주세요.');
      return false;
    }

    if (!/^\d{3}-\d{1,5}-\d{1,7}-\d{1,7}-\d{1}$/.test(isbn)) {
        setError('ISBN은 하이픈(-)을 포함한 13자리여야 합니다. 예: 978-89-01-12345-6');
        return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    try {
      await axios.post(
        'http://localhost:3000/books',
        { title, author, isbn },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      alert('도서 등록 성공!');
      setTitle('');
      setAuthor('');
      setIsbn('');
      setError('');
      onBookAdded();
    } catch (err) {
      if (err.response?.status === 400 && err.response?.data?.error?.includes('duplicate')) {
        setError('이미 존재하는 ISBN입니다.');
      } else {
        setError('도서 등록 실패: ' + (err.response?.data?.error || '알 수 없는 오류'));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>➕ 도서 등록</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="제목"
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
        placeholder="ISBN (예: 978-89-01-12345-6)"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
        required
      /><br />
      <button type="submit">등록</button>
    </form>
  );
}

export default AddBookForm;
