import * as d3 from 'd3';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get, Database } from "firebase/database";
import { fire_config } from './fire_config.js'
import { drawCircle } from './third_party_utilities.js'
// Note: We are using firebase database; not firebase firestore!

var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
var icons = {
    parking: {
        icon: iconBase + 'parking_lot_maps.png'
    },
    library: {
        icon: iconBase + 'library_maps.png'
    },
    info: {
        icon: iconBase + 'info-i_maps.png'
    }
};
const house_icon = {
    // url: 'https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png', // url
    url: '../assets/small_house.png'
};
const mshall = {
    lat: 37.27014788306701,
    lng: -76.71179824260022
};

//Note: This is not my image design! Credit where credit is due:
// Please check out the author's work:
// https://tokyodachi.com/collections/william-mary/tag
// I am borrowing this artwork, since this tool is only for educational purposes currently
const current_location_icon = {
    url: '../assets/small_tokyodachi.png'
};



function initMap() {
    console.log("new google map initialization")
    const mshall = {
        lat: 37.27014788306701,
        lng: -76.71179824260022
    };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 17,
        //Note: This is the center of the map. 
        center: mshall,
        mapTypeId: 'satellite'
    });
    const marker = new google.maps.Marker({
        position: mshall,
        map: map,
        icon: house_icon,
    });

    const contentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<h3 id="firstHeading" class="firstHeading">Home of Anaximander</h3>' +
        '<div id="bodyContent">' +
        "<p> We use MS hall as the focus point for our pilot evaluation. Your current location is indicated by the bouncing marker. </p>" +
        "</p>" +
        "</div>" +
        "</div>";
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });
    marker.addListener("mouseover", () => {
        infowindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
        });
    });

    marker.addListener("mouseout", () => {
        infowindow.close();
    });

    //Note: This line decides whether we center on current location or not.
    centerOnLocation(map);
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

function centerOnLocation(map) {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        try {

        } catch (error) {

        } navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                // infoWindow.setPosition(pos);
                // infoWindow.setContent("Location found.");
                // infoWindow.open(map);
                map.setCenter(pos);
                var marker = new google.maps.Marker({
                    position: pos,
                    title: "Current Location",
                    optimized: false, // <-- required for animated gif
                    icon: current_location_icon
                });
                marker.setAnimation(google.maps.Animation.BOUNCE);
                marker.setMap(map);


                const contentString =
                    '<div id="content">' +
                    '<div id="siteNotice">' +
                    "</div>" +
                    '<h3 id="firstHeading" class="firstHeading">Current Location</h3>' +
                    '<div id="bodyContent">' +
                    "<p> You are located here. </p>" +
                    "</p>" +
                    "</div>" +
                    "</div>";
                const infowindow = new google.maps.InfoWindow({
                    content: contentString,
                });
                marker.addListener("mouseover", () => {
                    infowindow.open({
                        anchor: marker,
                        map,
                        shouldFocus: false,
                    });
                });
                marker.addListener("mouseout", () => {
                    infowindow.close();
                });
            },
            () => {
                handleLocationError(true, infoWindow, map.getCenter());
            }
        );
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function addInfoWindowToCircle(contentString, location, map) {
    var marker = new google.maps.Marker({
        // position: circleMapData[location].location,
        position: location,
        title: "Signal Strength: ",
        // optimized: false, // <-- required for animated gif
        // visable: false,
        // icon: current_location_icon
    });
    marker.setOpacity(0);
    // marker.setAnimation(google.maps.Animation.BOUNCE);
    marker.setMap(map);
    const infowindow1 = new google.maps.InfoWindow({
        content: contentString,
        // position: circleMapData[location].location
        position: location
    });

    // marker.addListener("mouseover", () => {
    marker.addListener("click", () => {

        infowindow1.open({
            // anchor: marker,
            map,
            shouldFocus: false,
        });
        // document.getElementById("weakRSSItext").style.color = "red";
    });
    // marker.addListener("mouseout", () => {
    //     infowindow1.close();
    // });
}

function setHeat(heatMapData) {

    const map = initMap();
    // centerOnLocation(map);
    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatMapData
    });

    heatmap.setMap(map);
    console.log("Heatmap has been added!");
    changeGradient(heatmap);
    changeRadius(heatmap);
}

function setCircle(circleMapData, mode) {
    const map = initMap();
    // centerOnLocation(map);
    var color;
    var weak_locationCircles = [];
    var mid_locationCircles = [];
    var strong_locationCircles = [];
    const RADIUS = 1;

    for (const location in circleMapData) {
        console.log("weight: " + circleMapData[location].weight);
        // Note: Do something based upon location weight
        if (circleMapData[location].weight < 0.4) {
            console.log("weak");
            color = "#ff0000";
            weak_locationCircles.push(new google.maps.Circle({
                strokeColor: "#FF0000",
                strokeOpacity: 0,
                strokeWeight: 0.5,
                fillColor: color,
                fillOpacity: 0.5,
                // map, // do not set map yet -> we will set when we want to view
                center: circleMapData[location].location,
                radius: RADIUS,
                // clickable: true
                // radius: circleMapData[location].weight * (2 ** 4)
            }));



            const contentString =
                '<div class="map-info-window">' +
                '<div class="info-window-content" id="content">' +
                '<div id="siteNotice">' +
                "</div>" +
                '<h3 id="weakRSSItext" class="weakRSSItext"> Weak Signal Strength </h3>' +
                '<div id="bodyContent">' +
                "<p> Network connectivity in this location needs improvement. </p>" +
                "<p> Weight: " + circleMapData[location].weight + " </p>" +
                "<p> RSSI: " + circleMapData[location].rssi + " </p>" +
                "</p>" +
                "</div>" +
                "</div>" +
                "</div>";

            // addInfoWindowToCircle(contentString, circleMapData[location].location, map);

            if (mode == "weak" || mode == "all") {
                addInfoWindowToCircle(contentString, circleMapData[location].location, map);
            }


        } else if (circleMapData[location].weight >= 0.4 && circleMapData[location].weight < 0.55) {
            color = "#fffb00";
            mid_locationCircles.push(new google.maps.Circle({
                strokeColor: "#FF0000",
                strokeOpacity: 0,
                strokeWeight: 0.5,
                fillColor: color,
                fillOpacity: 0.5,
                // map, // do not set map yet -> we will set when we want to view
                center: circleMapData[location].location,
                radius: RADIUS,
                clickable: true
                // radius: circleMapData[location].weight * (2 ** 4)
            }));
            const contentString =
                '<div id="content">' +
                '<div id="siteNotice">' +
                "</div>" +
                '<h3 id="midRSSItext" class="midRSSItext"> Mid Signal Strength </h3>' +
                '<div id="bodyContent">' +
                "<p> Network connectivity in this location may need improvement. </p>" +
                "<p> Weight: " + circleMapData[location].weight + " </p>" +
                "<p> RSSI: " + circleMapData[location].rssi + " </p>" +
                "</p>" +
                "</div>" +
                "</div>";
            if (mode == "mid" || mode == "all") {
                addInfoWindowToCircle(contentString, circleMapData[location].location, map);
            }
            // addInfoWindowToCircle(contentString, circleMapData[location].location, map);

        } else if (circleMapData[location].weight >= 0.55) {
            color = "#00ff37";
            strong_locationCircles.push(new google.maps.Circle({
                strokeColor: "#FF0000",
                strokeOpacity: 0,
                strokeWeight: 0.5,
                fillColor: color,
                fillOpacity: 0.5,
                // map, // do not set map yet -> we will set when we want to view
                center: circleMapData[location].location,
                radius: RADIUS,
                clickable: true
                // radius: circleMapData[location].weight * (2 ** 4)
            }));
            const contentString =
                '<div id="content">' +
                '<div id="siteNotice">' +
                "</div>" +
                '<h3 id="strongRSSItext" class="strongRSSItext"> Strong Signal Strength </h3>' +
                '<div id="bodyContent">' +
                "<p> This is a great place to connect to the network. </p>" +
                "<p> Weight: " + circleMapData[location].weight + " </p>" +
                "<p> RSSI: " + circleMapData[location].rssi + " </p>" +
                "</p>" +
                "</div>" +
                "</div>";
            if (mode == "strong" || mode == "all") {
                addInfoWindowToCircle(contentString, circleMapData[location].location, map);
            }
            // addInfoWindowToCircle(contentString, circleMapData[location].location, map);
        }
    }

    for (var i = 0; i < weak_locationCircles.length; i++) {
        // Note: Show whichever circle set is desired:
        if (weak_locationCircles[i] && mode == 'weak' || mode == 'all') {
            weak_locationCircles[i].setMap(map);
            // addInfoWindowToCircle(contentString, circleMapData[location].location, map);
        }
    }


    for (var i = 0; i < mid_locationCircles.length; i++) {
        if (mid_locationCircles[i] && mode == 'mid' || mode == 'all') {
            mid_locationCircles[i].setMap(map);
            // addInfoWindowToCircle(contentString, circleMapData[location].location, map);
        }
    }
    for (var i = 0; i < strong_locationCircles.length; i++) {
        if (strong_locationCircles[i] && mode == 'strong' || mode == 'all') {
            strong_locationCircles[i].setMap(map);
            // addInfoWindowToCircle(contentString, circleMapData[location].location, map);
        }
    }
    // if (strong_locationCircles[i] && mode == 'all') {
    //     weak_locationCircles[i].setMap(map);
    //     mid_locationCircles[i].setMap(map);
    //     strong_locationCircles[i].setMap(map);
    //     // addInfoWindowToCircle(contentString, circleMapData[location].location, map);
    // }

    // mid_locationCircles[i].setMap(map);
    // strong_locationCircles[i].setMap(map);



}

// function filter(map, )


//Note: Currently not being used -> it is too slow due to heavy computation (3rd party utility)
// function new_setCircle(circleMapData) {
//     const map = initMap();
//     var color;
//     var weak_paths = [];
//     var mid_paths = [];
//     var strong_paths = [];
//     for (const location in circleMapData) {
//         // Add the circle for this city to the map.
//         if (circleMapData[location].weight < 0.5) {
//             weak_paths.push(drawCircle(circleMapData[location].location, 10, 1));
//             var cityCircle = new google.maps.Polygon({
//                 fillColor: "#ff0000",
//                 strokeOpacity: 0.5,
//                 strokeWeight: 0,
//                 fillOpacity: 0.5,
//                 map: map,
//                 paths: weak_paths,
//                 center: circleMapData[location].location,
//                 radius: 10
//             });

//             // color = "#ff0000"
//         } else if (circleMapData[location].weight >= 0.5 && circleMapData[location].weight < 0.8) {
//             mid_paths.push(drawCircle(circleMapData[location].location, 10, 1));
//             new google.maps.Polygon({
//                 fillColor: "#fffb00",
//                 strokeOpacity: 0.5,
//                 strokeWeight: 0,
//                 fillOpacity: 0.5,
//                 map: map,
//                 paths: weak_paths,
//                 center: circleMapData[location].location,
//                 radius: 10
//             });
//             // color = "#fffb00"
//         } else if (circleMapData[location].weight >= 0.8) {
//             strong_paths.push(drawCircle(circleMapData[location].location, 10, 1));
//             new google.maps.Polygon({
//                 fillColor: "#00ff37",
//                 strokeOpacity: 0.5,
//                 strokeWeight: 0,
//                 fillOpacity: 0.5,
//                 map: map,
//                 paths: weak_paths,
//                 center: circleMapData[location].location,
//                 radius: 10
//             });
//             // color = "#00ff37"
//         }
//     }
//     // console.log(weak_paths);

//     new google.maps.Polygon({
//         paths: weak_paths,
//         strokeColor: "#ff0000",
//         strokeOpacity: 0.35,
//         strokeWeight: 0,
//         fillColor: "#FF0000",
//         fillOpacity: 0.35,
//         map: map
//     });

// }

export {
    // Note: Add our functions to this export!
    initMap,
    setHeat,
    setCircle
    // new_setCircle
}