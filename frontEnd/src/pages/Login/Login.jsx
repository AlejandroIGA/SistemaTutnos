import React from 'react';
import FormLogin from '../../components/FormLogin/FormLogin';
import './Login.css';
import usuarioService from '../../services/usuarioService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (values) => {
  try {
    const response = await usuarioService.login({
      nombre: values.nombre,
      contrasena: values.contrasena,
    });

    if (response.rol === 'Profesor' && response.idProfesor) {
      localStorage.setItem('id', response.idProfesor); 
      alert('Login exitoso');
      navigate('/solicitudesM'); 
    } else if (response.rol === 'Admin' && response.idUsuario) {
      localStorage.setItem('id', response.idUsuario); 
      alert('Login exitoso');
      navigate('/usuarios'); 
    } else {
      alert('Login fallido: rol o ID no válidos');
    }

  } catch (error) {
    console.error('Error durante el login:', error);
    alert('Ocurrió un error durante el login');
  }
};


  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar sesión</h2>
        <FormLogin onFinish={handleLogin} />
      </div>
    </div>
  );
};

export default Login;
