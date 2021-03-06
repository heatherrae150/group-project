var data = require('./open_pubs.json')

var pubDataHelper = {
  pubsData: data,
  getPubByCity: function(name){
     return filteredPubs = this.pubsData.filter(function (pub) {
      return pub.local_authority === name;
    })
  },

  getPubsByCoords: function(lat, lng, radius){

    var minLat = lat - radius;
    var maxLat = lat + radius;
    var minLng = lng - radius;
    var maxLng = lng + radius;

    var filteredPubs = this.pubsData.filter(function (pub) {
      return (
        pub.latitude > minLat &&
        pub.latitude < maxLat &&
        pub.longitude > minLng &&
        pub.longitude < maxLng
      )
    })
    console.log("Pubs within range", filteredPubs)
    return filteredPubs
  }
}

module.exports = pubDataHelper
