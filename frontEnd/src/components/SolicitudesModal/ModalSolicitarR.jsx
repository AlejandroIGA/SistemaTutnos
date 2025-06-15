import React from 'react';
import { Modal, Input } from 'antd';
import './ModalSolicitarR.css';  

const MotivoModal = ({ visible, onClose, maestro }) => {
  return (
    <Modal
      title={`Motivo de revisión - ${maestro?.nombre || ''}`}
      open={visible}
      onCancel={onClose}
      okText="Enviar"
    >
      <Input.TextArea
        rows={4}
        placeholder="Escriba el motivo de la revisión"
        disabled
      />
    </Modal>
  );
};

export default MotivoModal;
