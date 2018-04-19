// const apiKey = 'AIzaSyDGhLiBwZAg7ZCPA1pcT5BalJ88hvIaHts';
let map;
let service;
let infowindow;

function initialize() {
  const newYork = new google.maps.LatLng(40.7128, 74.0060);

  map = new google.maps.Map(document.getElementById('map'), {
    center: newYork,
    zoom: 15
  });

  const request = {
    location: newYork,
    radius: '500',
    query: 'restaurant'
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (let i = 0; i < results.length; i++) {
      let place = results[i];
      createMarker(results[i]);
    }
  }
}

