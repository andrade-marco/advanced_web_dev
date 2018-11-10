//Force graph
d3.csv('./senate_committee_data.csv', function(d, i, headers) {
  var committees = headers.slice(2).filter(h => d[h] === '1');
  return {
    name: d.name,
    party: d.party,
    committees: committees
  }
}, function(error, nodes) {
  if (error) throw error;

  var links = makeLinks(nodes);
  var width = 750;
  var height = 750;
  var svg = d3.select('svg');
  svg.attr('width', width)
     .attr('height', height);

  //Creating the simulation
  var linkGroup = svg.append('g').classed('links', true);
  var nodeGroup = svg.append('g').classed('nodes', true);
  var simulation = d3.forceSimulation(nodes); //define simulation
  simulation.force('charge', d3.forceManyBody().strength(-100)) //define repulsion/attraction force between nodes
            .force('center', d3.forceCenter(width / 2, height / 2)) //center on SVG
            .force('link', d3.forceLink(links)
                             .distance(data => { //set up ideal distance based on number of committees
                                 var count1 = data.source.committees.length;
                                 var count2 = data.target.committees.length;
                                 return 25 * Math.max(count1, count2);
                             })
                             .id(data => data.name) //set up name as identifier for linking
                         );

  simulation.on('tick', () => { //tick event update position of lines and circles
      linkGroup.selectAll('line')
               .attr('x1', data => data.source.x)
               .attr('y1', data => data.source.y)
               .attr('x2', data => data.target.x)
               .attr('y2', data => data.target.y);

      nodeGroup.selectAll('circle')
               .attr('cx', data => data.x)
               .attr('cy', data => data.y);
  });

  //Generate graph
  graph(nodes, links);
  setUpCheckboxes(nodes.columns.slice(2));

  //Helpers
  //Setting and updating the graph
  function graph(nodeData, linkData) {
      var partyScale = d3.scaleOrdinal().domain(['D', 'R', 'I'])
                                        .range(['blue', 'red', '#ccc']);

      //Updating graph
      var nodeUpdate = nodeGroup.selectAll('circle').data(nodeData, data => data.name);
      nodeUpdate.exit().remove();
      nodeUpdate.enter().append('circle')
                        .attr('r', 15)
                        .attr('fill', data => partyScale(data.party))
                        .attr('stroke', 'white')
                        .attr('stroke-width', 3);

      var linkUpdate = linkGroup.selectAll('line').data(linkData, data => data.source.name + data.target.name);
      linkUpdate.exit().remove();
      linkUpdate.enter().append('line');

      //Drag events and tooltip events
      d3.selectAll('circle').call(d3.drag().on('start', onDragStart).on('drag', onDrag).on('end', onDragEnd));
      d3.selectAll('circle').on('mousemove touchmove', showTooltip).on('mouseout touchend', hideTooltip);
  }

  //Setting up links array (source/target)
  function makeLinks(nodes) {
      var links = [];
      for (var i = 0; i < nodes.length; i++) {
          for (var j = i + 1; j < nodes.length; j++) {
              var s1 = nodes[i];
              var s2 = nodes[j];
              for (var k = 0; k < s1.committees.length; k++) {
                  var committee = s1.committees[k];
                  if (s2.committees.includes(committee)){
                      links.push({
                          source: s1.name,
                          target: s2.name
                      });
                      break;
                  }
              }
          }
      }
      return links;
  }

  //Setting up check boxes for committees
  function setUpCheckboxes(committees) {
      var boxAreas = d3.select('#checkboxes').selectAll('div')
      .data(committees)
      .enter()
      .append('div');

      boxAreas.append('label')
      .property('for', data => data)
      .text(data => data);

      boxAreas.append('input')
      .property('type', 'checkbox')
      .property('name', 'committee')
      .property('value', data => data)
      .property('checked', true)
      .on('click', () => {
          var activeCommittees = committees.filter(c => d3.select(`input[value="${c}"]`).property('checked'));
          var newNodes = nodes.map(n => {
              return {
                  name: n.name,
                  party: n.party,
                  committees: n.committees.filter(c => activeCommittees.includes(c)),
                  x: n.x,
                  y: n.y,
                  vx: n.vx,
                  vy: n.vy
              }
          }).filter(n => n.committees.length > 0);

          var newLinks = makeLinks(newNodes);
          graph(newNodes, newLinks);
          simulation.nodes(newNodes).force('link').links(newLinks);
          simulation.alpha(0.5).restart();
      });
  }

  //Called when start dragging nodes
  function onDragStart(data) {
      simulation.alphaTarget(0.5).restart(); //Set alpha target to make simulation 'heat up'
      data.fx = data.x; //Set new position of node equal to current position (x, y)
      data.fy = data.y;
  }

  //Called while dragging nodes
  function onDrag(data) {
      data.fx = d3.event.x;
      data.fy = d3.event.y;
  }

  //Called when dragging nodes end
  function onDragEnd(data) {
      simulation.alphaTarget(0);
      data.fx = null;
      data.fy = null;
  }

  //Showing tooltip
  function showTooltip(data) {
      var tooltip = d3.select(".tooltip");
      tooltip.style("opacity", 1)
             .style("left", (d3.event.x - tooltip.node().offsetWidth / 2) + "px")
             .style("top", (d3.event.y + 80) + "px")
             .html(() => {
                 var committees = data.committees.map(c => `<li>${c}</li>`).join('')
                 return `
                 <p>${data.name} (${data.party})</p>
                 <p>Committees</p>
                 <ol>${committees}</ol>
                 `
             });
    }

    //Hide tooltip
    function hideTooltip() {
        d3.select('.tooltip').style('opacity', 0);
    }

});
