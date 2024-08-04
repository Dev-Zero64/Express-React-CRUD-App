const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/login', (req, res) => {
  const { user_name, user_password } = req.body;
  db.query('SELECT * FROM users WHERE user_name = ?', [user_name], (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else if (data.length === 0) {
      res.status(401).send('Invalid credentials');
      console.log(`${new Date().toString()}: Invalid credentials`);
    } else {
      const user = data[0];
      bcrypt.compare(user_password, user.user_password, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error comparing passwords');
        } else if (result) {
          res.send(user);
          console.log(`${new Date().toString()}: Login successful`);
        } else {
          res.status(401).send('Invalid credentials');
          console.log(`${new Date().toString()}: Invalid credentials`);
        }
      });
    }
  });
});

router.post('/register', async (req, res) => {
  const { user_name, user_password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(user_password, 10);
    db.query('INSERT INTO users (user_name, user_password) VALUES (?, ?)',
      [user_name, hashedPassword],
      (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error registering user');
        } else {
          res.send({ user_name });
          console.log(`${new Date().toString()}: User registered: ${JSON.stringify(req.body)}`);
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send('Error registering user');
  }
});

router.get('/data', (req, res)=>{
  db.query('SELECT user_id, user_name FROM users', (err, data)=>{
    if (err){
      console.log(err)
      res.status(500).send(err)
    }
    else{
      res.json(data);
    }
  })
})

router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE user_id = ?', [id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting product');
    } else {
      res.send(`User with ID ${id} deleted`);
      console.log(`${new Date().toString()}: User ID ${id} deleted`);
    }
  });
});

module.exports = router;
