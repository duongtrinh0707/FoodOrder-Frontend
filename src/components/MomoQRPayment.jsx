import React from "react";

const MomoQRPayment = ({ orderId }) => {
  return (
    <div className="momo-qr-section" style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Quét mã QR để thanh toán bằng Momo</h2>
      <img
        src="//frontend/public/images/my-qr.jpg" // Đảm bảo bạn có ảnh QR ở thư mục public/images
        alt="QR Momo"
        style={{ maxWidth: "300px", margin: "20px auto", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
      />
      <p style={{ marginTop: "1rem" }}>
        Nội dung chuyển khoản: <strong>{orderId}</strong>
      </p>
      <p>
        Sau khi chuyển khoản, vui lòng nhấn nút xác nhận bên dưới.
      </p>
      <button className="checkout-button" onClick={() => alert("Cảm ơn bạn! Chúng tôi sẽ xác nhận đơn hàng sớm nhất.")}>
        Tôi đã thanh toán
      </button>
    </div>
  );
};

export default MomoQRPayment;
