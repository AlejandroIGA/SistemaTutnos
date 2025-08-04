import Title from "antd/es/skeleton/Title";
import TeacherFormCrud from "../../components/TeacherFormCrud/TeacherFormCrud";
import PanelLayout from "../../layout/PanelLayout";
import CoPresentIcon from '@mui/icons-material/CoPresent';
import { EditOutlined, DeleteOutlined, ConsoleSqlOutlined } from '@ant-design/icons';
import { Table, Button, Modal, message } from "antd";
import { useEffect, useState } from "react";
import profesorService from "../../services/profesorService";
import { obtenerGrupos } from "../../services/grupoService";



const TeacherCrud = () => {
    let iconAux = <CoPresentIcon style={{ fontSize: "2.25rem" }} />

    const [editData, setEditData] = useState(null);
    const [isEditting, setIsEditting] = useState(false)
    const [teachers, setTeachers] = useState([]);
    const [idEdited, setIdEdited] = useState(null);
    const [grupos, setGrupos] = useState([]);
    

    const getProfesores = async (activos) => {
        const response = await profesorService.getAll(activos);
        setTeachers(response)
    }

    const getGrupos = async () => {
        const response = await obtenerGrupos();
        const gruposActivos = response.filter(grupo => grupo.estado === true);
        setGrupos(gruposActivos);
    }

    const getProfesorById = async (id) => {
        const response = await profesorService.getById(id);
        console.log("REPONSE FRONT: ", response)
    }

    useEffect(()=>{
        getGrupos();
        getProfesores(true);
    },[])

    const formatGruposForTable = (grupos) => {
        if (!grupos || grupos.length === 0) return 'Sin grupos';
        return grupos.map(grupo => grupo.nombre).join(', ');
    };

    const edit = (id) => {
        let dataAux = teachers.find(teacher => teacher.id == id);
        const gruposDisponibles = grupos.filter(grupo => !dataAux.grupos.some(grupoProfesor => grupoProfesor.id === grupo.id));
        setGrupos(gruposDisponibles);
        setIdEdited(id)
        setEditData(dataAux);
        setIsEditting(true);
    }

    const search = async (value, filter) => {
        if(value == ""){
            getProfesores(true);
            return true;
        }
        if(filter == "nombre"){
            const response = await profesorService.getByName(value)
            console.log(response)
            setTeachers(response)
        }
        if(filter == "correo"){
            const response = await profesorService.getByEmail(value)
            console.log(response)
            setTeachers(response)
        }
        
    }

    const submit = async (formData) => {
        formData["activo"] = 1;
        if(isEditting){
            const response = await profesorService.update(formData, idEdited)
            if(response.status == 400){
                message.error(response.data)
            }else{

                message.success("Información actualizada")
            }
            getProfesores(true);
            getGrupos();
            clearForm();
        }else{
            const response = await profesorService.create(formData);
            if(response.status == 400){
                message.error(response.data)
            }else{
                message.success("Información registrada")
            }
            getProfesores(true);
            getGrupos();
        }
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
            async onOk() {
                const response = await profesorService.delete(id)
                console.log("DELETE RESPONSE: ", response);

                if(response == ""){
                    // Simular eliminación
                    const updatedTeachers = teachers.filter(teacher => teacher.id !== id);
                    setTeachers(updatedTeachers);
                    // Mostrar mensaje de éxito
                    message.success(`Maestro "${nombre}" eliminado correctamente`);
                }else{
                    message.error("No se puedo eliminar al profesor")
                }
                
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

    const clearForm = () => {
        setEditData(null);
        setIsEditting(false);
        setIdEdited(null);
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