import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001'; // 백엔드 주소

export const fetchBooks = async () => {
  const response = await axios.get(`${API_BASE_URL}/books`);
  return response.data;
};
