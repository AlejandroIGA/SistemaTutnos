import axios from 'axios';

const GRUPOS_BASE_URL = "http://localhost:8080/api/grupo"

export const obtenerGrupos = async () => {
  try {
    const response = await axios.get(`${GRUPOS_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener grupos:", error);
    throw error.response?.data?.message || "Error al obtener grupos";
  }
};

{ /*export const obtenerGrupoPorId = async (id) => {
  try {
    const response = await axios.get(`${GRUPOS_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener grupo con id ${id}:`, error);
    throw error.response?.data?.message || "Error al obtener grupo por ID";
  }
};
*/ }

export const obtenerGrupoPorCarrera = async (carrera) => {
  try {
    const response = await axios.get(`${GRUPOS_BASE_URL}/carrera/${carrera}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener grupo por carrera ${carrera}:`, error);
    throw error;
  }
};


export const obtenerGrupoPorNombre = async (nombre) => {
  try {
    const response = await axios.get(`${GRUPOS_BASE_URL}/nombre-grupo/${nombre}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener grupo por nombre ${nombre}:`, error);
    throw error.response?.data?.message || "Error al obtener grupo por nombre";
  }
};

export const agregarGrupo = async (grupo) => {
  try {
    const response = await axios.post(`${GRUPOS_BASE_URL}`, grupo);
    console.log("Grupo agregado:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al agregar grupo:", error);
    throw error.response?.data?.message || "Error al agregar grupo";
  }
};

export const actualizarGrupo = async (id, grupo) => {
  try {
    const response = await axios.put(`${GRUPOS_BASE_URL}/${id}`, grupo);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar grupo con id ${id}:`, error);
    throw error.response?.data?.message || "Error al actualizar grupo";
  }
};

export const eliminarGrupo = async (id) => {
  try {
    await axios.delete(`${GRUPOS_BASE_URL}/${id}`);
    return true;
  } catch (error) {
    console.error(`Error al eliminar grupo con id ${id}:`, error);
    throw error.response?.data?.message || "Error al eliminar grupo";
  }
};