import axios from 'axios';

const USUARIO_BASE_URL = "http://localhost:8080/api/solicitud"

const solicitudService = {
    "pendientes": async () => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.get(`${USUARIO_BASE_URL}/pendientes`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      return [{ errorCode: error.response?.status || 500 }];
    }
  },
}

export default solicitudService;