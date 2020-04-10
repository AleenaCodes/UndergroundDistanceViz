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

  d3.csv("StationLocationsShortDist.csv", function(data) {

    var x = d3.scaleBand()
        .range([0, 2 * Math.PI])
        .align(0)
        .domain( data.map(function(d) { console.log(d.Station); return d.Station; }) );

    var y = d3.scaleRadial()
        .range([outerRadius, innerRadius])
        .domain([0, 30]);

    parentSVG.append("g")
      .selectAll("path")
      .data(data)
      .enter()
      .append("path")
        .attr("fill", function(d) { console.log(d); return d.Colour } )
        .attr("d", d3.arc()
            .innerRadius(outerRadius)
            .outerRadius(function(d) { return y(d['Distance']); })
            .startAngle(function(d) { return x(d.Station); })
            .endAngle(function(d) { return x(d.Station) + x.bandwidth(); })
            .padAngle(0.01)
            .padRadius(outerRadius))

  });
}
