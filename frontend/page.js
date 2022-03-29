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
const tab = document.getElementById('tab');
const but = document.getElementById('but');
const sts = document.getElementById('sts');

const tHead = ` <thead>
                    <th>ID</th>
                    <th>Nome sito</th>
                    <th>Tipo campione</th>
                    <th>Nylon 6</th>
                    <th>Polyethylene terephthalate</th>
                    <th>Polypropylene</th>
                    <th>Polyethylene</th>
                    <th>Hostasol green</th>
                    <th>Phthalocyanine</th>
                    <th>Note</th>
                    <th>Indirizzo (se esistente)</th>
                    <th>Latitudine</th>
                    <th>Longitudine</th>
                    <th>Data</th>
                    <th>Descrizione</th>
                </thead>`

tab.style.display = 'none';
let visible = false;

const getLatestMesuration = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const nome = urlParams.get("nome");
    
    return nome;
};

const getDatas = async () => {
    let xhr = new XMLHttpRequest();
    let nome = getLatestMesuration();
    err.style.display = 'block';
    err.innerHTML = `<span class="shadow"></span>
    <span class="edge"></span>
    <span class="front text">Questo luogo non esiste o non <br>sono state fatte misurazioni
    </span>`;

	xhr.open('GET', `https://mad4feltre.herokuapp.com/getmisurazione/${nome}`, true);

    xhr.onload = function(){
		if(this.status == 200){
            if(!this.responseText || this.responseText == '[]'){
                err.style.display = 'block';
                err.innerHTML = `<span class="shadow"></span>
    <span class="edge"></span>
    <span class="front text">Questo luogo non esiste o non <br>sono state fatte misurazioni
    </span>`;

            }else{
                err.style.display = 'none';
			    let data = JSON.parse(this.responseText); 
                let actual = data[0];

                id.innerHTML = `<b>Id della misurazione:</b>BL_${actual.id}`;
                nomeS.innerHTML = `<b>Nome del sito:</b>${actual.nome}`;
                tipo.innerHTML = `<b>Tipo di campione:</b>${actual.tipo_campione}`;//Convert into string
                sts.innerHTML = `<b>Rilevazioni plastica:</b>`
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
                let tBody = ``;

                data.forEach(i => {
                    tBody += `
                        <tr>
                            <td>${i.id}</td>
                            <td>${i.nome}</td>
                            <td>${i.tipo_campione}</td>
                            <td>${i.nylon6}</td>
                            <td>${i.polyethylene_terephthalate}</td>
                            <td>${i.polypropylene}</td>
                            <td>${i.polyethylene}</td>
                            <td>${i.hostasol_green}</td>
                            <td>${i.phthalocyanine}</td>
                            <td>${i.note}</td>
                            <td>${i.indirizzo}</td>
                            <td>${i.latitudine}</td>
                            <td>${i.longitudine}</td>
                            <td>${i.datam}</td>
                            <td>${i.descrizione}</td>
                        </tr>
                    `
                });
                tab.innerHTML = tHead + tBody + '<br />';
            }         
        }
	}
	xhr.send();
};

const tableV = () => {
    if(!visible){
        visible = true;
        tab.style.display = "block";
        but.innerHTML = 'Nascondi tutta la storia del sito';
    }else{
        visible = false;
        tab.style.display = "none";
        but.innerHTML = 'Visualizza tutta la storia del sito';
    }
}
