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

var get_button = document.getElementById('get_button');
get_button.onclick = function() {
    pull_data()
}
var flush_button = document.getElementById('flush_button');
flush_button.onclick = function() {
    flush_data()
}

// var test_button = document.getElementById('init_map_button');
// test_button.onclick = function() {
//     // indexFunction()
//     initMap();
// }

var log_data_button = document.getElementById('log_data_button');
log_data_button.onclick = function() {
    log_data();
}