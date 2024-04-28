import { getAndPrintRandomPhrase } from './Frases';
import pool from './Database';

async function main() {
    await getAndPrintRandomPhrase();
}

main();
