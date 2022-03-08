//AJAX call to retrive data
let mymap = L.map('map').setView([46.16, 12.08], 9);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 18,
	id: 'mapbox/streets-v11',
	tileSize: 512,
	zoomOffset: -1,
	zoomSnap:0
}).addTo(mymap);

const getPoint = async () => {
	//Generate the request object
	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'http://localhost:5000/allpoints', true);

	xhr.onload = function(){
		//If it is succesful
		if(this.status == 200){
			console.log(this.responseText)
			let points = JSON.parse(this.responseText); 
			points.forEach((point) =>{
				console.log(point)
				let marker = L.marker([point.latitudine, point.longitudine]).addTo(mymap);
			})
		}
	}
	//Send the request and wait for responde
	xhr.send();
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