import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { CheckOutlined  } from '@ant-design/icons';
import profesorService from "../../services/profesorService";

const { Option } = Select;

const TeachersForm = ({ onSubmit, formRef }) => {
  const [form] = Form.useForm();
  // Permitir acceso al form desde el padre
  useEffect(() => {
    if (formRef) {
      formRef.current = form;
    }
  }, [formRef, form]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      setLoading(true);
      const res = await profesorService.getAll(true);
      if (Array.isArray(res)) {
        // Solo mostrar maestros con idUsuario === 0
        setTeachers(res.filter(t => t.idUsuario === 0));
      } else {
        setTeachers([]);
      }
      setLoading(false);
    };
    fetchTeachers();
  }, []);

  const handleFinish = (values) => {
    // Parsear el valor seleccionado para obtener id y nombre
    let maestro = { id: '', nombre: '' };
    try {
      maestro = JSON.parse(values.name);
    } catch (e) {}
    const newValues = {
      ...values,
      maestroId: maestro.id,
      maestroNombre: maestro.nombre,
    };
    console.log("Form data:", newValues);
    onSubmit?.(newValues);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      autoComplete="off"
    >
      <Form.Item
        name="name"
        label="Seleccionar Maestro"
        rules={[{ required: true, message: "Seleccionar Maestro" }]}
      >
        <Select placeholder="Selecciona un maestro para su alta" loading={loading} allowClear>
          {teachers.map((teacher) => (
            <Option key={teacher.id} value={JSON.stringify({ id: teacher.id, nombre: teacher.nombre })}>{teacher.nombre}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="password"
        label="Contraseña"
        rules={[{ required: true, message: "Por favor ingresa tu contraseña" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="password2"
        label="Confirmar Contraseña"
        rules={[{ required: true, message: "Confirmar contraseña" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button
          className="boton-agregar"
          htmlType="submit"
          icon={<CheckOutlined />}
        >
          Guardar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TeachersForm;
