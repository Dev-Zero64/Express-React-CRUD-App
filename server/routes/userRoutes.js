const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
const router = express.Router();

/**
 * Função utilitária para validar os dados do usuário.
 * @param {Object} user - O objeto contendo os dados do usuário.
 * @returns {boolean} - Retorna true se os dados forem válidos, caso contrário false.
 */
function validateUserData(user) {
  const { user_name, user_password } = user;
  if (!user_name || typeof user_name !== 'string' || user_name.trim() === '') {
    return false;
  }
  if (!user_password || typeof user_password !== 'string' || user_password.trim() === '') {
    return false;
  }
  return true;
}

/**
 * Rota para login de usuário.
 */
router.post('/login', async (req, res) => {
  try {
    const { user_name, user_password } = req.body;

    // Valida os dados recebidos
    if (!validateUserData(req.body)) {
      return res.status(400).send('Invalid user data');
    }

    // Busca o usuário no banco de dados
    const user = await db.get('SELECT * FROM users WHERE user_name = ?', [user_name]);

    if (!user) {
      console.log(`${new Date().toString()}: Invalid credentials for user: ${user_name}`);
      return res.status(401).send('Invalid credentials');
    }

    // Compara a senha fornecida com a senha armazenada (criptografada)
    const match = await bcrypt.compare(user_password, user.user_password);
    if (match) {
      // Retorna apenas os dados necessários (não inclui a senha)
      res.json({ user_id: user.user_id, user_name: user.user_name });
      console.log(`${new Date().toString()}: Login successful for user: ${user_name}`);
    } else {
      console.log(`${new Date().toString()}: Invalid credentials for user: ${user_name}`);
      res.status(401).send('Invalid credentials');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error during login');
  }
});

/**
 * Rota para registrar um novo usuário.
 */
router.post('/register', async (req, res) => {
  try {
    const { user_name, user_password } = req.body;

    // Valida os dados recebidos
    if (!validateUserData(req.body)) {
      return res.status(400).send('Invalid user data');
    }

    // Verifica se o nome de usuário já existe
    const existingUser = await db.get('SELECT * FROM users WHERE user_name = ?', [user_name]);
    if (existingUser) {
      console.log(`${new Date().toString()}: Username already exists: ${user_name}`);
      return res.status(409).send('Username already exists');
    }

    // Criptografa a senha antes de salvar no banco de dados
    const hashedPassword = await bcrypt.hash(user_password, 10);

    // Insere o novo usuário no banco de dados
    const result = await db.run(
      'INSERT INTO users (user_name, user_password) VALUES (?, ?)',
      [user_name, hashedPassword]
    );

    // Retorna o usuário criado (sem a senha)
    res.status(201).json({
      user_id: result.lastID,
      user_name,
    });

    console.log(`${new Date().toString()}: User registered: ${user_name}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error registering user');
  }
});

/**
 * Rota para buscar todos os usuários (apenas IDs e nomes).
 */
router.get('/data', async (req, res) => {
  try {
    const data = await db.all('SELECT user_id, user_name FROM users');
    res.json(data);
    console.log(`${new Date().toString()}: User data sent to client`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching users');
  }
});

/**
 * Rota para deletar um usuário pelo ID.
 */
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Valida o ID recebido
    if (!id || isNaN(id)) {
      return res.status(400).send('Invalid user ID');
    }

    // Deleta o usuário do banco de dados
    await db.run('DELETE FROM users WHERE user_id = ?', [id]);

    res.send(`User with ID ${id} deleted`);
    console.log(`${new Date().toString()}: User ID ${id} deleted`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting user');
  }
});

module.exports = router;