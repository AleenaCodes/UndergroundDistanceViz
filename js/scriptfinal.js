function makeVisualisation() {
  // Setting up full div and adding some background

  var parentDiv = document.getElementById("visualisationDiv");

  var width = parentDiv.offsetWidth;
  var height = parentDiv.offsetHeight;

  var visualisationSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    visualisationSVG.setAttributeNS(null, 'width', (width));
    visualisationSVG.setAttributeNS(null, 'height', (height));
    visualisationSVG.setAttribute('id', 'visualisationSVG');

  parentDiv.appendChild(visualisationSVG);

  // Set dimensions
  var innerRadius = 0,
      outerRadius = Math.min(width, height) / 2;

  // Select SVG and move it to center
  var parentSVG = d3.select('#visualisationSVG')
    .append('g')
    .attr('transform', 'translate(' + (width / 2) + ',' + (height/2) + ')');

  d3.csv("data/StationLocationsFinal.csv", function(data) {
    var x = d3.scaleBand()
        .range([0, 2*Math.PI])
        .domain( data.map(function(d) { return d.Station; }) ); // X domain is the list of stations

    var y = d3.scaleRadial()
        .range([outerRadius, innerRadius])
        .domain([0, 29]); // Y domain is from 0 to the max in the data

    // Add bars
    parentSVG.append("g")
      .selectAll("path")
      .data(data)
      .enter()
      .append("path")
        .attr("fill", function(d) { return d.Colour } )
        .attr("data-station", function(d) { return d.Station}) // Adding for easy debug
        .attr("data-line", function(d) { return d.Line})
        .attr("d", d3.arc()
            .innerRadius(outerRadius)
            .outerRadius(function(d) { return y(d['Distance']); })
            .startAngle(function(d) { return x(d.Station); })
            .endAngle(function(d) { return x(d.Station) + x.bandwidth(); })
            .padAngle(0.005)
            .padRadius(outerRadius))

  });
}
