import React, { useEffect, useState } from 'react';
import { Table, Tag, Button, Card, notification } from 'antd';
import { CheckCircleFilled, CloseCircleFilled, CheckCircleOutlined } from '@ant-design/icons';
import Header from '../../components/Header/Header';
import './SolicitudesM.css';
import solicitudService from '../../services/solicitudesService';

const SolicitudesM = () => {
  const [pendientesData, setPendientesData] = useState([]);
  const [revisionData, setRevisionData] = useState([]);
  const [loadingPendientes, setLoadingPendientes] = useState(false);
  const [loadingRevision, setLoadingRevision] = useState(false);
  const [error, setError] = useState(null);

  const handleDataFetch = (data, setter, defaultErrorMsg) => {
    if (Array.isArray(data) && data.length > 0 && data[0].errorCode) {
      setError(data[0].message || defaultErrorMsg);
      setter([]);
      notification.error({
        message: 'Error al cargar datos',
        description: data[0].message || defaultErrorMsg,
      });
    } else {
      const dataWithKeys = data.map((item, index) => ({ 
        key: item.id || index.toString(),
        ...item,
      }));
      setter(dataWithKeys);
    }
  };

  const fetchPendientes = async () => {
    setLoadingPendientes(true);
    try {
      const data = await solicitudService.pendientes();
      handleDataFetch(data, setPendientesData, 'No se pudo cargar las solicitudes pendientes.');
    } catch (err) {
      console.error('Error al obtener solicitudes pendientes:', err);
      setError('Error al conectar con el servidor.');
    } finally {
      setLoadingPendientes(false);
    }
  };

  const fetchRevision = async () => {
    setLoadingRevision(true);
    try {
      const data = await solicitudService.revFin();
      handleDataFetch(data, setRevisionData, 'No se pudo cargar las solicitudes en revisión.');
    } catch (err) {
      console.error('Error al obtener solicitudes en revisión:', err);
      setError('Error al conectar con el servidor.');
    } finally {
      setLoadingRevision(false);
    }
  };

  const refreshSolicitudes = () => {
    fetchPendientes();
    fetchRevision();
  };

  useEffect(() => {
    refreshSolicitudes();
  }, []);

  const handleAceptar = async (record) => {
    try {
      await solicitudService.estado(record.idSolicitud, "Revision");
      notification.success({ message: "Solicitud aceptada." });
      refreshSolicitudes();
    } catch (err) {
      console.error("Error al aceptar solicitud:", err);
      notification.error({ message: "Error al aceptar solicitud." });
    }
  };

  const handleRechazar = async (record) => {
    try {
      await solicitudService.estado(record.idSolicitud, "Rechazada");
      notification.success({ message: "Solicitud rechazada." });
      refreshSolicitudes();
    } catch (err) {
      console.error("Error al rechazar solicitud:", err);
      notification.error({ message: "Error al rechazar solicitud." });
    }
  };

  const handleFinalizar = async (record) => {
    try {
      await solicitudService.estado(record.idSolicitud, "Finalizada");
      notification.success({ message: "Solicitud finalizada." });
      refreshSolicitudes();
    } catch (err) {
      console.error("Error al finalizar solicitud:", err);
      notification.error({ message: "Error al finalizar solicitud." });
    }
  };

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
      title: 'Comentario',
      dataIndex: 'comentario',
      key: 'comentario',
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      render: (estado) => (
        <Tag color="blue" key={estado}>{estado.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (text, record) => (
        <div className="acciones-container">
          <Button 
            type="text" 
            icon={<CheckCircleFilled style={{ color: 'green' }} />} 
            className="btn-aceptar"
            onClick={() => handleAceptar(record)}
          />
          <Button 
            type="text" 
            icon={<CloseCircleFilled style={{ color: 'red' }} />} 
            className="btn-rechazar"
            onClick={() => handleRechazar(record)}
          />
        </div>
      ),
    },
  ];

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
      title: 'Comentario',
      dataIndex: 'comentario',
      key: 'comentario',
    },
    {
      title: 'Estado',
      key: 'estado',
      render: (text, record) => {
        const esFinalizada = record.estado === 'Finalizada';
        return esFinalizada
          ? <Tag icon={<CheckCircleOutlined />} color="success">Finalizada</Tag>
          : <Button 
              type="primary" 
              className="btn-finalizar"
              onClick={() => handleFinalizar(record)}
            >
              Finalizar
            </Button>;
      },
    },
  ];

  return (
    <>
      <Header nameSection={"Bienvenido"} />
      <div className="solicitudes-container">
        {error && <div className="error-message">{error}</div>}
        
        <Card title="Solicitudes pendientes" bordered={false} className="card-pendientes">
          <Table 
            columns={pendientesColumns} 
            dataSource={pendientesData} 
            loading={loadingPendientes}
            pagination={false}
            className="tabla-solicitudes"
          />
        </Card>
        
        <Card title="Solicitudes en revisión" bordered={false} className="card-revision">
          <Table 
            columns={revisionColumns} 
            dataSource={revisionData}
            loading={loadingRevision}
            pagination={false}
            className="tabla-solicitudes"
          />
        </Card>
      </div>
    </>
  );
};

export default SolicitudesM;