/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/firebase/app/dist/index.esm.js":
/*!*****************************************************!*\
  !*** ./node_modules/firebase/app/dist/index.esm.js ***!
  \*****************************************************/
/***/ (() => {

eval("throw new Error(\"Module build failed: Error: ENOENT: no such file or directory, open '/Users/Johnny/Desktop/johnnyclapham.github.io/johnnyclapham.github.io/node_modules/firebase/app/dist/index.esm.js'\");\n\n//# sourceURL=webpack://johnnyclapham.github.io/./node_modules/firebase/app/dist/index.esm.js?");

/***/ }),

/***/ "./src/fire_config.js":
/*!****************************!*\
  !*** ./src/fire_config.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"fire_config\": () => (/* binding */ fire_config)\n/* harmony export */ });\n// module.exports\nconst fire_config={\n    apiKey: \"AIzaSyDttu8Tc83vNYZ6Jpi8tcj08Bh6ObyQidM\",\n    authDomain: \"anaximander-ee3e9.firebaseapp.com\",\n    databaseURL: \"https://anaximander-default-rtdb.firebaseio.com\",\n    projectId: \"anaximander\",\n    storageBucket: \"anaximander.appspot.com\",\n    messagingSenderId: \"890606455610\",\n    appId: \"1:890606455610:web:f4695c20635863b7675e03\",\n    measurementId: \"G-0W5GTLPT5E\"\n }\n\n \n\n//# sourceURL=webpack://johnnyclapham.github.io/./src/fire_config.js?");

/***/ }),

/***/ "./src/tool.js":
/*!*********************!*\
  !*** ./src/tool.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _fire_config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fire_config.js */ \"./src/fire_config.js\");\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/app */ \"./node_modules/firebase/app/dist/index.esm.js\");\n// Note: Tutorial with documentation https://www.tutorialsteacher.com/d3js/select-dom-element-using-d3js\n\n// Note: Select element:\n// d3.select(\"p\").style(\"color\", \"green\");\n\n// Note: Select tag:\n// d3.select(\"#title1\").style(\"color\", \"green\");\n\n// Note: Select tag type:\n// d3.selectAll(\"h1\").style(\"color\", \"green\");\n\nd3.select(\"#container\")\n          .transition()\n          .duration(1000)\n          .style(\"background-color\", \"red\");\n\n\n\nconsole.log(\"point1\");\n\n\n// import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-initializeApp.js'\n\nconsole.log(String(_fire_config_js__WEBPACK_IMPORTED_MODULE_0__.fire_config));\n\nconsole.log(\"point2\");\n\n// Initialize Firebase\nconst app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_1__.initializeApp)(_fire_config_js__WEBPACK_IMPORTED_MODULE_0__.fire_config);\n// const analytics = getAnalytics(app);\n// const db = getFirestore(app);\n\n// // // Get a list of users from your database\n// // async function getUsers(db) {\n// //     const users = collection(db, 'User');\n// //     const userSnapshot = await getDocs(User);\n// //     const userList = userSnapshot.docs.map(doc => doc.data());\n// //     return userList;\n// //   }\n\n// const ref = db.ref('User');\n\n// ref.orderByChild('height').on('child_added', (snapshot) => {\n//   console.log(snapshot.key + ' :: ' + snapshot.val().latitude );\n// });\n\n//# sourceURL=webpack://johnnyclapham.github.io/./src/tool.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/tool.js");
/******/ 	
/******/ })()
;