import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

// Tự động thêm token vào header mỗi request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getCart = async () => {
  const res = await axiosInstance.get("/cart");
  return res.data;
};

// 📌 Thêm sản phẩm vào giỏ hàng (Sửa lỗi qty -> quantity)
export const addToCart = async (productId, quantity = 1) => { // 👈 Giá trị mặc định = 1
  const res = await axiosInstance.post("/cart", { productId, quantity });
  return res.data;
};


// 📌 Xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = async (productId) => {
  const res = await axiosInstance.delete(`/cart/${productId}`);
  return res.data;
};

export default axiosInstance;
