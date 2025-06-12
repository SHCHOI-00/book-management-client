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
      fetchBorrows();
    } catch (err) {
      console.error('반납 실패:', err);
      alert('반납 실패: ' + (err.response?.data?.error || '알 수 없는 오류'));
    }
  };

  useEffect(() => {
    fetchBorrows();
  }, []);

  const currentBorrows = borrows.filter(b => b.returnDate === null);
  const returnedBorrows = borrows.filter(b => b.returnDate !== null);

  return (
    <div>
      <h2>📦 현재 대출 중인 도서</h2>
      <ul>
        {currentBorrows.length === 0 ? (
          <li>현재 대출 중인 도서가 없습니다.</li>
        ) : (
          currentBorrows.map((borrow) => (
            <li key={borrow.id}>
              <strong>{borrow.book.title}</strong> - {borrow.book.author}
              <br />
              대출일: {new Date(borrow.borrowDate).toLocaleDateString()}
              <br />
              <button onClick={() => handleReturn(borrow.id)}>반납하기</button>
            </li>
          ))
        )}
      </ul>

      <h2 style={{ marginTop: '30px' }}>📚 반납 완료한 도서</h2>
      <ul>
        {returnedBorrows.length === 0 ? (
          <li>반납 완료한 도서가 없습니다.</li>
        ) : (
          returnedBorrows.map((borrow) => (
            <li key={borrow.id}>
              <strong>{borrow.book.title}</strong> - {borrow.book.author}
              <br />
              대출일: {new Date(borrow.borrowDate).toLocaleDateString()}<br />
              반납일: {new Date(borrow.returnDate).toLocaleDateString()}
              <br />
              ✅ 반납 완료
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default BorrowList;
