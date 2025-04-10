import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    try {
      const { data } = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });

      if (!data.isAdmin) {
        setError("Tài khoản không có quyền truy cập admin.");
        return;
      }

      // Lưu token và thông tin admin vào localStorage
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("user", JSON.stringify({
        name: data.name,
        email: data.email,
        isAdmin: true,
      }));

      alert(`Xin chào Admin ${data.name}!`);
      navigate("/admin");
      window.location.reload(); // Reload để cập nhật header hoặc các layout liên quan

    } catch (err) {
      setError(err.response?.data?.message || "Đăng nhập admin thất bại");
    }
  };

  return (
    <div>
      <h2>Đăng nhập Admin</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={handleLogin}>Đăng nhập</button>
    </div>
  );
};

export default AdminLogin;
