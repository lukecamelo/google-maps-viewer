// const apiKey = 'AIzaSyDGhLiBwZAg7ZCPA1pcT5BalJ88hvIaHts';
let map;
let service;
let infowindow;

function initialize() {
  const newYork = new google.maps.LatLng(40.730610, -73.935242);

  map = new google.maps.Map(document.getElementById('map'), {
    center: newYork,
    zoom: 15
  });
  
  const request = {
    location: newYork,
    radius: '500',
    query: 'pizza'
  };

  const input = document.getElementById('pac-input');
  const searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  infowindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: newYork,
    radius: 500,
    type: ['restaurant']
  }, callback);
  
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

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

