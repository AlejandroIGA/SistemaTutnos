import { BrowserRouter, Routes, Route } from "react-router-dom";
import Grupos from "../pages/Grupos/Grupos";
import Teachers from "../pages/Users/Teachers";
import Admins from "../pages/Users/Admins";
import SolicitudesM from "../pages/Solicitudes/SolicitudesM";
import SolicitudesA from "../pages/Solicitudes/SolicitudesA"
import TeacherCrud from "../pages/TeacherCrud/TeacherCrud";

function Rutas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TeacherCrud />} />
        <Route path="/maestros" element={<TeacherCrud />} />
        <Route path="/grupos" element={<Grupos />} />
        <Route path="/usuarios" element={<Teachers />} />
        <Route path="/administradores" element={<Admins />} />
        <Route path="solicitudesM" element={<SolicitudesM />} />
        <Route path="solicitudesA" element={<SolicitudesA/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rutas;
