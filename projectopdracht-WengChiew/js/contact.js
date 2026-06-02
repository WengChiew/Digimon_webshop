var webshopIcoon = L.icon({
  iconUrl: "./assets/images/Logo.png", 
  iconSize: [50, 50], 
  iconAnchor: [25, 25],
  popupAnchor: [0, -25],
});

var map = L.map("map").setView([51.23022, 4.41613], 14);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var markerAP = L.marker([51.23022, 4.41613], { icon: webshopIcoon })
  .addTo(map)
  .bindPopup("AP hogeschool");
var markerMAS = L.marker([51.2289, 4.4048], { icon: webshopIcoon })
  .addTo(map)
  .bindPopup("MAS");

setTimeout(() => {
  map.invalidateSize();
}, 200);
