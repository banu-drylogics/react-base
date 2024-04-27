import React, { useState, useRef } from "react";
import Modal from "./Modal";

interface SimpleButtonProps {
  text: string;
  onClick: () => void;
  disabled: boolean;
  message: string;
  hovered: boolean;
}

const SimpleButton = ({ text, onClick, disabled = false, message, hovered = false }: SimpleButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const referenceElement = useRef<HTMLButtonElement>(null);
  const tooltipElement = useRef<HTMLDivElement>(null);

  const handleButtonClick = () => {
    if (!disabled && onClick) {
      onClick();
      setIsModalOpen(true);
    }
  };

  const handleMouseEnter = () => {
    if (!disabled) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="container"
        data-testid="container"
        id="container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          data-testid="container__button"
          id='container__button'
          className={`container__button ${disabled ? 'disabled' : ''}`}
          onClick={handleButtonClick}
          disabled={disabled}
          ref={referenceElement}
        >
          {text}
        </button>
        {!disabled && isHovering && hovered && (
          <div
            id="tooltip-container"
            className="tooltip-container"
            ref={tooltipElement}
          >
            {message}
          </div>
        )}
      </div>

      {isModalOpen && !hovered && <Modal message={message} onClose={closeModal} data-testid="modal" />}
    </div>
  );
};

export default SimpleButton;
