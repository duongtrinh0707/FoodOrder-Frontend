import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import "./App.css"; // Thêm file CSS chung
import CategoryPage from "./pages/CategoryPage";
import Checkout from "./pages/Checkout";
import DetailOrder from "./pages/DetailOrder";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CartPage />} />
            
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/order/:id" element={<DetailOrder />} />
            <Route path="/checkout" element={<Checkout />} /> {/* Thêm route cho Checkout */}
            
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;