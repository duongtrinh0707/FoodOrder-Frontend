import { useEffect, useState } from "react";
import axios from "axios";
 // nhớ tạo file CSS nếu cần

const AdminProductPage = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", description: "" });

  const token = localStorage.getItem("adminToken");

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(data);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreate = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/products", newProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts([...products, data]);
      setNewProduct({ name: "", price: "", description: "" });
    } catch (err) {
      console.error("Lỗi khi thêm sản phẩm:", err);
    }
  };

  const handleUpdate = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/products/${editingProduct._id}`,
        editingProduct,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts(products.map((p) => (p._id === data._id ? data : p)));
      setEditingProduct(null);
    } catch (err) {
      console.error("Lỗi khi cập nhật sản phẩm:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Lỗi khi xóa sản phẩm:", err);
    }
  };

  return (
    <div className="admin-products">
      <h2>Quản lý sản phẩm</h2>

      <div className="create-form">
        <h3>➕ Thêm sản phẩm mới</h3>
        <input
          type="text"
          placeholder="Tên sản phẩm"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Giá"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Mô tả"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <button onClick={handleCreate}>Thêm</button>
      </div>

      <h3>📦 Danh sách sản phẩm</h3>
      <table className="product-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Giá</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) =>
            editingProduct?._id === product._id ? (
              <tr key={product._id}>
                <td>
                  <input
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, name: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, price: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    value={editingProduct.description}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, description: e.target.value })
                    }
                  />
                </td>
                <td>
                  <button onClick={handleUpdate}>💾 Lưu</button>
                  <button onClick={() => setEditingProduct(null)}>❌ Hủy</button>
                </td>
              </tr>
            ) : (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.price}đ</td>
                <td>{product.description}</td>
                <td>
                  <button onClick={() => setEditingProduct(product)}>✏️ Sửa</button>
                  <button onClick={() => handleDelete(product._id)}>🗑 Xóa</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductPage;
