// axios-config.js

import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const clearSessionAndRedirect = async () => {
    console.log("🔑 Sesión expirada o inválida. Redirigiendo al login...");

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('id');
    localStorage.removeItem('user_role');
    sessionStorage.clear();

    try {
        await fetch('http://localhost:9000/logout', {
            method: 'POST',
            keepalive: true,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        console.log("✅ Logout enviado al servidor");
    } catch (error) {
        console.error("❌ Error enviando logout al servidor:", error);
    }
    window.location.href = '/';
};

const isTokenExpired = (token) => {
    if (!token) return true;
    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp < (currentTime + 30);
    } catch (error) {
        console.error("Error decodificando token:", error);
        return true;
    }
};

// Crea una instancia de Axios con una configuración base
const api = axios.create({
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor de solicitudes (request)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            if (isTokenExpired(token)) {
                console.warn("⚠️ Token expirado detectado en request interceptor");
                clearSessionAndRedirect();
                return Promise.reject(new Error('Token expired'));
            }
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor de respuestas (response)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { status } = error.response;
        if (status === 401 || status === 403) {
            console.error(`❌ Error ${status}: Token inválido, expirado o acceso prohibido`);
            clearSessionAndRedirect();
        }
        return Promise.reject(error);
    }
);

export default api;