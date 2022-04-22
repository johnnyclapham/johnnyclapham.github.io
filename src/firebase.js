import * as d3 from 'd3';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get, Database } from "firebase/database";
import { fire_config } from './fire_config.js'
import { setHeat, setCircle, new_setCircle } from './map.js'
// Note: We are using firebase database; not firebase firestore!



function pull_data(mode) {
    var heatMapData = [];
    var circleMapData = []

    //Note: First we flush data in case we are reloading
    flush_data();



    var currTime, retTime, numObjects = 0;
    var start = Date.now();

    const firebaseConfig = fire_config;
    const app = initializeApp(firebaseConfig);
    // Get a reference to the database service
    const dbRef = ref(getDatabase());
    // Get user entry and print
    get(child(dbRef, 'User/')).then((snapshot) => {
        if (snapshot.exists()) {
            // Note: For each item in our Database 
            snapshot.forEach(function(childSnapshot) {
                //Note: childSnapshot is our user object
                var key = childSnapshot.key;
                //Note: Extract values
                var childRSSI = childSnapshot.child("rssi").val();
                var childLAT = childSnapshot.child("latitude").val();
                var childLONG = childSnapshot.child("longitude").val();
                // Note: Update Statitistics
                numObjects++;
                currTime = new Date().toLocaleString();
                retTime = Date.now() - start;
                // Note: Set statistics values
                update_retrieve_stats(document, numObjects, retTime, currTime);
                // Note: Make RSSI positive for easy processing
                childRSSI *= -1;
                // Note: Normalize our RSSI to be on scale {0-1}
                var normalized_childRSSI = (childRSSI - 30) / (130 - 30);
                // Note: Add data to our heatMapData var
                var invertedRssiNormalized = 1 - normalized_childRSSI;

                if (mode == "heat") {
                    heatMapData.push({
                        location: new google.maps.LatLng(childLAT, childLONG),
                        weight: invertedRssiNormalized
                    });
                } else if (mode == "circle" || mode == "weak" || mode == "mid" || mode == "strong") {


                    // Create circle dataset
                    circleMapData.push({
                        location: new google.maps.LatLng(childLAT, childLONG),
                        weight: invertedRssiNormalized
                    })
                }
            });
        } else {
            // Note: In case of empty database
            console.log("No data available");
        }
        //Note: After all objects have been iterated through
        if (mode == "heat") {
            // Note: If we are in heat mode, plot heatmap
            setHeat(heatMapData);
        } else if (mode == "circle" || mode == "weak" || mode == "mid" || mode == "strong") {
            // Note: If we are in circle mode, plot circle plot
            console.log("circle mode");
            setCircle(circleMapData, mode);
            // new_setCircle(circleMapData);

        }
        // setHeat(heatMapData);
    }).catch((error) => {
        console.error(error);
    });
}

function update_retrieve_stats(document, numObjects, retTime, currTime) {
    document.getElementById("statisticsText").innerHTML = String("Objects Fetched: " + numObjects + " <br>Fetch RTT: " + retTime + " ms <br>Last Fetch: " + currTime + "");
}




function log_data() {
    //Note: First we flush data in case we are reloading
    flush_data();
    var index_number = 1;
    var currTime, retTime, numObjects = 0;
    var start = Date.now();

    const firebaseConfig = fire_config;
    const app = initializeApp(firebaseConfig);
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'User/')).then((snapshot) => {
        if (snapshot.exists()) {
            snapshot.forEach(function(childSnapshot) {
                var key = childSnapshot.key;
                var childRSSI = childSnapshot.child("rssi").val();
                var childLAT = childSnapshot.child("latitude").val();
                var childLONG = childSnapshot.child("longitude").val();
                // console.log("key: " + key + " RSSI: " + childRSSI);

                //Note: We add all data to our html list
                var node = document.createElement("LI");
                // var node = document.createElement("P");

                const textToPrint = " rssi:   {" + childRSSI + " dBm}   @   lat/lng:   {" + childLAT + " , " + childLONG + "}";

                var textnode = document.createTextNode(textToPrint);

                textnode.className = "raw_data_item";
                // textnode.className = "data_raw_list"
                node.appendChild(textnode);
                document.getElementById("userList").appendChild(node);

                // Note: Update Statitistics
                numObjects++;
                currTime = new Date().toLocaleString();
                retTime = Date.now() - start;
                // Note: Set statistics values
                update_retrieve_stats(document, numObjects, retTime, currTime);
                // Note: Make RSSI positive for easy processing
                childRSSI *= -1;
                // Note: Normalize our RSSI to be on scale {0-1}
                var normalized_childRSSI = (childRSSI - 30) / (130 - 30);
                // Note: Add data to our heatMapData var
                var invertedRssiNormalized = 1 - normalized_childRSSI;
                // console.log("RSSI: " + childRSSI + " || normalized: " + normalized_childRSSI + " || inverted: " + invertedRssiNormalized);
                // Note: Increase the index for printing the data
                index_number++;
            });
        } else {
            // Note: In case of empty database
            console.log("No data available");
        }
        //Note: After all objects have been iterated through
        // Do something
        console.log("Data log complete.");
    }).catch((error) => {
        console.error(error);
    });
}

function flush_data() {
    //Note: Remove all data from list
    var userList = document.getElementById("userList");
    //Note: Iterate through all html <ol> children and delete
    while (userList.firstChild) {
        userList.removeChild(userList.firstChild);
    }

    document.getElementById("statisticsText").innerHTML = String("Objects Fetched: N/A <br> Fetch RTT: N/A <br> Last Fetch: N/A ");
}

export {
    // Note: Add our functions to this export!
    pull_data,
    flush_data,
    log_data
}