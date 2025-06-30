import React from "react";
import { Form, Input, Button, Select } from "antd";
import { CheckOutlined  } from '@ant-design/icons';

const TeachersForm = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log("Form data:", values);
    onSubmit?.(values); // si se pasó una función onSubmit, la ejecuta
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
        <Select placeholder="Selecciona un maestro para su alta">
          <Option value="male">Isaac Newton</Option>
          <Option value="female">Stephen Hawking </Option>
          <Option value="other">Marie Curie</Option>
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
