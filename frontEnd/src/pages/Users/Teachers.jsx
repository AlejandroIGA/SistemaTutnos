import PanelLayout from "../../layout/PanelLayout";
import TeachersForm from "../../components/UserForms/TeachersForm";
import usuarioService from "../../services/usuarioService";
import bcrypt from 'bcryptjs';
import { Table, message, Button } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import { useState, useEffect } from "react";

import PersonIcon from "@mui/icons-material/Person";

const Teachers = () => {
  const [maestros, setMaestros] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await usuarioService.getAll();
        // Filtrar solo maestros
        const maestros = Array.isArray(response) ? response.filter(u => u.rol === "Maestro") : [];
        setMaestros(maestros);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  const handleCrearUsuario = async (data) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);
      // Crear nuevo usuario
      const nuevoUsuario = {
        nombre: data.maestroNombre,
        contrasena: hashedPassword,
        estatus: true,
        rol: "Maestro",
        idProfesor: data.maestroId,
      };
      const response = await usuarioService.create(nuevoUsuario);
      if (response.errorCode) {
        message.error("Error al crear usuario: " + response.errorCode);
      } else {
        setMaestros((prevUsuarios) => [...prevUsuarios, response]);
        message.success("Usuario creado exitosamente");
      }
    } catch (error) {
      message.error("Error al guardar usuario");
      console.error("Error al guardar usuario:", error);
    }
  };

  // Función para eliminar usuario
  const handleEliminarUsuario = async (id) => {
    try {
      const response = await usuarioService.delete(id);
      if (response && response.errorCode) {
        message.error("Error al eliminar usuario: " + response.errorCode);
      } else {
        setMaestros((prevUsuarios) => prevUsuarios.filter((u) => u.id !== id));
        message.success("Usuario eliminado exitosamente");
      }
    } catch (error) {
      message.error("Error al eliminar usuario");
      console.error("Error al eliminar usuario:", error);
    }
  };

  // Eliminada funcionalidad de editar usuario

  const dataSource = maestros.map((usuario) => ({
    key: usuario.id,
    name: usuario.nombre,
    status: usuario.estatus ? "Activo" : "Inactivo",
    role: usuario.rol,
    actions: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button 
          onClick={() => handleEliminarUsuario(usuario.id)} 
          icon={<DeleteOutlined />} 
          size="small"
          className="boton-eliminar"
        >
          Eliminar
        </Button>
      </div>
    ),
  }));

  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Rol",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  let iconAux = <PersonIcon style={{ fontSize: "2.25rem" }}></PersonIcon>;
  return (
    <PanelLayout
      icon={iconAux}
      name="Usuarios"
      content={
        <div>
          <TeachersForm
            onSubmit={handleCrearUsuario}
          />
          <Table dataSource={dataSource} columns={columns} />
        </div>
      }
    />
  );
};

export default Teachers;
