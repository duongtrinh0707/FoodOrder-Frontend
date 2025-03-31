import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/CategoryPage.css"; 
import { addToCart } from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";


const CategoryPage = () => {
  const { id } = useParams(); // Lấy ID category từ URL
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products?category=${id}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm theo category:", error);
      }
    };

    fetchCategoryProducts();
  }, [id]);
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

export default CategoryPage;
