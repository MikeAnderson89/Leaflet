var myMap = L.map("map", {
  center: [31.7917, -7.0926],
  zoom: 3
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: 'pk.eyJ1IjoibWlrZWFuZGVyc29uMDI4OSIsImEiOiJjazB0bmU0YnIwZjZ5M2N0Y3QyNTRvenVsIn0.Bo47KuU0ni5vExreiHuhCw'
}).addTo(myMap);

var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson';

function markerSize(magnitude) {
  return Math.pow(magnitude, 6.5)
}

d3.json(url, result => {
  var earthquakes = result.features;
  earthquakes.forEach(earthquake =>{
    L.circle([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]], {
      draggable: true,
      title: earthquake.properties.title,
      fillOpacity: 0.75,
      color: "orange",
      fillColor: "red",
      radius: markerSize(earthquake.properties.mag)
    }).bindPopup("<h2>" + earthquake.properties.place + "</h2> <hr> <h3>Magnitude: " + earthquake.properties.mag + "</h3>").addTo(myMap);
  });
});
