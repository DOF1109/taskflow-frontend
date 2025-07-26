import React from "react";
import "./ConfirmModal.css";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title = "Confirm",
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="modal-actions">
          <button type="button" onClick={onCancel} className="cancel-btn">
            Cancelar
          </button>
          <button type="button" onClick={onConfirm} className="confirm-btn">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
