import { BrowserRouter, Routes, Route } from "react-router-dom";
import Grupos from "../pages/Grupos/Grupos";
import Teachers from "../pages/Users/Teachers";
import Admins from "../pages/Users/Admins";

function Rutas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Teachers />} />
        <Route path="/grupos" element={<Grupos />} />
        <Route path="/usuarios" element={<Teachers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rutas;
