import * as d3 from "d3";
import { Data } from "./types";
const _ = require('lodash');

const DrawDonut = (element: any, data: any, setTooltipContent: any) => {
  // React.MutableRefObject<null>

  const showTooltip = (content: any, position: { x: number; y: number }) => {
    setTooltipContent({ content, position });
  };

  const hideTooltip = () => {
    setTooltipContent(null);
  };

  const colors = ["#43be19", "#0db0ad", '#da16dd', '#2b4a90', '#dd08f0']
  const width = 640;
  const height = 400;
  const innerRadius = 100;
  const outerRadius = Math.min(width, height) / 2;
  const radius = Math.min(width, height) / 1.3;
  const legendPosition = d3.arc().innerRadius(radius / 1.75).outerRadius(radius);
  const totalShare = `${_.sumBy(data, (d: any) => parseInt(d.sharePercent))}%`

  d3.select(element).select("svg").remove();

  const svg = d3.select(element)
    .append('svg')
    .attr("width", '400')
    .attr("height", '420')
    .attr('viewBox', '0 0 ' + 577 + ' ' + 424)
    .append("g")
    .attr("transform", "translate(" + Math.min(width, height) / 1.5 + "," + Math.min(width, height) / 1.8 + ")");

  const pieGenerator = d3.pie()
    .value((d: any) => d.value);
  const arcGenerator = pieGenerator(data);
  const arc: any = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

  svg
    .selectAll('g')
    .data(arcGenerator)
    .enter()
    .append('g')
    .attr('class', 'arc')
    .append('path')
    .attr('d', arc)
    .attr('fill', (d, i) => colors[i])
    .attr("stroke", "#fff")
    .style("stroke-width", "2")
    .style("opacity", "0.8")
    .on('mouseover', function (event, d) {
      const tooltipContent = d.data;
      showTooltip(tooltipContent, { x: event.pageX, y: event.pageY });
    })
    .on('mouseout', function (d) {
      setTimeout(() => {
        hideTooltip()
      }, 7000);
    });

  svg
    .append('g')
    .attr('class', 'donut-hole')
    .append('circle')
    .attr('class', 'donut-hole')
    .attr('r', radius / 3.3)
    .attr('fill', 'none')
    .attr('stroke', '#c7c7c7')

  svg
    .select('g.donut-hole')
    .append('text')
    .attr('class', 'donut-hole-label__text')
    .style("text-anchor", "middle")
    .style("font-size", 25)
    .style('font-weight', 'bold')
    .attr("y", 16)
    .text(totalShare)

  svg
    .selectAll('g.arc')
    .append('text')
    .attr('class', 'donut-label')
    .text((d: any) => { return d.data.sharePercent })
    .style("fill", '#444')
    .style("font-size", 12)
    .attr('transform', (d: any) => `translate(${legendPosition.centroid(d)})`)
    .style("text-anchor", "middle")
    .style("font-size", 25)
    .style('font-weight', 'bold')
    .attr("y", 16);

  const svgHeight = parseInt(svg.attr('height') || '0');
  const legendHeight = 290;
  const legendPadding = 10;

  const legendGroup = svg.append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(-150, ${svgHeight - legendHeight})`)

  legendGroup.append('rect')
    .attr('width', '90%')
    .attr('height', 60)
    .style('fill', 'rgb(238, 231, 231)')
    .attr('transform', 'translate(-105,-23)');

  legendGroup.append('text')
    .text('Legend: ')
    .style('font-size', '25px')
    .style('fill', '#333')
    .attr('transform', 'translate(-105,18)');

  const legendLabels = legendGroup.selectAll('.legend-label')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'legend-label')
    .attr('transform', (d, i) => `translate(${i * (100 + legendPadding)}, 0)`); // Adjust the horizontal position of each legend item

  legendLabels.append('rect')
    .attr('width', 20)
    .attr('height', 20)
    .style('fill', (d, i) => colors[i]);

  legendLabels.append('text')
    .text((d: any) => d.channelName)
    .attr('x', 25)
    .attr('y', 15)
    .style('font-size', '18px')
    .style('fill', '#333');
};

export default DrawDonut;
