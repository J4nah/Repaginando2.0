/* import express from 'express';
import mysql from 'mysql2/promise'; // Importe o pacote MySQL2 como promise

const app = express();

app.use(express.static('Public'));

app.use((req, res) => {
     res.status(404).send(`<h1>Error 404: Resource not found</h1>`);
});

app.get('/index', async (req, res) => {
    const pool = await mysql.createPool({ // Crie o pool de conexões dentro da rota
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        connectionLimit: 100,
        stringifyObjects: true
    });
    
    const randomNumber = getRandomInt(18); // Gere um número aleatório
    const [rows] = await pool.query(`SELECT frase_text, frase_autor FROM frases WHERE frase_id = ?`, [randomNumber]); // Execute a consulta SQL

    res.send(`<h1>${rows[0].frase_text}</h1>`); // Envie a resposta com o texto da consulta
});

app.listen(3000, () => {
    console.log("App listening on port 3000");
});

function getRandomInt(max){
    return Math.floor(Math.random() * max)
}
 */

import express, { json } from 'express';
import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(json());

app.use(express.static('Public'));

app.use(cors());

const pool = createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

app.get('/frase', async (req, res) => {
  const randomNumber = Math.floor(Math.random() * 10) + 1; // substitua por sua lógica de número aleatório
  const [rows] = await pool.query(`SELECT frase_text, frase_autor FROM frases WHERE frase_id = ?`, [randomNumber]);
  res.send(rows[0]);
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
