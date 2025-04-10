import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/DetailOrder.css";

const DetailOrder = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const token = localStorage.getItem("token");
                const { data } = await axios.get(`http://localhost:5000/api/orders/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setOrder(data);
            } catch (error) {
                console.error("Lỗi khi tải đơn hàng:", error);
            }
        };

        fetchOrder();
    }, [id]);

    if (!order) return <p>Đang tải...</p>;

    return (
        <div className="order-detail-container">
            <h2>Chi tiết đơn hàng</h2>
            <p><strong>Mã đơn hàng:</strong> {order._id}</p>
            <h3>Sản phẩm đã đặt:</h3>
            {order.orderItems.map((item) => (
                <div key={item._id} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div>
                        <p>{item.name}</p>
                        <p>Số lượng: {item.qty}</p>
                        <p>Giá: {item.price.toLocaleString()} VND</p>
                    </div>
                </div>
            ))}
            <h3>Tổng tiền: {order.totalPrice.toLocaleString()} VND</h3>
        </div>
    );
};

export default DetailOrder;
