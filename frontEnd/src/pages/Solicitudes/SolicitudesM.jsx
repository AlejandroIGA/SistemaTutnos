import React from 'react';
import { Table, Tag, Button, Card } from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import Header from '../../components/Header/Header';
import './SolicitudesM.css'; 

const SolicitudesM = () => {
  // Datos para la tabla de solicitudes pendientes
  const pendientesColumns = [
    {
      title: 'Matrícula',
      dataIndex: 'matricula',
      key: 'matricula',
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
      title: 'Aceptar / Rechazar',
      key: 'acciones',
      render: (text, record) => (
        <div className="acciones-container">
          <Button 
            type="text" 
            icon={<CheckCircleFilled />} 
            className="btn-aceptar"
            onClick={() => console.log('Aceptar', record)}
          />
          <Button 
            type="text" 
            icon={<CloseCircleFilled />} 
            className="btn-rechazar"
            onClick={() => console.log('Rechazar', record)}
          />
        </div>
      ),
    },
  ];

  const pendientesData = [
    {
      key: '1',
      matricula: '2022371122',
      nombre: 'Karina Isela Saenz Rivera',
    },
    {
      key: '2',
      matricula: '2022371104',
      nombre: 'Alda Guadalupe González González',
    },
  ];

  // Datos para la tabla de solicitudes en revisión
  const revisionColumns = [
    {
      title: 'Matrícula',
      dataIndex: 'matricula',
      key: 'matricula',
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
      title: 'Estatus',
      key: 'estatus',
      render: (text, record) => (
        record.estatus === 'Finalizar' 
          ? <Button type="primary" className="btn-finalizar">Finalizar</Button>
          : <Tag className="tag-finalizada">Finalizada</Tag>
      ),
    },
  ];

  const revisionData = [
    {
      key: '1',
      matricula: '2022371049',
      nombre: 'Alejandro Infante Galván Álvarez',
      estatus: 'Finalizar',
    },
    {
      key: '2',
      matricula: '2022371080',
      nombre: 'Jafet Uribe Ramírez',
      estatus: 'Finalizada',
    },
  ];

  return (
    <>
    <Header />
    <div className="solicitudes-container">
      <Card title="Solicitudes pendientes" bordered={false} className="card-pendientes">
        <Table 
          columns={pendientesColumns} 
          dataSource={pendientesData} 
          pagination={false}
          className="tabla-solicitudes"
        />
      </Card>
      
      <Card title="Solicitudes en revisión" bordered={false} className="card-revision">
        <Table 
          columns={revisionColumns} 
          dataSource={revisionData} 
          pagination={false}
          className="tabla-solicitudes"
        />
      </Card>
    </div>
    </>
  );
};

export default SolicitudesM;
