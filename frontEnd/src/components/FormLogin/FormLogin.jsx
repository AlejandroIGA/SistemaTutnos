import { Form, Input, Button } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './FormLogin.css'; 

const FormLogin = ({ onFinish }) => {
  return (
    <Form
      name="login_form"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Por favor ingresa tu correo' }]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="Correo electrónico"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          type="password"
          placeholder="Contraseña"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" block>
          Iniciar sesión
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormLogin;
