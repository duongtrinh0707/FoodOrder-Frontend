import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Checkout.css";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("COD"); // Mặc định là Thanh toán khi nhận hàng
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Bạn chưa đăng nhập!");
          navigate("/login");
          return;
        }

        const { data } = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data.cartItems) {
          setCartItems(data.cartItems);
          setTotalPrice(data.totalPrice);
        }
      } catch (error) {
        console.error("Lỗi khi tải giỏ hàng:", error);
        alert("Lỗi khi tải giỏ hàng!");
      }
    };
    fetchCart();
  }, [navigate]);

  const handleCheckout = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Bạn chưa đăng nhập!");
            navigate("/login");
            return;
        }

        // Kiểm tra nếu giỏ hàng trống
        if (!cartItems || cartItems.length === 0) {
            alert("Giỏ hàng của bạn đang trống!");
            return;
        }

        // Chuẩn bị dữ liệu gửi lên API
        const dataSent = {
            orderItems: cartItems.map((item) => {
                if (!item.product?._id && !item._id) {
                    console.error("❌ Lỗi: Sản phẩm không có ID hợp lệ", item);
                    throw new Error("Có sản phẩm không hợp lệ trong giỏ hàng!");
                }

                return {
                    product: item.product?._id || item._id, // ID của sản phẩm
                    name: item.product?.name || item.name,
                    image: item.product?.image || item.image,
                    price: item.product?.price || item.price,
                    qty: item.quantity,
                };
            }),
            totalPrice,
            paymentMethod: "COD",
        };

        console.log("📦 Dữ liệu gửi lên API:", JSON.stringify(dataSent, null, 2));

        // Gửi request đến API
        const { data } = await axios.post(
            "http://localhost:5000/api/orders",
            dataSent,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        alert("🎉 Đặt hàng thành công!");
        setCartItems([]); // Xóa giỏ hàng sau khi đặt hàng thành công
        localStorage.removeItem("cartItems"); // Xóa giỏ hàng khỏi localStorage
        navigate(`/order/${data._id}`);
    } catch (error) {
        console.error("❌ Lỗi khi đặt hàng:", error.response?.data || error.message);

        // Hiển thị lỗi rõ ràng hơn
        if (error.response?.data?.message) {
            alert(`Đặt hàng thất bại: ${error.response.data.message}`);
        } else {
            alert("Đặt hàng thất bại, vui lòng thử lại.");
        }
    }
};

  return (
    <div className="checkout-container">
      <h2>Thanh toán</h2>
      <div className="checkout-items">
        {cartItems.map((item) => (
          <div key={item._id} className="checkout-item">
            <img src={item.product.image} alt={item.product.name} />
            <div>
              <p>{item.product.name}</p>
              <p>Số lượng: {item.quantity}</p>
              <p>Giá: {item.product.price.toLocaleString()} VND</p>
            </div>
          </div>
        ))}
      </div>
      <div className="checkout-summary">
        <h3>Tổng tiền: {totalPrice.toLocaleString()} VND</h3>

        {/* Chọn phương thức thanh toán */}
        <div>
          <label>
            <input
              type="radio"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={() => setPaymentMethod("COD")}
            />
            Thanh toán khi nhận hàng (COD)
          </label>
          <label>
            <input
              type="radio"
              value="Paypal"
              checked={paymentMethod === "Paypal"}
              onChange={() => setPaymentMethod("Paypal")}
            />
            Thanh toán qua Paypal
          </label>
        </div>

        <button onClick={handleCheckout}>Thanh toán ngay</button>
      </div>
    </div>
  );
};

export default Checkout;