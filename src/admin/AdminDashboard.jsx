import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminOrders from "./AdminOrders";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <AdminOrders />
    </div>
  );
};

export default AdminDashboard;
