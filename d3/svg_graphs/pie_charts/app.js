//Setting up general variables
var svg = d3.select('svg');
var input = d3.select('input');
var minYear = d3.min(birthData, d => d.year);
var maxYear = d3.max(birthData, d => d.year);
var width = 600;
var height = 600;

var continents = [];
birthData.forEach(val => {
    if(continents.indexOf(val.continent) === -1) continents.push(val.continent);
});

var colorScale = d3.scaleOrdinal().domain(continents).range(d3.schemeCategory10);

//Setting up SVG and input
svg.attr('width', width)
   .attr('height', height)
   .append('g')
        .attr('transform', `translate(${width / 2 }, ${height / 2})`)
        .classed('chart', true);

input.property('min', minYear)
     .property('max', maxYear)
     .property('value', minYear);

//Generating graph
function makeGraph(year) {
    var yearData = birthData.filter(d => d.year === year);
    var arcs = d3.pie().value(data => data.births)(yearData);
    var path = d3.arc().outerRadius(width / 2 - 10)
                       .innerRadius(width / 4);

    var update = d3.select('.chart').selectAll('.arc').data(arcs);
    update.exit().remove();
    update.enter().append('path')
                    .classed('arc', true)
                  .merge(update)
                    .attr('fill', data => colorScale(data.data.continent))
                    .attr('d', path);
}

//Initialize and event handler
makeGraph(minYear);
input.on('input', function() {
    makeGraph(parseInt(d3.event.target.value));
});
