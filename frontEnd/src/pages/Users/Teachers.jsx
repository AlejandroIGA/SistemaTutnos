import React from "react";
import TeachersForm from "../../components/UserForms/TeachersForm";
import { Table } from "antd";

const Teachers = () => {
  const dataSource = [
    {
      key: "1",
      name: "John Doe",
      status: "Activo",
    },
    {
      key: "2",
      name: "Jane Smith",
      status: "Inactivo",
    },
  ];

  const columns = [
    {
      title: "Nombre del Maestro",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Acciones",
      key: "actions",
    },
  ];

  return (
    <div>
      <h1>Maestros</h1>
      <div style={{ width: 800, margin: "0 auto" }}>
        <TeachersForm
          onSubmit={(data) => {
            console.log("Datos del formulario:", data);
          }}
        />
        <Table dataSource={dataSource} columns={columns} />;
      </div>
    </div>
  );
};

export default Teachers;
