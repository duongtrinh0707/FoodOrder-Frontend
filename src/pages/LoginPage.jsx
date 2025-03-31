import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import "../styles/LoginPage.css"; 

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axiosInstance.post("/users/login", { email, password });

      // Lưu token và thông tin user vào localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ name: data.name }));

      alert(`Chào mừng ${data.name}! Bạn đã đăng nhập thành công.`);
      
      // Điều hướng về trang chủ
      navigate("/");
      
      // Reload trang để cập nhật Header
      window.location.reload();
    } catch (error) {
      setError(error.response?.data?.message || "Đăng nhập thất bại!");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Đăng Nhập</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input-field"
        />
        <button type="submit" className="submit-button">Đăng Nhập</button>
      </form>
    </div>
  );
};

export default LoginPage;
