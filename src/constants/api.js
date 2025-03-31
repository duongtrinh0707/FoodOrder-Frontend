import axios from "axios";

const API_URL = "http://localhost:5000/api/users"; // Thay đổi nếu backend chạy ở cổng khác

// API đăng nhập
export const loginUser = async (email, password) => {
  const { data } = await axios.post(`${API_URL}/login`, { email, password });
  return data;
};

// API đăng ký
export const registerUser = async (name, email, password) => {
  const { data } = await axios.post(`${API_URL}/register`, { name, email, password });
  return data;
};
