CREATE DATABASE campione;

CREATE TABLE tipoSito(
    id SERIAL PRIMARY KEY,
    descrizione VARCHAR(255)
);

CREATE TABLE tipoCampione(
    id SERIAL PRIMARY KEY,
    descrizione VARCHAR(255)
);
 
CREATE TABLE luogo(
    nome VARCHAR(255),
    tipo_sito INT,
    latitudine FLOAT,
    longitudine FLOAT,
    descrizione VARCHAR(1000),
    indirizzo VARCHAR(255),
    immagine1 BYTEA,
    PRIMARY KEY (nome),
    FOREIGN KEY (tipo_sito) REFERENCES tipoSito(id)
);

CREATE TABLE misurazione(
    id SERIAL PRIMARY KEY,
    nylon6 FLOAT,
    polyethylene_terephthalate FLOAT,
    polypropylene FLOAT,
    polyethylene FLOAT,
    hostasol_green FLOAT,
    phthalocyanine FLOAT,
    tipo_campione INT,
    meteo VARCHAR(255), 
    note VARCHAR(1000),
    luogo VARCHAR(255),
    immagine2 BYTEA,
    dataM DATE,
    FOREIGN KEY (luogo) REFERENCES luogo(nome),
    FOREIGN KEY (tipo_campione) REFERENCES tipoCampione(id)
);