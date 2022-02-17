import * as d3 from 'd3';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from "firebase/database";
import { fire_config } from './fire_config.js'
// Note: We are using firebase database; not firebase firestore!

function app() {
    d3.select("#container")
        .transition()
        .duration(1000)
        .style("background-color", "red");

    const firebaseConfig = fire_config;
    const app = initializeApp(firebaseConfig);

    // Get a reference to the database service
    const dbRef = ref(getDatabase());
    // Get user entry and print
    get(child(dbRef, 'User/3')).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });

}

export {
    app
}




