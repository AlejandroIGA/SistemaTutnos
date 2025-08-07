import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Grupos from "../pages/Grupos/Grupos";
import Teachers from "../pages/Users/Teachers";
import Admins from "../pages/Users/Admins";
import SolicitudesM from "../pages/Solicitudes/SolicitudesM";
import SolicitudesA from "../pages/Solicitudes/SolicitudesA"
import TeacherCrud from "../pages/TeacherCrud/TeacherCrud";
import Alumnos from "../pages/Alumnos/Alumnos";
import Login from "../pages/Login/Login";
import CallbackPage from "../pages/CallbackPage";

// Componente para proteger rutas
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('access_token');
  return token ? children : <Navigate to="/" replace />;
};

function Rutas() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path='/' element={<Login />} />
        <Route path="/callback" element={<CallbackPage />} />
        
        {/* Rutas protegidas */}
        <Route path="/profesores" element={
          <ProtectedRoute><TeacherCrud /></ProtectedRoute>
        } />
        <Route path="/maestros" element={
          <ProtectedRoute><TeacherCrud /></ProtectedRoute>
        } />
        <Route path="/grupos" element={
          <ProtectedRoute><Grupos /></ProtectedRoute>
        } />
        <Route path="/usuarios" element={
          <ProtectedRoute><Teachers /></ProtectedRoute>
        } />
        <Route path="/alumnos" element={
          <ProtectedRoute><Alumnos /></ProtectedRoute>
        } />
        <Route path="/administradores" element={
          <ProtectedRoute><Admins /></ProtectedRoute>
        } />
        <Route path="/solicitudesM" element={
          <ProtectedRoute><SolicitudesM /></ProtectedRoute>
        } />
        <Route path="/solicitudesA" element={
          <ProtectedRoute><SolicitudesA /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default Rutas;