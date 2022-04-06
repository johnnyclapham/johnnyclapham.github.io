// Note: Tutorial with documentation https://www.tutorialsteacher.com/d3js/select-dom-element-using-d3js

// import { map } from 'd3';
import {
    pull_data,
    flush_data,
    log_data
} from './firebase.js'

// import {
//     indexFunction
// } from './index.js'

import {
    initMap
} from './map.js'


pull_data();
// log_data();

// var get_button = document.getElementById('get_button');
// get_button.onclick = function() {
//     pull_data()
// }
var flush_button = document.getElementById('flush_button');
flush_button.onclick = function() {
    flush_data();
}

var log_data_button = document.getElementById('log_data_button');
log_data_button.onclick = function() {
    log_data();
    pull_data();
}

// var left_button = document.getElementById('left_control');
// left_button.onclick = function() {
//     log_data();
// }

// var right_button = document.getElementById('right_control');
// right_button.onclick = function() {
//     flush_data();
// }