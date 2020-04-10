function makeVisualisation() {
  var parentDiv = document.getElementById("visualisationDiv");

  var width = parentDiv.offsetWidth;
  var height = parentDiv.offsetHeight;

  var backgroundSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    backgroundSVG.setAttributeNS(null, 'width', (width));
    backgroundSVG.setAttributeNS(null, 'height', (height));
    backgroundSVG.setAttribute('id', 'visualisationSVG');

  var newSquare = document.createElementNS("http://www.w3.org/2000/svg","rect");
    newSquare.setAttributeNS(null, 'width', (width));
    newSquare.setAttributeNS(null, 'height', (height));
    newSquare.setAttributeNS(null, 'fill', 'white');

  backgroundSVG.appendChild(newSquare);
  parentDiv.appendChild(backgroundSVG);

  var innerRadius = 0,
      outerRadius = Math.min(width, height) / 2;

  var parentSVG = d3.select('#visualisationSVG')
    .append('g')
    .attr('transform', 'translate(' + (width / 2) + ',' + (height/2) + ')');

  var x = d3.scaleBand()
      .range([0, 2 * Math.PI])
      .domain( dataTest.map(function(d) { return d.station; }) );

  var y = d3.scaleRadial()
      .range([outerRadius, innerRadius])
      .domain([0, 10000]);

  parentSVG.append("g")
    .selectAll("path")
    .data(dataTest)
    .enter()
    .append("path")
      .attr("fill", "#69b3a2")
      .attr("d", d3.arc()
        .innerRadius(outerRadius)
        .outerRadius(function(d) { return y(d['distance']);})
        .startAngle(function(d) { return x(d.station); })
        .endAngle(function(d) { return x(d.station) + x.bandwidth();})
        .padAngle(0.01)
        .padRadius(outerRadius))
}
