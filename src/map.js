import * as d3 from 'd3';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get, Database } from "firebase/database";
import { fire_config } from './fire_config.js'
// Note: We are using firebase database; not firebase firestore!

function initMap() {
    console.log("new google map initialization")
    const mshall = {
        lat: 37.27014788306701,
        lng: -76.71179824260022
    };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 17,
        center: mshall,
        gestureHandling: "cooperative",
        // minZoom: zoom - 1,
        // maxZoom: zoom + 1,
    });
    const marker = new google.maps.Marker({
        position: mshall,
        map: map,
    });
}

export {
    // Note: Add our functions to this export!
    initMap
}