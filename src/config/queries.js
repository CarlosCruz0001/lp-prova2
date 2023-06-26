export const CREATE_TABLE_BTC_VALUE = `
  CREATE TABLE IF NOT EXISTS btc_value (
    id INTEGER PRIMARY KEY,
    read_time TEXT NOT NULL,
    price REAL NOT NULL
  )
`;


export const INSERT_BTC_READ = `
  INSERT INTO btc_value (read_time, price)
  VALUES (?, ?)
`;

export const SELECT_AVG_PRICE = `
  SELECT AVG(price) AS average_price
  FROM btc_value
  WHERE id >= (
    SELECT MIN(id)
    FROM btc_value
  )
`;
