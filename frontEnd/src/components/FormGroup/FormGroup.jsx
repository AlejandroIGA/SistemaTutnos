import React from 'react';
import { Form, Input, Button, ConfigProvider, Select } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

const FormGroup = ({ form, onFinish, editar }) => {
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

        {editar && (
          <Form.Item
            label="Estado"
            name="estado"
            rules={[{ required: true, message: 'Seleccione el estado del grupo' }]}
          >
            <Select placeholder="Seleccionar estado">
              <Select.Option value={true}>Activo</Select.Option>
              <Select.Option value={false}>Inactivo</Select.Option>
            </Select>
          </Form.Item>
        )}

        <Form.Item>
          <Button className='boton-agregar' htmlType="submit" icon={<CheckOutlined />}>
            {editar ? "Actualizar" : "Guardar"}
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};

export default FormGroup;
