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
    });
    const marker = new google.maps.Marker({
        position: mshall,
        map: map,
    });
    return (map);
}

function changeGradient(heatmap) {
    const gradient = [
        "rgba(0, 255, 255, 0)",
        "rgba(0, 255, 255, 1)",
        "rgba(0, 191, 255, 1)",
        "rgba(0, 127, 255, 1)",
        "rgba(0, 63, 255, 1)",
        "rgba(0, 0, 255, 1)",
        "rgba(0, 0, 223, 1)",
        "rgba(0, 0, 191, 1)",
        "rgba(0, 0, 159, 1)",
        "rgba(0, 0, 127, 1)",
        "rgba(63, 0, 91, 1)",
        "rgba(127, 0, 63, 1)",
        "rgba(191, 0, 31, 1)",
        "rgba(255, 0, 0, 1)",
    ];

    heatmap.set("gradient", heatmap.get("gradient") ? null : gradient);
}

function changeRadius(heatmap) {
    heatmap.set("radius", heatmap.get("radius") ? null : 80);
}

function setHeat(heatMapData) {

    const map = initMap();
    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatMapData
    });

    heatmap.setMap(map);
    console.log("Heatmap has been added!");
    changeGradient(heatmap);
    changeRadius(heatmap);
}

function setCircle(circleMapData) {
    const map = initMap();

    for (const location in circleMapData) {
        console.log("location: " + circleMapData[location].location);
        console.log("weight: " + circleMapData[location].weight);
        // Add the circle for this city to the map.
        const locationCircle = new google.maps.Circle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.4,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            map,
            center: circleMapData[location].location,
            radius: circleMapData[location].weight * (2 ** 4)
        });
    }
}

export {
    // Note: Add our functions to this export!
    initMap,
    setHeat,
    setCircle
}