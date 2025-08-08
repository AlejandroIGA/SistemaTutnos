// src/pages/CallbackPage/CallbackPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const CallbackPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        // Renombrar 'error' de searchParams para evitar conflicto con el estado 'error'
        const errorParam = searchParams.get('error'); 
        
        // 1. Verificar state para seguridad
        const storedState = sessionStorage.getItem('oauth_state');
        if (state !== storedState) {
          throw new Error('Invalid state parameter');
        }
        
        if (errorParam) { 
          throw new Error(`Authorization error: ${errorParam}`);
        }
        
        if (!code) {
          throw new Error('No authorization code received');
        }

        // 2. Recuperar code_verifier de sessionStorage
        const code_verifier = sessionStorage.getItem('code_verifier');
        if (!code_verifier) {
          throw new Error('Missing PKCE code_verifier. Please try logging in again.');
        }

        // 3. Intercambiar código por token
        const tokenResponse = await fetch('http://localhost:9000/oauth2/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: 'react-dashboard',
            code: code,
            redirect_uri: 'http://localhost:5173/callback',
            code_verifier: code_verifier, // Enviar el code_verifier
          }),
        });

        if (!tokenResponse.ok) {
          const errorData = await tokenResponse.json();
          console.error("Token exchange error response:", errorData);
          throw new Error(`Token exchange failed: ${errorData.error_description || tokenResponse.statusText}`);
        }

        const tokens = await tokenResponse.json();
        
        console.log("Token data:", tokens);
        
        // 4. Guardar tokens
        localStorage.setItem('access_token', tokens.access_token);
        localStorage.setItem('refresh_token', tokens.refresh_token);

        console.log("access_token", localStorage.getItem('access_token'))
        console.log("refresh_token", localStorage.getItem('refresh_token'))
        
        // 5. Decodificar JWT para obtener información del usuario
        const payload = JSON.parse(atob(tokens.access_token.split('.')[1]));
        console.log("JWT payload:", payload);
        
        const username = payload.sub || payload.username;
        const roles = payload.roles || [];
        const userRole = payload.rol; 
        const userId = payload.userId; 

        localStorage.setItem('username', payload.username)
        
        // 6. Aplicar lógica de roles y navegación
        if (userRole === 'maestro' || roles.includes('ROLE_PROFESOR')) {
          localStorage.setItem('id', userId || username);
          localStorage.setItem('user_role', 'Profesor');
          // alert('Login exitoso'); // Reemplazar con modal
          navigate('/solicitudesM');
        } else if (userRole === 'Admin' || roles.includes('ROLE_ADMIN')) {
          localStorage.setItem('id', userId || username);
          localStorage.setItem('user_role', 'Admin');
          // alert('Login exitoso'); // Reemplazar con modal
          navigate('/usuarios');
        } else {
          throw new Error('Login fallido: rol no válido o no autorizado');
        }

        // 7. Limpiar datos temporales
        sessionStorage.removeItem('oauth_state');
        sessionStorage.removeItem('code_verifier'); 
        
      } catch (err) {
        console.error('Callback error:', err);
        setError(err.message);
        // alert(err.message); // Reemplazar con modal
      } finally {
        setLoading(false);
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  if (loading) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h2>Procesando autenticación...</h2>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h2>Error de Autenticación</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/')}>
            Volver al Login
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default CallbackPage;
