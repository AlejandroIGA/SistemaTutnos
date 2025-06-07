import { BrowserRouter, Routes, Route } from "react-router-dom";
import Grupos from "../pages/Grupos/Grupos";
import Teachers from "../pages/Users/Teachers";
import Admins from "../pages/Users/Admins";
import TeacherCrud from "../pages/TeacherCrud/TeacherCrud";

function Rutas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/maestros" element={<TeacherCrud />} />
        <Route path="/grupos" element={<Grupos />} />
        <Route path="/usuarios" element={<Teachers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rutas;
