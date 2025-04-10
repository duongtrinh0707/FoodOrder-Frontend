import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    if (storedUser) {
      setName(storedUser.name);
      setEmail(storedUser.email);
    }
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.put(
        "http://localhost:5000/api/users/profile",
        { name, email, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      setPassword("");
      setMessage("✅ Cập nhật thành công!");
      setEditMode(false);
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      setMessage("❌ Cập nhật thất bại!");
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <h2>👤 Thông tin tài khoản</h2>

        {message && <p className="message">{message}</p>}

        {!editMode ? (
          <div className="readonly-section">
            <p><strong>👨‍💼 Họ tên:</strong> {user?.name}</p>
            <p><strong>📧 Email:</strong> {user?.email}</p>
            <button className="btn edit-btn" onClick={() => setEditMode(true)}>
              ✏️ Sửa thông tin
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="profile-form">
            <label>👨‍💼 Họ tên</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>📧 Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>🔒 Mật khẩu mới</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Để trống nếu không đổi"
            />

            <div className="button-group">
              <button type="submit" className="btn save-btn">💾 Lưu thay đổi</button>
              <button
                type="button"
                className="btn cancel-btn"
                onClick={() => setEditMode(false)}
              >
                ❌ Hủy
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
