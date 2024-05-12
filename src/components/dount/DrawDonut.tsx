import * as d3 from "d3";
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
    .attr("height", '500')
    .attr('viewBox', '0 0 ' + 540 + ' ' + 550)
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
      hideTooltip();
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
};

export default DrawDonut;
