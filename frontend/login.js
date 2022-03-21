let nome = document.getElementById("nome").value;
let psw = document.getElementById("psw").value;

const checkLogin = async () => {
	let xhr = new XMLHttpRequest();

	xhr.open('POST', 'http://localhost:5000/checkPassword', true);

	xhr.onload = function(){
		if(this.status == 200 && true){//check if answer is positive
			sessionStorage.setItem("logged", "true");
		}
	}
	//Send the request and wait for responde
	xhr.send([nome, psw]);//??
}