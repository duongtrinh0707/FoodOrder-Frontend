import { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("adminToken");
      const { data } = await axios.get("http://localhost:5000/api/admin/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Danh sách đơn hàng</h2>
      {orders.map((order) => (
        <div key={order._id}>
          <p>Đơn hàng: {order._id}</p>
          <p>Người đặt: {order.user?.email}</p>
          <p>Tổng: {order.totalPrice.toLocaleString()} VND</p>
          <p>Thanh toán: {order.isPaid ? "✅" : "❌"}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
