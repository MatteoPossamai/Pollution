//AJAX call to retrive data
let mymap = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 18,
	id: 'mapbox/streets-v11',
	tileSize: 512,
	zoomOffset: -1,
	zoomSnap:2
}).addTo(mymap);
	
mymap.panTo(new L.LatLng(46.16, 12.079));

const getPoint = () => {
	//AJAX call to recive all the points into the array
	const points = [[46.160498931353,12.0793326473094],[46.2257853685455,12.1180456431664]];

	points.forEach((point) =>{
		let marker = L.marker([point[0], point[1]]).addTo(mymap);
	})
}
/*
	var marker = L.marker([51.5, -0.09]).addTo(mymap);
	
	var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
	}).addTo(mymap);

	var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
	]).addTo(mymap);
	
	marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
	circle.bindPopup("I am a circle.");
	polygon.bindPopup("I am a polygon.");
	
	var popup = L.popup()
    .setLatLng([51.5, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(mymap);
	
	function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
	}

	mymap.on('click', onMapClick);
*/