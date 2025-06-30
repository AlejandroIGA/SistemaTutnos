import PanelLayout from "../../layout/PanelLayout";
import TeachersForm from "../../components/UserForms/TeachersForm";
import { Table } from "antd";

import PersonIcon from "@mui/icons-material/Person";

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

  let iconAux = <PersonIcon style={{ fontSize: "2.25rem" }}></PersonIcon>;
  return (
    <PanelLayout
      icon={iconAux}
      name="Usuarios"
      content={
        <div>
          <TeachersForm
            onSubmit={(data) => {
              console.log("Datos del formulario:", data);
            }}
          />
          <Table dataSource={dataSource} columns={columns} />
        </div>
      }
    />
  );
};

export default Teachers;
