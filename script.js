// 'map' refers to a <div> element with the ID map
let map = L.map('map', {
  center: [50.4536, 30.5164],
  layers: MQ.mapLayer(),
  zoom: 12
});

placeSearch({
    key: 'p8RJ9MAXAuryGgNIf3QblXCBZXSt15U6',
    container: document.querySelector('#mapOri')
});

placeSearch({
  key: 'p8RJ9MAXAuryGgNIf3QblXCBZXSt15U6',
  container: document.querySelector('#mapDest')
});

  

function runDirection(start, end) {
  map = L.map('map', {
      layers: MQ.mapLayer(),
      center: [50.4536, 30.5164],
      zoom: 12
  });
  
  var dir = MQ.routing.directions();

  dir.route({
      locations: [
          start,
          end
      ]
  });


  CustomRouteLayer = MQ.Routing.RouteLayer.extend({
  createStartMarker: (location) => {
    var custom_icon;      
    var marker;

    custom_icon = L.icon({
        iconUrl: 'Imagens/red.png',
        iconSize: [20, 29],     
        iconAnchor: [10, 29],
        popupAnchor: [0, -29]
    });

    marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);

    return marker;
  },

  createEndMarker: (location) => {
    var custom_icon;
    var marker;

    custom_icon = L.icon({
        iconUrl: 'Imagens/blue.png',
        iconSize: [20, 29],
        iconAnchor: [10, 29],
        popupAnchor: [0, -29]
    });

    marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);

    return marker;
  }
});
  
  map.addLayer(new CustomRouteLayer({
      directions: dir,
      fitBounds: true
  })); 
}

function submitForm(event) {
  event.preventDefault();

  map.remove();

  start = document.getElementById("mapOri").value;
  end = document.getElementById("mapDest").value;

  runDirection(start, end);

  document.getElementById("form").reset();
}

const form = document.getElementById('form');

form.addEventListener('submit', submitForm);