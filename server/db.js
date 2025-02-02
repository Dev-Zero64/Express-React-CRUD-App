const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho para o arquivo do banco de dados
const dbPath = path.resolve(__dirname, 'database.sqlite');

// Cria uma instância do banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    throw err;
  }
  console.log('Database connected');
});

//Função para criar a tabela de produtos.
async function createProductTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS product (
      product_id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_name TEXT NOT NULL,
      product_price REAL NOT NULL,
      product_category TEXT NOT NULL
    )
  `;
  try {
    await dbAsync.run(sql);
    console.log('Product table initialized');
  } catch (err) {
    console.error('Error creating product table:', err.message);
    throw err;
  }
}

//Função para criar a tabela de usuários.
async function createUserTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_name TEXT NOT NULL UNIQUE,
      user_password TEXT NOT NULL
    )
  `;
  try {
    await dbAsync.run(sql);
    console.log('Users table initialized');
  } catch (err) {
    console.error('Error creating users table:', err.message);
    throw err;
  }
}

//Inicializa o banco de dados e cria as tabelas necessárias.
async function initializeDatabase() {
  try {
    await createProductTable();
    await createUserTable();
    console.log('Database initialization complete');
  } catch (err) {
    console.error('Database initialization failed:', err.message);
    throw err;
  }
}

// Wrapper para promises para facilitar o uso
const dbAsync = {
  /**
   * Executa uma consulta SQL que retorna múltiplas linhas.
   * @param {string} sql - A consulta SQL.
   * @param {Array} params - Os parâmetros da consulta.
   * @returns {Promise<Array>} - Uma promise que resolve com as linhas retornadas.
   */
  all: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) {
          console.error('Error executing query (all):', err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  /**
   * Executa uma consulta SQL que altera o banco de dados (INSERT, UPDATE, DELETE).
   * @param {string} sql - A consulta SQL.
   * @param {Array} params - Os parâmetros da consulta.
   * @returns {Promise<Object>} - Uma promise que resolve com informações sobre a operação.
   */
  run: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) {
          console.error('Error executing query (run):', err.message);
          reject(err);
        } else {
          resolve({ lastID: this.lastID, changes: this.changes });
        }
      });
    });
  },

  /**
   * Executa uma consulta SQL que retorna uma única linha.
   * @param {string} sql - A consulta SQL.
   * @param {Array} params - Os parâmetros da consulta.
   * @returns {Promise<Object|null>} - Uma promise que resolve com a linha retornada ou null.
   */
  get: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) {
          console.error('Error executing query (get):', err.message);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
};

// Inicializa o banco de dados ao carregar o módulo
initializeDatabase();

module.exports = dbAsync;