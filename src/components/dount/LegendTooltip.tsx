import './styles.scss';
import React, { useEffect, useRef } from "react";
import { createPopper, Instance } from '@popperjs/core';
import { ModifiedData } from './types';

interface LegendTooltipProps {
  tooltipContent: {
    content: ModifiedData;
    el: SVGPathElement;
  };
}

const LegendTooltip: React.FC<LegendTooltipProps> = ({ tooltipContent }) => {
  const tooltipInstances: Map<HTMLElement, Instance> = new Map();
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tooltip = tooltipRef.current;
    if (!tooltip) return;
    const popperInstance = createPopper(tooltipContent.el, tooltip, {
      placement: 'right-start',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 0],
          },
        },
      ],
    });
    tooltipInstances.set(tooltip, popperInstance);

    const handleMouseMove = (event: MouseEvent) => {
      const tooltip = tooltipRef.current;
      if (tooltip && tooltip.parentNode) {
        const offsetX = event.clientX - 70;
        const offsetY = event.clientY - 83;
        tooltip.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [tooltipContent]);

  return <div className='tooltip-container' ref={tooltipRef}>
    <div className='tooltip-container_header'>Channel Name: {tooltipContent.content.channelName}</div>
    <br />
    <div className='tooltip-container_value'>Value: {tooltipContent.content.value}</div>
  </div>
};

export default LegendTooltip;
