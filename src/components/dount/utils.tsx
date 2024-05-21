import * as d3 from "d3";
import { format } from "d3";
import * as _ from 'lodash';
import './styles.scss';
import { transformedDataType } from "./types";

const WIDTH = 600;
const HEIGHT = 400;
const INNER_RADIUS = 100;
const RADIUS = Math.min(WIDTH, HEIGHT) / 1.3;
const SVG_X = Math.min(WIDTH, HEIGHT) / 1.5;
const SVG_Y = Math.min(WIDTH, HEIGHT) / 1.8;
const OUTER_RADIUS = Math.min(WIDTH, HEIGHT) / 2;
const INNER_CIRCLE = RADIUS / 3.3;
const POSITION = d3.arc().innerRadius(RADIUS / 1.65).outerRadius(RADIUS);

type SvgType = d3.Selection<SVGGElement, unknown, null, undefined>;
type PieArcType = d3.PieArcDatum<transformedDataType>;
type DefaultArcObjectType = d3.DefaultArcObject;

const createInnerCircle = (svg: SvgType, innerCircle: number) => {
  svg
    .append('g')
    .attr('class', 'donut-hole')
    .append('circle')
    .attr('class', 'donut-hole')
    .attr('r', innerCircle)
    .attr('fill', 'none')
    .attr('stroke', '#c7c7c7')
};

const handleTotalValue = (svg: SvgType, totalValue: number) => {
  svg
    .select('g.donut-hole')
    .append('text')
    .attr('class', 'donut-hole-label__text')
    .style("text-anchor", "middle")
    .style("font-size", '25px')
    .style('font-weight', 'bold')
    .attr("y", '16px')
    .text(formatValue(totalValue));
};

const formatValue = (value: number) => {
  const formattedValue = format(".2s")(value);
  const uppercaseFormattedValue = formattedValue.toUpperCase();
  return uppercaseFormattedValue;
}

const handleValue = (svg: SvgType, nonZeroData: PieArcType[],
  legendPosition: d3.Arc<any, DefaultArcObjectType>) => {
  svg
    .selectAll('g.arc')
    .data(nonZeroData)
    .append('text')
    .attr('class', 'donut-label')
    .text(d => formatValue(d.data.value))
    .style("fill", '#444')
    .style("font-size", '12px')
    .attr('transform', (d: DefaultArcObjectType) => `translate(${legendPosition.centroid(d)})`)
    .style("text-anchor", "middle")
    .style("font-size", '25px')
    .style('font-weight', 'bold')
    .attr("y", '16px');
};

const DrawDonut = (element: HTMLElement, dountData: transformedDataType[], setTooltipContent: React.Dispatch<React.SetStateAction<{
  content: transformedDataType[];
  el: SVGPathElement;
  hoveredData: transformedDataType;
} | null>>) => {
  d3.select(element).select("svg").remove();

  const validData: transformedDataType[] = _.filter(dountData, (d: transformedDataType) => d.value >= 0);
  const totalValue = _.sumBy(dountData, d => d.value);
  const showTooltip = (el: SVGPathElement, content: transformedDataType[], hoveredData: transformedDataType) => {
    setTooltipContent({ content, el, hoveredData });
  };
  // Removed zero and negative value
  const pieGenerator = d3.pie<transformedDataType>().value((d: transformedDataType) => d.value);
  const arcGenerator = pieGenerator(validData);
  const arc = d3.arc<PieArcType>().innerRadius(INNER_RADIUS).outerRadius(OUTER_RADIUS - 30);

  const svg = d3.select(element)
    .append('svg')
    .attr("width", '400px')
    .attr("height", '420px')
    .attr('viewBox', '0 0 ' + WIDTH + ' ' + HEIGHT)
    .append("g")
    .attr("transform", "translate(" + SVG_X + "," + SVG_Y + ")");
  svg
    .selectAll<SVGGElement, PieArcType>('g')
    .data(arcGenerator)
    .enter()
    .append('g')
    .attr('class', 'arc')
    .append('path')
    .attr('d', arc)
    .attr('fill', (d: PieArcType) => d.data.color)
    .attr("stroke", "#fff")
    .style("stroke-width", "2")
    .style("opacity", "0.8")
    .on('mouseover', function show(this, _event, d: PieArcType) {
      const tooltipContent = dountData;
      const hoveredData = d.data;
      showTooltip(this, tooltipContent, hoveredData);
    })
    .on('mouseout', function hide() {
      setTooltipContent(null);
    });
  createInnerCircle(svg, INNER_CIRCLE);
  handleTotalValue(svg, totalValue);
  handleValue(svg, arcGenerator, POSITION);
};

export default DrawDonut;
