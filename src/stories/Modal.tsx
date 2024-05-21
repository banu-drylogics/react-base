
import React from "react";
import './simplebutton.scss';

interface ModalProps {
  message: string;
  onClose: () => void;
}
interface ButtonProps {
  className: string;
  onClick: () => void;
  name: string;
}

const Button = ({ className, onClick, name }: ButtonProps) => {
  return (
    <div className={className} onClick={onClick}>{name}</div>
  )
};

const Modal = ({ message, onClose }: ModalProps) => {
  return (
    <div className="crud-modal">
      <div className="crud-modal__inner">
        <div className="crud-modal__header"> Submit Your Feedback</div>
        <div className="crud-modal__message">{message}</div>
        <div className="crud-modal__button">
          <Button className="crud-modal__button ok" onClick={onClose} name='OK' />
          <Button className="crud-modal__button close" onClick={onClose} name='x' />
        </div>
      </div>
    </div>
  );
};

export default Modal;
