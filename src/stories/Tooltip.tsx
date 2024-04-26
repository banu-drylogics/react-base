// import React, { useState } from 'react';
// import { usePopper } from 'react-popper';

// export const Tooltip = () => {
//   const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
//   const [popperElement, setPopperElement] = useState(null);
//   const [arrowElement, setArrowElement] = useState(null);
//   const { styles, attributes } = usePopper(referenceElement, popperElement, {
//     modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
//   });

//   return (
//     <>
//       <button type="button" ref={setReferenceElement}>
//         Reference element
//       </button>

//       <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
//         Popper element
//         <div ref={setArrowElement} style={styles.arrow} />
//       </div>
//     </>
//   );
// };

import React, { useState, useRef } from 'react';
import { createPopper, Instance, Placement } from '@popperjs/core';

interface TooltipProps {
  text: string;
  message: string;
}

const Tooltip = ({ text, message }: TooltipProps) => {
  const [tooltipElement, setTooltipElement] = useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [popperInstance, setPopperInstance] = useState<Instance | null>(null);
  const referenceElement = useRef<HTMLButtonElement>(null);

  const createTooltip = () => {
    if (referenceElement.current && tooltipElement && popperElement) {
      setPopperInstance(createPopper(referenceElement.current, tooltipElement, {
        placement: 'top' as Placement,
      }));
    }
  };

  const destroyTooltip = () => {
    if (popperInstance) {
      popperInstance.destroy();
      setPopperInstance(null);
    }
  };

  React.useEffect(() => {
    createTooltip();
    return destroyTooltip;
  }, []);

  return (
    <>
      <button ref={referenceElement}>{message}</button>
      {popperInstance && (
        <div
          ref={setTooltipElement}
          style={{
            backgroundColor: '#333',
            color: '#fff',
            padding: '5px',
            borderRadius: '5px',
            zIndex: 999,
            display: 'none',
          }}
        >
          {text}
        </div>
      )}
    </>
  );
};

export default Tooltip;
