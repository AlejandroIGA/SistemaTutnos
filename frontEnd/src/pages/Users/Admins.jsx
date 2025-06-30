import { Table } from "antd";
import PanelLayout from "../../layout/PanelLayout";
import UserForm from "../../components/UserForms/UserForm";
import PersonIcon from "@mui/icons-material/Person";

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

  let iconAux = <PersonIcon style={{ fontSize: "2.25rem" }}></PersonIcon>;
  return (
    <PanelLayout
      icon={iconAux}
      name="Administradores"
      content={
        <div>
          <UserForm
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

export default Admins;
