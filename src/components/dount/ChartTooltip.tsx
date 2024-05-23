import './styles.scss';
import React, { useEffect, useRef } from "react";
import { createPopper, Instance } from '@popperjs/core';
import { transformedDataType } from './types';
import * as _ from 'lodash';

interface ChartTooltipProps {
  tooltipContent: {
    content: transformedDataType[];
    el: SVGPathElement;
    hoveredData: transformedDataType;
  };
}

const ChartTooltip = ({ tooltipContent }: ChartTooltipProps) => {
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
            offset: [0, 10],
          },
        },
      ],
    });
    tooltipInstances.set(tooltip, popperInstance);

    const handleMouseMove = (event: MouseEvent) => {
      const offsetX = event.clientX + 8;
      const offsetY = event.clientY + 3;
      tooltip.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [tooltipContent]);

  const highlightedRow = (data: transformedDataType, hoveredData: string) => {
    return 'chart-tooltip__row'.concat(data.channelName === hoveredData ?
      ' chart-tooltip__row--highlighted' : '')
  };

  return <div className='chart-tooltip-container' ref={tooltipRef}>
    <div className='chart-tooltip'>
      {
        _.map(tooltipContent.content, (data: transformedDataType, idx: number) => (
          <div className={highlightedRow(data, tooltipContent.hoveredData.channelName)}
            key={idx}>
            <div className='chart-tooltip__content'>
              <i className='chart-tooltip__content__icon' style={{ backgroundColor: `${data.color}` }}></i>
              <div className='chart-tooltip__content__label'>{data.channelName}:</div>
            </div>
            <div>
              <span className='chart-tooltip__value'>{data.value}</span>
            </div>
          </div>
        ))}
    </div>
  </div>
};

export default ChartTooltip;
