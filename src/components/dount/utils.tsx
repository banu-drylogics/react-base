import * as d3 from "d3";
import './styles.scss';
import _ from 'lodash';
import { colors, formatNumber } from "./chartdata";
import { ModifiedData } from "./types";

const createInnerCircle = (svg: d3.Selection<SVGGElement, unknown, null, undefined>, innerCircle: number) => {
  svg
    .append('g')
    .attr('class', 'donut-hole')
    .append('circle')
    .attr('class', 'donut-hole')
    .attr('r', innerCircle)
    .attr('fill', 'none')
    .attr('stroke', '#c7c7c7')
};

const handleTotalValue = (svg: d3.Selection<SVGGElement, unknown, null, undefined>, totalValue: number) => {
  svg
    .select('g.donut-hole')
    .append('text')
    .attr('class', 'donut-hole-label__text')
    .style("text-anchor", "middle")
    .style("font-size", '25px')
    .style('font-weight', 'bold')
    .attr("y", '16px')
    .text(formatNumber(totalValue));
};

const formatValue = (value: number): string => {
  const formattedValue = d3.format(".2s")(value);
  const uppercaseFormattedValue = formattedValue.toUpperCase();
  return uppercaseFormattedValue;
}

const handleValue = (svg: d3.Selection<SVGGElement, unknown, null, undefined>, arcGenerator: d3.PieArcDatum<ModifiedData>[],
  legendPosition: d3.Arc<any, d3.DefaultArcObject>) => {
  svg
    .selectAll('g.arc')
    .data(arcGenerator)
    .append('text')
    .attr('class', 'donut-label')
    // .text((d) => formatNumber(d.data.value))
    .text(d => formatValue(d.data.value))
    .style("fill", '#444')
    .style("font-size", '12px')
    .attr('transform', (d: d3.DefaultArcObject) => `translate(${legendPosition.centroid(d)})`)
    .style("text-anchor", "middle")
    .style("font-size", '25px')
    .style('font-weight', 'bold')
    .attr("y", '16px');
}

const DrawDonut = (element: HTMLElement, data: ModifiedData[], setTooltipContent: React.Dispatch<React.SetStateAction<{
  content: ModifiedData;
  el: SVGPathElement;
} | null>>) => {
  const width = 600;
  const height = 400;
  const innerRadius = 100;
  const outerRadius = Math.min(width, height) / 2;
  const radius = Math.min(width, height) / 1.3;
  const innerCircle = radius / 3.3;
  const legendPosition = d3.arc().innerRadius(radius / 1.65).outerRadius(radius);
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
  createInnerCircle(svg, innerCircle);
  handleTotalValue(svg, totalValue);
  handleValue(svg, arcGenerator, legendPosition);
};

export default DrawDonut;
