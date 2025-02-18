import React, { useState } from "react";
import axios from "axios";
import "../styles/artisthome.css";
import { useLocation } from "react-router-dom";
function Artisthome() {
  // Form States
  const Location = useLocation();
  const username = Location.state?.username;
  const [paintingTitle, setPaintingTitle] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [contact, setContact] = useState("");

  // Assume artist name comes from authentication (hardcoded for now)
  const artistName = "John Doe";

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", paintingTitle);
    formData.append("image", image);
    formData.append("price", price);
    formData.append("contact", contact);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/uploadpainting",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data.message);

      // Reset Form
      setPaintingTitle("");
      setImage(null);
      setPrice("");
      setContact("");
    } catch (error) {
      alert(error.response?.data?.error || "Upload Failed");
    }
  };

  return (
    <div className="artisthome-container">
      {/* Welcome Message */}
      <h1>Welcome, {username}!</h1>
      <p>
        Showcase your beautiful paintings and reach out to art enthusiasts around the world. 
        Upload your artwork below and let your creativity shine!
      </p>

      {/* Upload Form */}
      <div className="upload-form-container">
        <h2>Upload Your Painting</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="painting-title">Painting Title</label>
            <input
              type="text"
              id="painting-title"
              placeholder="Enter painting title"
              value={paintingTitle}
              onChange={(e) => setPaintingTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price (in &#8377;)</label>
            <input
              type="number"
              id="price"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact">Contact Details</label>
            <input
              type="text"
              id="contact"
              placeholder="Enter your contact details"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>
          <button type="submit">Upload Painting</button>
        </form>
      </div>
    </div>
  );
}

export default Artisthome;
