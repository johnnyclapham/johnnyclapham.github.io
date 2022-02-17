import * as d3 from 'd3';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from "firebase/database";
import { fire_config } from './fire_config.js'
// Note: We are using firebase database; not firebase firestore!



function app() {      
    var userDict = {};

    d3.select("#container")
        .transition()
        .duration(1000)
        .style("background-color", "red");

    const firebaseConfig = fire_config;
    const app = initializeApp(firebaseConfig);
    // Get a reference to the database service
    const dbRef = ref(getDatabase());
    // Get user entry and print
    // get(child(dbRef, 'User/3')).then((snapshot) => {
    get(child(dbRef, 'User/')).then((snapshot) => {
        if (snapshot.exists()) {
            snapshot.forEach(function(childSnapshot) {
                
                var key = childSnapshot.key;
                var childRSSI = childSnapshot.child("rssi").val();
                var childLAT = childSnapshot.child("latitude").val();
                var childLONG = childSnapshot.child("longitude").val();

                console.log("key: "+key+" RSSI: "+childRSSI);
                userDict[key] = childRSSI;
                // document.getElementById("objects").append(childData);

                // linebreak = document.createElement('br');
                // document.getElementById("objects").appendChild(linebreak);

                // document.getElementById("userList").createElement("LI");
                // appendChild(document.createTextNode(childData));

                var node=document.createElement("LI");
                var textnode=document.createTextNode("rssi:   {"+childRSSI+"}   @   lat/lng:   {"+childLAT+" , "+childLONG+"}");
                node.appendChild(textnode);
                document.getElementById("userList").appendChild(node);
                
                // ('<li>'+childData+'</li>');
                // '<li>Scooter</li>'

                // appendChild(document.createTextNode('Scooter'));
            });
        } else {
            console.log("No data available");
        }
        return userDict;
    }).catch((error) => {
        console.error(error);
    });

    console.log("yam critical");
    console.log("dictionary: "+userDict[0]);

}

export {
    app
}




