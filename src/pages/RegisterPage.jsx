import { useState } from "react";
import { registerUser } from "../constants/api.js";
import { useNavigate } from "react-router-dom";
import "../styles/RegisterPage.css";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userData = await registerUser(name, email, password);
      localStorage.setItem("userInfo", JSON.stringify(userData)); // Lưu vào localStorage
      navigate("/login"); // Chuyển hướng sang trang đăng nhập
    } catch (err) {
      setError("Lỗi đăng ký! Email đã tồn tại.");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-heading">Đăng Ký</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="register-form" onSubmit={handleRegister}>
        <input
          type="text"
          className="input-field"
          placeholder="Tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          className="input-field"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="input-field"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="submit-button" type="submit">
          Đăng Ký
        </button>
      </form>
    </div>
  );
};
export default RegisterPage;
