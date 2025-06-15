import React, { useEffect, useState } from "react";
import { Input, Button, Radio, Table, Typography, Form, ConfigProvider, Modal, Checkbox, Space, Tag } from 'antd';
import { CheckOutlined, SearchOutlined, CloseOutlined } from '@ant-design/icons';
import GroupIcon from '@mui/icons-material/Group';
import Search from "antd/es/input/Search";

const TeacherFormCrud = ({ onSubmit, editData, clearForm, onSearch, grupos = [], isEditting }) => {
    const [form] = Form.useForm();

    const [busqueda, setBusqueda] = useState("");
    const [filtro, setFiltro] = useState("nombre");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [tempSelectedGroups, setTempSelectedGroups] = useState([]);

    useEffect(() => {
        console.log("Console desde el form: ", editData);
        if (editData) {
            console.log("ABEMUS DATOS");
            form.setFieldsValue({
                nombre: editData.nombre,
                correo: editData.correo,
                cubiculo: editData.cubiculo,
            });
            // Si editData tiene grupos, establecerlos como seleccionados
            if (editData.grupos && Array.isArray(editData.grupos)) {
                setSelectedGroups(editData.grupos);
            }
        } else {
            form.setFieldsValue({
                nombre: "",
                correo: "",
                cubiculo: "",
            })
            setSelectedGroups([])
        }
    }, [editData, form, isEditting]);

    // Actualizar el campo de grupos cuando cambian los grupos seleccionados
    useEffect(() => {
        const gruposTexto = selectedGroups.map(grupo => grupo.nombre || grupo).join(', ');
        form.setFieldsValue({ grupos: gruposTexto });
    }, [selectedGroups, form]);

    const showModal = () => {
        setTempSelectedGroups([...selectedGroups]);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setSelectedGroups([...tempSelectedGroups]);
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setTempSelectedGroups([...selectedGroups]);
        setIsModalVisible(false);
    };

    const handleGroupSelection = (grupo, checked) => {
        if (checked) {
            setTempSelectedGroups(prev => [...prev, grupo]);
        } else {
            setTempSelectedGroups(prev => prev.filter(g => g.id !== grupo.id));
        }
    };

    const removeGroup = (grupoToRemove) => {
        setSelectedGroups(prev => prev.filter(g => g.id !== grupoToRemove.id));
    };

    const handleSubmit = () => {
        const formValues = form.getFieldsValue();
        const dataToSubmit = {
            ...formValues,
            grupos: selectedGroups
        };
        onSubmit(dataToSubmit);
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#387478",
                },
                components: {
                    Form: {
                        labelColor: "#387478",
                        fontFamily: "Inter, sans-serif",
                    },
                }
            }}
        >
            <Search
                placeholder="Buscar por nombre de grupo o carrera"
                onSearch={() => onSearch(busqueda, filtro)}
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                style={{ marginBottom: 12 }}
            />
            <Radio.Group
                onChange={(e) => setFiltro(e.target.value)}
                value={filtro}
                style={{ marginBottom: 24, display: 'flex', justifyContent: 'center' }}
            >
                <Radio value="nombre">Nombre</Radio>
                <Radio value="correo">Correo</Radio>
                <Radio value="grupo">Grupo</Radio>
            </Radio.Group>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                autoComplete="off"
            >
                <Form.Item
                    name="nombre"
                    label="Nombre"
                    rules={[{ required: true, message: "Ingrese un nombre" }]}
                >
                    <Input placeholder="Ingrese un nombre" />
                </Form.Item>

                <Form.Item
                    name="correo"
                    label="Correo"
                    rules={[{ required: true, message: "Ingrese un correo" }]}
                >
                    <Input placeholder="Ingrese un correo" type="email" />
                </Form.Item>

                <Form.Item
                    name="cubiculo"
                    label="Cubículo"
                    rules={[{ required: true, message: "Ingrese un cubículo" }]}
                >
                    <Input placeholder="Ingrese un número de cubículo" />
                </Form.Item>

                <Form.Item
                    name="grupos"
                    label="Grupos"
                    rules={[{ required: true, message: "Seleccione uno o varios grupos" }]}
                >
                    <Input placeholder="Aquí aparecerán los grupos seleccionados" disabled />
                </Form.Item>

                {/* Mostrar grupos seleccionados como tags */}
                {selectedGroups.length > 0 && (
                    <div style={{ marginBottom: 16 }}>
                        <Typography.Text strong>Grupos seleccionados:</Typography.Text>
                        <div style={{ marginTop: 8 }}>
                            <Space size={[0, 8]} wrap>
                                {selectedGroups.map((grupo) => (
                                    <Tag
                                        key={grupo.id}
                                        closable
                                        onClose={() => removeGroup(grupo)}
                                        color="#387478"
                                    >
                                        {grupo.nombre || grupo}
                                    </Tag>
                                ))}
                            </Space>
                        </div>
                    </div>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", alignContent: "center", alignItems: "center" }}>
                    <Button
                        type="primary"
                        icon={<GroupIcon />}
                        style={{ border: "none" }}
                        onClick={showModal}
                    >
                        Añadir grupos
                    </Button>
                    <div>
                        {
                            isEditting ?
                                <Button className='boton-eliminar' onClick={clearForm} icon={<CloseOutlined />}>
                                    cancelar
                                </Button>
                                :
                                <></>
                        }
                        <Button className='boton-agregar' htmlType="submit" icon={<CheckOutlined />}>
                            Guardar
                        </Button>
                    </div>

                </div>
            </Form>

            {/* Modal para seleccionar grupos */}
            <Modal
                title="Seleccionar Grupos"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={600}
                okText="Confirmar"
                cancelText="Cancelar"
            >
                <div style={{ maxHeight: 400, overflowY: 'auto' }}>
                    {grupos.length === 0 ? (
                        <Typography.Text type="secondary">No hay grupos disponibles</Typography.Text>
                    ) : (
                        <Space direction="vertical" style={{ width: '100%' }}>
                            {grupos.map((grupo) => (
                                <Checkbox
                                    key={grupo.id}
                                    checked={tempSelectedGroups.some(g => g.id === grupo.id)}
                                    onChange={(e) => handleGroupSelection(grupo, e.target.checked)}
                                    style={{ width: '100%', padding: '8px 0' }}
                                >
                                    <div>
                                        <div style={{ fontWeight: 'bold' }}>{grupo.nombre}</div>
                                        {grupo.carrera && (
                                            <div style={{ fontSize: '12px', color: '#666' }}>
                                                Carrera: {grupo.carrera}
                                            </div>
                                        )}
                                        {grupo.semestre && (
                                            <div style={{ fontSize: '12px', color: '#666' }}>
                                                Semestre: {grupo.semestre}
                                            </div>
                                        )}
                                    </div>
                                </Checkbox>
                            ))}
                        </Space>
                    )}
                </div>
            </Modal>
        </ConfigProvider>
    );
};

export default TeacherFormCrud;