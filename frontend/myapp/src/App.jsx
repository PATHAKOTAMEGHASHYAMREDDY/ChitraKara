import React from "react";
import { BrowserRouter , Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx"; 
import Artistlog from "./pages/artistlog.jsx";
import Customerlog from "./pages/customerlog.jsx";
import Artisthome from "./pages/artisthome.jsx";
import Customerhome from "./pages/customerhome.jsx";
// import Artistpaintings from "./pages/artistpaintings.jsx";
// import ArtistOrders from "./pages/ArtistOrders.jsx";
import CustomerOrders from "./pages/CustomerOrders.jsx";
import ForgotPassword from "./pages/forgotpassword.jsx";
import Team from "./pages/team.jsx";
// import ArtistChat from "./pages/ArtistChat.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artistlog" element={<Artistlog />} />
        <Route path="/customerlog" element={<Customerlog />} />
        <Route path="/artisthome" element={<Artisthome />} />
        <Route path="/customerhome" element={<Customerhome />} />
        {/* <Route path="/artistpaintings" element={<Artistpaintings />} /> */}
        {/* <Route path="/artistorders" element={<ArtistOrders/>} /> */}
        <Route path="/customerorders" element={<CustomerOrders />} />
        <Route path="/team" element={<Team />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        {/* <Route path="/artistchat" element={<ArtistChat />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;