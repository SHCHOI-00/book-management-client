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
      fetchBooks();
    } catch (err) {
      console.error('삭제 실패:', err);
      const errorMsg =
        err.response?.data?.error || '삭제 실패: 알 수 없는 오류가 발생했습니다.';
      alert(errorMsg);
    }
  };

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
      alert('대출 성공!');
      fetchBooks(); // 대출 후 목록 새로고침
    } catch (err) {
      console.error('대출 실패:', err);
      const msg = err.response?.data?.error || '알 수 없는 오류로 대출 실패';
      alert('대출 실패: ' + msg);
    }
  };

  useEffect(() => {
    fetchBooks();

    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setIsAdmin(decoded.role === 'admin');
    }
  }, []);

  return (
    <div>
      <h2>📖 공유된 도서 목록</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> - {book.author}
            <br />
            ISBN: {book.isbn}
            <br />
            {book.available ? (
              <button onClick={() => handleBorrow(book.id)} style={{ marginTop: '5px' }}>
                📦 대출하기
              </button>
            ) : (
              <span>❌ 대출 중</span>
            )}
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
