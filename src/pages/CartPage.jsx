import { useEffect, useState } from "react";
import { getCart, removeFromCart } from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import "../styles/CartPage.css";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Bạn chưa đăng nhập!");
          navigate("/login");
          return;
        }

        const data = await getCart(token);
        console.log("Dữ liệu nhận được từ API:", data);

        if (data && data.cartItems && Array.isArray(data.cartItems)) {
          setCart(data.cartItems);
        } else {
          setCart([]);
        }
      } catch (error) {
        console.error("Lỗi khi tải giỏ hàng:", error);
        alert("Lỗi khi tải giỏ hàng!");
      }
      setLoading(false);
    };
    fetchCart();
  }, [navigate]);

  const handleRemoveFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await removeFromCart(productId, token);
      setCart(cart.filter((item) => item.product._id !== productId));
      alert("Đã xóa sản phẩm khỏi giỏ hàng!");
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      alert("Lỗi khi xóa sản phẩm!");
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Giỏ hàng trống, không thể thanh toán!");
      return;
    }

    localStorage.setItem("cart", JSON.stringify(cart)); // Lưu giỏ hàng vào localStorage
    navigate("/checkout"); // Chuyển hướng tới trang thanh toán
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.product.price, 0);

  return (
    <div className="cart-container">
      <h2 className="cart-heading">Giỏ hàng</h2>
      {loading ? (
        <p className="loading-message">Đang tải...</p>
      ) : (
        <ul className="cart-list">
          {cart.length > 0 ? (
            cart.map((item) => (
              <li key={item._id} className="cart-item">
                <div className="cart-item-info">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="product-image"
                  />
                  <div className="product-details">
                    <h4 className="product-name">{item.product.name}</h4>
                    <p className="product-price">
                      Giá: {item.product.price.toLocaleString()} VND
                    </p>
                    <button
                      className="remove-button"
                      onClick={() => handleRemoveFromCart(item.product._id)}
                    >
                      Xóa khỏi giỏ hàng
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p className="empty-cart">Giỏ hàng trống</p>
          )}
        </ul>
      )}

      {cart.length > 0 && (
        <div className="checkout-section">
          <p className="total-price">
            Tổng tiền: {totalAmount.toLocaleString()} VND
          </p>
          <button className="checkout-button" onClick={handleCheckout}>
            Tiến hành thanh toán
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
