import axios from 'axios';

const ALUMNOS_BASE_URL = "http://localhost:8080/api/alumnos";


// Obtener todos los alumnos
export const obtenerAlumnos = async () => {
  try {
    const response = await axios.get(ALUMNOS_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener alumnos:", error);
    throw error.response?.data?.message || "Error al obtener alumnos";
  }
};

// Agregar o actualizar alumno
export const guardarAlumno = async (alumno) => {
  try {
    // Si tienes id, haces PUT, si no POST
    if (alumno.id) {
      const response = await axios.put(`${ALUMNOS_BASE_URL}/${alumno.id}`, alumno);
      return response.data;
    } else {
      const response = await axios.post(ALUMNOS_BASE_URL, alumno);
      return response.data;
    }
  } catch (error) {
    console.error("Error al guardar alumno:", error);
    throw error.response?.data?.message || "Erroorr al guardar alumno";
  }
};

// Eliminar alumno
export const eliminarAlumno = async (id) => {
  try {
    await axios.delete(`${ALUMNOS_BASE_URL}/${id}`);
    return true;
  } catch (error) {
    console.error("Error al eliminar alumno:", error);
    throw error.response?.data?.message || "Error al eliminar alumno";
  }
};
