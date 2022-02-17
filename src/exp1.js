import * as d3 from 'd3';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { fire_config } from './fire_config.js'


function app() {
    console.log("yam has been thrown");

    d3.select("#container")
        .transition()
        .duration(1000)
        .style("background-color", "red");


    const firebaseConfig = fire_config;

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Get a list of cities from your database
    async function getUsers(db) {
        const cusersCol = collection(db, 'user');
        const userSnapshot = await getDocs(cusersCol);
        const userList = userSnapshot.docs.map(doc => doc.data());
        return userList;
    }

    console.log("yam has landed");
    console.log(getUsers(db));
}

export {
    app
}




