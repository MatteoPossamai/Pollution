const campione = document.getElementById('campione');
const misurazione = document.getElementById('misurazione');  
const sito = document.getElementById('sito');
const luogo = document.getElementById('luogo');

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
            break;
        case "misurazione":
            campione.style.display = "none"
            misurazione.style.display = "block";
            sito.style.display = "none";
            luogo.style.display = "none";   
            break;
        case "sito":
            campione.style.display = "none"
            misurazione.style.display = "none";
            sito.style.display = "block";
            luogo.style.display = "none";   
            break;
        case "luogo":
            campione.style.display = "none"
            misurazione.style.display = "none";
            sito.style.display = "none";
            luogo.style.display = "block";   
            break;
    }
};