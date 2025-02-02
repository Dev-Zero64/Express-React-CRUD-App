const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { user_name, user_password } = req.body;
    const user = await db.get('SELECT * FROM users WHERE user_name = ?', [user_name]);
    
    if (!user) {
      res.status(401).send('Invalid credentials');
      console.log(`${new Date().toString()}: Invalid credentials`);
      return;
    }

    const match = await bcrypt.compare(user_password, user.user_password);
    if (match) {
      res.send(user);
      console.log(`${new Date().toString()}: Login successful`);
    } else {
      res.status(401).send('Invalid credentials');
      console.log(`${new Date().toString()}: Invalid credentials`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error during login');
  }
});

router.post('/register', async (req, res) => {
  try {
    const { user_name, user_password } = req.body;
    const hashedPassword = await bcrypt.hash(user_password, 10);
    const result = await db.run(
      'INSERT INTO users (user_name, user_password) VALUES (?, ?)',
      [user_name, hashedPassword]
    );
    res.send({ user_id: result.lastID, user_name });
    console.log(`${new Date().toString()}: User registered: ${user_name}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error registering user');
  }
});

router.get('/data', async (req, res) => {
  try {
    const data = await db.all('SELECT user_id, user_name FROM users');
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.run('DELETE FROM users WHERE user_id = ?', [id]);
    res.send(`User with ID ${id} deleted`);
    console.log(`${new Date().toString()}: User ID ${id} deleted`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting user');
  }
});

module.exports = router;