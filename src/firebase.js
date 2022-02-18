import * as d3 from 'd3';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from "firebase/database";
import { fire_config } from './fire_config.js'
// Note: We are using firebase database; not firebase firestore!



function app() {
    //Note: First we flush data in case we are reloading
    flush();

    var currTime,retTime,numObjects=0;
    var start = Date.now();



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

                // Note: Update Statitistics
                numObjects++;
                currTime = new Date().toLocaleString();
                retTime = Date.now() - start;
                // Note: Set statistics values
                document.getElementById("statisticsText").innerHTML=String("# objects retrieved: "+ numObjects +" <br> Retrieve time taken: "+ retTime +" ms <br> Data last retrieved:  "+ currTime +"");

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
    
    document.getElementById("statisticsText").innerHTML=String("# objects retrieved: N/A <br> Retrieve time taken: N/A <br> Data last retrieved:  N/A");
}

export {
    // Note: Add our functions to this export!
    app,
    flush
}




