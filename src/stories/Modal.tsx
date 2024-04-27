
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
    <div className="modal">
      <div className="modal__inner">
        <div className="modal__header"> Submit Your Feedback</div>
        <div className="modal__message">{message}</div>
        <div className="modal__button">
          <Button className="modal__button cancel" onClick={onClose} name='Cancel' />
          <Button className="modal__button ok" onClick={onClose} name='OK' />
          <Button className="modal__button close" onClick={onClose} name='x' />
        </div>
      </div>
    </div>
  );
};

export default Modal;
