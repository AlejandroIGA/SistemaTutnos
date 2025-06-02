import React from 'react';
import { Form, Input, Button, ConfigProvider } from 'antd';
import { CheckOutlined  } from '@ant-design/icons';
const FormGroup = ({ form, onFinish }) => {
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
          }

        },
      }}
    >
      <Form form={form} layout="vertical" onFinish={onFinish} style={{ marginBottom: 24 }}>
        <Form.Item
          label="Nombre de grupo"
          name="nombre"
          rules={[{ required: true, message: 'Por favor ingrese el nombre del grupo' }]}
        >
          <Input placeholder="Ingresar grupo" />
        </Form.Item>
        <Form.Item
          label="Carrera"
          name="carrera"
          rules={[{ required: true, message: 'Por favor ingrese la carrera' }]}
        >
          <Input placeholder="Ingresar carrera" />
        </Form.Item>
        <Form.Item>
          <Button className='boton-agregar' htmlType="submit" icon={<CheckOutlined  />}>
            Guardar
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};
export default FormGroup;