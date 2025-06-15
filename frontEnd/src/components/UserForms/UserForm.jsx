import React from "react";
import { Form, Input, Button } from "antd";

const UserForm = ({ onSubmit }) => {
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
        label="Nombre de usuario"
        rules={[{ required: true, message: "Por favor ingresa tu nombre" }]}
      >
        <Input placeholder="Nombre" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Contraseña"
        rules={[{ required: true, message: "Por favor ingresa tu contraseña" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ margin: "0 auto", display: "flex" }}>
          Registrar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
