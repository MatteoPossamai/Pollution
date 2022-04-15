let formL = document.getElementById("login");
let error = document.getElementById("error");

formL.addEventListener("submit", async function(e) {
	e.preventDefault();
	let username = document.getElementById("nome").value;
	let password = document.getElementById("psw").value;
	if (username === "" || password === "") {
		error.style.display = "block";
		error.innerHTML = `<p>Fullfill all the pitches</p>`
	}else{
		//API call
		let url = 'https://mad4feltre.herokuapp.com/login';

		fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}, 
			body: JSON.stringify({
				username: username,
				password: password
			}),
		})
		.then(response => response.json())
		.then(data => {
			console.log(data)
			if(data.logged === 'true'){
				//Set token in localstorage for session management
				sessionStorage.setItem('token', data.token);
				//Redirect to insert page
				window.location.href = './insert.html';
			}else{
				error.style.display = "block";
				error.innerHTML = `<p>${data.error}</p>`
			}
		})
	}
});
