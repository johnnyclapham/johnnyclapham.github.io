// Note: Tutorial with documentation https://www.tutorialsteacher.com/d3js/select-dom-element-using-d3js

// Note: Select element:
// d3.select("p").style("color", "green");

// Note: Select tag:
// d3.select("#title1").style("color", "green");

// Note: Select tag type:
// d3.selectAll("h1").style("color", "green");

d3.select("#container")
          .transition()
          .duration(10000)
          .style("background-color", "red");



// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, doc, getDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// var result = reader.readAsText("../secrets.txt");

const config = require('./fire_config');
console.log(String(config));

// Initialize Firebase
const app = initializeApp(config);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// // Get a list of users from your database
// async function getUsers(db) {
//     const users = collection(db, 'User');
//     const userSnapshot = await getDocs(User);
//     const userList = userSnapshot.docs.map(doc => doc.data());
//     return userList;
//   }

const ref = db.ref('User');

ref.orderByChild('height').on('child_added', (snapshot) => {
  console.log(snapshot.key + ' :: ' + snapshot.val().latitude );
});