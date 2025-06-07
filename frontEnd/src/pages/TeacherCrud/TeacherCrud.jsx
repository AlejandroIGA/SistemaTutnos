import Title from "antd/es/skeleton/Title";
import TeacherFormCrud from "../../components/TeacherFormCrud/TeacherFormCrud";
import PanelLayout from "../../layout/PanelLayout";
import CoPresentIcon from '@mui/icons-material/CoPresent';
import { SearchOutlined, UsergroupAddOutlined, EditOutlined } from '@ant-design/icons';
import { Table, Button } from "antd";
import { useState } from "react";



const TeacherCrud = () => {
    let iconAux = <CoPresentIcon style={{ fontSize: "2.25rem" }} />

    const [editData, setEditData] = useState({});

    const edit = (id) => {
        console.log("EDIT",id)
    }

    const datos = [
        {
            id: "1",
            nombre: "Maestro",
            correo: "maestro@correo.com",
            grupos: "1,2,3,4",
        },
        {
            id: "2",
            nombre: "Maestro",
            correo: "maestro@correo.com",
            grupos: "1,2,3,4",
        },
    ]
    const columnas = [
        { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
        { title: 'Correo', dataIndex: 'correo', key: 'correo' },
        { title: 'Grupos', dataIndex: 'grupos', key: 'grupos' },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (text, record) => (
                <>
                    <Button onClick={() => edit(record.id)} className="boton-editar" icon={<EditOutlined />} >Editar</Button>
                </>
            )
        }
    ];

    return (
        <PanelLayout
            icon={iconAux}
            name="Maestros"
            content={
                <div>
                    <TeacherFormCrud editData={editData}/>
                    <Title level={5}>Grupos</Title>
                    <Table columns={columnas} dataSource={datos} />
                </div>
            }
        />
    )
}

export default TeacherCrud;