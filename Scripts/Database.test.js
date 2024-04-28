/* //CONNECTIONS
const { createPool } = require('mysql');

 const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '123345',
    database: 'upx',
    connectionLimit: 100,
    stringifyObjects: true
});

module.exports = pool;

 */


/////////////////////////////////////

import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise()

async function getLivro_Usuario() {
    const [rows] = await pool.query('SELECT * FROM livro_usuario;')
    return rows
}

//const instances = await getLivro_Usuario()
// console.log(instances)

export function getRandomInt(max){
    return Math.floor(Math.random() * max)
}
const randomNumber = getRandomInt(18);

export async function getRandomPhrase(id){
   //veja a diferença se mudar rows ABAIXO para [rows]
    const [rows] = await pool.query(`SELECT frase_text, frase_autor FROM frases WHERE frase_id = ?`, [randomNumber]);
    return rows;
}

const res = await getRandomPhrase(randomNumber);
console.log(res)