// src/pages/Login/Login.jsx
import React, { useEffect } from 'react';
import FormLogin from '../../components/FormLogin/FormLogin';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { generatePkceCodes } from '../../utils/pkce'; // Importa la nueva utilidad

const Login = () => {

  const handleLogin = async (values) => {
    try {
      // 1. Generar PKCE codes
      const { code_verifier, code_challenge } = await generatePkceCodes();
      // Guardar el code_verifier en sessionStorage para usarlo en el callback
      sessionStorage.setItem('code_verifier', code_verifier); 

      // 2. Generar state para seguridad
      const state = Math.random().toString(36).substring(2);
      sessionStorage.setItem('oauth_state', state);

      // 3. Redirigir a Authorization Server con PKCE
      const params = new URLSearchParams({
        response_type: 'code',
        client_id: 'react-dashboard',
        redirect_uri: 'http://localhost:5173/callback',
        scope: 'openid profile read write offline_access',
        state: state,
        code_challenge_method: 'S256', // Indicar el método de desafío (SHA256)
        code_challenge: code_challenge, // El desafío generado
      });
      
      window.location.href = `http://localhost:9000/oauth2/authorize?${params}`;
      
    } catch (error) {
      console.error('Error durante el login:', error);
    }
  };

  useEffect(()=>{
    setTimeout(() => {
          handleLogin();
        }, 3000);
  },[])

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Redirigiendo a página de autenticación</h2>
      </div>
    </div>
  );
};

export default Login;
