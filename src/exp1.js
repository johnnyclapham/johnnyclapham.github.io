import * as d3 from 'd3';

function app() {

    d3.select("#container")
          .transition()
          .duration(1000)
          .style("background-color", "red");
	
}

export {
	app
}




