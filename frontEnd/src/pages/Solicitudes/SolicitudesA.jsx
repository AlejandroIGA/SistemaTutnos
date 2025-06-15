import React, { useState } from 'react';
import { Card, Input, Button, Divider, Tag, Row, Col, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Header from '../../components/Header/Header';
import MotivoModal from '../../components/SolicitudesModal/ModalSolicitarR';
import './SolicitudesA.css';

const SolicitudesA = () => {
  const [matricula, setMatricula] = useState('');
  const [mostrarMaestros, setMostrarMaestros] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [maestroSeleccionado, setMaestroSeleccionado] = useState(null);

  const maestrosData = [
    { id: 1, nombre: "José Alberto Delgadillo Gutierrez", disponibilidad: "Disponible" },
    { id: 2, nombre: "Gerardo Ramirez Villareal", disponibilidad: "Disponible" },
    { id: 3, nombre: "Jorge Garcia Saldaña", disponibilidad: "No disponible" },
    { id: 4, nombre: "Ivan Chávez Pareja", disponibilidad: "No disponible" },
    { id: 5, nombre: "Rogelio Bautista Sánchez", disponibilidad: "Disponible" },
    { id: 6, nombre: "Angélica Garduño Bustamante", disponibilidad: "No disponible" }
  ];

  const [solicitudes, ] = useState([
    { id: 1, maestro: "José Alberto Delgadillo Gutierrez", estatus: "Aceptada" },
    { id: 2, maestro: "Rogelio Bautista Sánchez", estatus: "Rechazada" }
  ]);

  const handleBuscar = () => {
    if (matricula.length === 8) {
      setMostrarMaestros(true);
    } else {
      message.error('La matrícula debe tener exactamente 8 dígitos');
    }
  };

  const handleSolicitar = (maestro) => {
    setMaestroSeleccionado(maestro);
    setModalVisible(true);
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
                  maxLength={8}
                  onPressEnter={handleBuscar}
                  placeholder="12345678"
                />
                <Button
                  type="primary"
                  className="boton-buscar"
                  onClick={handleBuscar}
                  icon={<SearchOutlined />}
                >
                  Buscar
                </Button>
              </div>
            </Card>

            {mostrarMaestros ? (
              <Card className="maestros-card">
                {maestrosData.map((maestro) => (
                  <div key={maestro.id}>
                    <Divider className="divisor" />
                    <div className="maestro-item">
                      <div className="maestro-info">
                        <h2 className="nombre-maestro">{maestro.nombre}</h2>
                        <Tag
                          color={maestro.disponibilidad === "Disponible" ? "green" : "red"}
                          className="tag-disponibilidad"
                        >
                          {maestro.disponibilidad}
                        </Tag>
                      </div>
                      <Button
                        type="primary"
                        className="boton-solicitar"
                        onClick={() => handleSolicitar(maestro)}
                        disabled={maestro.disponibilidad === "No disponible"}
                      >
                        Solicitar revisión
                      </Button>
                    </div>
                  </div>
                ))}
              </Card>
            ) : (
              <div className="instrucciones">
                {matricula.length > 0 && matricula.length < 8 ? (
                  <p className="mensaje-error">La matrícula debe tener 8 dígitos</p>
                ) : (
                  <p>Ingresa tu matrícula y haz clic en buscar para ver los maestros disponibles</p>
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
                  <div className="columna-estatus">Estatus</div>
                </div>
                <div className="cuerpo-tabla">
                  {solicitudes.length > 0 ? (
                    solicitudes.map((solicitud) => (
                      <div key={solicitud.id} className="fila-solicitud">
                        <div className="columna-maestro">
                          <div className="solicitud-maestro">{solicitud.maestro}</div>
                        </div>
                        <div className="columna-estatus">
                          <Tag
                            color={solicitud.estatus === "Aceptada" ? "green" : "red"}
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
        onClose={() => setModalVisible(false)}
        maestro={maestroSeleccionado}
      />
    </>
  );
};

export default SolicitudesA;
