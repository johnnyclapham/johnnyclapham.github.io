import * as d3 from 'd3';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get, Database } from "firebase/database";
import { fire_config } from './fire_config.js'
import { setHeat } from './map.js'
// Note: We are using firebase database; not firebase firestore!



function pull_data() {
    var heatMapData = [];

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
                //Note: Do some actions

                //Note: childSnapshot is our user object
                var key = childSnapshot.key;
                //Note: Extract values
                var childRSSI = childSnapshot.child("rssi").val();
                var childLAT = childSnapshot.child("latitude").val();
                var childLONG = childSnapshot.child("longitude").val();
                //Note: Log all our values (debugging)
                console.log("key: " + key + " RSSI: " + childRSSI);

                //Note: Currently, we add all data to our html list
                var node = document.createElement("LI");
                var textnode = document.createTextNode("rssi:   {" + childRSSI + "}   @   lat/lng:   {" + childLAT + " , " + childLONG + "}");
                node.appendChild(textnode);
                document.getElementById("userList").appendChild(node);

                // Note: Update Statitistics
                numObjects++;
                currTime = new Date().toLocaleString();
                retTime = Date.now() - start;
                // Note: Set statistics values
                document.getElementById("statisticsText").innerHTML = String("# objects retrieved: " + numObjects + " <br> Retrieve time taken: " + retTime + " ms <br> Data last retrieved:  " + currTime + "");

                // Note: Normalize our RSSI to be on scale {0-1}
                var normalized_childRSSI = (childRSSI - 29) / (120 - 29);
                // Note: Add data to our heatMapData var
                heatMapData.push({ location: new google.maps.LatLng(childLAT, childLONG), weight: normalized_childRSSI });
            });
        } else {
            // Note: In case of empty database
            console.log("No data available");
        }
        //Note: After all objects have been iterated through
        // Do something
        console.log("The yam has landed, hoorah!");
        setHeat(heatMapData);
        // setHeat();
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

    document.getElementById("statisticsText").innerHTML = String("# objects retrieved: N/A <br> Retrieve time taken: N/A <br> Data last retrieved:  N/A");
}

export {
    // Note: Add our functions to this export!
    pull_data,
    flush_data
}