import axios from 'axios';

const PROFESORES_BASE_URL = "http://localhost:8085/api/profesor"

const profesorService = {
    "getAll": async (activos) => {
        try {
            const response = await axios.get(`${PROFESORES_BASE_URL}?activos=${activos}`)
            return (response.data);
        } catch (error) {
            return [{ "errorCode": error.status }]
        }
    },
    "getById": async (id) => {
        try {
            const response = await axios.get(`${PROFESORES_BASE_URL}/${id}`)
            return response.data;
        } catch (error) {
            return [{ "errorCode": error.status }]
        }
    },
    "getByName": async (nombre) => {
        try {
            const response = await axios.get(`${PROFESORES_BASE_URL}/nombre/${nombre}`)
            return response.data;
        } catch (error) {
            return [{ "errorCode": error.status }]
        }
    },
    "getByEmail": async (correo) => {
        try {
            const response = await axios.get(`${PROFESORES_BASE_URL}/correo/${correo}`)
            return response.data;
        } catch (error) {
            return [{ "errorCode": error.status }]
        }
    },
    "create": async (data) => {
        try {
            const { grupos, ...profesor } = data;
            const response = await axios.post(`${PROFESORES_BASE_URL}`, profesor)
            return response.data;
        } catch (error) {
            return [{ "errorCode": error.status }]
        }
    },
    "update": async (data, id) => {
        try {
            const { grupos, ...profesor } = data;
            const response = await axios.put(`${PROFESORES_BASE_URL}/${id}`, profesor)
            return response.data;
        } catch (error) {
            return [{ "errorCode": error.status }]
        }
    },
    "delete": async (id) => {
        try {
            const response = await axios.delete(`${PROFESORES_BASE_URL}/${id}`)
            return response.data;
        } catch (error) {
            return [{ "errorCode": error.status }]
        }
    }
}

export default profesorService;