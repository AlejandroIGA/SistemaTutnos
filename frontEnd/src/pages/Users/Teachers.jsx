import PanelLayout from "../../layout/PanelLayout";
import TeachersForm from "../../components/UserForms/TeachersForm";
import usuarioService from "../../services/usuarioService";
import { Table, message } from "antd";
import { useState, useEffect } from "react";

import PersonIcon from "@mui/icons-material/Person";

const Teachers = () => {
  const [maestros, setMaestros] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await usuarioService.getAll();
        setMaestros(response);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

    const handleCrearUsuario = async (data) => {
    try {
      const nuevoUsuario = {
        nombre: data.name,
        contrasena: data.password,
        estatus: true,
        rol: "Maestro",
      };

      const response = await usuarioService.create(nuevoUsuario);

      if (response.errorCode) {
        console.error("Error al crear usuario:", response.errorCode);
        message.error("Error al crear usuario: " + response.errorCode);
      } else {
        setMaestros((prevUsuarios) => [...prevUsuarios, response]);
        console.log("Usuario creado exitosamente:", response);
        message.success("Usuario creado exitosamente");
      }
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  const dataSource = maestros.map((usuario) => ({
    key: usuario.id,
    name: usuario.nombre,
    status: usuario.estatus ? "Activo" : "Inactivo",
    role: usuario.rol,
    actions: (
      <div>
        <button onClick={() => console.log(`Editar usuario ${usuario.id}`)}>
          Editar
        </button>
        <button onClick={() => console.log(`Eliminar usuario ${usuario.id}`)}>
          Eliminar
        </button>
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
          <TeachersForm onSubmit={handleCrearUsuario} />
          <Table dataSource={dataSource} columns={columns} />
        </div>
      }
    />
  );
};

export default Teachers;
