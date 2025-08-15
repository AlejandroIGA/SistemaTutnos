import api from '../axiosConfig'

const SOLICITUDES_BASE_URL = "http://localhost:8086/api/solicitud";
const PROFESORES_BASE_URL = "http://localhost:8085/api/profesor"

const solicitudService = {
  "profesor": async () => {
  try {
    const id = localStorage.getItem('id'); 
    const response = await api.get(`${PROFESORES_BASE_URL}/my/usuario/${id}`);

    const profesor = response.data;
    localStorage.setItem('idProfesor', profesor.id); 

    return profesor;
  } catch (error) {
    return [{ errorCode: error.response?.status || 500 }];
  }
},
  "pendientes": async () => {
    try {
      const idProfesor = localStorage.getItem('idProfesor');
      const response = await api.get(`${SOLICITUDES_BASE_URL}/${idProfesor}/pendientes`);
      return response.data;
    } catch (error) {
      return [{ errorCode: error.response?.status || 500 }];
    }
  },
  "revFin": async () => {
    try {
      const idProfesor = localStorage.getItem('idProfesor');
      const response = await api.get(`${SOLICITUDES_BASE_URL}/${idProfesor}/rev-fin`);
      return response.data;
    } catch (error) {
      return [{ errorCode: error.response?.status || 500 }];
    }
  },
  "estado": async (id, nuevoEstado) => {
    try {
      const response = await api.put(
        `${SOLICITUDES_BASE_URL}/${id}/estado`, `${nuevoEstado}`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al actualizar estado", error);
      return { errorCode: error.response?.status || 500 };
    }
  },
  "obtenerP": async (matricula) => {
    try {
      const response = await api.get(`${SOLICITUDES_BASE_URL}/profesores/${matricula}`);
      return response.data;
    } catch (error) {
      return [{ errorCode: error.response?.status || 500 }];
    }
  },
  "obtenerS": async (matricula) => {
    try {
      const response = await api.get(`${SOLICITUDES_BASE_URL}/alumno/${matricula}/detalle`);
      return response.data;
    } catch (error) {
      return [{ errorCode: error.response?.status || 500 }];
    }
  },
  "crearSolicitud": async (datosSolicitud) => {
    try {
      const response = await api.post(`${SOLICITUDES_BASE_URL}`, datosSolicitud,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al crear solicitud", error);
      throw error;
    }
  },

};

export default solicitudService;