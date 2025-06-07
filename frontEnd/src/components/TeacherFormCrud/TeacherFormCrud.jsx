import React, { useState } from "react";
import { Input, Button, Radio, Table, Typography, Form, ConfigProvider } from 'antd';
import { CheckOutlined, SearchOutlined } from '@ant-design/icons';
import GroupIcon from '@mui/icons-material/Group';
import Search from "antd/es/input/Search";

const TeacherFormCrud = ({ onSubmit, editData }) => {
    const [form] = Form.useForm();

    const [busqueda, setBusqueda] = useState("");
    const [filtro, setFiltro] = useState("nombre");

    const handleFinish = (values) => {
        console.log("Form data:", values);
        onSubmit?.(values); 
    };

    const handleSearch = () => {
        console.log("Busqueda", busqueda, "en", filtro);
    }



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
                    onSearch={handleSearch}
                    value={busqueda}
                    onChange={(e)=>setBusqueda(e.target.value)}
                    style={{ marginBottom: 12 }}
                />
                <Radio.Group
                    onChange={(e) => setFiltro(e.target.value)}
                    value={filtro}
                    style={{marginBottom: 24, display: 'flex', justifyContent: 'center',}}
                    >
                    <Radio value="nombre">Nombre</Radio>
                    <Radio value="correo">Correo</Radio>
                    <Radio value="grupo">Grupo</Radio>
                </Radio.Group>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                autoComplete="off"
            >
                <Form.Item
                    name="name"
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
                    rules={[{ required: true, message: "Seleccióne uno o varios grupos" }]}
                >
                    <Input placeholder="Aquí apareceran los grupos seleccionados" />
                </Form.Item>
                <div style={{ display: "flex", justifyContent:"space-between", alignContent:"center", alignItems:"center" }}>
                    <Button
                        type="primary"
                        icon={<GroupIcon></GroupIcon>}
                        style={{ border: "none" }}
                    >
                        Añadir grupos
                    </Button>
                    <Button className='boton-agregar' htmlType="submit" icon={<CheckOutlined />}>
                        Guardar
                    </Button>
                </div>


            </Form>
        </ConfigProvider>
    );
};

export default TeacherFormCrud;
