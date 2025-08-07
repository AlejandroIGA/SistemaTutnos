import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const USUARIO_BASE_URL = "http://localhost:8082/api/usuario";

const clearSessionAndRedirect = async () => {
    console.log("🔑 Sesión expirada o inválida. Redirigiendo al login...");

    // Limpiar todos los datos de autenticación
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('id');
    localStorage.removeItem('user_role');

    // Limpiar también sessionStorage por si acaso
    sessionStorage.clear();

    try {
        // Usar fetch con keepalive para asegurar que la petición se complete
        // incluso si la página se cierra inmediatamente después
        await fetch('http://localhost:9000/logout', {
            method: 'POST',
            keepalive: true, // IMPORTANTE: Mantiene la petición activa incluso si la página se cierra
            credentials: 'include', // Incluir cookies de sesión
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        console.log("✅ Logout enviado al servidor");
    } catch (error) {
        console.error("❌ Error enviando logout al servidor:", error);
        // Continuar con la redirección incluso si falla el logout
    }
    // Redirigir al login
    window.location.href = '/';
};

const isTokenExpired = (token) => {
    if (!token) return true;

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        // Agregar un buffer de 30 segundos para evitar problemas de timing
        return decoded.exp < (currentTime + 30);
    } catch (error) {
        console.error("Error decodificando token:", error);
        return true;
    }
};

// Interceptor para manejar la expiración del token y reintentar solicitudes.
axios.interceptors.response.use(
    (response) => {
        // Si la respuesta es exitosa, simplemente la devolvemos
        return response;
    },
    async (error) => {
        // Si recibimos un 401 (No autorizado), limpiar sesión y redirigir
        if (error.response && error.response.status === 401) {
            console.error("❌ Error 401: Token inválido o expirado");
            clearSessionAndRedirect();
            return Promise.reject(error);
        }

        // Si recibimos un 403 (Prohibido), también puede ser un problema de token
        if (error.response && error.response.status === 403) {
            console.error("❌ Error 403: Acceso prohibido");
            clearSessionAndRedirect();
            return Promise.reject(error);
        }

        // Para cualquier otro error, simplemente lo devolvemos
        return Promise.reject(error);
    }
);

// Interceptor que se ejecuta antes de la solicitud para adjuntar el token
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');

        if (token) {
            // Verificar si el token está expirado antes de usarlo
            if (isTokenExpired(token)) {
                console.warn("⚠️ Token expirado detectado en request interceptor");
                clearSessionAndRedirect();
                return Promise.reject(new Error('Token expired'));
            }

            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const usuarioService = {
    "getCurrentUser": async () => {
        try {
            const response = await axios.get(`${USUARIO_BASE_URL}/me`);
            return response.data;
        } catch (error) {
            // Ya no necesitamos manejar la expiración del token aquí, el interceptor se encarga.
            throw new Error(`Error getting user info: ${error.response?.status || 500}`);
        }
    },
    // ... (El resto de tus funciones aquí)
    "getAll": async () => {
        try {
            const response = await axios.get(`${USUARIO_BASE_URL}`)
            return (response.data);
        } catch (error) {
            return [{ "errorCode": error.status }]
        }
    },
    "getById": async (id) => {
        try {
            const response = await axios.get(`${USUARIO_BASE_URL}/${id}`)
            return response.data;
        } catch (error) {
            return [{ "errorCode": error.status }]
        }
    },
    "create": async (data) => {
        try {
            console.log("Datos a enviar:", data);
            const response = await axios.post(`${USUARIO_BASE_URL}`, data)
            return response.data;
        } catch (error) {
            return [{ "errorCode": error.status }]
        }
    },
    "edit": async (id, data) => {
        try {
            const response = await axios.put(`${USUARIO_BASE_URL}/${id}`, data)
            return response.data;
        } catch (error) {
            return [{ "errorCode": error.status }]
        }
    }
};

export default usuarioService;
