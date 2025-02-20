// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";
// // // // import "../styles/customerhome.css";
// // // import { useLocation } from "react-router-dom";

// // // function CustomerHome() {
// // //   const location = useLocation();
// // //   const username = location.state?.username;
// // //   const [paintings, setPaintings] = useState([]);
// // //   const [searchQuery, setSearchQuery] = useState("");
// // //   // New states for custom painting request
// // //   const [requestName, setRequestName] = useState(username || "");
// // //   const [requestAddress, setRequestAddress] = useState("");
// // //   const [requestImage, setRequestImage] = useState(null);
// // //   const [selectedArtist, setSelectedArtist] = useState("");
// // //   const [artists, setArtists] = useState([]);
// // //   const [customerRequests, setCustomerRequests] = useState([]);

// // //   // Fetch all paintings and artists
// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         // Fetch paintings
// // //         const paintingsResponse = await axios.get("http://localhost:5000/api/paintings");
// // //         setPaintings(paintingsResponse.data);

// // //         // Fetch artists
// // //         const artistsResponse = await axios.get("http://localhost:5000/api/artists");
// // //         setArtists(artistsResponse.data);

// // //         // Fetch customer's requests (assuming email is derived from username or passed separately)
// // //         const email = location.state?.email || `${username}@example.com`; // Modify this based on your auth system
// // //         const requestsResponse = await axios.get(`http://localhost:5000/api/myrequests/${email}`);
// // //         setCustomerRequests(requestsResponse.data);
// // //       } catch (error) {
// // //         console.error("Error fetching data:", error);
// // //       }
// // //     };
// // //     fetchData();
// // //   }, [username, location.state]);

// // //   // Filter paintings based on search query
// // //   const filteredPaintings = paintings.filter((painting) =>
// // //     searchQuery
// // //       ? painting.artist.toLowerCase().includes(searchQuery.toLowerCase())
// // //       : true
// // //   );

// // //   // Handle Order (existing functionality)
// // //   const handleOrder = async (painting) => {
// // //     try {
// // //       const orderData = {
// // //         customerName: username,
// // //         artistName: painting.artist,
// // //         paintingTitle: painting.title,
// // //         price: painting.price,
// // //         contact: painting.contact,
// // //         imageUrl: painting.imageUrl,
// // //       };
// // //       await axios.post("http://localhost:5000/api/order", orderData);
// // //       alert(`Order placed for ${painting.title}!`);
// // //     } catch (error) {
// // //       console.error("Order failed:", error);
// // //       alert("Failed to place order. Please try again.");
// // //     }
// // //   };

// // //   // Handle custom painting request submission
// // //   const handleRequestSubmit = async (e) => {
// // //     e.preventDefault();
// // //     const email = location.state?.email || `${username}@example.com`; // Adjust based on your auth
// // //     const formData = new FormData();
// // //     formData.append("name", requestName);
// // //     formData.append("address", requestAddress);
// // //     formData.append("image", requestImage);
// // //     formData.append("artist", selectedArtist);
// // //     formData.append("customerEmail", email);

// // //     try {
// // //       const response = await axios.post(
// // //         "http://localhost:5000/api/custompaintingrequest",
// // //         formData,
// // //         { headers: { "Content-Type": "multipart/form-data" } }
// // //       );
// // //       alert(response.data.message);
// // //       setCustomerRequests([...customerRequests, response.data.request]); // Update requests list
// // //       setRequestAddress("");
// // //       setRequestImage(null);
// // //       setSelectedArtist("");
// // //     } catch (error) {
// // //       alert(error.response?.data?.error || "Request Failed");
// // //     }
// // //   };

// // //   return (
// // //     <div className="customerhome-container">
// // //       <h1>Welcome, {username}!</h1>
// // //       <p>Find and order beautiful paintings from artists</p>

// // //       {/* Search Bar */}
// // //       <input
// // //         type="text"
// // //         placeholder="Search paintings by artist..."
// // //         value={searchQuery}
// // //         onChange={(e) => setSearchQuery(e.target.value)}
// // //         className="search-bar"
// // //       />

// // //       {/* Display Paintings */}
// // //       <div className="paintings-container">
// // //         {filteredPaintings.length > 0 ? (
// // //           filteredPaintings.map((painting) => (
// // //             <div key={painting._id} className="painting-card">
// // //               <img src={painting.imageUrl} alt={painting.title} />
// // //               <h3>{painting.title}</h3>
// // //               <p>Price: ₹{painting.price}</p>
// // //               <p>Artist: {painting.artist}</p>
// // //               <p>Contact: {painting.contact}</p>
// // //               <button onClick={() => handleOrder(painting)}>Order</button>
// // //             </div>
// // //           ))
// // //         ) : (
// // //           <p>No paintings found for this artist!</p>
// // //         )}
// // //       </div>

// // //       {/* Custom Painting Request Form */}
// // //       <div className="request-container">
// // //         <h2>Request a Custom Painting</h2>
// // //         <form onSubmit={handleRequestSubmit}>
// // //           <div className="form-group">
// // //             <label htmlFor="request-name">Your Name</label>
// // //             <input
// // //               type="text"
// // //               id="request-name"
// // //               value={requestName}
// // //               onChange={(e) => setRequestName(e.target.value)}
// // //               required
// // //             />
// // //           </div>
// // //           <div className="form-group">
// // //             <label htmlFor="request-address">Delivery Address</label>
// // //             <input
// // //               type="text"
// // //               id="request-address"
// // //               value={requestAddress}
// // //               onChange={(e) => setRequestAddress(e.target.value)}
// // //               required
// // //             />
// // //           </div>
// // //           <div className="form-group">
// // //             <label htmlFor="request-artist">Choose Artist</label>
// // //             <select
// // //               id="request-artist"
// // //               value={selectedArtist}
// // //               onChange={(e) => setSelectedArtist(e.target.value)}
// // //               required
// // //             >
// // //               <option value="">Select an Artist</option>
// // //               {artists.map((artist) => (
// // //                 <option key={artist._id} value={artist.sname}>
// // //                   {artist.sname}
// // //                 </option>
// // //               ))}
// // //             </select>
// // //           </div>
// // //           <div className="form-group">
// // //             <label htmlFor="request-image">Reference Image</label>
// // //             <input
// // //               type="file"
// // //               id="request-image"
// // //               accept="image/*"
// // //               onChange={(e) => setRequestImage(e.target.files[0])}
// // //               required
// // //             />
// // //           </div>
// // //           <button type="submit">Submit Request</button>
// // //         </form>
// // //       </div>

// // //       {/* Display Customer's Requests */}
// // //       <div className="requests-container">
// // //         <h2>Your Custom Painting Requests</h2>
// // //         {customerRequests.length > 0 ? (
// // //           customerRequests.map((request) => (
// // //             <div key={request._id} className="request-card">
// // //               <p>Name: {request.name}</p>
// // //               <p>Address: {request.address}</p>
// // //               <p>Artist: {request.artist}</p>
// // //               <p>Status: {request.status}</p>
// // //               <img src={request.imageUrl} alt="Reference" style={{ maxWidth: "200px" }} />
// // //             </div>
// // //           ))
// // //         ) : (
// // //           <p>No custom painting requests yet.</p>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default CustomerHome;
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // // import "../styles/customerhome.css";
// // import { useLocation, useNavigate } from "react-router-dom"; // Added useNavigate

// // function CustomerHome() {
// //   const location = useLocation();
// //   const navigate = useNavigate(); // Added for navigation
// //   const username = location.state?.username;
// //   const [paintings, setPaintings] = useState([]);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [requestName, setRequestName] = useState(username || "");
// //   const [requestAddress, setRequestAddress] = useState("");
// //   const [requestPhone, setRequestPhone] = useState(""); // New state for phone number
// //   const [requestImage, setRequestImage] = useState(null);
// //   const [selectedArtist, setSelectedArtist] = useState("");
// //   const [artists, setArtists] = useState([]);
// //   const [customerRequests, setCustomerRequests] = useState([]);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const paintingsResponse = await axios.get("http://localhost:5000/api/paintings");
// //         setPaintings(paintingsResponse.data);

// //         const artistsResponse = await axios.get("http://localhost:5000/api/artists");
// //         setArtists(artistsResponse.data);

// //         const email = location.state?.email || `${username}@example.com`;
// //         const requestsResponse = await axios.get(`http://localhost:5000/api/myrequests/${email}`);
// //         setCustomerRequests(requestsResponse.data);
// //       } catch (error) {
// //         console.error("Error fetching data:", error);
// //       }
// //     };
// //     fetchData();
// //   }, [username, location.state]);

// //   const filteredPaintings = paintings.filter((painting) =>
// //     searchQuery
// //       ? painting.artist.toLowerCase().includes(searchQuery.toLowerCase())
// //       : true
// //   );

// //   const handleOrder = async (painting) => {
// //     try {
// //       const orderData = {
// //         customerName: username,
// //         artistName: painting.artist,
// //         paintingTitle: painting.title,
// //         price: painting.price,
// //         contact: painting.contact,
// //         imageUrl: painting.imageUrl,
// //       };
// //       await axios.post("http://localhost:5000/api/order", orderData);
// //       alert(`Order placed for ${painting.title}!`);
// //     } catch (error) {
// //       console.error("Order failed:", error);
// //       alert("Failed to place order. Please try again.");
// //     }
// //   };

// //   const handleRequestSubmit = async (e) => {
// //     e.preventDefault();
// //     const email = location.state?.email || `${username}@example.com`;
// //     const formData = new FormData();
// //     formData.append("name", requestName);
// //     formData.append("address", requestAddress);
// //     formData.append("phone", requestPhone); // Added phone number
// //     formData.append("image", requestImage);
// //     formData.append("artist", selectedArtist);
// //     formData.append("customerEmail", email);

// //     try {
// //       const response = await axios.post(
// //         "http://localhost:5000/api/custompaintingrequest",
// //         formData,
// //         { headers: { "Content-Type": "multipart/form-data" } }
// //       );
// //       alert(response.data.message);
// //       setCustomerRequests([...customerRequests, response.data.request]);
// //       setRequestAddress("");
// //       setRequestPhone(""); // Reset phone number
// //       setRequestImage(null);
// //       setSelectedArtist("");
// //     } catch (error) {
// //       alert(error.response?.data?.error || "Request Failed");
// //     }
// //   };

// //   // Navigate to order details page
// //   const handleViewOrders = () => {
// //     navigate("/customerorders", { state: { username, email: location.state?.email } });
// //   };

// //   return (
// //     <div className="customerhome-container">
// //       <h1>Welcome, {username}!</h1>
// //       <p>Find and order beautiful paintings from artists</p>

// //       {/* Search Bar */}
// //       <input
// //         type="text"
// //         placeholder="Search paintings by artist..."
// //         value={searchQuery}
// //         onChange={(e) => setSearchQuery(e.target.value)}
// //         className="search-bar"
// //       />

// //       {/* Display Paintings */}
// //       <div className="paintings-container">
// //         {filteredPaintings.length > 0 ? (
// //           filteredPaintings.map((painting) => (
// //             <div key={painting._id} className="painting-card">
// //               <img src={painting.imageUrl} alt={painting.title} />
// //               <h3>{painting.title}</h3>
// //               <p>Price: ₹{painting.price}</p>
// //               <p>Artist: {painting.artist}</p>
// //               <p>Contact: {painting.contact}</p>
// //               <button onClick={() => handleOrder(painting)}>Order</button>
// //             </div>
// //           ))
// //         ) : (
// //           <p>No paintings found for this artist!</p>
// //         )}
// //       </div>

// //       {/* Custom Painting Request Form */}
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
// //               title="Please enter a 10-digit phone number"
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
// //           <button type="submit">Submit Request</button>
// //         </form>
// //       </div>

// //       {/* Display Customer's Requests */}
// //       <div className="requests-container">
// //         <h2>Your Custom Painting Requests</h2>
// //         {customerRequests.length > 0 ? (
// //           customerRequests.map((request) => (
// //             <div key={request._id} className="request-card">
// //               <p>Name: {request.name}</p>
// //               <p>Address: {request.address}</p>
// //               <p>Phone: {request.phone}</p> {/* Added phone number */}
// //               <p>Artist: {request.artist}</p>
// //               <p>Status: {request.status}</p>
// //               <img src={request.imageUrl} alt="Reference" style={{ maxWidth: "200px" }} />
// //             </div>
// //           ))
// //         ) : (
// //           <p>No custom painting requests yet.</p>
// //         )}
// //       </div>

// //       {/* View Orders Button */}
// //       <button onClick={handleViewOrders} className="view-orders-button">
// //         View Your Orders
// //       </button>
// //     </div>
// //   );
// // }

// // export default CustomerHome;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// // import "../styles/customerhome.css";
// import { useLocation, useNavigate } from "react-router-dom";

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
//   const [loading, setLoading] = useState(true); // Added loading state

//   // Fetch data (paintings, artists, and customer requests)
//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const paintingsResponse = await axios.get("http://localhost:5000/api/paintings");
//       setPaintings(paintingsResponse.data || []);

//       const artistsResponse = await axios.get("http://localhost:5000/api/artists");
//       setArtists(artistsResponse.data || []);

//       const email = location.state?.email || `${username}@example.com`;
//       const requestsResponse = await axios.get(`http://localhost:5000/api/myrequests/${email}`);
//       setCustomerRequests(requestsResponse.data || []);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     // Polling: Refresh custom requests every 5 seconds
//     const interval = setInterval(fetchData, 5000);
//     return () => clearInterval(interval); // Cleanup on unmount
//   }, [username, location.state]);

//   const filteredPaintings = paintings.filter((painting) =>
//     searchQuery
//       ? painting.artist.toLowerCase().includes(searchQuery.toLowerCase())
//       : true
//   );

//   const handleOrder = async (painting) => {
//     try {
//       const orderData = {
//         customerName: username,
//         artistName: painting.artist,
//         paintingTitle: painting.title,
//         price: painting.price,
//         contact: painting.contact,
//         imageUrl: painting.imageUrl,
//       };
//       await axios.post("http://localhost:5000/api/order", orderData);
//       alert(`Order placed for ${painting.title}!`);
//     } catch (error) {
//       console.error("Order failed:", error);
//       alert("Failed to place order. Please try again.");
//     }
//   };

//   const handleRequestSubmit = async (e) => {
//     e.preventDefault();
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
//         "http://localhost:5000/api/custompaintingrequest",
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       alert(response.data.message);
//       setCustomerRequests([...customerRequests, response.data.request]);
//       setRequestAddress("");
//       setRequestPhone("");
//       setRequestImage(null);
//       setSelectedArtist("");
//       fetchData(); // Refresh immediately after submission
//     } catch (error) {
//       alert(error.response?.data?.error || "Request Failed");
//     }
//   };

//   const handleViewOrders = () => {
//     navigate("/customerorders", { state: { username, email: location.state?.email } });
//   };

//   return (
//     <div className="customerhome-container">
//       <h1>Welcome, {username || "Guest"}!</h1>
//       <p>Find and order beautiful paintings from artists</p>

//       {/* Search Bar */}
//       <input
//         type="text"
//         placeholder="Search paintings by artist..."
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         className="search-bar"
//       />

//       {/* Display Paintings */}
//       <div className="paintings-container">
//         {loading ? (
//           <p>Loading paintings...</p>
//         ) : filteredPaintings.length > 0 ? (
//           filteredPaintings.map((painting) => (
//             <div key={painting._id} className="painting-card">
//               <img src={painting.imageUrl} alt={painting.title} />
//               <h3>{painting.title}</h3>
//               <p>Price: ₹{painting.price}</p>
//               <p>Artist: {painting.artist}</p>
//               <p>Contact: {painting.contact}</p>
//               <button onClick={() => handleOrder(painting)}>Order</button>
//             </div>
//           ))
//         ) : (
//           <p>No paintings found for this artist!</p>
//         )}
//       </div>

//       {/* Custom Painting Request Form */}
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
//               title="Please enter a 10-digit phone number"
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
//           <button type="submit">Submit Request</button>
//         </form>
//       </div>

//       {/* Display Customer's Requests */}
//       <div className="requests-container">
//         <h2>Your Custom Painting Requests</h2>
//         {loading ? (
//           <p>Loading requests...</p>
//         ) : customerRequests.length > 0 ? (
//           customerRequests.map((request) => (
//             <div key={request._id} className="request-card">
//               <p>Name: {request.name}</p>
//               <p>Address: {request.address}</p>
//               <p>Phone: {request.phone}</p>
//               <p>Artist: {request.artist}</p>
//               <p>Status: {request.status}</p>
//               <img src={request.imageUrl} alt="Reference" style={{ maxWidth: "200px" }} />
//             </div>
//           ))
//         ) : (
//           <p>No custom painting requests yet.</p>
//         )}
//       </div>

//       {/* View Orders Button */}
//       <button onClick={handleViewOrders} className="view-orders-button">
//         View Your Orders
//       </button>
//     </div>
//   );
// }

// export default CustomerHome;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/customerhome.css"; // Updated to use the correct CSS file

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

  // Initial data fetch
  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [paintingsResponse, artistsResponse] = await Promise.all([
        axios.get("http://localhost:5000/api/paintings"),
        axios.get("http://localhost:5000/api/artists"),
      ]);
      setPaintings(paintingsResponse.data || []);
      setArtists(artistsResponse.data || []);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch customer requests separately for polling
  const fetchCustomerRequests = async () => {
    try {
      const email = location.state?.email || `${username}@example.com`;
      const requestsResponse = await axios.get(`http://localhost:5000/api/myrequests/${email}`);
      setCustomerRequests(requestsResponse.data || []);
    } catch (error) {
      console.error("Error fetching customer requests:", error);
    }
  };

  useEffect(() => {
    fetchInitialData();
    fetchCustomerRequests(); // Initial fetch of requests

    // Poll only customer requests every 5 seconds
    const interval = setInterval(fetchCustomerRequests, 5000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, [username, location.state]);

  const filteredPaintings = paintings.filter((painting) =>
    searchQuery
      ? painting.artist.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  const handleOrder = async (painting) => {
    try {
      const orderData = {
        customerName: username,
        artistName: painting.artist,
        paintingTitle: painting.title,
        price: painting.price,
        contact: painting.contact,
        imageUrl: painting.imageUrl,
      };
      await axios.post("http://localhost:5000/api/order", orderData);
      alert(`Order placed for ${painting.title}!`);
    } catch (error) {
      console.error("Order failed:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
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
        "http://localhost:5000/api/custompaintingrequest",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert(response.data.message);
      setCustomerRequests([...customerRequests, response.data.request]);
      setRequestAddress("");
      setRequestPhone("");
      setRequestImage(null);
      setSelectedArtist("");
    } catch (error) {
      alert(error.response?.data?.error || "Request Failed");
    }
  };

  const handleViewOrders = () => {
    navigate("/customerorders", { state: { username, email: location.state?.email } });
  };

  return (
    <div className="customerhome-container">
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
                <button onClick={() => handleOrder(painting)}>Order</button>
              </div>
            ))}
          </div>
        ) : (
          <p>No paintings found for this artist!</p>
        )}
      </div>

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
          <button type="submit">Submit Request</button>
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

      <button onClick={handleViewOrders} className="view-orders-button">
        View Your Orders
      </button>
    </div>
  );
}

export default CustomerHome;