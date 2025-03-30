import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/artisthome.css";
import logo from "../assets/logo.png";
import { Menu, X } from "lucide-react";

function Artisthome() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username;
  const [activeSection, setActiveSection] = useState("upload");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Upload Painting States
  const [paintingTitle, setPaintingTitle] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [contact, setContact] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Custom Requests States
  const [customRequests, setCustomRequests] = useState([]);

  // Paintings States
  const [paintings, setPaintings] = useState([]);

  // Orders States
  const [orders, setOrders] = useState([]);

  // Chat States
  const [chatRequests, setChatRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatLoading, setChatLoading] = useState(true);

  // Toast Notification State
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  // Fetch Data Based on Active Section
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeSection === "custom" || activeSection === "chat") {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/customrequests/${username}`);
          setCustomRequests(response.data);
          if (activeSection === "chat") {
            const acceptedRequests = response.data.filter(req => req.status === "accepted");
            setChatRequests(acceptedRequests);
            setChatLoading(false);
          }
        }
        if (activeSection === "paintings") {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/paintings`);
          setPaintings(response.data.filter((painting) => painting.artist === username));
        }
        if (activeSection === "orders") {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders`);
          setOrders(response.data.filter((order) => order.artistName === username));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        showToast("Failed to fetch data", "error");
      }
    };
    fetchData();
  }, [username, activeSection]);

  // Chat Messages Polling
  useEffect(() => {
    if (selectedRequest) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/chat/messages/${selectedRequest._id}`);
          setChatMessages(response.data || []);
        } catch (error) {
          console.error("Error fetching messages:", error);
          showToast("Failed to load messages", "error");
        }
      };
      fetchMessages();
      const interval = setInterval(fetchMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [selectedRequest]);

  // Upload Painting Handler
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
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/uploadpainting`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showToast(response.data.message);
      setPaintingTitle("");
      setImage(null);
      setPrice("");
      setContact("");
      setTimeout(() => setIsUploading(false), 2000);
    } catch (error) {
      showToast(error.response?.data?.error || "Upload Failed", "error");
      setIsUploading(false);
    }
  };

  // Custom Request Handlers
  const handleAcceptRequest = async (requestId) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/customrequests/${requestId}`, {
        status: "accepted",
      });
      showToast(response.data.message);
      setCustomRequests((prev) =>
        prev.map((req) => (req._id === requestId ? { ...req, status: "accepted" } : req))
      );
    } catch (error) {
      showToast("Failed to accept request", "error");
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/customrequests/${requestId}`, {
        status: "rejected",
      });
      showToast(response.data.message);
      setCustomRequests((prev) =>
        prev.map((req) => (req._id === requestId ? { ...req, status: "rejected" } : req))
      );
    } catch (error) {
      showToast("Failed to reject request", "error");
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
      showToast("Image downloaded successfully");
    } catch (error) {
      showToast("Failed to download image", "error");
    }
  };

  // Painting Delete Handler
  const handleDelete = async (paintingId) => {
    if (window.confirm("Are you sure you want to delete this painting?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/paintings/${paintingId}`, {
          params: { artist: username },
        });
        setPaintings((prev) => prev.filter((painting) => painting._id !== paintingId));
        showToast("Painting deleted successfully");
      } catch (error) {
        showToast("Failed to delete painting", "error");
      }
    }
  };

  // Chat Handlers
  const handleSelectChat = (request) => {
    setSelectedRequest(request);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedRequest) return;

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/chat/message`, {
        sender: username,
        receiver: selectedRequest.name,
        message: newMessage,
        requestId: selectedRequest._id,
      });
      setNewMessage("");
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/chat/messages/${selectedRequest._id}`);
      setChatMessages(response.data || []);
    } catch (error) {
      showToast("Failed to send message", "error");
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "upload":
        return (
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
          </div>
        );
      case "custom":
        return (
          <div className="custom-requests-container">
            <h2>Custom Painting Requests</h2>
            {customRequests.length > 0 ? (
              customRequests.map((request) => (
                <div key={request._id} className="request-card">
                  <p><strong>Customer:</strong> {request.name}</p>
                  <p><strong>Address:</strong> {request.address}</p>
                  <p><strong>Status:</strong> {request.status}</p>
                  <p><strong>Phone:</strong> {request.phone}</p>
                  <div className="request-image-wrapper">
                    <img src={request.imageUrl} alt="Reference" className="request-image" />
                  </div>
                  <div className="button-group">
                    {request.status === "pending" && (
                      <>
                        <button
                          className="accept-button"
                          onClick={() => handleAcceptRequest(request._id)}
                        >
                          Accept
                        </button>
                        <button
                          className="reject-button"
                          onClick={() => handleRejectRequest(request._id)}
                        >
                          Reject
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
                      Download
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-requests">No custom painting requests yet.</p>
            )}
          </div>
        );
      case "paintings":
        return (
          <div className="paintings-container">
            <h2>{username}'s Paintings</h2>
            {paintings.length > 0 ? (
              paintings.map((painting) => (
                <div key={painting._id} className="painting-card">
                  <div className="painting-image-wrapper">
                    <img src={painting.imageUrl} alt={painting.title} className="painting-image" />
                  </div>
                  <h3>{painting.title}</h3>
                  <p>Price: ₹{painting.price}</p>
                  <p>Contact: {painting.contact}</p>
                  <button
                    onClick={() => handleDelete(painting._id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="no-requests">No paintings uploaded yet!</p>
            )}
          </div>
        );
      case "orders":
        return (
          <div className="orders-container">
            <h2>{username}'s Orders</h2>
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order._id} className="order-card">
                  <div className="order-image-wrapper">
                    <img src={order.imageUrl} alt={order.paintingTitle} className="order-image" />
                  </div>
                  <h3>{order.paintingTitle}</h3>
                  <p>Price: ₹{order.price}</p>
                  <p>Ordered by: {order.customerName}</p>
                  <p>Customer Address: {order.customerAddress}</p>
                  <p>Customer Phone: {order.customerPhone}</p>
                  <p>Artist Contact: {order.contact}</p>
                </div>
              ))
            ) : (
              <p className="no-requests">No orders received yet!</p>
            )}
          </div>
        );
      case "chat":
        return (
          <div className="chat-container">
            <h2>Chat Dashboard</h2>
            <div className="chat-dashboard">
              <div className="chat-list">
                <h3>Your Chats</h3>
                {chatLoading ? (
                  <p>Loading chats...</p>
                ) : chatRequests.length > 0 ? (
                  chatRequests.map((request) => (
                    <div
                      key={request._id}
                      className={`chat-item ${selectedRequest?._id === request._id ? "selected" : ""}`}
                      onClick={() => handleSelectChat(request)}
                    >
                      <p>{request.name}</p>
                      <span>Request ID: {request._id.slice(-6)}</span>
                    </div>
                  ))
                ) : (
                  <p>No accepted requests to chat about yet.</p>
                )}
              </div>
              <div className="chat-window">
                {selectedRequest ? (
                  <>
                    <h3>Chat with {selectedRequest.name}</h3>
                    <div className="chat-messages">
                      {chatMessages.map((msg, index) => (
                        <div
                          key={index}
                          className={`chat-message ${msg.sender === username ? "sent" : "received"}`}
                        >
                          <p>{msg.message}</p>
                          <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                        </div>
                      ))}
                    </div>
                    <form onSubmit={handleSendMessage} className="chat-input">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                      />
                      <button type="submit">Send</button>
                    </form>
                  </>
                ) : (
                  <p className="no-requests">Select a chat to start messaging</p>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="artisthome-container">
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="sidebar-logo" onClick={() => navigate("/")} />
          <h3>{username}</h3>
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <ul className="sidebar-menu">
          <li className={activeSection === "upload" ? "active" : ""} onClick={() => { setActiveSection("upload"); setSidebarOpen(false); }}>
            Upload Painting
          </li>
          <li className={activeSection === "custom" ? "active" : ""} onClick={() => { setActiveSection("custom"); setSidebarOpen(false); }}>
            Custom Requests
          </li>
          <li className={activeSection === "paintings" ? "active" : ""} onClick={() => { setActiveSection("paintings"); setSidebarOpen(false); }}>
            Your Paintings
          </li>
          <li className={activeSection === "orders" ? "active" : ""} onClick={() => { setActiveSection("orders"); setSidebarOpen(false); }}>
            Your Orders
          </li>
          <li className={activeSection === "chat" ? "active" : ""} onClick={() => { setActiveSection("chat"); setSidebarOpen(false); }}>
            Chat with Customers
          </li>
        </ul>
      </div>

      <div className="main-content">
        <button className="hamburger" onClick={() => setSidebarOpen(true)}>
          <Menu size={30} />
        </button>
        <h1 className="welcome-title">Welcome, {username}!</h1>
        <p className="welcome-subtitle">Showcase your beautiful paintings to the world!</p>
        <div className="content-wrapper">{renderContent()}</div>
      </div>

      {toast.show && (
        <div className={`toast-notification toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default Artisthome;