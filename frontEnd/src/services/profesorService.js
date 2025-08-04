import axios from 'axios';

const PROFESORES_BASE_URL = "http://localhost:8085/api/profesor"

const profesorService = {
    "getAll": async (activos) => {
        try {
            const response = await axios.get(`${PROFESORES_BASE_URL}?activos=${activos}`)
            return (response.data);
        } catch (error) {
            return error.response
        }
    },
    "getById": async (id) => {
        try {
            const response = await axios.get(`${PROFESORES_BASE_URL}/${id}`)
            return response.data;
        } catch (error) {
            return error.response
        }
    },
    "getByName": async (nombre) => {
        try {
            const response = await axios.get(`${PROFESORES_BASE_URL}/nombre/${nombre}`)
            return response.data;
        } catch (error) {
            return error.response
        }
    },
    "getByEmail": async (correo) => {
        try {
            const response = await axios.get(`${PROFESORES_BASE_URL}/correo/${correo}`)
            return response.data;
        } catch (error) {
            return error.response
        }
    },
    "create": async (data) => {
        try {
            const { grupos, ...profesor } = data;
            const response = await axios.post(`${PROFESORES_BASE_URL}`, profesor)
            const response2 = await axios.post(`${PROFESORES_BASE_URL}/${response.data.id}/agregar/grupos`, grupos)
            return response2.data;
        } catch (error) {
            return error.response
        }
    },
    "update": async (data, id) => {
        try {
            const { grupos, ...profesor } = data;
            const response = await axios.put(`${PROFESORES_BASE_URL}/${id}`, profesor)
            const response2 = await axios.post(`${PROFESORES_BASE_URL}/${response.data.id}/agregar/grupos`, grupos)
            return response2.data;
        } catch (error) {
            return error.response
        }
    },
    "delete": async (id) => {
        try {
            const response = await axios.delete(`${PROFESORES_BASE_URL}/${id}`)
            return response.data;
        } catch (error) {
            return error.response
        }
    },
    "deleteGroup": async (profesorId, grupoId) => {
        try {
            const response = await axios.delete(`${PROFESORES_BASE_URL}/eliminar/profesor/${profesorId}/grupo/${grupoId}`)
            return response.data;
        } catch (error) {
            return error.response
        }
    }
}

export default profesorService;