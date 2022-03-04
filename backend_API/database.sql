CREATE DATABASE campione;

 
CREATE TABLE luogo(
    nome VARCHAR(255),
    tipo_sito VARCHAR(255),
    latitudine FLOAT,
    longitudine FLOAT,
    descrizione VARCHAR(1000),
    indirizzo VARCHAR(255),
    PRIMARY KEY (nome)
);

CREATE TABLE misurazione(
    id SERIAL PRIMARY KEY,
    quant FLOAT,
    tipo_campione VARCHAR(255),
    meteo VARCHAR(255), 
    dataM DATE
);

CREATE TABLE registrazione(
    id VARCHAR(10),
    misurazione INT,
    luogo VARCHAR(255),
    note VARCHAR(1000),
    PRIMARY KEY (id),
    FOREIGN KEY (misurazione) REFERENCES misurazione(id),
    FOREIGN KEY (luogo) REFERENCES luogo(nome)
);

#Eventuali immagini poi vanno incluse, e le date
#se si vuole aggiornare nei prossimi anni