import React, { useEffect, useState } from 'react';
import { Table, Tag, Button, Card } from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import Header from '../../components/Header/Header';
import './SolicitudesM.css'; 
import solicitudService from '../../services/solicitudesService'; 

const SolicitudesM = () => {
  const [pendientesData, setPendientesData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar pendientes
  const pendientesColumns = [
    {
      title: 'Matrícula',
      dataIndex: 'idAlumno',
      key: 'matricula',
    },
    {
      title: 'Nombre',
      dataIndex: 'idAlumno',
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

  // Revisión
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

  // Cargar pendientes
  useEffect(() => {
    const fetchPendientes = async () => {
      setLoading(true);
      const data = await solicitudService.pendientes();

      if (data.length > 0 && data[0].errorCode) {
        setPendientesData([]);
      } else {
        const dataWithKeys = data.map((item, index) => ({ key: index.toString(), ...item }));
        setPendientesData(dataWithKeys);
      }
      setLoading(false);
    };

    fetchPendientes();
  }, []);

  return (
    <>
      <Header />
      <div className="solicitudes-container">
        <Card title="Solicitudes pendientes" bordered={false} className="card-pendientes">
          <Table 
            columns={pendientesColumns} 
            dataSource={pendientesData} 
            loading={loading}
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
