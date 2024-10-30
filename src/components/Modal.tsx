import React from "react";
import IconCloseButton from "./Icons/IconCloseButton";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal_overlay">
      <div className="modal">{children}</div>
      <button onClick={onClose} className="modal_close_button">
        <IconCloseButton />
      </button>
    </div>
  );
};

export default Modal;
