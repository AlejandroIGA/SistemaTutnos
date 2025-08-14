import { Table, message, Button } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import PanelLayout from "../../layout/PanelLayout";
import UserForm from "../../components/UserForms/UserForm";
import PersonIcon from "@mui/icons-material/Person";
import usuarioService from "../../services/usuarioService";
import { useState, useEffect } from "react";
import React, { useRef } from "react";
import { EditOutlined } from '@ant-design/icons';
import bcrypt from 'bcryptjs';

const Admins = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const formRef = useRef();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await usuarioService.getAll();
        // Filtrar solo administradores
        const admins = Array.isArray(response) ? response.filter(u => u.rol === "Admin") : [];
        setUsuarios(admins);
      } catch (error) {
        console.error("Error fetching usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleCrearUsuario = async (data) => {
    try {

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);
            
      if (editingUser) {
        // Editar usuario existente
        const usuarioActualizado = {
          ...editingUser,
          nombre: data.name,
          contrasena: hashedPassword,
          estatus: true,
          rol: "Admin",
        };
        const response = await usuarioService.edit(editingUser.id,usuarioActualizado);
        if (response && response.errorCode) {
          message.error("Error al actualizar usuario: " + response.errorCode);
        } else {
          setUsuarios((prevUsuarios) => prevUsuarios.map((u) => u.id === editingUser.id ? response : u));
          setEditingUser(null);
          message.success("Usuario actualizado exitosamente");
          if (formRef.current) formRef.current.resetFields();
        }
      } else {
        // Crear nuevo usuario
        const nuevoUsuario = {
          nombre: data.name,
          contrasena: hashedPassword,
          estatus: true,
          rol: "Admin",
        };
        const response = await usuarioService.create(nuevoUsuario);
        if (response.errorCode) {
          message.error("Error al crear usuario: " + response.errorCode);
        } else {
          setUsuarios((prevUsuarios) => [...prevUsuarios, response]);
          message.success("Usuario creado exitosamente");
          if (formRef.current) formRef.current.resetFields();
        }
      }
    } catch (error) {
      message.error("Error al guardar usuario");
      console.error("Error al guardar usuario:", error);
    }
  };

  const handleCancelarEdicion = () => {
    setEditingUser(null);
  };

  // Función para eliminar usuario
  const handleEliminarUsuario = async (id) => {
    try {
      const response = await usuarioService.delete(id);
      if (response && response.errorCode) {
        message.error("Error al eliminar usuario: " + response.errorCode);
      } else {
        setUsuarios((prevUsuarios) => prevUsuarios.filter((u) => u.id !== id));
        message.success("Usuario eliminado exitosamente");
      }
    } catch (error) {
      message.error("Error al eliminar usuario");
      console.error("Error al eliminar usuario:", error);
    }
  };

  const handleEditarUsuario = (usuario) => {
    setEditingUser(usuario);
  };

  const dataSource = usuarios.map((usuario) => ({
    key: usuario.id,
    name: usuario.nombre,
    status: usuario.estatus ? "Activo" : "Inactivo",
    role: usuario.rol,
    actions: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button 
          onClick={() => handleEditarUsuario(usuario)} 
          icon={<EditOutlined />} 
          size="small"
          className="boton-editar"
        >
          Editar
        </Button>
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
      name="Administradores"
      content={
        <div>
          <UserForm 
            onSubmit={handleCrearUsuario}
            initialValues={editingUser ? {
              name: editingUser.nombre,
              password: '',
              password2: '',
            } : undefined}
            formRef={formRef}
          />
          {editingUser && (
            <Button onClick={handleCancelarEdicion} style={{ marginBottom: 16 }}>
              Cancelar edición
            </Button>
          )}
          <Table dataSource={dataSource} columns={columns} />
        </div>
      }
    />
  );
};

export default Admins;
