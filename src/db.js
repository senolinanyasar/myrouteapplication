const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'my_aplication_db',
  password: '123515',
  port: 5432, 
});

module.exports = pool;