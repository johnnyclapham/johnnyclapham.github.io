// import { curveLinearClosed } from "d3"

// // Credit Note: This is directly lifted from 
// // https://stackoverflow.com/questions/46726086/prevent-overlapping-colours-becoming-darker-in-google-maps
// // This code snippet is NOT written by Johnny Clapham

// // CURRENTLY NOT IN USE

// function drawCircle(point, radius, dir) {
//     var d2r = Math.PI / 180; // degrees to radians 
//     var r2d = 180 / Math.PI; // radians to degrees 
//     var earthsradius = 6378137.0; // 6378137.0 is the radius of the earth in meters
//     var points = 32;
//     if (typeof point.lat != "function") {
//         if (typeof point.lat != "number") {
//             alert("drawCircle: point.lat not function or number");
//             return;
//         }
//         point = new google.maps.LatLng(point.lat, point.lng);
//     }

//     // find the raidus in lat/lon 
//     var rlat = (radius / earthsradius) * r2d;
//     var rlng = rlat / Math.cos(point.lat() * d2r);

//     var extp = new Array();
//     if (dir == 1) {
//         var start = 0;
//         var end = points + 1
//     } // one extra here makes sure we connect the ends
//     else {
//         var start = points + 1;
//         var end = 0
//     }
//     for (var i = start;
//         (dir == 1 ? i < end : i > end); i = i + dir) {
//         var theta = Math.PI * (i / (points / 2));
//         var ey = point.lng() + (rlng * Math.cos(theta)); // center a + radius x * cos(theta) 
//         var ex = point.lat() + (rlat * Math.sin(theta)); // center b + radius y * sin(theta) 
//         extp.push(new google.maps.LatLng(ex, ey));
//     }
//     return extp;
// }


// export {
//     // Note: Add our functions to this export!
//     drawCircle
// }
