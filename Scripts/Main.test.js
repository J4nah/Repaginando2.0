import { getRandomPhrase } from './Database.test'; // Importe a função correta

async function getAndPrintRandomPhrase() {
    const data = await getRandomPhrase();
    document.getElementById('head').innerText = data.frase_text; // Atualize o texto do h1
}

getAndPrintRandomPhrase();
