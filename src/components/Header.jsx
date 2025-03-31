import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Header.css";

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]); // Lưu danh sách category
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [latestOrder, setLatestOrder] = useState(null); // Đơn hàng mới nhất
  const navigate = useNavigate();

  useEffect(() => {
    updateCartCount();
    updateUser();
    fetchCategories(); // Lấy danh sách category từ API
    fetchLatestOrder(); // Lấy đơn hàng mới nhất

    const handleStorageChange = () => {
      updateCartCount();
      updateUser();
      fetchLatestOrder();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Lấy danh sách category từ backend
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách category:", error);
    }
  };

  // Lấy đơn hàng mới nhất của người dùng
  const fetchLatestOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { data } = await axios.get("http://localhost:5000/api/orders/myorders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.length > 0) {
        setLatestOrder(data[0]); // Lấy đơn hàng mới nhất
      }
    } catch (error) {
      console.error("Lỗi khi lấy đơn hàng:", error);
    }
  };

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
  };

  const updateUser = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">
          <Link to="/" className="link">MyShop</Link>
        </h1>
        <nav>
          <ul className="nav-list">
            {/* Menu Products với Dropdown */}
            <li
              className="dropdown"
              onMouseEnter={() => setDropdownVisible(true)}
              onMouseLeave={() => setDropdownVisible(false)}
            >
              <Link to="/products" className="link">Products ▾</Link>
              {dropdownVisible && (
                <ul className="dropdown-menu">
                  {categories.map((category) => (
                    <li key={category._id}>
                      <Link to={`/category/${category._id}`} className="dropdown-item">
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {user ? (
              <>
                <li className="user-info">👋 Xin chào, {user.name}</li>
                <li><button onClick={handleLogout} className="logout-btn">Đăng xuất</button></li>
                {latestOrder && (
                  <li>
                    <Link to={`/order/${latestOrder._id}`} className="link">
                      🛍 Chi tiết đơn hàng
                    </Link>
                  </li>
                )}
              </>
            ) : (
              <>
                <li><Link to="/login" className="link">Login</Link></li>
                <li><Link to="/register" className="link">Register</Link></li>
              </>
            )}

            <li>
              <Link to="/cart" className="link cart-link">
                🛒 Cart ({cartCount})
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
