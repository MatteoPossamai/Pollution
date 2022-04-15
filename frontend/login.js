let formL = document.getElementById("login");
let error = document.getElementById("error");

formL.addEventListener("submit", async function(e) {
	e.preventDefault();
	let username = document.getElementById("nome").value;
	let password = document.getElementById("psw").value;
	if (username == "" || password == "") {
		error.style.display = "block";
		error.innerHTML = `<p>Fullfill all the pitches</p>`
	}else{
		//API call
		console.log('API CALL')
	}
});
