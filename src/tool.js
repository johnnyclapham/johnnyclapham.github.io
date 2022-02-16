// Note: Tutorial with documentation https://www.tutorialsteacher.com/d3js/select-dom-element-using-d3js

// Note: Select element:
// d3.select("p").style("color", "green");

// Note: Select tag:
// d3.select("#title1").style("color", "green");

// Note: Select tag type:
d3.selectAll("h1").style("color", "green");

d3.select("#container")
          .transition()
          .duration(10000)
          .style("background-color", "red");