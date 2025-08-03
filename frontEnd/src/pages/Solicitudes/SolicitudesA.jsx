import React, { useState } from 'react';
import { Card, Input, Button, Divider, Tag, Row, Col, message, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Header from '../../components/Header/Header';
import MotivoModal from '../../components/SolicitudesModal/ModalSolicitarR';
import solicitudService from '../../services/solicitudesService';
import './SolicitudesA.css';

const SolicitudesA = () => {
const [matricula, setMatricula] = useState('');
const [mostrarMaestros, setMostrarMaestros] = useState(false);
const [maestrosData, setMaestrosData] = useState([]);
const [solicitudes, setSolicitudes] = useState([]);
const [loading, setLoading] = useState(false);
const [modalVisible, setModalVisible] = useState(false);
const [maestroSeleccionado, setMaestroSeleccionado] = useState(null);
const [idAlumno, setIdAlumno] = useState(null);

const fetchSolicitudes = async (matricula) => {
try {
const solicitudesAlumno = await solicitudService.obtenerS(matricula);
setSolicitudes(solicitudesAlumno);
} catch (err) {
console.error("Error al obtener solicitudes:", err);
}
};

const handleBuscar = async () => {
  if (matricula.length !== 10) {
    message.error('La matrícula debe tener exactamente 10 dígitos');
    setMostrarMaestros(false);
    return;
  }

  setLoading(true);
  try {
    const [profesoresData, solicitudesData] = await Promise.all([
      solicitudService.obtenerP(matricula),
      solicitudService.obtenerS(matricula),
    ]);

    setMaestrosData(profesoresData);
    setSolicitudes(solicitudesData);
    setMostrarMaestros(true);

    if (solicitudesData.length > 0) {
      setIdAlumno(solicitudesData[0].idAlumno);
    } else {
      setIdAlumno(null); 
    }
  } catch (err) {
    console.error("Error al buscar datos:", err);
    setMaestrosData([]);
    setSolicitudes([]);
    setIdAlumno(null);
  } finally {
    setLoading(false);
  }
};


const handleSolicitar = (maestro) => {
setMaestroSeleccionado(maestro);
setModalVisible(true);
};

const handleCloseModal = () => {
setModalVisible(false);
setMaestroSeleccionado(null);
if (matricula.length === 10) {
fetchSolicitudes(matricula);
}
};

return (
<>
<Header />
<div className="solicitud-container">
<Row gutter={16}>
<Col span={12} className="columna-izquierda">
<Card className="busqueda-card">
<h1 className="titulo-principal">Introduce tu matrícula</h1>
<div className="busqueda-container">
<Input
 className="matricula-input"
 value={matricula}
 onChange={(e) => setMatricula(e.target.value)}
 maxLength={10}
 onPressEnter={handleBuscar}
 placeholder="Matricula" 
/>
<Button
 type="primary"
 className="boton-buscar"
 onClick={handleBuscar}
 icon={<SearchOutlined />}
 loading={loading}
>
 Buscar
</Button>
</div>
</Card>

{loading ? (
<div className="instrucciones">
<Spin tip="Cargando maestros..." />
</div>
) : mostrarMaestros ? (
<Card className="maestros-card">
{maestrosData.map((maestro, index) => (
 <div key={maestro.id}>
 {index > 0 && <Divider className="divisor" />}
 <div className="maestro-item">
 <div className="maestro-info">
 <h2 className="nombre-maestro">{maestro.nombre}</h2>
 <Tag
 color={maestro.activo === true ? "green" : "default"}
 className="tag-disponibilidad"
 >
 {maestro.activo ? 'Activo' : 'Inactivo'}
 </Tag>
 </div>
 <Button
 type="primary"
 className="boton-solicitar"
 onClick={() => handleSolicitar(maestro)}
 disabled={!maestro.activo} 
 >
 Solicitar revisión
 </Button>
 </div>
 </div>
))}
</Card>
) : (
<div className="instrucciones">
{matricula.length > 0 && matricula.length < 10 ? (
 <p className="mensaje-error">La matrícula debe tener 10 dígitos</p>
) : (
 <p>Ingresa tu matrícula</p>
)}
</div>
)}
</Col>

<Col span={12} className="columna-derecha">
<Card
className="solicitudes-card"
title="Solicitudes"
headStyle={{
fontSize: '18px',
fontWeight: 'bold',
borderBottom: 'none'
}}
>
<div className="tabla-solicitudes">
<div className="encabezado-tabla">
 <div className="columna-maestro">Maestro</div>
 <div className="columna-cubiculo">Cubiculo</div>
 <div className="columna-motivo">Motivo</div>
 <div className="columna-estatus">Estatus</div>
</div>
<div className="cuerpo-tabla">
 {solicitudes.length > 0 ? (
 solicitudes.map((solicitud) => (
 <div className={`fila-solicitud ${
    solicitud.estatus === "Rechazada" || solicitud.estatus === "Finalizada"
      ? "fila-gris"
      : ""
  }`}>
 <div className="columna-maestro">
 <div className="solicitud-maestro">{solicitud.nombreMaestro}</div>
 </div>
 <div className="columna-cubiculo">
 <div className="solicitud-cubiculo">{solicitud.cubiculoMaestro}</div>
 </div>
 <div className="columna-motivo">
 <div className="solicitud-motivo">{solicitud.comentario}</div>
 </div>
 <div className="columna-estatus">
 <Tag
 color={
 solicitud.estatus === "Revision" ? "green" : 
 solicitud.estatus === "Pendiente" ? "blue" : "blue"
 }
 className="tag-estatus"
 >
 {solicitud.estatus}
 </Tag>
 </div>
 </div>
 ))
 ) : (
 <div className="sin-solicitudes">
 No has realizado ninguna solicitud aún
 </div>
 )}
</div>
</div>
</Card>
</Col>
</Row>
</div>

<MotivoModal
  visible={modalVisible}
  onClose={handleCloseModal}
  maestro={maestroSeleccionado}
  matricula={matricula}
  idAlumno={idAlumno} 
  onSolicitudEnviada={fetchSolicitudes}
/>

</>
);
};

export default SolicitudesA;