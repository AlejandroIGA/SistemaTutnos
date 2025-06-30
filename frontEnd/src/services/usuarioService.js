import axios from 'axios';

const USUARIO_BASE_URL = "http://localhost:8080/api/usuario"

const usuarioService = {
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
    },
}

export default usuarioService;