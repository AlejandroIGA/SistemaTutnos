import Title from "antd/es/skeleton/Title";
import TeacherFormCrud from "../../components/TeacherFormCrud/TeacherFormCrud";
import PanelLayout from "../../layout/PanelLayout";
import CoPresentIcon from '@mui/icons-material/CoPresent';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Button, Modal, message } from "antd";
import { useState } from "react";



const TeacherCrud = () => {
    let iconAux = <CoPresentIcon style={{ fontSize: "2.25rem" }} />

    const [editData, setEditData] = useState(null);
    const [isEditting, setIsEditting] = useState(false)
    const [teachers, setTeachers] = useState([
        {
            id: "1",
            nombre: "Maestro 1",
            correo: "maestro1@correo.com",
            grupos: [
                { id: 1, nombre: "Grupo A", carrera: "Ingeniería", semestre: "5to" },
                { id: 2, nombre: "Grupo B", carrera: "Sistemas", semestre: "3ro" }
            ],
            cubiculo: "1A"
        },
        {
            id: "2",
            nombre: "Maestro 2",
            correo: "maestro2@correo.com",
            grupos: [
                { id: 3, nombre: "Grupo C", carrera: "Informática", semestre: "4to" },
                { id: 4, nombre: "Grupo D", carrera: "Mecánica", semestre: "6to" }
            ],
            cubiculo: "2B"
        },
    ]);

    const formatGruposForTable = (grupos) => {
        if (!grupos || grupos.length === 0) return 'Sin grupos';
        return grupos.map(grupo => grupo.nombre).join(', ');
    };

    const edit = (id) => {
        let dataAux = teachers.find(teacher => teacher.id == id);
        setEditData(dataAux);
        setIsEditting(true);
    }

    const search = (value, filter) => {
        console.log("SEARCH: ",value," ", filter)
    }

    const submit = (formData) => {
        console.log("submit", formData)
    }

    const deleteTeacher = (id, nombre) => {
        Modal.confirm({
            title: '¿Estás seguro?',
            content: (
                <div>
                    <p>¿Deseas eliminar al maestro <strong>"{nombre}"</strong>?</p>
                    <p style={{ color: '#666', fontSize: '14px' }}>Esta acción no se puede deshacer.</p>
                </div>
            ),
            okText: 'Sí, eliminar',
            cancelText: 'Cancelar',
            okType: 'danger',
            width: 400,
            onOk() {
                // Simular eliminación
                const updatedTeachers = teachers.filter(teacher => teacher.id !== id);
                setTeachers(updatedTeachers);
                
                // Mostrar mensaje de éxito
                message.success(`Maestro "${nombre}" eliminado correctamente`);
                
                // Si estábamos editando este registro, limpiar el formulario
                if (editData && editData.id === id) {
                    setEditData(null);
                    setIsEditting(false);
                }
            },
            onCancel() {
                console.log('Eliminación cancelada');
            },
        });
    };

    const columnas = [
        { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
        { title: 'Correo', dataIndex: 'correo', key: 'correo' },
        { title: 'Grupos', key: 'grupos', render: (text, record) => formatGruposForTable(record.grupos) },
        { title: 'Cubículo', dataIndex: 'cubiculo', key: 'cubiculo' },
        {
            title: 'Acciones',
            key: 'acciones',
            width: 200,
            render: (text, record) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Button 
                        onClick={() => edit(record.id)} 
                        className="boton-editar" 
                        icon={<EditOutlined />}
                        size="small"
                    >
                        Editar
                    </Button>
                    <Button 
                        onClick={() => deleteTeacher(record.id, record.nombre)} 
                        icon={<DeleteOutlined />}
                        size="small"
                        className="boton-eliminar"
                    >
                        Eliminar
                    </Button>
                </div>
            )
        }
    ];

    const grupos = [
    { id: 1, nombre: "Grupo A", carrera: "Ingeniería", semestre: "5to" },
    { id: 2, nombre: "Grupo B", carrera: "Sistemas", semestre: "3ro" },
];

    const clearForm = () => {
        setEditData(null);
        setIsEditting(false);
    }

    return (
        <PanelLayout
            icon={iconAux}
            name="Maestros"
            content={
                <div>
                    <TeacherFormCrud editData={editData} clearForm={clearForm} onSearch={search} onSubmit={submit} grupos={grupos} isEditting={isEditting}/>
                    <br></br>
                    <Table columns={columnas} dataSource={teachers} rowKey="id" pagination={{pageSize:10}} />
                </div>
            }
        />
    )
}

export default TeacherCrud;