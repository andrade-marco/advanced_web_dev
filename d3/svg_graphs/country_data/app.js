// Country data Scatterplot
//General constants
const SVG = d3.select('svg');
const SVG_HEIGHT = 700;
const SVG_WIDTH = 700;
const SVG_PADDING = 60;

//Scales
var xExtremes = d3.extent(regionData, data => data.subscribersPer100);
var yExtremes = d3.extent(regionData, data => data.growthRate);
var colorExtremes = d3.extent(regionData, data => data.extremePovertyRate);
var radiusExtremes = d3.extent(regionData, data => data.medianAge);
var yScale = d3.scaleLinear().domain(yExtremes).range([SVG_HEIGHT - SVG_PADDING, SVG_PADDING]);
var xScale = d3.scaleLinear().domain(xExtremes).range([SVG_PADDING, SVG_WIDTH - SVG_PADDING]);
var colorScale = d3.scaleLinear().domain(colorExtremes).range(['rgba(18,194,233,0.6)', 'rgba(246,79,89,0.6)']);
var strokeScale = d3.scaleLinear().domain(colorExtremes).range(['rgb(18,194,233)', 'rgb(246,79,89)']);
var radiusScale = d3.scaleLinear().domain(radiusExtremes).range([5, 20]);

//Setting up axis
var xAxis = d3.axisBottom(xScale).tickSize(- SVG_HEIGHT + 2 * SVG_PADDING).tickSizeOuter(0);
var yAxis = d3.axisLeft(yScale).tickSize(- SVG_HEIGHT + 2 * SVG_PADDING).tickSizeOuter(0);

SVG.append('g').attr('transform', `translate(0, ${SVG_HEIGHT - SVG_PADDING})`).call(xAxis);
SVG.append('g').attr('transform', `translate(${SVG_PADDING}, 0)`).call(yAxis)

//Adding graph and axis title
SVG.append('text').attr('x', SVG_WIDTH / 2)
                  .attr('y', SVG_PADDING)
                  .attr('dy', '-1.5em')
                  .style('text-anchor', 'middle')
                  .style('font-size', '1.3em')
                  .text('Growth Rate and Technology');

SVG.append('text').attr('x', SVG_WIDTH / 2)
                  .attr('y', SVG_HEIGHT - SVG_PADDING)
                  .attr('dy', '1.5em')
                  .style('text-anchor', 'middle')
                  .text('Subscribers per 100');

SVG.append('text').attr('transform', 'rotate(-90)')
                  .attr('x', - SVG_HEIGHT / 2)
                  .attr('y', SVG_PADDING)
                  .attr('dy', '-1.1em')
                  .style('text-anchor', 'middle')
                  .text('Growth rate');

//Generating Scatterplot
//Creating graph
SVG.attr('height', SVG_HEIGHT)
   .attr('width', SVG_WIDTH)
        .selectAll('circle')
        .data(regionData)
        .enter()
        .append('circle')
            .attr('cx', data => xScale(data.subscribersPer100))
            .attr('cy', data => yScale(data.growthRate))
            .attr('r', data => radiusScale(data.medianAge))
            .attr('fill', data => colorScale(data.extremePovertyRate))
            .attr('stroke', data => strokeScale(data.extremePovertyRate));
