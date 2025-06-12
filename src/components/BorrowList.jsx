// src/components/BorrowList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BorrowList() {
  const [borrows, setBorrows] = useState([]);

  const fetchBorrows = async () => {
    try {
      const res = await axios.get('http://localhost:3000/borrows', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBorrows(res.data);
    } catch (err) {
      console.error('대출 목록 불러오기 실패:', err);
    }
  };

  const handleReturn = async (borrowId) => {
    try {
      await axios.put(`http://localhost:3000/borrows/${borrowId}/return`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('반납 성공!');
      fetchBorrows(); // 반납 후 목록 새로고침
    } catch (err) {
      console.error('반납 실패:', err);
      alert('반납 실패: ' + err.response?.data?.error || '알 수 없는 오류');
    }
  };

  useEffect(() => {
    fetchBorrows();
  }, []);

  return (
    <div>
      <h2>📖 대출한 도서 목록</h2>
      <ul>
        {borrows.map((borrow) => (
          <li key={borrow.id}>
            <strong>{borrow.book.title}</strong> - {borrow.book.author}
            <br />
            대출일: {new Date(borrow.borrowDate).toLocaleDateString()}
            <br />
            {borrow.returnDate ? (
              <span>✅ 반납 완료</span>
            ) : (
              <button onClick={() => handleReturn(borrow.id)}>반납하기</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BorrowList;
