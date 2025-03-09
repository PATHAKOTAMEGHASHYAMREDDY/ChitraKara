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
//   const [isOrderLoading, setIsOrderLoading] = useState(false); // New loading state for orders

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
//     setIsOrderLoading(true); // Start loading
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
//       alert(`Order placed for ${selectedPainting.title}! An email has been sent to ${selectedPainting.artist}.`);
//       setShowOrderPopup(false);
//       setOrderDetails({ name: username || "", address: "", phone: "" });
//       setSelectedPainting(null);
//     } catch (error) {
//       console.error("Order failed:", error);
//       alert("Failed to place order. Please try again.");
//     } finally {
//       setIsOrderLoading(false); // Stop loading
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
//         "https://chitra-kara-api.vercel.app/api/custompaintingrequest",
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
import logo from "../assets/logo.png";

function CustomerHome() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username;
  const [paintings, setPaintings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [requestData, setRequestData] = useState({
    name: username || "",
    address: "",
    phone: "",
    image: null,
    artist: "",
  });
  const [artists, setArtists] = useState([]);
  const [customerRequests, setCustomerRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderData, setOrderData] = useState({ name: username || "", address: "", phone: "" });
  const [selectedPainting, setSelectedPainting] = useState(null);
  const [isRequestLoading, setIsRequestLoading] = useState(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [paintingsRes, artistsRes] = await Promise.all([
        axios.get("https://chitra-kara-api.vercel.app/api/paintings"),
        axios.get("https://chitra-kara-api.vercel.app/api/artists"),
      ]);
      setPaintings(paintingsRes.data || []);
      setArtists(artistsRes.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomerRequests = async () => {
    const email = location.state?.email || `${username}@example.com`;
    try {
      const res = await axios.get(`https://chitra-kara-api.vercel.app/api/myrequests/${email}`);
      setCustomerRequests(res.data || []);
    } catch (error) {
      console.error("Error fetching requests:", error);
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
      ? painting.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        painting.title.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setIsOrderLoading(true);
    try {
      const payload = {
        customerName: orderData.name,
        artistName: selectedPainting.artist,
        paintingTitle: selectedPainting.title,
        price: selectedPainting.price,
        contact: selectedPainting.contact,
        imageUrl: selectedPainting.imageUrl,
        customerAddress: orderData.address,
        customerPhone: orderData.phone,
      };
      await axios.post("https://chitra-kara-api.vercel.app/api/order", payload);
      alert(`Order placed! Email sent to ${selectedPainting.artist}.`);
      setShowOrderModal(false);
      setOrderData({ name: username || "", address: "", phone: "" });
      setSelectedPainting(null);
    } catch (error) {
      alert("Order failed. Try again.");
    } finally {
      setIsOrderLoading(false);
    }
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setIsRequestLoading(true);
    const email = location.state?.email || `${username}@example.com`;
    const formData = new FormData();
    Object.entries(requestData).forEach(([key, value]) => formData.append(key, value));
    formData.append("customerEmail", email);

    try {
      const res = await axios.post("https://chitra-kara-api.vercel.app/api/custompaintingrequest", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(`${res.data.message} Email sent to ${requestData.artist}.`);
      setCustomerRequests([...customerRequests, res.data.request]);
      setRequestData({ name: username || "", address: "", phone: "", image: null, artist: "" });
    } catch (error) {
      alert(error.response?.data?.error || "Request failed.");
    } finally {
      setIsRequestLoading(false);
    }
  };

  return (
    <div className="customer-home">
      <header className="navbar">
        <img src={logo} alt="ChitraKara" className="logo" onClick={() => navigate("/")} />
        <input
          type="text"
          placeholder="Search by artist or title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
        <div className="navbar-actions">
          <button onClick={() => navigate("/customerorders", { state: { username, email: location.state?.email } })}>
            My Orders
          </button>
          <span>Hi, {username || "Guest"}</span>
        </div>
      </header>

      <main>
        <section className="paintings">
          <h1>Explore Artworks</h1>
          {loading ? (
            <div className="spinner"></div>
          ) : (
            <div className="grid">
              {filteredPaintings.map((painting) => (
                <div key={painting._id} className="card">
                  <img src={painting.imageUrl} alt={painting.title} loading="lazy" />
                  <div className="card-content">
                    <h3>{painting.title}</h3>
                    <p>₹{painting.price} • {painting.artist}</p>
                    <button onClick={() => { setSelectedPainting(painting); setShowOrderModal(true); }}>
                      Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="request-form">
          <h2>Custom Painting Request</h2>
          <form onSubmit={handleRequestSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={requestData.name}
              onChange={(e) => setRequestData({ ...requestData, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Delivery Address"
              value={requestData.address}
              onChange={(e) => setRequestData({ ...requestData, address: e.target.value })}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={requestData.phone}
              onChange={(e) => setRequestData({ ...requestData, phone: e.target.value })}
              pattern="[0-9]{10}"
              required
            />
            <select
              value={requestData.artist}
              onChange={(e) => setRequestData({ ...requestData, artist: e.target.value })}
              required
            >
              <option value="">Select Artist</option>
              {artists.map((artist) => (
                <option key={artist._id} value={artist.sname}>{artist.sname}</option>
              ))}
            </select>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setRequestData({ ...requestData, image: e.target.files[0] })}
              required
            />
            <button type="submit" disabled={isRequestLoading}>
              {isRequestLoading ? <span className="spinner"></span> : "Submit Request"}
            </button>
          </form>
        </section>

        <section className="requests">
          <h2>Your Requests</h2>
          <div className="grid">
            {customerRequests.map((request) => (
              <div key={request._id} className="card">
                <img src={request.imageUrl} alt="Reference" loading="lazy" />
                <div className="card-content">
                  <p><strong>{request.name}</strong> • {request.artist}</p>
                  <p>{request.status}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {showOrderModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Place Order</h2>
            <form onSubmit={handleOrderSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={orderData.name}
                onChange={(e) => setOrderData({ ...orderData, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Delivery Address"
                value={orderData.address}
                onChange={(e) => setOrderData({ ...orderData, address: e.target.value })}
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={orderData.phone}
                onChange={(e) => setOrderData({ ...orderData, phone: e.target.value })}
                pattern="[0-9]{10}"
                required
              />
              <button type="submit" disabled={isOrderLoading}>
                {isOrderLoading ? <span className="spinner"></span> : "Confirm Order"}
              </button>
              <button type="button" onClick={() => setShowOrderModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .customer-home { font-family: 'Arial', sans-serif; background: #f5f5f5; min-height: 100vh; }
        .navbar { position: sticky; top: 0; background: #fff; padding: 1rem; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1); z-index: 1000; }
        .logo { height: 40px; cursor: pointer; }
        .search-bar { flex: 1; max-width: 400px; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; margin: 0 1rem; }
        .navbar-actions { display: flex; align-items: center; gap: 1rem; }
        .navbar-actions button { padding: 0.5rem 1rem; background: #007bff; color: #fff; border: none; border-radius: 4px; cursor: pointer; }
        .navbar-actions button:hover { background: #0056b3; }
        main { padding: 2rem; }
        h1, h2 { color: #333; margin-bottom: 1rem; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem; }
        .card { background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: transform 0.2s; }
        .card:hover { transform: translateY(-5px); }
        .card img { width: 100%; height: 200px; object-fit: cover; }
        .card-content { padding: 1rem; }
        .card-content h3 { margin: 0; font-size: 1.2rem; }
        .card-content p { margin: 0.5rem 0; color: #666; }
        .card-content button { width: 100%; padding: 0.5rem; background: #28a745; color: #fff; border: none; border-radius: 4px; cursor: pointer; }
        .card-content button:hover { background: #218838; }
        .request-form form { display: flex; flex-direction: column; gap: 1rem; max-width: 400px; margin: 0 auto; }
        .request-form input, .request-form select { padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; }
        .request-form button { padding: 0.75rem; background: #007bff; color: #fff; border: none; border-radius: 4px; cursor: pointer; }
        .request-form button:hover { background: #0056b3; }
        .modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; }
        .modal-content { background: #fff; padding: 2rem; border-radius: 8px; width: 100%; max-width: 400px; }
        .modal-content form { display: flex; flex-direction: column; gap: 1rem; }
        .modal-content button { padding: 0.75rem; border: none; border-radius: 4px; cursor: pointer; }
        .modal-content button:first-of-type { background: #28a745; color: #fff; }
        .modal-content button:last-of-type { background: #dc3545; color: #fff; }
        .spinner { width: 20px; height: 20px; border: 3px solid #fff; border-top: 3px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; display: inline-block; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @media (max-width: 768px) { .grid { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); } .navbar { flex-direction: column; gap: 1rem; } }
      `}</style>
    </div>
  );
}

export default CustomerHome;