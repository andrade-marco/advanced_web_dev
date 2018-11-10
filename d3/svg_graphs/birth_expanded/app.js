const width = 500;
const height = 500;
const padding = 40;
const svg = d3.select('svg');

//Setting up scales
var yScale = d3.scaleLinear()
               .domain(d3.extent(birthData2011, data => data.lifeExpectancy))
               .range([height - padding, padding]);

var xScale = d3.scaleLinear()
               .domain(d3.extent(birthData2011, data => data.births / data.population))
               .range([padding, width - padding]);

var colorScale = d3.scaleLinear()
                   .domain(d3.extent(birthData2011, data => data.population / data.area))
                   .range(['lightgreen', 'black']);

var radiusScale = d3.scaleLinear()
                    .domain(d3.extent(birthData2011, data => data.births))
                    .range([5,40]);

//Tooltip
var tooltip = d3.select("body").append('div').classed('tooltip', true);

//Setting up axis
var xAxis = d3.axisBottom(xScale).tickSize(- height + 2 * padding)
                                 .tickSizeOuter(0);
var yAxis = d3.axisLeft(yScale).tickSize(- height + 2 * padding)
                               .tickSizeOuter(0);

svg.append('g').attr('transform', `translate(0, ${height - padding})`).call(xAxis);
svg.append('g').attr('transform', `translate(${padding}, 0)`).call(yAxis)

//Adding graph and axis title
svg.append('text').attr('x', width / 2)
                  .attr('y', padding)
                  .style('text-anchor', 'middle')
                  .style('font-size', '1.3em')
                  .text('Data on Births by Country in 2011');

svg.append('text').attr('x', width / 2)
                  .attr('y', height - padding)
                  .attr('dy', '1.5em')
                  .style('text-anchor', 'middle')
                  .text('Births per capita');

svg.append('text').attr('transform', 'rotate(-90)')
                  .attr('x', - height / 2)
                  .attr('y', padding)
                  .attr('dy', '-1.1em')
                  .style('text-anchor', 'middle')
                  .text('Life expectancy');

//Creating graph
svg.attr('height', height)
    .attr('width', width)
        .selectAll('circle')
        .data(birthData2011)
        .enter()
        .append('circle')
            .attr('cx', data => xScale(data.births / data.population))
            .attr('cy', data => yScale(data.lifeExpectancy))
            .attr('r', data => radiusScale(data.births))
            .attr('fill', data => colorScale(data.population / data.area))
            .on('mousemove', showTooltip)
            .on('touchstart', showTooltip)
            .on('mouseout', hideTooltip)
            .on('touchend', hideTooltip);

function showTooltip(data) {
    tooltip.style('opacity', 1)
        .style('top', d3.event.y + 'px')
        .style('left', d3.event.x + 'px')
        .html(`
            <p><span>Region:</span> ${data.region}</p>
            <p><span>Births:</span> ${data.births.toLocaleString()}</p>
            <p><span>Population:</span> ${data.population.toLocaleString()}</p>
            <p><span>Area:</span> ${data.area.toLocaleString()}</p>
            <p><span>Life Expectancy:</span> ${data.lifeExpectancy}</p>
            `)
}

function hideTooltip() {
    tooltip.style('opacity', 0);
}
