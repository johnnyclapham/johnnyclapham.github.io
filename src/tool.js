// Note: Tutorial with documentation https://www.tutorialsteacher.com/d3js/select-dom-element-using-d3js

import {
    app,
    flush
} from './firebase.js'

// import {
//   initMap
// } from './exp2.js'

// initMap()

var myElem0 = document.getElementById('get_button');
myElem0.onclick = function() {
    app()
}
var myElem1 = document.getElementById('flush_button');
myElem1.onclick = function() {
    flush()
}

import {
    indexFunction
} from './index.js'

var myElem2 = document.getElementById('testJSbutton');
myElem2.onclick = function() {
        indexFunction()
    }
    // var myElem = document.getElementById('map_button');
    // myElem.onclick = function() {
    // 	initMap()
    // }