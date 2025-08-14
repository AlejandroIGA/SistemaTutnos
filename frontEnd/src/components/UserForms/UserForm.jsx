
import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";

const UserForm = ({ onSubmit, initialValues, formRef }) => {
  const [form] = Form.useForm();
  // Permitir acceso al form desde el padre
  useEffect(() => {
    if (formRef) {
      formRef.current = form;
    }
  }, [formRef, form]);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleFinish = (values) => {
    onSubmit?.(values);
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
