// Note: Tutorial with documentation https://www.tutorialsteacher.com/d3js/select-dom-element-using-d3js

import {
  app,
  flush
} from './exp1.js'


var myElem = document.getElementById('get_button');
myElem.onclick = function() {
	app()
}
var myElem = document.getElementById('flush_button');
myElem.onclick = function() {
	flush()
}



