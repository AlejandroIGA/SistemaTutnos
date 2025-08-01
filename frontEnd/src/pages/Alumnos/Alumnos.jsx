// src/components/Alumnos.jsx
import React, { useState, useEffect } from 'react';
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

// Importa tus servicios
import { obtenerAlumnos, guardarAlumno, eliminarAlumno } from '../../services/alumnoService';
import { obtenerGrupos } from '../../services/grupoService';

const { Option } = Select;

const Alumnos = () => {
  const [form] = Form.useForm();
  const [students, setStudents] = useState([]);
  const [filterBy, setFilterBy] = useState('todos');
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
const [grupos, setGrupos] = useState([]);
const nombresUnicos = [...new Map(grupos.map(g => [g.nombre, g])).values()];
const [alumnosOriginales, setAlumnosOriginales] = useState([]);

  // Cargar alumnos al montar el componente
  useEffect(() => {
    cargarAlumnos();
    cargarGrupos();
  }, []);

  const cargarAlumnos = async () => {
  setLoading(true);
  try {
    const data = await obtenerAlumnos();
    setStudents(data);
    setAlumnosOriginales(data); // Guardamos todos los alumnos originales
  } catch (error) {
    message.error('Error al cargar alumnos');
  } finally {
    setLoading(false);
  }
};

  const cargarGrupos = async () => {
  try {
    const data = await obtenerGrupos();
    setGrupos(data);
  } catch (error) {
    message.error("Error al cargar grupos desde la base de datos");
  }
};


  // Buscar alumnos filtrados en el estado local
  const handleSearch = () => {
  if (filterBy !== 'todos' && !searchValue.trim()) {
    message.warning('Debes escribir algo para buscar');
    return;
  }

  if (filterBy === 'todos') {
    setStudents(alumnosOriginales);
    return;
  }

  const match = alumnosOriginales.filter((s) => {
    const field = s[filterBy];
    if (Array.isArray(field)) {
      return field.some((g) =>
        g.toLowerCase().includes(searchValue.toLowerCase())
      );
    } else if (field) {
      return field.toString().toLowerCase().includes(searchValue.toLowerCase());
    }
    return false;
  });

  if (match.length === 0) {
    message.info('No se encontraron registros');
  } else {
    message.success(`Encontrados ${match.length} registro(s)`);
  }

  setStudents(match);
};



  // Guardar o actualizar alumno (con backend)
  const handleSubmit = async (values) => {
  const alumno = {
    id: values.id,  // <-- Asegúrate de capturarlo
    matricula: values.matricula,
    nombre: values.nombreCompleto,
    grupo: values.grupo,
  };

  try {
    await guardarAlumno(alumno);
    message.success('Alumno guardado/actualizado correctamente');
    form.resetFields();
    await cargarAlumnos();
  } catch (error) {
    message.error('Error guardando alumno');
  }
};


  // Eliminar alumno (con backend)
  const handleDelete = (record) => {
    Modal.confirm({
      title: '¿Estás seguro?',
      content: (
        <div>
          <p>
            ¿Deseas eliminar al alumno <strong>{record.nombre}</strong>?
          </p>
          <p style={{ fontSize: '13px', color: '#888' }}>
            Esta acción no se puede deshacer.
          </p>
        </div>
      ),
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      async onOk() {
        try {
          await eliminarAlumno(record.id);
          message.success(`Alumno "${record.nombre}" eliminado`);
          await cargarAlumnos();
        } catch (error) {
          message.error('Error al eliminar alumno');
        }
      },
    });
  };

  const columns = [
    { title: 'Matrícula', dataIndex: 'matricula', key: 'matricula' },
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
    
    {
  title: 'Grupo',
  dataIndex: 'grupo',
  key: 'grupo',
  render: (grupo) => Array.isArray(grupo) ? grupo.join(', ') : (grupo || ''),
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
    id: record.id,
    matricula: record.matricula,
    nombreCompleto: record.nombre,
grupo: record.grupo || '',
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
                placeholder="Buscar por nombre, matrícula o grupo"
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
  onChange={(e) => {
    const val = e.target.value;
    setFilterBy(val);
    if (val === 'todos') {
      setSearchValue(''); // Limpiar el buscador
      setStudents(alumnosOriginales); // Mostrar todos
    }
  }}
  style={{ marginTop: 10, marginBottom: 20 }}
>
            <Radio value="todos">Todos</Radio>
            <Radio value="nombre">Nombre</Radio>
            <Radio value="matricula">Matrícula</Radio>
            <Radio value="grupo">Grupo</Radio>
          </Radio.Group>

          {/* -------------------- FORMULARIO -------------------- */}
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="student-form"
          >
            <Form.Item name="id" noStyle>
  <Input type="hidden" />
</Form.Item>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="matricula"
                  label="Matrícula"
                  rules={[{ required: true, message: 'Ingrese la matrícula' }]}
                >
                  <Input className="input-outline" placeholder="Matrícula" />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="nombreCompleto"
                  label="Nombre completo"
                  rules={[{ required: true, message: 'Ingrese el nombre' }]}
                >
                  <Input className="input-outline" placeholder="Nombre completo" />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
  name="grupo"
  label="Grupo"
  rules={[{ required: true, message: 'Seleccione un grupo' }]}
>
  <Select
    placeholder="Seleccione un grupo"
    className="input-outline"
    options={nombresUnicos.map((g) => ({
      value: g.nombre,
      label: g.nombre,
    }))}
  />



                </Form.Item>
              </Col>

              <Col span={24} style={{ textAlign: 'right' }}>
                <Button
                  htmlType="submit"
                  className="btn-save"
                  icon={<SaveOutlined />}
                  loading={loading}
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
            rowKey="matricula"
            pagination={{ pageSize: 8 }}
            loading={loading}
            className="student-table"
            style={{ marginTop: 20 }}
          />
        </div>
      }
    />
  );
};

export default Alumnos;
