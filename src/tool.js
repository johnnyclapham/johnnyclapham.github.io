// Note: Tutorial with documentation https://www.tutorialsteacher.com/d3js/select-dom-element-using-d3js

import {
    pull_data,
    flush_data
} from './firebase.js'

// import {
//   initMap
// } from './exp2.js'

// initMap()

var get_button = document.getElementById('get_button');
get_button.onclick = function() {
    pull_data()
}
var flush_button = document.getElementById('flush_button');
flush_button.onclick = function() {
    flush_data()
}

// var test_button = document.getElementById('test_button');
// test_button.onclick = function() {
//     test_button()
// }

import {
    indexFunction
} from './index.js'

// var myElem2 = document.getElementById('testJSbutton');
// myElem2.onclick = function() {
//         indexFunction()
//     }

var test_button = document.getElementById('test_button');
test_button.onclick = function() {
    indexFunction()
}

// var myElem = document.getElementById('map_button');
// myElem.onclick = function() {
// 	initMap()
// }