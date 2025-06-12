// src/components/BookList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BookList() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:3000/books', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBooks(res.data);
    } catch (err) {
      console.error('도서 목록 가져오기 실패:', err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleBorrow = async (bookId) => {
    try {
      await axios.post(
        'http://localhost:3000/borrows',
        { bookId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      alert('도서 대출 성공');
      fetchBooks(); // 대출 후 목록 새로고침
    } catch (err) {
      console.error('도서 대출 실패:', err);
      alert('도서 대출 실패: ' + err.response?.data?.error || '알 수 없는 오류');
    }
  };

  return (
    <div>
      <h2>📚 도서 목록</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> - {book.author} ({book.isbn})<br />
            {book.available ? (
              <button onClick={() => handleBorrow(book.id)}>대출하기</button>
            ) : (
              <span>❌ 대출 중</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
