import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProductDetail.css"; 

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Lỗi:", error));
  }, [id]);

  if (!product) return <p>Đang tải...</p>;

  return (
    <div className="product-detail-container">
      <h1 className="product-name">{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />
      <p className="product-description">Mô tả: {product.description}</p>
      <p className="product-price">Giá: {product.price} VND</p>
      <p className="product-category">Danh mục: {product.category?.name}</p>
      <p className="product-stock">Còn lại: {product.countInStock}</p>
      <button className="buy-button" onClick={() => alert("Đặt hàng thành công!")}>
        Mua ngay
      </button>
    </div>
  );
};

export default ProductDetail;
