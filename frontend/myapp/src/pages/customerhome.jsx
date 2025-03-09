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
//   const [isRequestLoading, setIsRequestLoading] = useState(false); // New loading state

//   const fetchInitialData = async () => {
//     try {
//       setLoading(true);
//       const [paintingsResponse, artistsResponse] = await Promise.all([
//         axios.get("https://chitra-kara-api.vercel.app/api/paintings"),
//         axios.get("https://chitra-kara-api.vercel.app/api/artists"),
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
//       const requestsResponse = await axios.get(`https://chitra-kara-api.vercel.app/api/myrequests/${email}`);
//       setCustomerRequests(requestsResponse.data || []);
//     } catch (error) {
//       console.error("Error fetching customer requests:", error);
//     }
//   };

//   useEffect(() => {
//     fetchInitialData();
//     fetchCustomerRequests();
//     const interval = setInterval(fetchCustomerRequests, 5000);
//     return () => clearInterval(interval);
//   }, [username, location.state]);

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
//       await axios.post("https://chitra-kara-api.vercel.app/api/order", orderData);
//       alert(`Order placed for ${selectedPainting.title}!`);
//       setShowOrderPopup(false);
//       setOrderDetails({ name: username || "", address: "", phone: "" });
//       setSelectedPainting(null);
//     } catch (error) {
//       console.error("Order failed:", error);
//       alert("Failed to place order. Please try again.");
//     }
//   };

//   const handleRequestSubmit = async (e) => {
//     e.preventDefault();
//     setIsRequestLoading(true); // Start loading
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
//         "https://chitra-kara-api.vercel.app/api/custompaintingrequest",
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       alert(response.data.message);
//       setCustomerRequests([...customerRequests, response.data.request]);
//       setRequestAddress("");
//       setRequestPhone("");
//       setRequestImage(null);
//       setSelectedArtist("");
//     } catch (error) {
//       alert(error.response?.data?.error || "Request Failed");
//     } finally {
//       setIsRequestLoading(false); // Stop loading
//     }
//   };

//   const handleViewOrders = () => {
//     navigate("/customerorders", { state: { username, email: location.state?.email } });
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
//               <button type="submit">Confirm Order</button>
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
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No custom painting requests yet.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CustomerHome;
import React, { useState, useEffect } from "react";
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
  const [loading, setLoading] = useState(true);
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    name: username || "",
    address: "",
    phone: "",
  });
  const [selectedPainting, setSelectedPainting] = useState(null);
  const [isRequestLoading, setIsRequestLoading] = useState(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false); // New loading state for orders

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [paintingsResponse, artistsResponse] = await Promise.all([
        axios.get("https://chitra-kara-api.vercel.app/api/paintings"),
        axios.get("https://chitra-kara-api.vercel.app/api/artists"),
      ]);
      setPaintings(paintingsResponse.data || []);
      setArtists(artistsResponse.data || []);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomerRequests = async () => {
    try {
      const email = location.state?.email || `${username}@example.com`;
      const requestsResponse = await axios.get(`https://chitra-kara-api.vercel.app/api/myrequests/${email}`);
      setCustomerRequests(requestsResponse.data || []);
    } catch (error) {
      console.error("Error fetching customer requests:", error);
    }
  };

  useEffect(() => {
    fetchInitialData();
    fetchCustomerRequests();
    const interval = setInterval(fetchCustomerRequests, 5000);
    return () => clearInterval(interval);
  }, [username, location.state]);

  const filteredPaintings = paintings.filter((painting) =>
    searchQuery
      ? painting.artist.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  const handleOrderClick = (painting) => {
    setSelectedPainting(painting);
    setShowOrderPopup(true);
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setIsOrderLoading(true); // Start loading
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
      await axios.post("https://chitra-kara-api.vercel.app/api/order", orderData);
      alert(`Order placed for ${selectedPainting.title}! An email has been sent to ${selectedPainting.artist}.`);
      setShowOrderPopup(false);
      setOrderDetails({ name: username || "", address: "", phone: "" });
      setSelectedPainting(null);
    } catch (error) {
      console.error("Order failed:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsOrderLoading(false); // Stop loading
    }
  };

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
        "https://chitra-kara-api.vercel.app/api/custompaintingrequest",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert(`${response.data.message} An email has been sent to ${selectedArtist}.`);
      setCustomerRequests([...customerRequests, response.data.request]);
      setRequestAddress("");
      setRequestPhone("");
      setRequestImage(null);
      setSelectedArtist("");
    } catch (error) {
      alert(error.response?.data?.error || "Request Failed");
    } finally {
      setIsRequestLoading(false);
    }
  };

  const handleViewOrders = () => {
    navigate("/customerorders", { state: { username, email: location.state?.email } });
  };

  return (
    <div className="customerhome-container">
      <nav className="navbar">
        <img src={logo} alt="Logo" className="logo" onClick={() => navigate("/")} />
        <div className="nav-links">
          <button onClick={handleViewOrders} className="nav-button">
            View Your Orders
          </button>
        </div>
      </nav>

      <h1>Welcome, {username || "Guest"}!</h1>
      <p>Find and order beautiful paintings from artists</p>

      <input
        type="text"
        placeholder="Search paintings by artist..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      <div className="paintings-container">
        {loading ? (
          <p>Loading paintings...</p>
        ) : filteredPaintings.length > 0 ? (
          <div className="paintings-scroll">
            {filteredPaintings.map((painting) => (
              <div key={painting._id} className="painting-card">
                <img src={painting.imageUrl} alt={painting.title} />
                <h3>{painting.title}</h3>
                <p>Price: ₹{painting.price}</p>
                <p>Artist: {painting.artist}</p>
                <p>Contact: {painting.contact}</p>
                <button onClick={() => handleOrderClick(painting)}>Order</button>
              </div>
            ))}
          </div>
        ) : (
          <p>No paintings found for this artist!</p>
        )}
      </div>

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
                {isOrderLoading ? <span className="spinner"></span> : "Confirm Order"}
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

      <div className="request-container">
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
            {isRequestLoading ? <span className="spinner"></span> : "Submit Request"}
          </button>
        </form>
      </div>

      <div className="requests-container">
        <h2>Your Custom Painting Requests</h2>
        {loading ? (
          <p>Loading requests...</p>
        ) : customerRequests.length > 0 ? (
          <div className="requests-scroll">
            {customerRequests.map((request) => (
              <div key={request._id} className="request-card">
                <p><strong>Name:</strong> {request.name}</p>
                <p><strong>Address:</strong> {request.address}</p>
                <p><strong>Phone:</strong> {request.phone}</p>
                <p><strong>Artist:</strong> {request.artist}</p>
                <p><strong>Status:</strong> {request.status}</p>
                <img src={request.imageUrl} alt="Reference" className="request-image" />
              </div>
            ))}
          </div>
        ) : (
          <p>No custom painting requests yet.</p>
        )}
      </div>
    </div>
  );
}

export default CustomerHome;