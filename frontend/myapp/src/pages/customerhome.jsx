// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import "../styles/customerhome.css";
// // import logo from "../assets/logo.png";
// // function CustomerHome() {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const username = location.state?.username;
// //   const [paintings, setPaintings] = useState([]);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [requestName, setRequestName] = useState(username || "");
// //   const [requestAddress, setRequestAddress] = useState("");
// //   const [requestPhone, setRequestPhone] = useState("");
// //   const [requestImage, setRequestImage] = useState(null);
// //   const [selectedArtist, setSelectedArtist] = useState("");
// //   const [artists, setArtists] = useState([]);
// //   const [customerRequests, setCustomerRequests] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [showOrderPopup, setShowOrderPopup] = useState(false);
// //   const [orderDetails, setOrderDetails] = useState({
// //     name: username || "",
// //     address: "",
// //     phone: "",
// //   });
// //   const [selectedPainting, setSelectedPainting] = useState(null);
// //   const [isRequestLoading, setIsRequestLoading] = useState(false);
// //   const [isOrderLoading, setIsOrderLoading] = useState(false); // New loading state for orders

// //   const fetchInitialData = async () => {
// //     try {
// //       setLoading(true);
// //       const [paintingsResponse, artistsResponse] = await Promise.all([
// //         axios.get(`${import.meta.env.VITE_API_URL}/api/paintings`),
// //         axios.get(`${import.meta.env.VITE_API_URL}/api/artists`),
// //       ]);
// //       setPaintings(paintingsResponse.data || []);
// //       setArtists(artistsResponse.data || []);
// //     } catch (error) {
// //       console.error("Error fetching initial data:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchCustomerRequests = async () => {
// //     try {
// //       const email = location.state?.email || `${username}@example.com`;
// //       const requestsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/myrequests/${email}`);
// //       setCustomerRequests(requestsResponse.data || []);
// //     } catch (error) {
// //       console.error("Error fetching customer requests:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchInitialData();
// //     fetchCustomerRequests();
// //     const interval = setInterval(fetchCustomerRequests, 5000);
// //     return () => clearInterval(interval);
// //   }, [username, location.state]);

// //   const filteredPaintings = paintings.filter((painting) =>
// //     searchQuery
// //       ? painting.artist.toLowerCase().includes(searchQuery.toLowerCase())
// //       : true
// //   );

// //   const handleOrderClick = (painting) => {
// //     setSelectedPainting(painting);
// //     setShowOrderPopup(true);
// //   };

// //   const handleOrderSubmit = async (e) => {
// //     e.preventDefault();
// //     setIsOrderLoading(true); // Start loading
// //     try {
// //       const orderData = {
// //         customerName: orderDetails.name,
// //         artistName: selectedPainting.artist,
// //         paintingTitle: selectedPainting.title,
// //         price: selectedPainting.price,
// //         contact: selectedPainting.contact,
// //         imageUrl: selectedPainting.imageUrl,
// //         customerAddress: orderDetails.address,
// //         customerPhone: orderDetails.phone,
// //       };
// //       await axios.post(`${import.meta.env.VITE_API_URL}/api/order`, orderData);
// //       alert(`Order placed for ${selectedPainting.title}! An email has been sent to ${selectedPainting.artist}.`);
// //       setShowOrderPopup(false);
// //       setOrderDetails({ name: username || "", address: "", phone: "" });
// //       setSelectedPainting(null);
// //     } catch (error) {
// //       console.error("Order failed:", error);
// //       alert("Failed to place order. Please try again.");
// //     } finally {
// //       setIsOrderLoading(false); // Stop loading
// //     }
// //   };

// //   const handleRequestSubmit = async (e) => {
// //     e.preventDefault();
// //     setIsRequestLoading(true);
// //     const email = location.state?.email || `${username}@example.com`;
// //     const formData = new FormData();
// //     formData.append("name", requestName);
// //     formData.append("address", requestAddress);
// //     formData.append("phone", requestPhone);
// //     formData.append("image", requestImage);
// //     formData.append("artist", selectedArtist);
// //     formData.append("customerEmail", email);

// //     try {
// //       const response = await axios.post(
// //         `${import.meta.env.VITE_API_URL}/api/custompaintingrequest`,
// //         formData,
// //         { headers: { "Content-Type": "multipart/form-data" } }
// //       );
// //       alert(`${response.data.message} An email has been sent to ${selectedArtist}.`);
// //       setCustomerRequests([...customerRequests, response.data.request]);
// //       setRequestAddress("");
// //       setRequestPhone("");
// //       setRequestImage(null);
// //       setSelectedArtist("");
// //     } catch (error) {
// //       alert(error.response?.data?.error || "Request Failed");
// //     } finally {
// //       setIsRequestLoading(false);
// //     }
// //   };

// //   const handleViewOrders = () => {
// //     navigate("/customerorders", { state: { username, email: location.state?.email } });
// //   };

// //   return (
// //     <div className="customerhome-container">
// //       <nav className="navbar">
// //         <img src={logo} alt="Logo" className="logo" onClick={() => navigate("/")} />
// //         <div className="nav-links">
// //           <button onClick={handleViewOrders} className="nav-button">
// //             View Your Orders
// //           </button>
// //         </div>
// //       </nav>

// //       <h1>Welcome, {username || "Guest"}!</h1>
// //       <p>Find and order beautiful paintings from artists</p>

// //       <input
// //         type="text"
// //         placeholder="Search paintings by artist..."
// //         value={searchQuery}
// //         onChange={(e) => setSearchQuery(e.target.value)}
// //         className="search-bar"
// //       />

// //       <div className="paintings-container">
// //         {loading ? (
// //           <p>Loading paintings...</p>
// //         ) : filteredPaintings.length > 0 ? (
// //           <div className="paintings-scroll">
// //             {filteredPaintings.map((painting) => (
// //               <div key={painting._id} className="painting-card">
// //                 <img src={painting.imageUrl} alt={painting.title} />
// //                 <h3>{painting.title}</h3>
// //                 <p>Price: ₹{painting.price}</p>
// //                 <p>Artist: {painting.artist}</p>
// //                 <p>Contact: {painting.contact}</p>
// //                 <button onClick={() => handleOrderClick(painting)}>Order</button>
// //               </div>
// //             ))}
// //           </div>
// //         ) : (
// //           <p>No paintings found for this artist!</p>
// //         )}
// //       </div>

// //       {showOrderPopup && (
// //         <div className="popup-overlay">
// //           <div className="popup-content">
// //             <h2>Order Details</h2>
// //             <form onSubmit={handleOrderSubmit}>
// //               <div className="form-group">
// //                 <label htmlFor="order-name">Your Name</label>
// //                 <input
// //                   type="text"
// //                   id="order-name"
// //                   value={orderDetails.name}
// //                   onChange={(e) => setOrderDetails({ ...orderDetails, name: e.target.value })}
// //                   required
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label htmlFor="order-address">Delivery Address</label>
// //                 <input
// //                   type="text"
// //                   id="order-address"
// //                   value={orderDetails.address}
// //                   onChange={(e) => setOrderDetails({ ...orderDetails, address: e.target.value })}
// //                   required
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label htmlFor="order-phone">Phone Number</label>
// //                 <input
// //                   type="tel"
// //                   id="order-phone"
// //                   value={orderDetails.phone}
// //                   onChange={(e) => setOrderDetails({ ...orderDetails, phone: e.target.value })}
// //                   pattern="[0-9]{10}"
// //                   required
// //                 />
// //               </div>
// //               <button type="submit" disabled={isOrderLoading}>
// //                 {isOrderLoading ? <span className="spinner"></span> : "Confirm Order"}
// //               </button>
// //               <button
// //                 type="button"
// //                 onClick={() => setShowOrderPopup(false)}
// //                 style={{ marginLeft: "10px" }}
// //               >
// //                 Cancel
// //               </button>
// //             </form>
// //           </div>
// //         </div>
// //       )}

// //       <div className="request-container">
// //         <h2>Request a Custom Painting</h2>
// //         <form onSubmit={handleRequestSubmit}>
// //           <div className="form-group">
// //             <label htmlFor="request-name">Your Name</label>
// //             <input
// //               type="text"
// //               id="request-name"
// //               value={requestName}
// //               onChange={(e) => setRequestName(e.target.value)}
// //               required
// //             />
// //           </div>
// //           <div className="form-group">
// //             <label htmlFor="request-address">Delivery Address</label>
// //             <input
// //               type="text"
// //               id="request-address"
// //               value={requestAddress}
// //               onChange={(e) => setRequestAddress(e.target.value)}
// //               required
// //             />
// //           </div>
// //           <div className="form-group">
// //             <label htmlFor="request-phone">Phone Number</label>
// //             <input
// //               type="tel"
// //               id="request-phone"
// //               value={requestPhone}
// //               onChange={(e) => setRequestPhone(e.target.value)}
// //               required
// //               pattern="[0-9]{10}"
// //             />
// //           </div>
// //           <div className="form-group">
// //             <label htmlFor="request-artist">Choose Artist</label>
// //             <select
// //               id="request-artist"
// //               value={selectedArtist}
// //               onChange={(e) => setSelectedArtist(e.target.value)}
// //               required
// //             >
// //               <option value="">Select an Artist</option>
// //               {artists.map((artist) => (
// //                 <option key={artist._id} value={artist.sname}>
// //                   {artist.sname}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>
// //           <div className="form-group">
// //             <label htmlFor="request-image">Reference Image</label>
// //             <input
// //               type="file"
// //               id="request-image"
// //               accept="image/*"
// //               onChange={(e) => setRequestImage(e.target.files[0])}
// //               required
// //             />
// //           </div>
// //           <button type="submit" disabled={isRequestLoading} className="submit-request-button">
// //             {isRequestLoading ? <span className="spinner"></span> : "Submit Request"}
// //           </button>
// //         </form>
// //       </div>

// //       <div className="requests-container">
// //         <h2>Your Custom Painting Requests</h2>
// //         {loading ? (
// //           <p>Loading requests...</p>
// //         ) : customerRequests.length > 0 ? (
// //           <div className="requests-scroll">
// //             {customerRequests.map((request) => (
// //               <div key={request._id} className="request-card">
// //                 <p><strong>Name:</strong> {request.name}</p>
// //                 <p><strong>Address:</strong> {request.address}</p>
// //                 <p><strong>Phone:</strong> {request.phone}</p>
// //                 <p><strong>Artist:</strong> {request.artist}</p>
// //                 <p><strong>Status:</strong> {request.status}</p>
// //                 <img src={request.imageUrl} alt="Reference" className="request-image" />
// //               </div>
// //             ))}
// //           </div>
// //         ) : (
// //           <p>No custom painting requests yet.</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default CustomerHome;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import "../styles/customerhome.css";
// import logo from "../assets/logo.png";

// function CustomerHome() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const username = location.state?.username;
//   const [paintings, setPaintings] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [requestName, setRequestName] = useState(username || "");
//   const [requestAddress, setRequestAddress] = useState("");
//   const [requestPhone, setRequestPhone] = useState("");
//   const [requestImage, setRequestImage] = useState(null);
//   const [selectedArtist, setSelectedArtist] = useState("");
//   const [artists, setArtists] = useState([]);
//   const [customerRequests, setCustomerRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showOrderPopup, setShowOrderPopup] = useState(false);
//   const [orderDetails, setOrderDetails] = useState({
//     name: username || "",
//     address: "",
//     phone: "",
//   });
//   const [selectedPainting, setSelectedPainting] = useState(null);
//   const [isRequestLoading, setIsRequestLoading] = useState(false);
//   const [isOrderLoading, setIsOrderLoading] = useState(false);
//   const [showChatPopup, setShowChatPopup] = useState(false);
//   const [selectedRequestForChat, setSelectedRequestForChat] = useState(null);
//   const [chatMessages, setChatMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [chatError, setChatError] = useState(null);

//   const fetchInitialData = async () => {
//     try {
//       setLoading(true);
//       const [paintingsResponse, artistsResponse] = await Promise.all([
//         axios.get(`${import.meta.env.VITE_API_URL}/api/paintings`),
//         axios.get(`${import.meta.env.VITE_API_URL}/api/artists`),
//       ]);
//       setPaintings(paintingsResponse.data || []);
//       setArtists(artistsResponse.data || []);
//     } catch (error) {
//       console.error("Error fetching initial data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCustomerRequests = async () => {
//     try {
//       const email = location.state?.email || `${username}@example.com`;
//       const requestsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/myrequests/${email}`);
//       setCustomerRequests(requestsResponse.data || []);
//     } catch (error) {
//       console.error("Error fetching customer requests:", error);
//     }
//   };

//   const fetchChatMessages = async (requestId) => {
//     try {
//       const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/chat/messages/${requestId}`, {
//         timeout: 10000, // Set a 10-second timeout
//       });
//       setChatMessages(response.data || []);
//       setChatError(null);
//     } catch (error) {
//       console.error("Fetch Chat Error:", error);
//       setChatError("Failed to load messages. Retrying...");
//     }
//   };

//   useEffect(() => {
//     fetchInitialData();
//     fetchCustomerRequests();
//     const interval = setInterval(fetchCustomerRequests, 5000);
//     return () => clearInterval(interval);
//   }, [username, location.state]);

//   useEffect(() => {
//     if (selectedRequestForChat) {
//       fetchChatMessages(selectedRequestForChat._id);
//       const chatInterval = setInterval(() => fetchChatMessages(selectedRequestForChat._id), 5000); // Changed to 5 seconds
//       return () => clearInterval(chatInterval);
//     }
//   }, [selectedRequestForChat]);

//   const filteredPaintings = paintings.filter((painting) =>
//     searchQuery
//       ? painting.artist.toLowerCase().includes(searchQuery.toLowerCase())
//       : true
//   );

//   const handleOrderClick = (painting) => {
//     setSelectedPainting(painting);
//     setShowOrderPopup(true);
//   };

//   const handleOrderSubmit = async (e) => {
//     e.preventDefault();
//     setIsOrderLoading(true);
//     try {
//       const orderData = {
//         customerName: orderDetails.name,
//         artistName: selectedPainting.artist,
//         paintingTitle: selectedPainting.title,
//         price: selectedPainting.price,
//         contact: selectedPainting.contact,
//         imageUrl: selectedPainting.imageUrl,
//         customerAddress: orderDetails.address,
//         customerPhone: orderDetails.phone,
//       };
//       await axios.post(`${import.meta.env.VITE_API_URL}/api/order`, orderData);
//       alert(`Order placed for ${selectedPainting.title}! An email has been sent to ${selectedPainting.artist}.`);
//       setShowOrderPopup(false);
//       setOrderDetails({ name: username || "", address: "", phone: "" });
//       setSelectedPainting(null);
//     } catch (error) {
//       console.error("Order failed:", error);
//       alert("Failed to place order. Please try again.");
//     } finally {
//       setIsOrderLoading(false);
//     }
//   };

//   const handleRequestSubmit = async (e) => {
//     e.preventDefault();
//     setIsRequestLoading(true);
//     const email = location.state?.email || `${username}@example.com`;
//     const formData = new FormData();
//     formData.append("name", requestName);
//     formData.append("address", requestAddress);
//     formData.append("phone", requestPhone);
//     formData.append("image", requestImage);
//     formData.append("artist", selectedArtist);
//     formData.append("customerEmail", email);

//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/custompaintingrequest`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       alert(`${response.data.message} An email has been sent to ${selectedArtist}.`);
//       setCustomerRequests([...customerRequests, response.data.request]);
//       setRequestAddress("");
//       setRequestPhone("");
//       setRequestImage(null);
//       setSelectedArtist("");
//     } catch (error) {
//       alert(error.response?.data?.error || "Request Failed");
//     } finally {
//       setIsRequestLoading(false);
//     }
//   };

//   const handleViewOrders = () => {
//     navigate("/customerorders", { state: { username, email: location.state?.email } });
//   };

//   const handleChatClick = (request) => {
//     if (request.status === "accepted") {
//       setSelectedRequestForChat(request);
//       setShowChatPopup(true);
//     }
//   };

//   const handleCloseChat = () => {
//     setShowChatPopup(false);
//     setSelectedRequestForChat(null);
//     setChatMessages([]);
//     setNewMessage("");
//     setChatError(null);
//   };

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!newMessage.trim() || !selectedRequestForChat) return;

//     try {
//       await axios.post(`${import.meta.env.VITE_API_URL}/api/chat/message`, {
//         sender: username,
//         receiver: selectedRequestForChat.artist,
//         message: newMessage,
//         requestId: selectedRequestForChat._id,
//       });
//       setNewMessage("");
//       fetchChatMessages(selectedRequestForChat._id);
//     } catch (error) {
//       console.error("Error sending message:", error);
//       setChatError("Failed to send message. Please try again.");
//     }
//   };

//   return (
//     <div className="customerhome-container">
//       <nav className="navbar">
//         <img src={logo} alt="Logo" className="logo" onClick={() => navigate("/")} />
//         <div className="nav-links">
//           <button onClick={handleViewOrders} className="nav-button">
//             View Your Orders
//           </button>
//         </div>
//       </nav>

//       <h1>Welcome, {username || "Guest"}!</h1>
//       <p>Find and order beautiful paintings from artists</p>

//       <input
//         type="text"
//         placeholder="Search paintings by artist..."
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         className="search-bar"
//       />

//       <div className="paintings-container">
//         {loading ? (
//           <p>Loading paintings...</p>
//         ) : filteredPaintings.length > 0 ? (
//           <div className="paintings-scroll">
//             {filteredPaintings.map((painting) => (
//               <div key={painting._id} className="painting-card">
//                 <img src={painting.imageUrl} alt={painting.title} />
//                 <h3>{painting.title}</h3>
//                 <p>Price: ₹{painting.price}</p>
//                 <p>Artist: {painting.artist}</p>
//                 <p>Contact: {painting.contact}</p>
//                 <button onClick={() => handleOrderClick(painting)}>Order</button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No paintings found for this artist!</p>
//         )}
//       </div>

//       {showOrderPopup && (
//         <div className="popup-overlay">
//           <div className="popup-content">
//             <h2>Order Details</h2>
//             <form onSubmit={handleOrderSubmit}>
//               <div className="form-group">
//                 <label htmlFor="order-name">Your Name</label>
//                 <input
//                   type="text"
//                   id="order-name"
//                   value={orderDetails.name}
//                   onChange={(e) => setOrderDetails({ ...orderDetails, name: e.target.value })}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="order-address">Delivery Address</label>
//                 <input
//                   type="text"
//                   id="order-address"
//                   value={orderDetails.address}
//                   onChange={(e) => setOrderDetails({ ...orderDetails, address: e.target.value })}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="order-phone">Phone Number</label>
//                 <input
//                   type="tel"
//                   id="order-phone"
//                   value={orderDetails.phone}
//                   onChange={(e) => setOrderDetails({ ...orderDetails, phone: e.target.value })}
//                   pattern="[0-9]{10}"
//                   required
//                 />
//               </div>
//               <button type="submit" disabled={isOrderLoading}>
//                 {isOrderLoading ? <span className="spinner"></span> : "Confirm Order"}
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setShowOrderPopup(false)}
//                 style={{ marginLeft: "10px" }}
//               >
//                 Cancel
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       <div className="request-container">
//         <h2>Request a Custom Painting</h2>
//         <form onSubmit={handleRequestSubmit}>
//           <div className="form-group">
//             <label htmlFor="request-name">Your Name</label>
//             <input
//               type="text"
//               id="request-name"
//               value={requestName}
//               onChange={(e) => setRequestName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="request-address">Delivery Address</label>
//             <input
//               type="text"
//               id="request-address"
//               value={requestAddress}
//               onChange={(e) => setRequestAddress(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="request-phone">Phone Number</label>
//             <input
//               type="tel"
//               id="request-phone"
//               value={requestPhone}
//               onChange={(e) => setRequestPhone(e.target.value)}
//               required
//               pattern="[0-9]{10}"
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="request-artist">Choose Artist</label>
//             <select
//               id="request-artist"
//               value={selectedArtist}
//               onChange={(e) => setSelectedArtist(e.target.value)}
//               required
//             >
//               <option value="">Select an Artist</option>
//               {artists.map((artist) => (
//                 <option key={artist._id} value={artist.sname}>
//                   {artist.sname}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="request-image">Reference Image</label>
//             <input
//               type="file"
//               id="request-image"
//               accept="image/*"
//               onChange={(e) => setRequestImage(e.target.files[0])}
//               required
//             />
//           </div>
//           <button type="submit" disabled={isRequestLoading} className="submit-request-button">
//             {isRequestLoading ? <span className="spinner"></span> : "Submit Request"}
//           </button>
//         </form>
//       </div>

//       <div className="requests-container">
//         <h2>Your Custom Painting Requests</h2>
//         {loading ? (
//           <p>Loading requests...</p>
//         ) : customerRequests.length > 0 ? (
//           <div className="requests-scroll">
//             {customerRequests.map((request) => (
//               <div key={request._id} className="request-card">
//                 <p><strong>Name:</strong> {request.name}</p>
//                 <p><strong>Address:</strong> {request.address}</p>
//                 <p><strong>Phone:</strong> {request.phone}</p>
//                 <p><strong>Artist:</strong> {request.artist}</p>
//                 <p><strong>Status:</strong> {request.status}</p>
//                 <img src={request.imageUrl} alt="Reference" className="request-image" />
//                 <button
//                   onClick={() => handleChatClick(request)}
//                   disabled={request.status !== "accepted"}
//                   className={`chat-button ${request.status === "accepted" ? "enabled" : ""}`}
//                 >
//                   Chat with Artist
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No custom painting requests yet.</p>
//         )}
//       </div>

//       {showChatPopup && selectedRequestForChat && (
//         <div className="popup-overlay">
//           <div className="popup-content chat-popup">
//             <h2>Chat with {selectedRequestForChat.artist}</h2>
//             {chatError && <p className="chat-error">{chatError}</p>}
//             <div className="chat-container">
//               <div className="chat-messages">
//                 {chatMessages.map((msg, index) => (
//                   <div
//                     key={index}
//                     className={`chat-message ${msg.sender === username ? "sent" : "received"}`}
//                   >
//                     <p>{msg.message}</p>
//                     <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
//                   </div>
//                 ))}
//               </div>
//               <form onSubmit={handleSendMessage} className="chat-input">
//                 <input
//                   type="text"
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   placeholder="Type your message..."
//                 />
//                 <button type="submit">Send</button>
//               </form>
//             </div>
//             <button onClick={handleCloseChat} className="close-chat-button">
//               Close Chat
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CustomerHome;
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/customerhome.css";
import logo from "../assets/logo.png";

function CustomerHome() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username;
  const [paintings, setPaintings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [requestName, setRequestName] = useState(username || "");
  const [requestAddress, setRequestAddress] = useState("");
  const [requestPhone, setRequestPhone] = useState("");
  const [requestImage, setRequestImage] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState("");
  const [artists, setArtists] = useState([]);
  const [customerRequests, setCustomerRequests] = useState([]);
  const [orders, setOrders] = useState([]); // State for orders
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true); // Separate loading for orders
  const [error, setError] = useState(null); // Error for orders
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    name: username || "",
    address: "",
    phone: "",
  });
  const [selectedPainting, setSelectedPainting] = useState(null);
  const [isRequestLoading, setIsRequestLoading] = useState(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const [showChatPopup, setShowChatPopup] = useState(false);
  const [selectedRequestForChat, setSelectedRequestForChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatError, setChatError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar state for mobile
  const [activeSection, setActiveSection] = useState("paintings"); // Track active section
  const [toast, setToast] = useState({ message: "", type: "" }); // Toast notification state

  // Refs for scrolling to sections
  const paintingsRef = useRef(null);
  const requestsRef = useRef(null);
  const ordersRef = useRef(null);
  const chatRef = useRef(null);

  // Fetch paintings and artists
  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [paintingsResponse, artistsResponse] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/paintings`),
        axios.get(`${import.meta.env.VITE_API_URL}/api/artists`),
      ]);
      setPaintings(paintingsResponse.data || []);
      setArtists(artistsResponse.data || []);
    } catch (error) {
      console.error("Error fetching initial data:", error);
      setToast({ message: "Failed to load paintings and artists.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Fetch customer requests
  const fetchCustomerRequests = async () => {
    try {
      const email = location.state?.email || `${username}@example.com`;
      const requestsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/myrequests/${email}`);
      setCustomerRequests(requestsResponse.data || []);
    } catch (error) {
      console.error("Error fetching customer requests:", error);
      setToast({ message: "Failed to load custom requests.", type: "error" });
    }
  };

  // Fetch orders (integrated from CustomerOrders)
  const fetchOrders = async () => {
    if (!username) {
      setError("No username provided. Please log in again.");
      setOrdersLoading(false);
      return;
    }

    try {
      setOrdersLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/customerorders/${username}`);
      setOrders(response.data || []);
      setError(null);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to load your orders. Please try again later.");
      setOrders([]);
      setToast({ message: "Failed to load orders.", type: "error" });
    } finally {
      setOrdersLoading(false);
    }
  };

  // Fetch chat messages
  const fetchChatMessages = async (requestId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/chat/messages/${requestId}`, {
        timeout: 10000,
      });
      setChatMessages(response.data || []);
      setChatError(null);
    } catch (error) {
      console.error("Fetch Chat Error:", error);
      setChatError("Failed to load messages. Retrying...");
      setToast({ message: "Failed to load chat messages.", type: "error" });
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchInitialData();
    fetchCustomerRequests();
    fetchOrders();
    const interval = setInterval(fetchCustomerRequests, 5000);
    return () => clearInterval(interval);
  }, [username, location.state]);

  // Fetch chat messages when a request is selected
  useEffect(() => {
    if (selectedRequestForChat) {
      fetchChatMessages(selectedRequestForChat._id);
      const chatInterval = setInterval(() => fetchChatMessages(selectedRequestForChat._id), 5000);
      return () => clearInterval(chatInterval);
    }
  }, [selectedRequestForChat]);

  // Filter paintings based on search query
  const filteredPaintings = paintings.filter((painting) =>
    searchQuery
      ? painting.artist.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  // Handle order popup
  const handleOrderClick = (painting) => {
    setSelectedPainting(painting);
    setShowOrderPopup(true);
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setIsOrderLoading(true);
    try {
      const orderData = {
        customerName: orderDetails.name,
        artistName: selectedPainting.artist,
        paintingTitle: selectedPainting.title,
        price: selectedPainting.price,
        contact: selectedPainting.contact,
        imageUrl: selectedPainting.imageUrl,
        customerAddress: orderDetails.address,
        customerPhone: orderDetails.phone,
      };
      await axios.post(`${import.meta.env.VITE_API_URL}/api/order`, orderData);
      setToast({ message: `Order placed for ${selectedPainting.title}!`, type: "success" });
      fetchOrders(); // Refresh orders after placing a new one
      setShowOrderPopup(false);
      setOrderDetails({ name: username || "", address: "", phone: "" });
      setSelectedPainting(null);
    } catch (error) {
      console.error("Order failed:", error);
      setToast({ message: "Failed to place order.", type: "error" });
    } finally {
      setIsOrderLoading(false);
    }
  };

  // Handle custom painting request
  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setIsRequestLoading(true);
    const email = location.state?.email || `${username}@example.com`;
    const formData = new FormData();
    formData.append("name", requestName);
    formData.append("address", requestAddress);
    formData.append("phone", requestPhone);
    formData.append("image", requestImage);
    formData.append("artist", selectedArtist);
    formData.append("customerEmail", email);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/custompaintingrequest`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setToast({ message: `${response.data.message}`, type: "success" });
      setCustomerRequests([...customerRequests, response.data.request]);
      setRequestAddress("");
      setRequestPhone("");
      setRequestImage(null);
      setSelectedArtist("");
    } catch (error) {
      setToast({ message: error.response?.data?.error || "Request Failed", type: "error" });
    } finally {
      setIsRequestLoading(false);
    }
  };

  // Handle chat functionality
  const handleChatClick = (request) => {
    if (request.status === "accepted") {
      setSelectedRequestForChat(request);
      setShowChatPopup(true);
    }
  };

  const handleCloseChat = () => {
    setShowChatPopup(false);
    setSelectedRequestForChat(null);
    setChatMessages([]);
    setNewMessage("");
    setChatError(null);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedRequestForChat) return;

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/chat/message`, {
        sender: username,
        receiver: selectedRequestForChat.artist,
        message: newMessage,
        requestId: selectedRequestForChat._id,
      });
      setNewMessage("");
      fetchChatMessages(selectedRequestForChat._id);
      setToast({ message: "Message sent!", type: "success" });
    } catch (error) {
      console.error("Error sending message:", error);
      setChatError("Failed to send message. Please try again.");
      setToast({ message: "Failed to send message.", type: "error" });
    }
  };

  // Sidebar navigation handlers
  const handleSectionChange = (section, ref) => {
    setActiveSection(section);
    ref.current.scrollIntoView({ behavior: "smooth" });
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="customerhome-container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="sidebar-logo" onClick={() => navigate("/")} />
          <button className="sidebar-close" onClick={toggleSidebar}>
            ✕
          </button>
        </div>
        <ul className="sidebar-menu">
          <li
            className={activeSection === "paintings" ? "active" : ""}
            onClick={() => handleSectionChange("paintings", paintingsRef)}
          >
            Paintings
          </li>
          <li
            className={activeSection === "requests" ? "active" : ""}
            onClick={() => handleSectionChange("requests", requestsRef)}
          >
            Custom Requests
          </li>
          <li
            className={activeSection === "orders" ? "active" : ""}
            onClick={() => handleSectionChange("orders", ordersRef)}
          >
            Your Orders
          </li>
          <li
            className={activeSection === "chat" ? "active" : ""}
            onClick={() => handleSectionChange("chat", chatRef)}
          >
            Chat with Artists
          </li>
        </ul>
      </div>

      {/* Hamburger Menu */}
      <button className="hamburger" onClick={toggleSidebar}>
        <svg viewBox="0 0 24 24">
          <path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
      </button>

      {/* Main Content */}
      <div className="main-content">
        <h1 className="welcome-title">Welcome, {username || "Guest"}!</h1>
        <p className="welcome-subtitle">Find and order beautiful paintings from artists</p>

        <div className="content-wrapper">
          {/* Paintings Section */}
          <div ref={paintingsRef} className="paintings-container">
            <h2>Explore Paintings</h2>
            <input
              type="text"
              placeholder="Search paintings by artist..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-bar"
            />
            {loading ? (
              <div className="loader"></div>
            ) : filteredPaintings.length > 0 ? (
              <div className="paintings-grid">
                {filteredPaintings.map((painting) => (
                  <div key={painting._id} className="painting-card">
                    <div className="painting-image-wrapper">
                      <img src={painting.imageUrl} alt={painting.title} className="painting-image" />
                    </div>
                    <h3>{painting.title}</h3>
                    <p>Price: ₹{painting.price}</p>
                    <p>Artist: {painting.artist}</p>
                    <p>Contact: {painting.contact}</p>
                    <button onClick={() => handleOrderClick(painting)}>Order</button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-paintings">No paintings found for this artist!</div>
            )}
          </div>

          {/* Order Popup */}
          {showOrderPopup && (
            <div className="popup-overlay">
              <div className="popup-content">
                <h2>Order Details</h2>
                <form onSubmit={handleOrderSubmit}>
                  <div className="form-group">
                    <label htmlFor="order-name">Your Name</label>
                    <input
                      type="text"
                      id="order-name"
                      value={orderDetails.name}
                      onChange={(e) => setOrderDetails({ ...orderDetails, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="order-address">Delivery Address</label>
                    <input
                      type="text"
                      id="order-address"
                      value={orderDetails.address}
                      onChange={(e) => setOrderDetails({ ...orderDetails, address: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="order-phone">Phone Number</label>
                    <input
                      type="tel"
                      id="order-phone"
                      value={orderDetails.phone}
                      onChange={(e) => setOrderDetails({ ...orderDetails, phone: e.target.value })}
                      pattern="[0-9]{10}"
                      required
                    />
                  </div>
                  <button type="submit" disabled={isOrderLoading}>
                    {isOrderLoading ? <span className="loader"></span> : "Confirm Order"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowOrderPopup(false)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Custom Requests Section */}
          <div ref={requestsRef} className="request-container">
            <h2>Request a Custom Painting</h2>
            <form onSubmit={handleRequestSubmit}>
              <div className="form-group">
                <label htmlFor="request-name">Your Name</label>
                <input
                  type="text"
                  id="request-name"
                  value={requestName}
                  onChange={(e) => setRequestName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="request-address">Delivery Address</label>
                <input
                  type="text"
                  id="request-address"
                  value={requestAddress}
                  onChange={(e) => setRequestAddress(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="request-phone">Phone Number</label>
                <input
                  type="tel"
                  id="request-phone"
                  value={requestPhone}
                  onChange={(e) => setRequestPhone(e.target.value)}
                  required
                  pattern="[0-9]{10}"
                />
              </div>
              <div className="form-group">
                <label htmlFor="request-artist">Choose Artist</label>
                <select
                  id="request-artist"
                  value={selectedArtist}
                  onChange={(e) => setSelectedArtist(e.target.value)}
                  required
                >
                  <option value="">Select an Artist</option>
                  {artists.map((artist) => (
                    <option key={artist._id} value={artist.sname}>
                      {artist.sname}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="request-image">Reference Image</label>
                <input
                  type="file"
                  id="request-image"
                  accept="image/*"
                  onChange={(e) => setRequestImage(e.target.files[0])}
                  required
                />
              </div>
              <button type="submit" disabled={isRequestLoading} className="submit-request-button">
                {isRequestLoading ? <span className="loader"></span> : "Submit Request"}
              </button>
            </form>
          </div>

          {/* Your Orders Section */}
          <div ref={ordersRef} className="orders-container">
            <h2>Your Orders</h2>
            {ordersLoading ? (
              <div className="loader"></div>
            ) : error ? (
              <p className="no-orders">{error}</p>
            ) : orders.length > 0 ? (
              <div className="orders-grid">
                {orders.map((order) => (
                  <div key={order._id} className="order-card">
                    <div className="order-image-wrapper">
                      <img src={order.imageUrl} alt={order.paintingTitle} className="order-image" />
                    </div>
                    <h3>{order.paintingTitle}</h3>
                    <p><strong>Artist:</strong> {order.artistName}</p>
                    <p><strong>Price:</strong> ₹{order.price}</p>
                    <p><strong>Contact:</strong> {order.contact}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-orders">No orders placed yet.</p>
            )}
          </div>

          {/* Chat Section */}
          <div ref={chatRef} className="chat-container">
            <h2>Your Custom Painting Requests</h2>
            {loading ? (
              <div className="loader"></div>
            ) : customerRequests.length > 0 ? (
              <div className="requests-grid">
                {customerRequests.map((request) => (
                  <div key={request._id} className="request-card">
                    <p><strong>Name:</strong> {request.name}</p>
                    <p><strong>Address:</strong> {request.address}</p>
                    <p><strong>Phone:</strong> {request.phone}</p>
                    <p><strong>Artist:</strong> {request.artist}</p>
                    <p><strong>Status:</strong> {request.status}</p>
                    <div className="request-image-wrapper">
                      <img src={request.imageUrl} alt="Reference" className="request-image" />
                    </div>
                    <button
                      onClick={() => handleChatClick(request)}
                      disabled={request.status !== "accepted"}
                      className={`chat-button ${request.status === "accepted" ? "enabled" : ""}`}
                    >
                      Chat with Artist
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-requests">No custom painting requests yet.</p>
            )}
          </div>

          {/* Chat Popup */}
          {showChatPopup && selectedRequestForChat && (
            <div className="popup-overlay">
              <div className="popup-content chat-popup">
                <h2>Chat with {selectedRequestForChat.artist}</h2>
                {chatError && <p className="chat-error">{chatError}</p>}
                <div className="chat-container">
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
                </div>
                <button onClick={handleCloseChat} className="close-chat-button">
                  Close Chat
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {toast.message && (
        <div className={`toast-notification toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default CustomerHome;