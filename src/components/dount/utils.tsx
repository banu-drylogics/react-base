import * as d3 from "d3";
import './styles.scss';
import _ from 'lodash';
import { colors } from "./chartdata";
import { ModifiedData } from "./types";
import { format } from "d3";

const DrawDonut = (element: HTMLElement, data: ModifiedData[], setTooltipContent: React.Dispatch<React.SetStateAction<{
  content: ModifiedData;
  el: SVGPathElement;
} | null>>) => {
  const width = 600;
  const height = 400;
  const innerRadius = 100;
  const outerRadius = Math.min(width, height) / 2;
  const radius = Math.min(width, height) / 1.3;
  const innerHole = radius / 3.3;
  const legendPosition = d3.arc().innerRadius(radius / 1.75).outerRadius(radius);
  const totalValue = _.sumBy(data, d => d.value);
  d3.select(element).select("svg").remove();

  const showTooltip = (el: SVGPathElement, content: ModifiedData) => {
    setTooltipContent({ content, el });
  };

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
    .on('mouseover', function show(_event, d) {
      const tooltipContent = d.data;
      showTooltip(this, tooltipContent);
    })
    .on('mouseout', function hide(_d) {
      setTooltipContent(null);
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
    .text(format('.2s')(totalValue))

  svg
    .selectAll('g.arc')
    .data(arcGenerator)
    .append('text')
    .attr('class', 'donut-label')
    .text((d) => format('.2s')(d.data.value))
    .style("fill", '#444')
    .style("font-size", '12px')
    .attr('transform', (d: d3.DefaultArcObject) => `translate(${legendPosition.centroid(d)})`)
    .style("text-anchor", "middle")
    .style("font-size", '25px')
    .style('font-weight', 'bold')
    .attr("y", '16px');
};

export default DrawDonut;
