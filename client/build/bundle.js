/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

<<<<<<< HEAD
var mapWrapper = __webpack_require__ (1)
var postCodeRequestHelper = __webpack_require__ (2)
var weatherRequestHelper = __webpack_require__ (3)
var buttonListener = __webpack_require__ (4)
=======
var mapWrapper = __webpack_require__ (2)
var postCodeRequestHelper = __webpack_require__ (0)
var weatherRequestHelper = __webpack_require__ (4)
var locationIdHelper = __webpack_require__ (5)
>>>>>>> 2cb6674a0dd127528721dd823c380f1add962178

  window.addEventListener('load', function(){
    var mapContainer = document.getElementById("map");
    console.log(mapContainer);
    var map = new mapWrapper(mapContainer,
      {lat: 51.5074, lng: -0.1278}, 5 );
    map.addClickEvent();

    postCodeRequestHelper.getRequest("eh497sl", function(data){
      console.log(data);
    });
    postCodeRequestHelper.getRequest("eh111hd", function(data) {
      console.log(data);
    });

    buttonListener.addFunctionality();

    weatherRequestHelper.getRequest(3066, function(data) {
      console.log(data);
    })

  });


/***/ }),
/* 1 */
/***/ (function(module, exports) {



var MapWrapper = function (container, coords, zoom) {
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom,
    // Styling: uncomment lines below to hide roads
    // styles: [{
    //   'featureType': 'road',
    //   'stylers': [
    //   {'visibility': 'off'}
    //   ]
    // }],
  })
  this.markers = [];
  this.bounceMarkers = this.bounceMarkers.bind(this);
  this.geolocate = this.geolocate.bind(this);
  this.moveMapToCurrentLocation = this.moveMapToCurrentLocation.bind(this);
}

MapWrapper.prototype.addMarker = function (coords, infoWindowContent) {
  var marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap
  });
  if (infoWindowContent) {
    var infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
    // our marker has an addListener method we can use instead of google.maps.event.addListener
    marker.addListener('click', function () {
      infoWindow.open(marker.map, marker);
    })
  }

  this.markers.push(marker);

}

MapWrapper.prototype.addClickEvent = function () {
  google.maps.event.addListener(this.googleMap, 'click', function (event) {
    var position = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    this.addMarker(position);
  }.bind(this));
}

MapWrapper.prototype.bounceMarkers = function () {
  this.markers.forEach(function (marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  });
}

MapWrapper.prototype.geolocate = function () {
  // console.log(this);
  navigator.geolocation.getCurrentPosition
  navigator.geolocation.getCurrentPosition(this.moveMapToCurrentLocation);
}

MapWrapper.prototype.moveMapToCurrentLocation = function (position) {
  // console.log(this);
  var center = { lat: position.coords.latitude, lng: position.coords.longitude };
  this.googleMap.setCenter(center);
  this.addMarker(center);
}

module.exports = MapWrapper


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var postCodeRequestHelper = {
  temp_url: "http://api.postcodes.io/postcodes/",
  getRequest: function (postcode, callback) {
    var url = this.temp_url + postcode
    console.log("url ", url);
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url)

    xhr.addEventListener('load', function () {
      console.log(xhr);
      var jsonString = xhr.responseText
      var data = JSON.parse(jsonString)
      callback(data)
    })

    xhr.send()
  }
  // postRequest: function (url, callback, payload) {
  //   var xhr = new XMLHttpRequest()
  //   xhr.open('POST', url)
  //
  //   xhr.addEventListener('load', function () {
  //     if (xhr.status !== 200) return
  //     var jsonString = xhr.responseText
  //     var data = JSON.parse(jsonString)
  //     callback(data)
  //   })
  //
  //   xhr.setRequestHeader('Content-Type', 'application/json')
  //
  //   var jsonString = JSON.stringify(payload)
  //
  //   xhr.send(jsonString)
  //
  // }
}

module.exports = postCodeRequestHelper


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var weatherRequestHelper = {
  tempUrl: "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/",
  timeSpan: "?res=3hourly&key=",
  apiKey: "6b1853c7-7088-4c1f-9011-3569a35cf00b",

  getRequest: function(locationId, callback) {
     var url = this.tempUrl + locationId + this.timeSpan + this.apiKey
     console.log("weather url:", url);
     var xhr = new XMLHttpRequest()
     xhr.open("GET", url)

     xhr.addEventListener("load", function() {
       console.log(xhr)
       var jsonString = xhr.responseText
       var data = JSON.parse(jsonString)
       callback(data)
     })
     xhr.send()
  }
}



module.exports = weatherRequestHelper


/***/ }),
<<<<<<< HEAD
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var postCodeRequestHelper = __webpack_require__(2)

var submitButton = {
  addFunctionality: function() {
    var button = document.getElementById("postcode-submit-button")
    console.log(button)
    var postcodeInput = document.getElementById("postcode-input")
    button.addEventListener("click", function() {
      var postcode = postcodeInput.value
      postCodeRequestHelper.getRequest(postcode, function(data) {
        console.log(data)
      })
    })
  }
}

module.exports = submitButton
=======
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var hiddenApiKey = __webpack_require__(7)

var locationIdHelper = {
  tempUrl: "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist?key=",
  apiKey: hiddenApiKey,

  getRequest: function(lat, lng, callback) {
    var url = this.tempUrl + this.apiKey
    var xhr = new XMLHttpRequest()
    xhr.open("GET", url)

    xhr.addEventListener("load", function(lat, lng) {
      var jsonString = xhr.responseText
      var data = JSON.parse(jsonString)
      callback(data)
    })
    xhr.send()
  }
}

locationIdHelper.getRequest("60.4322", "-1.2992", function(data) {
  console.log("Data: ", data)
})


module.exports = locationIdHelper


/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports) {

var locationIDApiKey = "6b1853c7-7088-4c1f-9011-3569a35cf00b"


module.exports = locationIDApiKey
>>>>>>> 2cb6674a0dd127528721dd823c380f1add962178


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map