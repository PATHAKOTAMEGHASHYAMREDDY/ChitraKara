import React from "react";
import { BrowserRouter , Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx"; 
import Artistlog from "./pages/artistlog.jsx";
import Customerlog from "./pages/customerlog.jsx";
import Artisthome from "./pages/artisthome.jsx";
import Customerhome from "./pages/customerhome.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artistlog" element={<Artistlog />} />
        <Route path="/customerlog" element={<Customerlog />} />
        <Route path="/artisthome" element={<Artisthome />} />
        <Route path="/customerhome" element={<Customerhome />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;