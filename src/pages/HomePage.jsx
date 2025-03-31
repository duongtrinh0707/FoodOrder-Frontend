import React, { useState, useEffect } from "react";
import "../styles/HomePage.css";

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Các slides banner
  const slides = [
    "https://cdn.pixabay.com/photo/2022/07/15/18/15/burgers-7323689_1280.jpg",
    "https://cdn.pixabay.com/photo/2022/05/06/16/17/broasted-chicken-7178658_1280.jpg ",
    "https://cdn.pixabay.com/photo/2014/09/26/19/51/drink-462776_1280.jpg"
  ];

  // Tự động chuyển slide
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);  
    }, 5000); // 5 giây chuyển 1 slide

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  // Chuyển slide bằng tay
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="homepage">
      {/* Banner Slider */}
      <div className="banner-container">
        <div className="slider" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide, index) => (
            <div className="slide" key={index}>
              <img src={slide} alt={`Banner ${index + 1}`} className="slider-image" />
            </div>
          ))}
        </div>
        
        {/* Dots indicator */}
        <div className="slider-dots">
          {slides.map((_, index) => (
            <span 
              key={index} 
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Giới thiệu */}
      <div className="intro-section">
        <h1 className="intro-title">Chào mừng đến với MyShop</h1>
        <p className="intro-text">
          Tại MyShop, chúng tôi cung cấp những sản phẩm chất lượng nhất với giá cả hợp lý. 
          Khám phá ngay các sản phẩm mới nhất và hưởng nhiều ưu đãi hấp dẫn!
        </p>
      </div>

      {/* Featured Products (có thể thêm sau) */}
    </div>
  );
};

export default HomePage;