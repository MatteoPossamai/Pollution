const campione = document.getElementById('campione');
const misurazione = document.getElementById('misurazione');  
const sito = document.getElementById('sito');
const luogo = document.getElementById('luogo');
const error = document.getElementById('error');
const success = document.getElementById('inser');

misurazione.style.display = "none";
sito.style.display = "none";
luogo.style.display = "none";

const changeActive = () =>{
    let value = document.getElementById('typesof').value;

    switch (value){
        case "campione":
            campione.style.display = "block"
            misurazione.style.display = "none";
            sito.style.display = "none";
            luogo.style.display = "none"; 
            error.style.display = "none"; 
            break;
        case "misurazione":
            campione.style.display = "none"
            misurazione.style.display = "block";
            sito.style.display = "none";
            luogo.style.display = "none"; 
            error.style.display = "none";   
            break;
        case "sito":
            campione.style.display = "none"
            misurazione.style.display = "none";
            sito.style.display = "block";
            luogo.style.display = "none"; 
            error.style.display = "none";   
            break;
        case "luogo":
            campione.style.display = "none"
            misurazione.style.display = "none";
            sito.style.display = "none";
            luogo.style.display = "block";
            error.style.display = "none";    
            break;
    }
};

campione.addEventListener('submit', (e) => {
    e.preventDefault();

    let camp = document.getElementById('camp').value;
    if(!camp){
        error.style.display = 'block';
        error.innerHTML = `<span class="shadow"></span>
        <span class="edge"></span>
        <span class="front text" id="">Un campo necessario non <br>è stato riempito adeguatamente
        </span>`; 
        success.style.display = 'none';
    }else{
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:5000/addtipocampione', true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({'descrizione': camp}));
        success.style.display = 'block';
        success.innerHTML = 'Aggiunto il nuovo campione';
        error.style.display = 'none';
    }
});

misurazione.addEventListener('submit', (e) => {
    e.preventDefault();
    //Plastics
    let ny = document.getElementById('ny').value;
    let pt = document.getElementById('pt').value;
    let pp = document.getElementById('pp').value;
    let plt = document.getElementById('plt').value;
    let hg = document.getElementById('hg').value;
    let ptl = document.getElementById('ptl').value;

    //Other parameters
    let sel1 = document.getElementById('sel1').value;
    let meteo = document.getElementById('meteo').value;
    let note = document.getElementById('note').value;
    let sel2 = document.getElementById('sel2').value;
    let data = document.getElementById('data').value;

    if(!ny || !pt || !pp || !plt || !hg || !ptl){
        error.style.display = 'block'
        error.innerHTML = 'A necessary pitch needs to be fulfilled'; 
        success.style.display = 'none';
    }else{
        let res = JSON.stringify({
            'ny':ny,
            'pt':pt,
            'pp':pp,
            'plt':plt,
            'hg':hg,
            'ptl':ptl,
            'tipocampione': sel1,
            'meteo':meteo,
            'note':note,
            'luogo':sel2,
            'dataM': data
        });
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:5000/addmisurazione', true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(res);
        success.style.display = 'block';
        success.innerHTML = 'Aggiunta la nuova misurazione';
        error.style.display = 'none';
    }
});

sito.addEventListener('submit', (e) => {
    e.preventDefault();

    let sit = document.getElementById('sit').value;
    if(!sit){
        error.style.display = 'block'
        error.innerHTML = 'A necessary pitch needs to be fulfilled'; 
        success.style.display = 'none';
    }else{
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:5000/addtiposito', true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({'descrizione':sit}));
        success.style.display = 'block';
        success.innerHTML = 'Aggiunto il nuovo sito';
        error.style.display = 'none';
    }
});

luogo.addEventListener('submit', (e) => {
    e.preventDefault();

    let nome = document.getElementById('nome').value;
    let sel3 = document.getElementById('sel3').value;
    let lat = document.getElementById('lat').value;
    let lng = document.getElementById('lng').value;
    let desc = document.getElementById('desc').value;
    let ind = document.getElementById('ind').value;
    if(!nome || !lat || !lng ){
        error.style.display = 'block'
        error.innerHTML = 'A necessary pitch needs to be fulfilled'; 
        success.style.display = 'none';
    }else{
        let res = JSON.stringify({
            'nome':nome,
            'tipostito':sel3,
            'latitudine': lat,
            'longitudine': lng,
            'descrizione': desc, 
            'indirizzo': ind
        });
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:5000/addluogo', true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(res);
        success.style.display = 'block';
        success.innerHTML = 'Aggiunto il nuovo luogo';
        error.style.display = 'none';
    }
});

let tipi_campioni = [];
let luoghi = [];
let tipi_siti = [];
const cth = `<thead>
                <th>ID</th>
                <th>Descrizione</th>
            </thead>`;
   

const getData = async () => {
    if(false){
        //if it is not logged
        window.location.assign('http://127.0.0.1:5500/login.html');
    }
	getCampioni();
    getLuoghi();  
    getSiti();
}

let getCampioni = () => {
    //Request per campioni
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://localhost:5000/getallcampioni', true);

    const clist = document.getElementById('clist');
    let tbd = '';

	xhr.onload = function(){
		if(this.status == 200){
			tipi_campioni = JSON.parse(this.responseText); 
            let sel1 = document.getElementById('sel1');
			tipi_campioni.forEach((campione) =>{
                let opt = document.createElement('option'); 
                opt.appendChild( document.createTextNode(`${campione.descrizione}`) );
                opt.value = `${campione.id}`;
                sel1.appendChild(opt); 
                //Tabella sotto
                tbd += `<tr>
                            <td>${campione.id}</td>
                            <td>${campione.descrizione}</td>
                        </tr>`
			})
            clist.innerHTML = cth + tbd;
		}
	}
	xhr.send();
}

let getLuoghi = () => {
    //Request per luoghi
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:5000/getallluoghi', true);

    const cth1 = `<thead>
                    <th>Nome</th>
                    <th>Tipo sito</th>
                    <th>Latitudine</th>
                    <th>Longitudine</th>
                    <th>Descrizione</th>
                    <th>Indirizzo</th>
                </thead>`;
    let tbd = '';
    const llist = document.getElementById('llist');

	xhr.onload = function(){
		if(this.status == 200){
			luoghi = JSON.parse(this.responseText); 
            let sel2 = document.getElementById('sel2');
			luoghi.forEach((luogo) =>{
                let opt = document.createElement('option'); 
                opt.appendChild( document.createTextNode(`${luogo.nome}`) );
                opt.value = `${luogo.nome}`;
                sel2.appendChild(opt); 
                //Table
                tbd +=  `<tr>
                            <td>${luogo.nome}</td>
                            <td>${luogo.tipo_sito}</td>
                            <td>${luogo.latitudine}</td>
                            <td>${luogo.longitudine}</td>
                            <td>${luogo.descrizione}</td>
                            <td>${luogo.indirizzo}</td>
                        </tr>`
			})
            llist.innerHTML = cth1 + tbd;
		}
	}
	xhr.send();
}

let getSiti = () => {
    //Request per siti
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:5000/getallsiti', true);

    let tbd = '';
    const slist = document.getElementById('slist');

	xhr.onload = function(){
		if(this.status == 200){
			siti = JSON.parse(this.responseText); 
            let sel3 = document.getElementById('sel3');
			siti.forEach((sito) =>{
                let opt = document.createElement('option'); 
                opt.appendChild( document.createTextNode(`${sito.descrizione}`) );
                opt.value = `${sito.id}`;
                sel3.appendChild(opt);
                //Table
                tbd += `<tr>
                            <td>${sito.id}</td>
                            <td>${sito.descrizione}</td>
                        </tr>`
			})
            slist.innerHTML = cth + tbd;
		}
	}
	xhr.send();
}