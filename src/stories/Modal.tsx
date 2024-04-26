
import React from "react";
import './simplebutton.css';

interface ModalProps {
  message?: string;
  onClose: () => void;
}

const Modal = ({ message, onClose }: ModalProps) => {
  return (
    <div className="lfm-modal">
      <div className="lfm-modal-inner">
        <div className="sentiment-confirmation-modal">
          <div className="sentiment-confirmation-modal-header">Submit Your Feedback: Emotion</div>
          <div className="sentiment-confirmation-modal-subheader">{message}</div>
          <div className="sentiment-confirmation-modal-buttons">
            <div onClick={onClose} className="sentiment-button cancel">Cancel</div>
            <div onClick={onClose} className="sentiment-button ok">OK</div>
            {/* <div className="sentiment-button" onClick={onClose} aria-label="close"></div> */}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Modal;
