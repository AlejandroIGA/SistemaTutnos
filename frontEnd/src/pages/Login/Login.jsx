import React from 'react';
import FormLogin from '../../components/FormLogin/FormLogin';
import './Login.css';
import usuarioService from '../../services/usuarioService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    const response = await usuarioService.login({
      email: values.email,
      password: values.password,
    });

    if (response.token) {
      localStorage.setItem('token', response.token);
      alert('Login exitoso');
      navigate('/solicitudesM');
    } else {
      alert('Login fallido');
    }
}

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
