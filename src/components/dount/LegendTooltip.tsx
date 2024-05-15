import './styles.scss';
import React, { useEffect, useRef } from "react";
import { createPopper, Instance } from '@popperjs/core';
import { ModifiedData } from './types';

interface LegendTooltipProps {
  tooltipContent: {
    content: ModifiedData[];
    el: SVGPathElement;
    hoveredData: ModifiedData;
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

    const rowHighlighted = () => {
      const rows = tooltip.querySelectorAll('.chart-tooltip-container__row');
      rows.forEach((row: Element) => {
        const textContent = row.textContent;
        if (!textContent) return;
        const rowChanelName: string = textContent.split(':')[0];
        if (tooltipContent.hoveredData.channelName === rowChanelName) {
          row.classList.add('chart-tooltip-container__row--highlighted');
        } else {
          row.classList.remove('chart-tooltip-container__row--highlighted');
        }
      });
    };

    rowHighlighted();

    const handleMouseMove = (event: MouseEvent) => {
      const offsetX = event.clientX - 70;
      const offsetY = event.clientY - 83;
      tooltip.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [tooltipContent]);


  return <div className='chart-tooltip' ref={tooltipRef}>
    <div className='chart-tooltip-container'>
      {
        tooltipContent.content.map((data: ModifiedData, idx: number) => (
          <div className='chart-tooltip-container__row' key={idx}>
            <div className='chart-tooltip-container__content'>
              <i className='chart-tooltip-container__content__icon' style={{ backgroundColor: `${data.color}` }}></i>
              <div className='chart-tooltip-container__content__label'>{data.channelName}:</div>
            </div>
            <div>
              <span className='chart-tooltip-container__value'>{data.value}</span>
            </div>
          </div>
        ))}
    </div>
  </div>
};

export default LegendTooltip;
