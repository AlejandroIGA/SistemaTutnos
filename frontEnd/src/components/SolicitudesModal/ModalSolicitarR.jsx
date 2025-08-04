import React, { useState } from 'react';
import { Modal, Input, message } from 'antd';
import './ModalSolicitarR.css';
import solicitudService from '../../services/solicitudesService';

const MotivoModal = ({ visible, onClose, maestro, matricula, idAlumno, onSolicitudEnviada }) => {
  const [comentario, setComentario] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEnviar = async () => {
    if (!comentario.trim()) {
      message.error("El motivo no puede estar vacío.");
      return;
    }

    if (!maestro?.id || !idAlumno) {
      message.error("Faltan datos necesarios para enviar la solicitud.");
      return;
    }

    const data = {
      idProfesor: maestro.id,
      idAlumno: idAlumno,
      comentario: comentario.trim()
    };

    try {
      setLoading(true);
      await solicitudService.crearSolicitud(data);
      message.success("Solicitud enviada correctamente.");
      onClose(); 
      onSolicitudEnviada(matricula); 
      setComentario(''); 
    } catch (error) {
      message.error("Error al enviar la solicitud.");
      console.error("Error al crear solicitud:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
    setComentario('');
  };

  return (
    <Modal
      title={`Motivo de revisión - ${maestro?.nombre || ''}`}
      open={visible}
      onCancel={handleCancel}
      onOk={handleEnviar}
      okText="Enviar"
      confirmLoading={loading}
    >
      <Input.TextArea
        rows={4}
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        placeholder="Escriba el motivo de la revisión"
      />
    </Modal>
  );
};

export default MotivoModal;
