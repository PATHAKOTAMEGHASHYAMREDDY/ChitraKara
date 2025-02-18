import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx"; 
import Artistlog from "./pages/artistlog.jsx";
import Customerlog from "./pages/customerlog.jsx";
import Artisthome from "./pages/artisthome.jsx";
import Customerhome from "./pages/customerhome.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/artistlog" element={<Artistlog/>}/>
      <Route path="/customerlog" element={<Customerlog/>}/>
      <Route path="/artisthome" element={<Artisthome/>}/>
      <Route path="/customerhome" element={<Customerhome/>}/>
    </Routes>
  </Router>
);
export default App;