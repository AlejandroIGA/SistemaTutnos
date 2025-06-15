import React, { useState } from 'react';
import { Input, Button, Radio, Table, Typography, Form } from 'antd';
import { SearchOutlined, UsergroupAddOutlined, EditOutlined } from '@ant-design/icons';
import FormGroup from '../../components/FormGroup/FormGroup';
import ModalConfirmacion from "../../components/GroupModalEliminar/ModalEliminar";
import PanelLayout from "../../layout/PanelLayout";
import GroupIcon from '@mui/icons-material/Group';
import "./Grupos.css"
const { Title } = Typography;
const Grupos = () => {
    const [busqueda, setBusqueda] = useState('');
    const [filtro, setFiltro] = useState('nombre');
    const [form] = Form.useForm();
    const datos = [
        {
            key: "1",
            nombre: "IDGS09",
            carrera: "Desarrollo de software",
            estado: "Activo",
        },
        {
            key: "2",
            nombre: "IDGS10",
            carrera: "Desarrollo de software",
            estado: "Inactivo",
        },
    ]
    const columnas = [
        { title: 'Nombre de grupo', dataIndex: 'nombre', key: 'nombre' },
        { title: 'Carrera', dataIndex: 'carrera', key: 'carrera' },
        { title: 'Estado', dataIndex: 'estado', key: 'estado' },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (text, record) => (
                <>
                    <Button className="boton-editar" icon={<EditOutlined />} >Editar</Button>{' '}
                    <ModalConfirmacion onConfirm={() => eliminarGrupo(record.key)} />
                </>
            )
        }
    ];
    let iconAux = <GroupIcon style={{ fontSize: "2.25rem" }} />

    return (
        <PanelLayout icon={iconAux} name="Grupos" content={
            <div>
                <Input.Search
                    placeholder="Buscar por nombre de grupo o carrera"
                    enterButton={<Button className="boton-buscar" icon={<SearchOutlined />}>Buscar</Button>}
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    style={{ marginBottom: 12 }}
                />
                <Radio.Group
                    onChange={(e) => setFiltro(e.target.value)}
                    value={filtro}
                    style={{marginBottom: 24, display: 'flex', justifyContent: 'center',}}
                    >
                    <Radio value="nombre">Nombre de grupo</Radio>
                    <Radio value="carrera">Carrera</Radio>
                </Radio.Group>
                <Title level={5}>
                <UsergroupAddOutlined style={{ marginRight: 8 }} />
                    Registrar nuevo grupo
                </Title>
                <FormGroup form={form} />
                <Title level={5}>Grupos</Title>
                <Table columns={columnas} dataSource={datos} />
            </div>
        }
        >
        </PanelLayout>
    );
};
export default Grupos;