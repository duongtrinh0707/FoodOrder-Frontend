import { useEffect, useState } from "react";
import axiosInstance, { addToCart } from "../utils/axiosInstance"; // Import đúng hàm
import "../styles/ProductListPage.css";
import { useNavigate } from "react-router-dom";

const ProductListPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/products");
        setProducts(response.data); // Cập nhật state với danh sách sản phẩm
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("🔴 Bạn cần đăng nhập!");
      return;
    }
  
    try {
      const result = await addToCart(productId, 1); // 👈 Thêm số lượng mặc định
      console.log("✅ Thêm vào giỏ hàng thành công:", result);
    } catch (error) {
      console.error("🔴 Lỗi khi thêm vào giỏ hàng:", error.response?.data?.message || error.message);
    }
  };
  
  
  return (
    <div className="product-container">
      <h1>Danh sách sản phẩm</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>Giá: {product.price} VND</p>
            <button onClick={() => navigate(`/product/${product._id}`)} style={{ marginRight: "10px" }}>
              Xem Chi Tiết
            </button>
            <button onClick={() => handleAddToCart(product._id)}>Đặt Hàng</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
