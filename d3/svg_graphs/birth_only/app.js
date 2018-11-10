const minYear = d3.min(birthData, data => data.year);
const maxYear = d3.max(birthData, data => data.year);
const maxBirths = d3.max(birthData, data => data.births);

var width = 600;
var height = 600;
var numBars = 12;
var barPadding = 10;
var barWidth = width / numBars - barPadding;
var yScale = d3.scaleLinear()
               .domain([0, maxBirths])
               .range([height, 0]);

d3.select('input')
    .property('min', minYear)
    .property('max', maxYear)
    .property('value', minYear);

d3.select('svg')
    .attr('width', width)
    .attr('height', height)
   .selectAll('rect')
   .data(birthData.filter(item => item.year === minYear))
   .enter()
   .append('rect')
    .attr('fill', '#01ABAA')
    .attr('width', barWidth)
    .attr('height', data => height - yScale(data.births))
    .attr('y', data => yScale(data.births))
    .attr('x', (data, i) => (barWidth + barPadding) * i);

d3.select('input').on('input', function() {
    var year = parseInt(d3.event.target.value);
    d3.selectAll('rect')
      .data(birthData.filter(item => item.year === year))
      .transition() //Adds transition
      .duration(800)
        .attr('height', data => height - yScale(data.births))
        .attr('y', data => yScale(data.births));
});
