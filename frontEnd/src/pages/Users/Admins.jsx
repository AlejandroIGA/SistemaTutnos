import { Table, message } from "antd";
import PanelLayout from "../../layout/PanelLayout";
import UserForm from "../../components/UserForms/UserForm";
import PersonIcon from "@mui/icons-material/Person";
import usuarioService from "../../services/usuarioService";
import { useState, useEffect } from "react";

const Admins = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await usuarioService.getAll();
        setUsuarios(response);
      } catch (error) {
        console.error("Error fetching usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleCrearUsuario = async (data) => {
    try {
      const nuevoUsuario = {
        nombre: data.name,
        contrasena: data.password,
        estatus: true,
        rol: "Administrador",
      };

      const response = await usuarioService.create(nuevoUsuario);

      if (response.errorCode) {
        console.error("Error al crear usuario:", response.errorCode);
        message.error("Error al crear usuario: " + response.errorCode);
      } else {
        setUsuarios((prevUsuarios) => [...prevUsuarios, response]);
        console.log("Usuario creado exitosamente:", response);
        message.success("Usuario creado exitosamente");
      }
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  const dataSource = usuarios.map((usuario) => ({
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
      name="Administradores"
      content={
        <div>
          <UserForm onSubmit={handleCrearUsuario} />
          <Table dataSource={dataSource} columns={columns} />
        </div>
      }
    />
  );
};

export default Admins;
