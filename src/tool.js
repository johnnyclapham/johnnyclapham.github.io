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

// import {
//     initMap
// } from './map.js'


import {
    resizeView,
    writeTechnicalNote,
    setButtonActive
} from './style.js'

resizeView();
window.addEventListener('resize', function(event) {
    resizeView();
}, true);

writeTechnicalNote();
// pull_data();
log_data();

var flush_button = document.getElementById('flush_button');
flush_button.onclick = function() {
    flush_data();
}

var log_data_button = document.getElementById('log_data_button');
log_data_button.onclick = function() {
    log_data();
    pull_data();
}

var heat_button = document.getElementById('heat_button');
heat_button.onclick = function() {
    var mode = "heat";
    pull_data(mode);
    setButtonActive(mode);
    log_data();
}

var circle_button = document.getElementById('circle_button');
circle_button.onclick = function() {
    var mode = "circle";
    pull_data(mode);
    setButtonActive(mode);
    log_data();
}