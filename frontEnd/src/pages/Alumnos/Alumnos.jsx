import { useState } from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  Radio,
  Button,
  Table,
  Space,
  Modal,
  message,
} from 'antd';
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import SchoolIcon from '@mui/icons-material/School';
import PanelLayout from '../../layout/PanelLayout';
import './Alumnos.css';

const { Option } = Select;

const initialStudents = [
  {
    id: '2130123456',
    nombre: 'Juan Pérez López',
    grupo: 'TI‑501',
    grupos: ['TI‑501'],
  },
  {
    id: '2139879872',
    nombre: 'María García Ruiz',
    grupo: 'TI‑602',
    grupos: ['TI‑602'],
  },
  {
    id: '21303146378',
    nombre: 'Carlos Rodríguez',
    grupo: 'TI‑501',
    grupos: ['TI‑501'],
  },
  {
    id: '21300001234',
    nombre: 'Ana Martínez Silva',
    grupo: 'TI‑503',
    grupos: ['TI‑503'],
  },
];

const Alumnos = () => {
  const [form] = Form.useForm();
  const [students, setStudents] = useState(initialStudents);
  const [filterBy, setFilterBy] = useState('nombre');
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    if (!searchValue) {
      message.info('Escribe algo para buscar 🙂');
      return;
    }
    const match = students.filter((s) =>
      String(s[filterBy])
        .toLowerCase()
        .includes(searchValue.toLowerCase()),
    );
    message.success(`Encontrados ${match.length} registro(s)`);
    setStudents(match);
  };

  const handleSubmit = (values) => {
    const exists = students.some((s) => s.id === values.matricula);
    const data = {
      id: values.matricula,
      nombre: values.nombreCompleto,
      grupo: values.grupo,
      grupos: values.grupos,
    };
    const newList = exists
      ? students.map((s) => (s.id === data.id ? data : s))
      : [...students, data];

    setStudents(newList);
    form.resetFields();
    message.success(exists ? 'Alumno actualizado' : 'Alumno guardado');
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: '¿Estás seguro?',
      content: (
        <div>
          <p>¿Deseas eliminar al alumno <strong>{record.nombre}</strong>?</p>
          <p style={{ fontSize: '13px', color: '#888' }}>Esta acción no se puede deshacer.</p>
        </div>
      ),
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: () => {
        setStudents((prev) => prev.filter((s) => s.id !== record.id));
        message.success(`Alumno "${record.nombre}" eliminado`);
      },
    });
  };

  const columns = [
    { title: 'Matrícula', dataIndex: 'id', key: 'id' },
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
    { title: 'Grupo', dataIndex: 'grupo', key: 'grupo' },
    {
      title: 'Grupos',
      dataIndex: 'grupos',
      key: 'grupos',
      render: (grupos) => grupos.join(', '),
    },
    {
      title: 'Acciones',
      key: 'action',
      width: 180,
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            icon={<EditOutlined />}
            className="btn-edit"
            onClick={() =>
              form.setFieldsValue({
                matricula: record.id,
                nombreCompleto: record.nombre,
                grupo: record.grupo,
                grupos: record.grupos,
              })
            }
          >
            Editar
          </Button>
          <Button
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  const iconAux = <SchoolIcon style={{ fontSize: '2.25rem' }} />;

  return (
    <PanelLayout
      icon={iconAux}
      name="Alumnos"
      content={
        <div className="student-crud-wrapper">
          {/* -------------------- BUSCADOR -------------------- */}
          <Row gutter={16} align="middle">
            <Col flex="auto">
              <Input
                placeholder="Buscar por nombre, correo o grupo"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                allowClear
              />
            </Col>
            <Col>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={handleSearch}
              >
                Buscar
              </Button>
            </Col>
          </Row>

          <Radio.Group
            className="radio-filter"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
          >
            <Radio value="nombre">Nombre</Radio>
            <Radio value="id">Matrícula</Radio>
            <Radio value="grupo">Grupo</Radio>
          </Radio.Group>

          {/* -------------------- FORMULARIO -------------------- */}
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="student-form"
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="matricula"
                  label="Matrícula"
                  rules={[{ required: true, message: 'Ingrese la matrícula' }]}
                >
                  <Input className="input-outline" placeholder="placeholder" />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="nombreCompleto"
                  label="Nombre completo"
                  rules={[{ required: true, message: 'Ingrese el nombre' }]}
                >
                  <Input className="input-outline" placeholder="placeholder" />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="grupo"
                  label="Grupo"
                  rules={[{ required: true, message: 'Ingrese el grupo' }]}
                >
                  <Input className="input-outline" placeholder="placeholder" />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="grupos"
                  label="Grupos"
                  rules={[{ required: true, message: 'Seleccione al menos uno' }]}
                >
                  <Select
                    mode="multiple"
                    placeholder="placeholder"
                    className="input-outline"
                  >
                    <Option value="TI‑501">TI‑501</Option>
                    <Option value="TI‑602">TI‑602</Option>
                    <Option value="TI‑503">TI‑503</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={24} style={{ textAlign: 'right' }}>
                <Button
                  htmlType="submit"
                  className="btn-save"
                  icon={<SaveOutlined />}
                >
                  Guardar
                </Button>
              </Col>
            </Row>
          </Form>

          {/* -------------------- TABLA -------------------- */}
          <Table
            columns={columns}
            dataSource={students}
            rowKey="id"
            pagination={{ pageSize: 8 }}
            className="student-table"
          />
        </div>
      }
    />
  );
};

export default Alumnos;
