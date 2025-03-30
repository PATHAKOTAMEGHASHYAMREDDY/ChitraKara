import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/artisthome.css";
import logo from "../assets/logo.png";

function Artisthome() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username;
  const [paintingTitle, setPaintingTitle] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [contact, setContact] = useState("");
  const [customRequests, setCustomRequests] = useState([]);
  const [uploadMessage, setUploadMessage] = useState({ text: "", type: "" });
  const [acceptMessage, setAcceptMessage] = useState({ text: "", type: "" });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchCustomRequests = async () => {
      try {
        const response = await axios.get(`${import.meta.env}/api/customrequests/${username}`);
        setCustomRequests(response.data);
      } catch (error) {
        console.error("Error fetching custom requests:", error);
      }
    };
    fetchCustomRequests();
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    const formData = new FormData();
    formData.append("title", paintingTitle);
    formData.append("image", image);
    formData.append("price", price);
    formData.append("contact", contact);
    formData.append("artist", username);

    try {
      const response = await axios.post(`${import.meta.env}/api/uploadpainting`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadMessage({ text: response.data.message, type: "success" });
      setPaintingTitle("");
      setImage(null);
      setPrice("");
      setContact("");
      setTimeout(() => {
        setUploadMessage({ text: "", type: "" });
        setIsUploading(false);
      }, 2000);
    } catch (error) {
      setUploadMessage({ text: error.response?.data?.error || "Upload Failed", type: "error" });
      setIsUploading(false);
    }
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      const response = await axios.put(`${import.meta.env}/api/customrequests/${requestId}`, {
        status: "accepted",
      });
      setAcceptMessage({ text: response.data.message, type: "success" });
      setCustomRequests((prevRequests) =>
        prevRequests.map((req) =>
          req._id === requestId ? { ...req, status: "accepted" } : req
        )
      );
      setTimeout(() => setAcceptMessage({ text: "", type: "" }), 2000);
    } catch (error) {
      setAcceptMessage({ text: "Failed to accept request", type: "error" });
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      const response = await axios.put(`${import.meta.env}/api/customrequests/${requestId}`, {
        status: "rejected",
      });
      setAcceptMessage({ text: response.data.message, type: "success" });
      setCustomRequests((prevRequests) =>
        prevRequests.map((req) =>
          req._id === requestId ? { ...req, status: "rejected" } : req
        )
      );
      setTimeout(() => setAcceptMessage({ text: "", type: "" }), 2000);
    } catch (error) {
      setAcceptMessage({ text: "Failed to reject request", type: "error" });
    }
  };

  const handleDownload = async (imageUrl, fileName) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName || "custom-painting.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
      setAcceptMessage({ text: "Failed to download image", type: "error" });
      setTimeout(() => setAcceptMessage({ text: "", type: "" }), 2000);
    }
  };

  return (
    <div className="artisthome-container">
      <nav className="navbar">
        <img src={logo} alt="Logo" className="logo" onClick={() => navigate("/")} />
        <div className="nav-links">
          <button
            className="nav-button"
            onClick={() => navigate("/artistpaintings", { state: { username } })}
          >
            Your Paintings
          </button>
          <button
            className="nav-button"
            onClick={() => navigate("/artistorders", { state: { username } })}
          >
            Your Orders
          </button>
        </div>
      </nav>

      <h1>Welcome, {username}!</h1>
      <p>Showcase your beautiful paintings to the world!</p>

      <div className="content-wrapper">
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
              <label htmlFor="price">Price (in ₹)</label>
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
            <button type="submit" disabled={isUploading}>
              {isUploading ? <span className="loader"></span> : "Upload Painting"}
            </button>
          </form>
          {uploadMessage.text && (
            <div className={`message ${uploadMessage.type}`}>{uploadMessage.text}</div>
          )}
        </div>

        <div className="custom-requests-container">
          <h2>Custom Painting Requests</h2>
          {customRequests.length > 0 ? (
            <div className="requests-scroll">
              {customRequests.map((request) => (
                <div key={request._id} className="request-card">
                  <p>
                    <strong>Customer:</strong> {request.name}
                  </p>
                  <p>
                    <strong>Address:</strong> {request.address}
                  </p>
                  <p>
                    <strong>Status:</strong> {request.status}
                  </p>
                  <p>
                    <strong>Phone:</strong> {request.phone}
                  </p>
                  <img src={request.imageUrl} alt="Reference" className="request-image" />
                  <div className="button-group">
                    {request.status === "pending" && (
                      <>
                        <button
                          className="accept-button"
                          onClick={() => handleAcceptRequest(request._id)}
                        >
                          Accept Request
                        </button>
                        <button
                          className="reject-button"
                          onClick={() => handleRejectRequest(request._id)}
                        >
                          Reject Request
                        </button>
                      </>
                    )}
                    <button
                      className="download-button"
                      onClick={() =>
                        handleDownload(request.imageUrl, `${request.name}-custom-request.jpg`)
                      }
                      disabled={request.status !== "accepted"}
                    >
                      Download Image
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No custom painting requests yet.</p>
          )}
          {acceptMessage.text && (
            <div className={`message ${acceptMessage.type}`}>{acceptMessage.text}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Artisthome;