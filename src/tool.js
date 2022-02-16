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
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var result = reader.readAsText("../secrets.txt");

const firebaseConfig = {
  apiKey: result,
  authDomain: "anaximander-ee3e9.firebaseapp.com",
  databaseURL: "https://anaximander-default-rtdb.firebaseio.com",
  projectId: "anaximander",
  storageBucket: "anaximander.appspot.com",
  messagingSenderId: "890606455610",
  appId: "1:890606455610:web:f4695c20635863b7675e03",
  measurementId: "G-0W5GTLPT5E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Get a list of users from your database
async function getUsers(db) {
    const users = collection(db, 'User');
    const userSnapshot = await getDocs(User);
    const userList = userSnapshot.docs.map(doc => doc.data());
    return userList;
  }