//FRASES
const pool = require("./Database.test");
const { randomInt } = require('crypto');

const randomNumber = randomInt(15);
//console.log(randomNumber, "===============\n")

async function getRandomPhrase() {
    try {
        const rows = await new Promise((resolve, reject) => {
            pool.query('SELECT frase_text, frase_autor FROM frases WHERE frase_id = ?', [randomNumber], (err, rows,) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        if (rows.length > 0) {
            const { frase_text, frase_autor } = rows[0];
            return { frase_text, frase_autor };
        } else {
            console.log('Nenhuma frase encontrada com o ID especificado.');
            return null;
        }
    } catch (err) {
        console.error('Erro:', err);
        return null;
    }
}

async function getAndPrintRandomPhrase() {
    const data = await getRandomPhrase();
    console.log(data?.frase_text, data?.frase_autor);
    return data;
}

module.exports = { getAndPrintRandomPhrase };

// caso queira testar a função use abaixo
// getAndPrintRandomPhrase();

// Depois de escolher um nome pra função acima, quando já tiver o elemento html, só dar a função de atualizar o valor da