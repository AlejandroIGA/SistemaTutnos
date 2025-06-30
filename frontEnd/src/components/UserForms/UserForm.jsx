import React from "react";
import { Form, Input, Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";

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

export default UserForm;
