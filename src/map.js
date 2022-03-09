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
        mapTypeId: 'satellite'
            // gestureHandling: "cooperative",
            // minZoom: zoom - 1,
            // maxZoom: zoom + 1,
    });
    const marker = new google.maps.Marker({
        position: mshall,
        map: map,
    });
}

function setHeat(heatMapData) {
    // function setHeat() {
    // const map = new google.maps.Map(document.getElementById('map'));
    var testData = [
        { location: new google.maps.LatLng(37.782, -122.447), weight: 0.5 },
        new google.maps.LatLng(37.782, -122.445),
        { location: new google.maps.LatLng(37.782, -122.443), weight: 2 },
        { location: new google.maps.LatLng(37.782, -122.441), weight: 3 },
        { location: new google.maps.LatLng(37.782, -122.439), weight: 2 },
        new google.maps.LatLng(37.782, -122.437),
        { location: new google.maps.LatLng(37.782, -122.435), weight: 0.5 },

        { location: new google.maps.LatLng(37.785, -122.447), weight: 3 },
        { location: new google.maps.LatLng(37.785, -122.445), weight: 2 },
        new google.maps.LatLng(37.785, -122.443),
        { location: new google.maps.LatLng(37.785, -122.441), weight: 0.5 },
        new google.maps.LatLng(37.785, -122.439),
        { location: new google.maps.LatLng(37.785, -122.437), weight: 2 },
        { location: new google.maps.LatLng(37.785, -122.435), weight: 3 }
    ];

    var sanFrancisco = new google.maps.LatLng(37.774546, -122.433523);

    const map = new google.maps.Map(document.getElementById('map'), {
        center: sanFrancisco,
        zoom: 13,
        mapTypeId: 'satellite'
    });


    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatMapData
            // data: testData
    });
    heatmap.setMap(map);
    console.log("Heatmap has been added!");
}

export {
    // Note: Add our functions to this export!
    initMap,
    setHeat
}