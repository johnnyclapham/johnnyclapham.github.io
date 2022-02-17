// Note: Tutorial with documentation https://www.tutorialsteacher.com/d3js/select-dom-element-using-d3js

// Note: Select element:
// d3.select("p").style("color", "green");

// Note: Select tag:
// d3.select("#title1").style("color", "green");

// Note: Select tag type:
// d3.selectAll("h1").style("color", "green");

d3.select("#container")
          .transition()
          .duration(1000)
          .style("background-color", "red");

import { fire_config } from './fire_config.js'

console.log("point1");

import { initializeApp } from 'firebase/app';
// import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-initializeApp.js'

console.log(String(fire_config));

console.log("point2");

// Initialize Firebase
const app = initializeApp(fire_config);
// const analytics = getAnalytics(app);
// const db = getFirestore(app);

// // // Get a list of users from your database
// // async function getUsers(db) {
// //     const users = collection(db, 'User');
// //     const userSnapshot = await getDocs(User);
// //     const userList = userSnapshot.docs.map(doc => doc.data());
// //     return userList;
// //   }

// const ref = db.ref('User');

// ref.orderByChild('height').on('child_added', (snapshot) => {
//   console.log(snapshot.key + ' :: ' + snapshot.val().latitude );
// });


// import {Loader, LoaderOptions} from 'google-maps';
// // const options: LoaderOptions = {/* todo */};
var gms = require('../google_maps_secrets.txt');
var text = fs.readFileSync("./mytext.txt", 'utf-8');

  
