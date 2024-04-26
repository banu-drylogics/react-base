import React, { useState, useRef, useEffect } from "react";
import Modal from "./Modal";

interface SimpleButtonProps {
  text: string;
  onClick?: () => void;
  tooltip?: string;
  message?: string;
}

const SimpleButton = ({ text, onClick, tooltip, message }: SimpleButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const referenceElement = useRef<HTMLButtonElement>(null);
  const tooltipElement = useRef<HTMLDivElement>(null);
  const [disabled, setbuttonState] = useState(false);

  const handleButtonClick = () => {
    if (!disabled && onClick) {
      onClick();
      setIsModalOpen(true);
    }
  };

  const handleMouseEnter = () => {
    if (disabled) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setbuttonState(true);
  };

  return (
    <div>
      <div className="button-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          className={`main-button ${disabled ? 'disabled' : ''}`}
          onClick={handleButtonClick}
          disabled={disabled}
          ref={referenceElement}
        >
          {text}
        </button>
        {disabled && isHovering && (
          <div
            className="tooltip-container"
            ref={tooltipElement}
          >
            {tooltip}
          </div>
        )}
      </div>

      {isModalOpen && <Modal message={message} onClose={closeModal} />}
    </div>
  );
};

export default SimpleButton;
