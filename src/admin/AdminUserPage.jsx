import { useEffect, useState } from "react";
import axios from "axios";

const AdminUserPage = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", isAdmin: false });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("adminToken");

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(data);
    } catch (err) {
      setError("Không thể tải danh sách người dùng.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      alert("Xóa thất bại.");
    }
  };

  const handleEditClick = (user) => {
    setEditUser(user._id);
    setForm({ name: user.name, email: user.email, isAdmin: user.isAdmin });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/users/${editUser}`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      alert("Cập nhật thất bại.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>👥 Quản lý người dùng</h2>

      {loading ? (
        <p>Đang tải...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Quyền</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                {editUser === user._id ? (
                  <>
                    <td>
                      <input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </td>
                    <td>
                      <select
                        value={form.isAdmin}
                        onChange={(e) => setForm({ ...form, isAdmin: e.target.value === "true" })}
                      >
                        <option value="false">User</option>
                        <option value="true">Admin</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={handleUpdate}>Lưu</button>
                      <button onClick={() => setEditUser(null)}>Hủy</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "Admin" : "User"}</td>
                    <td>
                      <button onClick={() => handleEditClick(user)}>✏️ Sửa</button>
                      <button onClick={() => handleDelete(user._id)}>🗑️ Xóa</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUserPage;
