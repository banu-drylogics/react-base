import * as d3 from "d3";
import { createPopper, Instance, Instance as PopperInstance } from '@popperjs/core';
import './styles.scss';
import _ from 'lodash';
import { colors } from "./chartdata";
import { ModifiedData } from "./types";

const DrawDonut = (element: HTMLElement, data: ModifiedData[]) => {
  const width = 600;
  const height = 400;
  const innerRadius = 100;
  const outerRadius = Math.min(width, height) / 2;
  const radius = Math.min(width, height) / 1.3;
  const innerHole = radius / 3.3;
  const legendPosition = d3.arc().innerRadius(radius / 1.75).outerRadius(radius);
  const totalShare = `${_.sumBy(data, d => parseInt(d.sharePercent))}%`
  d3.select(element).select("svg").remove();

  const svg = d3.select(element)
    .append('svg')
    .attr("width", '400px')
    .attr("height", '420px')
    .attr('viewBox', '0 0 ' + width + ' ' + height)
    .append("g")
    .attr("transform", "translate(" + Math.min(width, height) / 1.5 + "," + Math.min(width, height) / 1.8 + ")");

  const pieGenerator = d3.pie<ModifiedData>()
    .value(d => d.value);
  const arcGenerator = pieGenerator(data);
  const arc = d3.arc<d3.PieArcDatum<ModifiedData>>().innerRadius(innerRadius).outerRadius(outerRadius - 30);
  const tooltipInstances: Map<HTMLElement, Instance> = new Map();

  svg
    .selectAll('g')
    .data(arcGenerator)
    .enter()
    .append('g')
    .attr('class', 'arc')
    .append('path')
    .attr('d', arc)
    .attr('fill', (_d, i) => colors[i])
    .attr("stroke", "#fff")
    .style("stroke-width", "2")
    .style("opacity", "0.8")
    .on('mouseover', function (_event, d) {

      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip'
      tooltip.innerHTML = `Channel Name: ${d.data.channelName}<br>
      <br>
      Value: ${d.data.value}`;
      document.body.appendChild(tooltip);

      const popperInstance = createPopper(this, tooltip, {
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
    })
    .on('mousemove', function (event: MouseEvent) {
      const tooltip = document.querySelector('.tooltip') as HTMLElement;
      if (tooltip && tooltip.parentNode) {
        const offsetX = event.clientX;
        const offsetY = event.clientY + 10;
        tooltip.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      }
    })
    .on('mouseout', function (_d) {
      const tooltip: HTMLElement = document.querySelector('.tooltip')!;
      if (tooltip && tooltip.parentNode) {
        tooltip.parentNode.removeChild(tooltip);
        const popperInstance = tooltipInstances.get(tooltip);
        if (popperInstance) {
          popperInstance.destroy();
          tooltipInstances.delete(tooltip);
        }
      }
    });

  svg
    .append('g')
    .attr('class', 'donut-hole')
    .append('circle')
    .attr('class', 'donut-hole')
    .attr('r', innerHole)
    .attr('fill', 'none')
    .attr('stroke', '#c7c7c7')

  svg
    .select('g.donut-hole')
    .append('text')
    .attr('class', 'donut-hole-label__text')
    .style("text-anchor", "middle")
    .style("font-size", '25px')
    .style('font-weight', 'bold')
    .attr("y", '16px')
    .text(totalShare)

  svg
    .selectAll('g.arc')
    .data(arcGenerator)
    .append('text')
    .attr('class', 'donut-label')
    .text((d) => d.data.sharePercent)
    .style("fill", '#444')
    .style("font-size", '12px')
    .attr('transform', (d: d3.DefaultArcObject) => `translate(${legendPosition.centroid(d)})`)
    .style("text-anchor", "middle")
    .style("font-size", '25px')
    .style('font-weight', 'bold')
    .attr("y", '16px');
};

export default DrawDonut;
