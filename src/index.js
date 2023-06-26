import { coinEmitter } from './emitters/coin_emitter.js'
import sqlite3 from 'sqlite3';

console.log('Iniciando leituras...');

const moneyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'usd',
});

const db = new sqlite3.Database('database.db');

db.run(`CREATE TABLE IF NOT EXISTS btc_value (price REAL)`);

coinEmitter.on('btc_read', (price) => {
  const time = new Date().toISOString();
  const formattedPrice = moneyFormatter.format(price);
  console.log(`Preço do Bitcoin em ${time} -> U$ ${formattedPrice}`);

  db.run('INSERT INTO btc_value (price) VALUES (?)', price);

  db.get('SELECT AVG(price) AS average_price FROM btc_value', (err, row) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
    } else {
      const averagePrice = row.average_price;
      const formattedAveragePrice = moneyFormatter.format(averagePrice);
      console.log(`Valor médio do Bitcoin desde a primeira leitura -> U$ ${formattedAveragePrice}`);
    }
  });
});

process.on('exit', () => {
  db.close();
});
