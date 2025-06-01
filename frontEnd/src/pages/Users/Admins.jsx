import React from "react";
import UserForm from "../../components/UserForms/UserForm";
import { Table } from "antd";

const Admins = () => {
  const dataSource = [
    {
      key: "1",
      name: "John Doe",
      status: "Activo",
      role: "Administrador",
    },
    {
      key: "2",
      name: "Jane Smith",
      status: "Inactivo",
      role: "Maestro",
    },
  ];

  const columns = [
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
      key: "actions",
    },
  ];

  return (
    <div>
      <h1>Administradores</h1>
      <div style={{ width: 800, margin: "0 auto" }}>
        <UserForm
          onSubmit={(data) => {
            console.log("Datos del formulario:", data);
          }}
        />
        <Table dataSource={dataSource} columns={columns} />;
      </div>
    </div>
  );
};

export default Admins;
