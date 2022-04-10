let username = document.getElementById("nome").value;
let password = document.getElementById("psw").value;

const checkLogin = async () => {
	fetch('https://mad4feltre.herokuapp.com/logged')
	.then(res => res.json())
	.then(data => {
		if(data['logged'] == 'true'){
			location.replace(`./insert.html`)
		}
	});

	try {
		const response = await fetch('https://mad4feltre.herokuapp.com/login', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: username,
				password: password
			})
		});
		const json = await response.json();
		console.log(json);

	} catch (err) {
		console.error(err);
	}
}