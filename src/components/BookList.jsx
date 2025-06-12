// src/components/BookList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function BookList() {
  const [books, setBooks] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:3000/books', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBooks(res.data);
    } catch (err) {
      console.error('도서 목록 불러오기 실패:', err);
    }
  };

  const handleDelete = async (bookId) => {
  if (!window.confirm('정말 삭제하시겠습니까?')) return;

  try {
    await axios.delete(`http://localhost:3000/books/${bookId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    alert('삭제 성공!');
    fetchBooks(); // 새로고침
  } catch (err) {
    console.error('삭제 실패:', err);

    const errorMsg =
      err.response?.data?.error || '삭제 실패: 알 수 없는 오류가 발생했습니다.';
    alert(errorMsg);
  }
  };

  useEffect(() => {
    fetchBooks();

    // 토큰 디코딩해서 관리자 여부 확인
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setIsAdmin(decoded.role === 'admin');
    }
  }, []);

  return (
    <div>
      <h2>📖 도서 목록</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> - {book.author}
            <br />
            ISBN: {book.isbn}
            <br />
            {book.available ? '✅ 대출 가능' : '❌ 대출 중'}
            <br />
            {isAdmin && (
              <button onClick={() => handleDelete(book.id)} style={{ marginTop: '5px' }}>
                🗑 삭제
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
