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

// import express, { json } from 'express';
// import { createPool } from 'mysql2/promise';
// import dotenv from 'dotenv';
// import cors from 'cors';

const express = require('express');
const { createPool } = require('mysql2/promise');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();

const app = express();
app.use(express.json());

app.use(express.static('Public'));

app.use(cors());

const pool = createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

// frases aleatorias
app.get('/frase', async (req, res) => {
  const randomNumber = Math.floor(Math.random() * 10) + 1; // substitua por sua lógica de número aleatório
  const [rows] = await pool.query(`SELECT frase_text, frase_autor FROM frases WHERE frase_id = ?`, [randomNumber]);
  res.send(rows[0]);
});

// cadastro de usuario basic
app.post('/usuario/cadastro', async (req, res) => {
  const { nomeCompleto, email, senha } = req.body;
  try {
    const [rows] = await pool.query(`INSERT INTO usuario (Nome_usuario, Email, Senha) VALUES (?, ?, ?)`,
      [nomeCompleto, email, senha]);

    // Obter o ID do usuário inserido
    const id = rows.insertId;

    // Retornar os detalhes do usuário na resposta
    res.status(201).send({ id: id, nome: nomeCompleto, email: email, senha: senha, message: 'Usuário criado com sucesso!' });

  } catch (error) {
    res.status(500).send({ message: 'Erro ao criar usuário.' });
  }
})


// login
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const [rows] = await pool.query(`SELECT * FROM usuario WHERE Email = ? AND Senha = ?`, [email, senha]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).send({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar usuário' });
  }
});

// perfil próprio
app.post('/usuario', async (req, res) => {
  const userId = req.body.id;
  const [rows] = await pool.query(`SELECT * FROM usuario WHERE Usuario_id = ?`, [userId]);
  if (rows.length > 0) {
    res.send(rows[0]);
  } else {
    res.status(404).send({ message: 'Usuário não encontrado' });
  }
});

// generos interesse
app.post('/generos_usuario', async (req, res) => {
  const userId = req.body.id;
  const [rows] = await pool.query(`SELECT * FROM genero_usuario WHERE Usuario_id = ?`, [userId]);
  if (rows.length > 0) {
    res.send(rows);
  } else {
    res.status(404).send({ message: 'Gêneros para o usuário não encontrados' });
  }
});

// atualizar generos interesse
app.put('/atualizar_generos/:id', async (req, res) => {
  const userId = req.params.id;
  const generos = req.body.generos;

  // Primeiro, remover todos os gêneros de interesse antigos do usuário
  await pool.query(`DELETE FROM genero_usuario WHERE Usuario_id = ?`, [userId]);

  // Em seguida, adicionar os novos gêneros de interesse
  for (const generoNome of generos) {
    // Buscar o id do gênero pelo nome
    const [rows] = await pool.query(`SELECT Genero_id FROM genero WHERE Genero_nome = ?`, [generoNome]);
    if (rows.length > 0) {
      const generoId = rows[0].Genero_id;
      await pool.query(`INSERT INTO genero_usuario (Genero_id, Usuario_id) VALUES (?, ?)`, [generoId, userId]);
    } else {
      console.error(`Gênero não encontrado: ${generoNome}`);
    }
  }

  res.send({ message: 'Gêneros de interesse atualizados com sucesso' });
});

// Endpoint para cadastrar um novo livro
app.post('/cadastrar_livro', async (req, res) => {
  const { nome, anoPubli, qtdePaginas, editora, autor, generoId, estadoId } = req.body;

  if (!nome || !anoPubli || !qtdePaginas || !editora || !autor || !generoId || !estadoId) {
    return res.status(400).send({ message: 'Erro: Todos os campos são obrigatórios. Verifique se todos os campos foram preenchidos corretamente.' });
  }

  try {
    // Inserir o novo livro na tabela
    const result = await pool.query(
      `INSERT INTO livro (Nome, Ano_Publi, Qtde_Paginas, Editora, Autor, Genero_id, Estado_id) 
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nome, anoPubli, qtdePaginas, editora, autor, generoId, estadoId]
    );

    // Obter o ID do livro inserido
    const livroId = result[0].insertId;
    console.log('Livro cadastrado com sucesso. ID:', livroId);
    res.status(201).send({ message: 'Livro cadastrado com sucesso', livroId: livroId });

  } catch (error) {
    console.error('Erro ao cadastrar o livro:', error);
    res.status(500).send({ message: `Erro interno: Falha ao cadastrar o livro. Detalhes do erro: ${error.message}` });
  }
});

// Atualizar dados do usuário
app.put('/atualizar_usuario/:id', async (req, res) => {
  const userId = req.params.id;
  const { Nome_usuario, Email, Celular, Cidade, Uf, Usuario_bio } = req.body;

  // Verificar se o usuário existe antes de tentar atualizar
  const [userRows] = await pool.query(`SELECT * FROM usuario WHERE Usuario_id = ?`, [userId]);
  if (userRows.length === 0) {
    return res.status(404).send({ message: 'Usuário não encontrado' });
  }

  try {
    // Atualizar os dados do usuário no banco
    await pool.query(
      `UPDATE usuario SET Nome_usuario = ?, Email = ?, Celular = ?, Cidade = ?, Uf = ?, Usuario_bio = ? WHERE Usuario_id = ?`,
      [Nome_usuario, Email, Celular, Cidade, Uf, Usuario_bio, userId]
    );
    res.send({ message: 'Dados do usuário atualizados com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar dados do usuário:', error);
    res.status(500).send({ message: 'Erro ao atualizar dados do usuário' });
  }
});




app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
