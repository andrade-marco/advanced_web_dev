var width = 600;
var height = 600;
var padding = 20;
var barPadding = 1;
var svg = d3.select('svg');

var minYear = d3.min(birthData, data => data.year);
var maxYear = d3.max(birthData, data => data.year);
var yearData = birthData.filter(data => data.year === minYear);

var xScale = d3.scaleLinear()
               .domain([0, d3.max(yearData, data => data.births)])
               .rangeRound([padding, width]);

var histogram = d3.histogram().domain(xScale.domain()).thresholds(xScale.ticks()).value(data => data.births);
var bins = histogram(yearData);
var barWidth = width / bins.length - barPadding;

var yScale = d3.scaleLinear()
               .domain([0, d3.max(bins, data => data.length)])
               .range([height, 0]);

var bars = svg.attr('height', height)
              .attr('width', width)
              .selectAll('.bar')
              .data(bins)
              .enter()
              .append('g')
                .classed('bar', true);

bars.append('rect').attr('x', (data, i) => (barWidth + barPadding) * i)
                   .attr('y', data => yScale(data.length))
                   .attr('height', data => height - yScale(data.length))
                   .attr('width', barWidth)
                   .attr('fill', '#9c27b0');

bars.append('text')
        .text(data => `${data.x0} - ${data.x1} (bar height: data.length)}`)
        .attr('transform', 'rotate(-90)')
        .attr('y', data => (xScale(d.x1) + xScale(data.x0)) / 2)
        .attr('x', - height + 10)
        .style('alignment-baseline', 'middle');

d3.select('input').property('min', minYear)
                  .property('max', maxYear)
                  .property('value', minYear)
                  .on('input', function() {
                      var year = parseInt(d3.event.target.value);
                      yearData = birthData.filter(data => data.year === year);

                      xScale.domain([0, d3.max(yearData, data => data.births)]);
                      histogram.domain(xScale.domain()).thresholds(xScale.ticks());
                      bins = histogram(yearData);
                      yScale.domain([0, d3.max(bins, data => data.length)]);

                      bars = svg.selectAll('.bar').data(bins);
                      bars.exit().remove();

                      var g = bars.enter().append('g').classed('bar', true);
                      g.append('rect');
                      g.append('text');
                      g.merge(bars).select('rect')
                                   .attr('x', (data, i) => (barWidth + barPadding) * i)
                                   .attr('y', data => yScale(data.length))
                                   .attr('height', data => height - yScale(data.length))
                                   .attr('width', data => {
                                       var width = xScale(data.x1) - xScale(data.x0) - barPadding;
                                       return width < 0 ? 0 : width;
                                   })
                                   .attr('fill', '#9c27b0');

                      g.merge(bars).select('text')
                                   .text(data => `${data.x0} - ${data.x1} (bar height: data.length)}`)
                                   .attr('transform', 'rotate(-90)')
                                   .attr('y', data => (xScale(d.x1) + xScale(data.x0)) / 2)
                                   .attr('x', - height + 10)
                                   .style('alignment-baseline', 'middle');
                 });
