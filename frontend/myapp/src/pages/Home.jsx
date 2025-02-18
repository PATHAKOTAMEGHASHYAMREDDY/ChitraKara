import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();
  
  

  const handleArtist = () => {
    navigate("/artistlog");
  };

  const handleCustomer = () => {
    navigate("/customerlog");
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Welcome to Chitrakara</h1>
        <p className="home-subtitle">
          Your gateway to creativity – where artists and customers connect.
        </p>
      </header>

      <section className="about-section">
        <h2 className="about-title">About Us</h2>
        <p className="about-description">
          Chitrakara is a unique platform that bridges the gap between{" "}
          <strong>talented artists</strong> and
          <strong> passionate customers</strong>. Whether you are an artist
          looking to showcase your artwork or a customer searching for
          personalized sketches, we provide the perfect digital space for
          collaboration and inspiration.
        </p>
      </section>

      <section className="features-section">
        <h2 className="features-title">Why Choose Chitrakara?</h2>
        <div className="features">
          <div className="feature-card">
            <h3 className="feature-title">🎨 Showcase Your Art</h3>
            <p className="feature-description">
              Artists can upload their masterpieces and gain recognition.
            </p>
          </div>
          <div className="feature-card">
            <h3 className="feature-title">📤 Upload & Store</h3>
            <p className="feature-description">
              Customers can upload sketches securely to the cloud.
            </p>
          </div>
          <div className="feature-card">
            <h3 className="feature-title">🤝 Connect & Collaborate</h3>
            <p className="feature-description">
              Artists and customers can interact and bring creativity to life.
            </p>
          </div>
        </div>
      </section>

      <div className="cta-section">
        <h2 className="cta-title">Join Our Creative Community</h2>
        <p className="cta-description">
          Start your journey today! Whether you are an artist or a customer,
          Chitrakara is here to empower your creativity.
        </p>
      </div>

      <div className="button-container">
        <button className="artist-btn" onClick={handleArtist}>
          I am an Artist
        </button>

        <button className="customer-btn" onClick={handleCustomer}>
          I am a Customer
        </button>
      </div>
    </div>
  );
}

export default Home;
