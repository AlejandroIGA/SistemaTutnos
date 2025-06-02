import React, { useState } from 'react';
import { Modal, Button, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './ModalElimnar.css'; 

const ModalConfirmacion = ({ onConfirm }) => {
  const [visible, setVisible] = useState(false);
  const mostrarModal = () => setVisible(true);
  const cerrarModal = () => setVisible(false);
  const confirmar = () => { onConfirm(); cerrarModal(); };

  return (
    <>
      <Button className="boton-eliminar" icon={<DeleteOutlined />} onClick={mostrarModal}>
        Eliminar
      </Button>
      <Modal
        open={visible}
        footer={null}
        closable={false}
        onCancel={cerrarModal}
        className="modal-confirmacion"
      >
        <div className="modal-header-color">
        </div>

        <div className="modal-contenido">
          <Typography.Text strong>¿Desea dar de baja este grupo?</Typography.Text>
          <div className="modal-botones">
            <Button className="boton-aceptar" onClick={confirmar}>Aceptar</Button>
            <Button className="boton-cancelar" onClick={cerrarModal}>Cancelar</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ModalConfirmacion;