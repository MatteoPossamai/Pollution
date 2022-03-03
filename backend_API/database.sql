CREATE DATABASE campione;

 
CREATE TABLE luogo(
    nome VARCHAR(255),
    tipo_sito VARCHAR(255),
    latitudine DOUBLE,
    longitudine DOUBLE,
    descrizione VARCHAR(1000),
    indirizzo VARCHAR(255),
    PRIMARY KEY (nome)
)

CREATE TABLE misurazione(
    id int
    quantità DOUBLE,
    tipo_campione VARCHAR(255),
    meteo VARCHAR(255), 
    dataM DATE,
    PRIMARY KEY (id)
)

CREATE TABLE campione(
    id VARCHAR(10),
    misurazione DATE,
    luogo VARCHAR(255),
    note VARCHAR(1000),
    PRIMARY KEY (id),
    FOREIGN KEY (misurazione) REFERENCES misurazione(id),
    FOREIGN KEY (luogo) REFERENCES luogo(nome)
)