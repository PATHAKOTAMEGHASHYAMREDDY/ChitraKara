import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import logo from "../assets/logo.png"; // Your logo
import frontData from "../assets/front.json"; // Import JSON data for Lottie animation
import Lottie from "lottie-react"; // Import Lottie component
import { FaLinkedin } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const titleRef = useRef(null);

  // Add "typed" class after typing animation completes
  useEffect(() => {
    const typingDuration = 3500; // 3.5 seconds
    const timer = setTimeout(() => {
      if (titleRef.current) {
        titleRef.current.classList.add('typed');
      }
    }, typingDuration);
    
    return () => clearTimeout(timer);
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleArtist = () => {
    showToast("Navigating to Artist Login...");
    setTimeout(() => navigate("/artistlog"), 1000);
  };

  const handleCustomer = () => {
    showToast("Navigating to Customer Login...");
    setTimeout(() => navigate("/customerlog"), 1000);
  };

  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Chitrakara Logo" className="home-logo" />
          <h1 className="site-title">Chitrakar</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content-wrapper">
          <div className="hero-image-container">
            {/* Using Lottie animation instead of showing raw JSON */}
            <div className="lottie-container">
              <Lottie
                animationData={frontData}
                loop={true}
                autoplay={true}
                className="lottie-animation"
              />
            </div>
          </div>
          <div className="hero-text-container">
            <h2 className="hero-title" ref={titleRef}>Unleash Your Creativity</h2>
            <p className="hero-subtitle">
              A platform for artists and customers to connect, create, and inspire.
            </p>
            <div className="button-container">
              <button className="artist-btn" onClick={handleArtist}>
                I am an Artist
              </button>
              <button className="customer-btn" onClick={handleCustomer}>
                I am a Customer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="features-title">Why Choose Chitrakar?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🎨</span>
            <h3 className="feature-title">Showcase Your Art</h3>
            <p className="feature-description">
              Artists can upload their masterpieces and gain recognition from a
              global audience.
            </p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📤</span>
            <h3 className="feature-title">Upload & Store</h3>
            <p className="feature-description">
              Customers can securely upload sketches and store them in the cloud.
            </p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🤝</span>
            <h3 className="feature-title">Connect & Collaborate</h3>
            <p className="feature-description">
              Bring creativity to life by connecting artists and customers.
            </p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-section">
        <h2 className="about-title">About Us</h2>
        <p className="about-description">
          Chitrakar is a unique platform that bridges the gap between
          <strong> talented artists</strong> and
          <strong> passionate customers</strong>. Whether you're an artist
          looking to showcase your artwork or a customer seeking personalized
          sketches, we provide the perfect digital space for collaboration and
          inspiration.
        </p>
        <div className="social-media">
          <h3>Contact Us</h3>
          <div className="social-icons">
            <a target="_blank" rel="noopener noreferrer">
              <FaLinkedin
                className="social-icon"
                onClick={() => {
                  window.open("/team");
                  showToast("Opening team page...");
                }}
              />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Chitrakar. All rights reserved.</p>
      </footer>

      {/* Toast Notification */}
      {toast.show && (
        <div className={`toast-notification toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default Home;