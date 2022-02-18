import * as d3 from 'd3';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from "firebase/database";
import { fire_config } from './fire_config.js'
// Note: We are using firebase database; not firebase firestore!



function app() {

    // d3.select("#container")
    //     .transition()
    //     .duration(1000)
    //     .style("background-color", "red");

    const firebaseConfig = fire_config;
    const app = initializeApp(firebaseConfig);
    // Get a reference to the database service
    const dbRef = ref(getDatabase());
    // Get user entry and print
    get(child(dbRef, 'User/')).then((snapshot) => {
        if (snapshot.exists()) {
            snapshot.forEach(function (childSnapshot) {
                //Note: childSnapshot is our user object
                var key = childSnapshot.key;
                var childRSSI = childSnapshot.child("rssi").val();
                var childLAT = childSnapshot.child("latitude").val();
                var childLONG = childSnapshot.child("longitude").val();
                //Note: Log all our values
                console.log("key: " + key + " RSSI: " + childRSSI);
                //Note: Currently, we add all data to our html list
                var node = document.createElement("LI");
                var textnode = document.createTextNode("rssi:   {" + childRSSI + "}   @   lat/lng:   {" + childLAT + " , " + childLONG + "}");
                node.appendChild(textnode);
                document.getElementById("userList").appendChild(node);
            });
        } else {
            // Note: In case of empty database
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

function flush() {
    //Note: Remove all data from list
    var userList = document.getElementById("userList");
    //Note: Iterate through all html <ol> children and delete
    while (userList.firstChild){
        userList.removeChild(userList.firstChild);
    }
}

export {
    // Note: Add our functions to this export!
    app,
    flush
}




