# 📘 도서 아나바다 - 프론트엔드

React 기반의 SPA 프론트엔드 프로젝트입니다.

## ✅ 주요 특징

- 로그인 및 회원가입 기능
- 탭을 이용한 UI 구성 (도서 목록, 도서 등록, 대출 목록)
- 관리자만 '도서 삭제' 가능
- 모든 유저가 '도서 등록' 가능

## ✅ 실행 방법

```bash
npm install
npm start
```

## ✅ 디렉토리 구조
```css
src/
├── components/
│   ├── LoginForm.jsx
│   ├── RegisterForm.jsx
│   ├── BookList.jsx
│   ├── AddBookForm.jsx
│   └── BorrowList.jsx
├── App.jsx
└── App.css
```

## ✅ 기술 스택

- React
- Axios (API 요청)
- JWT 디코딩을 위한 jwt-decode
