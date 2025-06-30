import React, { useState, useEffect } from "react";
import { Input, Button, Radio, Table, Typography, Form, notification, } from "antd";
import { SearchOutlined, UsergroupAddOutlined, EditOutlined, } from "@ant-design/icons";
import GroupIcon from "@mui/icons-material/Group";
import FormGroup from "../../components/FormGroup/FormGroup";
import ModalConfirmacion from "../../components/GroupModalEliminar/ModalEliminar";
import PanelLayout from "../../layout/PanelLayout";
import { obtenerGrupos, obtenerGrupoPorCarrera, obtenerGrupoPorNombre, agregarGrupo, actualizarGrupo, eliminarGrupo, } from "../../services/grupoService";
import "./Grupos.css";
const { Title } = Typography;
const Grupos = () => {
    const [busqueda, setBusqueda] = useState("");
    const [filtro, setFiltro] = useState("nombre");
    const [form] = Form.useForm();
    const [datos, setDatos] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [grupoEnEdicion, setGrupoEnEdicion] = useState(null);

    const cargarGrupos = async () => {
        try {
            setCargando(true);
            const grupos = await obtenerGrupos();
            setDatos(
                grupos.map((grupo) => ({
                    key: grupo.id,
                    nombre: grupo.nombre,
                    carrera: grupo.carrera,
                    estado: grupo.estado ? "Activo" : "Inactivo",
                }))
            );
        } catch (error) {
            console.error("Error al cargar grupos:", error);
        } finally {
            setCargando(false);
        }
    };
    useEffect(() => {
        cargarGrupos();
    }, []);

    const manejarBusqueda = async () => {
        try {
            setCargando(true);
            if (!busqueda.trim()) {
                await cargarGrupos();
                return;
            }
            let resultado = [];
            if (filtro === "nombre") {
                const grupo = await obtenerGrupoPorNombre(busqueda);
                resultado = [grupo];
            }else if (filtro === "carrera") {
            resultado = await obtenerGrupoPorCarrera(busqueda); 
            console.log(resultado);
            }
            setDatos(
                resultado.map((grupo) => ({
                    key: grupo.id,
                    nombre: grupo.nombre,
                    carrera: grupo.carrera,
                    estado: grupo.estado ? "Activo" : "Inactivo",
                }))
            );
        } catch (error) {
            console.error("No se encontraron resultados:", error);
            setDatos([]);
        } finally {
            setCargando(false);
        }
    };
    const manejarAgregarGrupo = async (valores) => {
        try {
            if (grupoEnEdicion) {
                if (valores.estado === undefined) {
                    valores.estado =
                        grupoEnEdicion.estado === true ||
                        grupoEnEdicion.estado === 1 ||
                        (typeof grupoEnEdicion.estado === "string" && grupoEnEdicion.estado.toLowerCase() === "activo");
                } else {
                    if (typeof valores.estado === "string") {
                        valores.estado = valores.estado.toLowerCase() === "activo";
                    } else {
                        valores.estado = Boolean(valores.estado);
                    }
                }
                await actualizarGrupo(grupoEnEdicion.key, valores);
                notification.success({ message: "Grupo actualizado con éxito" });
            } else {
                valores.estado = true;
                await agregarGrupo(valores);
                notification.success({ message: "Grupo agregado con éxito" });
            }
            form.resetFields();
            setGrupoEnEdicion(null);
            cargarGrupos();
        } catch (error) {
            console.error("Error al guardar grupo:", error);
        }
    };
    const manejarEliminarGrupo = async (id) => {
        try {
            await eliminarGrupo(id);
            notification.success({ message: "Grupo eliminado con éxito" });
            cargarGrupos();
        } catch (error) {
            console.error("Error al eliminar grupo:", error);
        }
    };
    const columnas = [
        { title: "Nombre de grupo", dataIndex: "nombre", key: "nombre" },
        { title: "Carrera", dataIndex: "carrera", key: "carrera" },
        { title: "Estado", dataIndex: "estado", key: "estado" },
        {
            title: "Acciones",
            key: "acciones",
            render: (text, record) => (
                <>
                    <Button
                        className="boton-editar"
                        icon={<EditOutlined />}
                        onClick={() => {
                            setGrupoEnEdicion(record);
                            form.setFieldsValue({
                                nombre: record.nombre,
                                carrera: record.carrera,
                                estado: record.estado,
                            });
                        }}
                    >
                        Editar
                    </Button>
                    <ModalConfirmacion
                        onConfirm={() => manejarEliminarGrupo(record.key)}
                    />
                </>
            ),
        },
    ];
    let iconAux = <GroupIcon style={{ fontSize: "2.25rem" }} />;
    return (
        <PanelLayout
            icon={iconAux}
            name="Grupos"
            content={
                <div>
                    <Input.Search
                        placeholder="Buscar por nombre de grupo o carrera"
                        enterButton={
                            <Button
                                className="boton-buscar"
                                icon={<SearchOutlined />}
                                type="primary"
                                style={{ backgroundColor: "#387478", borderColor: "#387478" }}>
                                Buscar
                            </Button>
                        }
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        onSearch={manejarBusqueda}
                        style={{ marginBottom: 12 }}
                    />
                    <Radio.Group
                        onChange={(e) => setFiltro(e.target.value)}
                        value={filtro}
                        style={{
                            marginBottom: 24,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Radio value="nombre">Nombre de grupo</Radio>
                        <Radio value="carrera">Carrera</Radio>
                    </Radio.Group>
                    <Title level={5}>
                        <UsergroupAddOutlined style={{ marginRight: 10 }} />
                        Registrar nuevo grupo
                    </Title>
                    <FormGroup
                        form={form}
                        onFinish={manejarAgregarGrupo}
                        editar={!!grupoEnEdicion}
                    />
                    <Title level={5}>Grupos</Title>
                    <Table columns={columnas} dataSource={datos} loading={cargando} />
                </div>
            }
        />
    );
};
export default Grupos;