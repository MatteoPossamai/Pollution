const id = document.getElementById('id');
const nomeS = document.getElementById('nome');
const tipo = document.getElementById('tipo');
const ny = document.getElementById('ny');
const pt = document.getElementById('pt');
const pp = document.getElementById('pp');
const plt = document.getElementById('plt');
const hg = document.getElementById('hg');
const ptl = document.getElementById('ptl');
const note = document.getElementById('note');
const ind = document.getElementById('ind');
const lat = document.getElementById('lat');
const lon = document.getElementById('lon');
const desc = document.getElementById('desc');
const dataM = document.getElementById('data');
const err = document.getElementById('error');

const getLatestMesuration = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const nome = urlParams.get("nome");
    
    return nome;
};

const getDatas = async () => {
    let xhr = new XMLHttpRequest();
    let nome = getLatestMesuration();

	xhr.open('GET', `http://localhost:5000/getmisurazione/${nome}`, true);

    xhr.onload = function(){
		if(this.status == 200){
            if(!this.responseText){
                err.innerHTML = 'Impossibile trovare tale luogo o misurazione';
            }else{
			    let data = JSON.parse(this.responseText); 
                let actual = data[0];

                id.innerHTML = `<b>Id della misurazione:</b>BL_${actual.id}`;
                nomeS.innerHTML = `<b>Nome del sito:</b>${actual.nome}`;
                tipo.innerHTML = `<b>Tipo di campione:</b>${actual.tipo_campione}`;//Convert into string
                ny.innerHTML = `Nylon 6:${actual.nylon6}`;
                pt.innerHTML = `Polyethylene terephthalate:${actual.polyethylene_terephthalate}`;
                pp.innerHTML = `Polypropylene:${actual.polypropylene}`;
                plt.innerHTML = `Polyethylene:${actual.polyethylene}`;
                hg.innerHTML = `Hostasol green:${actual.hostasol_green}`;
                ptl.innerHTML = `Phthalocyanine:${actual.phthalocyanine}`;
                note.innerHTML = `<b>Note:</b>${actual.note}`;
                ind.innerHTML = `<b>Indirizzo(se esistente):</b>${actual.indirizzo}`;
                lat.innerHTML = `<b>Latitudine:</b>${actual.latitudine}`;
                lon.innerHTML = `<b>Longitudine:</b>${actual.longitudine}`;
                desc.innerHTML = `<b>Descrizione:</b>${actual.descrizione}`;
                dataM.innerHTML = `<b>Data:</b>${actual.datam}`;
            }         
        }
	}
	xhr.send();
};