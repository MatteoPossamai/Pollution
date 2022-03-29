//AJAX call to retrive data
let mymap = L.map('map').setView([46.16, 12.08], 9);
let points = [];

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 18,
	id: 'mapbox/streets-v11',
	tileSize: 512,
	zoomOffset: -1,
	zoomSnap:0
}).addTo(mymap);


const clicked = (e) => {	
	//Check what marker has been clicked, and then print the name
	points.forEach(point=>{
		if(point.latitudine === e.latlng.lat && point.longitudine === e.latlng.lng){
			location.replace(`./page.html?nome=${point.nome}`)
		}
	});
};


const getPoint = async () => {
	//Generate the request object
	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'https://mad4feltre.herokuapp.com/allpoints', true);

	//Gets data from the API, and puts all the positions
	xhr.onload = function(){
		//If it is succesful
		if(this.status == 200){
			points = JSON.parse(this.responseText); 
			points.forEach((point) =>{
				let marker = L.marker([point.latitudine, point.longitudine]).addTo(mymap);
				marker.on('click', clicked);
			})
		}
	}
	//Send the request and wait for responde
	xhr.send();
}
//j,6"4xk~5Wn^&2EE
//https://app.netlify.com/sites/mad4feltre/deploys
