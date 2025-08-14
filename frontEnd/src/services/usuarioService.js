import api from '../axiosConfig'

const USUARIO_BASE_URL = "http://localhost:8082/api/usuario";

const usuarioService = {
    "getCurrentUser": async () => {
        try {
            const response = await api.get(`${USUARIO_BASE_URL}/me`);
            return response.data;
        } catch (error) {
            // Ya no necesitamos manejar la expiración del token aquí, el interceptor se encarga.
            throw new Error(`Error getting user info: ${error.response?.status || 500}`);
        }
    },
    // ... (El resto de tus funciones aquí)
    "getAll": async () => {
        try {
            const response = await api.get(`${USUARIO_BASE_URL}`)
            return (response.data);
        } catch (error) {
            return [{ "errorCode": error.status }]
        }
    },
    "getById": async (id) => {
        try {
            const response = await api.get(`${USUARIO_BASE_URL}/${id}`)
            return response.data;
        } catch (error) {
            return [{ "errorCode": error.status }]
        }
    },
    "create": async (data) => {
        try {
            console.log("Datos a enviar:", data);
            const response = await api.post(`${USUARIO_BASE_URL}`, data)
            return response.data;
        } catch (error) {
            return [{ "errorCode": error.status }]
        }
    },
    "edit": async (id, data) => {
        try {
            const response = await api.put(`${USUARIO_BASE_URL}/${id}`, data)
            return response.data;
        } catch (error) {
            return [{ "errorCode": error.status }]
        }
    },
    "delete": async (id) => {
        try {
            const response = await api.delete(`${USUARIO_BASE_URL}/${id}`)
            return response.data;
        } catch (error) {
            return [{ "errorCode": error.status }]
        }
    }
};

export default usuarioService;
