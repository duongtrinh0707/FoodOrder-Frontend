import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { debounce } from "lodash";
import "../styles/Header.css";

const Header = () => {
  
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [latestOrder, setLatestOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    
    updateUser();
    fetchCategories();
    fetchLatestOrder();

    const handleStorageChange = () => {
      
      updateUser();
      fetchLatestOrder();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const debouncedFetch = debounce(() => {
      fetchCategories(searchTerm);
    }, 300);

    debouncedFetch();
    return () => debouncedFetch.cancel();
  }, [searchTerm]);

  const fetchCategories = async (searchTerm = "") => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/categories?search=${searchTerm}`
      );
      setCategories(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách category:", error);
    }
  };

  const fetchLatestOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { data } = await axios.get(
        "http://localhost:5000/api/orders/myorders",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.length > 0) {
        setLatestOrder(data[0]);
      }
    } catch (error) {
      console.error("Lỗi khi lấy đơn hàng:", error);
    }
  };



  const updateUser = () => {
    const userData = localStorage.getItem("user");
  
    // Nếu không có user hoặc bị lỗi -> set null
    if (!userData || userData === "undefined") {
      setUser(null);
      return;
    }
  
    try {
      const storedUser = JSON.parse(userData);
      setUser(storedUser);
    } catch (error) {
      console.error("Lỗi parse user:", error);
      setUser(null);
    }
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
          {/* Nếu là admin */}
          {user?.isAdmin ? (
            <>
              
              <li>
                <Link to="/admin/products" className="link">Quản Lý sản phẩm</Link>
              </li>
              <li>
                <Link to="/admin/orders" className="link">📦 Quản lý đơn hàng</Link>
              </li>
              <li>
                <Link to="/admin/users" className="link">Quản lý người dùng</Link>
              </li>
            </>
          ) : (
            <>
              {/* Nếu là user bình thường */}
              <li>
                <Link to="/products" className="link">Sản phẩm</Link>
              </li>
              <li>
                <div className="search-wrapper">
                  <input
                    type="text"
                    placeholder="🔍 Tìm danh mục..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && categories.length > 0 && (
                    <ul className="search-dropdown">
                      {categories.map((category) => (
                        <li key={category._id}>
                          <Link
                            to={`/category/${category._id}`}
                            className="dropdown-item"
                            onClick={() => setSearchTerm("")}
                          >
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
              {user && (
                <>
                  <li className="user-info">👋 Xin chào, {user.name}</li>
                  <li>
                    <Link to="/profile" className="link">Trang cá nhân</Link>
                  </li>
                  <li>
                    <Link to="/cart" className="link cart-link">🛒 Giỏ Hàng</Link>
                  </li>
                  {latestOrder && (
                    <li>
                      <Link to={`/order/${latestOrder._id}`} className="link">
                        🛍 Chi tiết đơn hàng
                      </Link>
                    </li>
                  )}
                </>
              )}
            </>
          )}

          {/* Nếu chưa đăng nhập */}
          {!user && (
            <>
              <li>
                <Link to="/login" className="link">Đăng nhập</Link>
              </li>
              <li>
                <Link to="/register" className="link">Đăng ký</Link>
              </li>
            </>
          )}

          {/* Đăng xuất (có thể dùng cho cả admin và user) */}
          {user && (
            <li>
              <button onClick={handleLogout} className="logout-btn">
                Đăng xuất
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  </header>
);

};

export default Header;
