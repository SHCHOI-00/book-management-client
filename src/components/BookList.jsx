// src/components/BookList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // 백엔드 API 주소에 맞게 수정
    axios.get('http://localhost:3000/books', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.error('도서 목록 가져오기 실패:', err);
      });
  }, []);

  return (
    <div>
      <h2>도서 목록</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> - {book.author}
            {book.available ? ' ✅ 대출 가능' : ' ❌ 대출 중'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
