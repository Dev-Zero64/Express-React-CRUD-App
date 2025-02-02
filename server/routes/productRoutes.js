const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { product_name, product_price, product_category } = req.body;
    const result = await db.run(
      'INSERT INTO product (product_name, product_price, product_category) VALUES (?, ?, ?)',
      [product_name, product_price, product_category]
    );
    res.send({ 
      product_id: result.lastID,
      product_name, 
      product_price, 
      product_category 
    });
    console.log(`${new Date().toString()}: Product inserted: ${JSON.stringify(req.body)}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error inserting product');
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const { product_name, product_price, product_category } = req.body;
    const { id } = req.params;
    await db.run(
      'UPDATE product SET product_name = ?, product_price = ?, product_category = ? WHERE product_id = ?',
      [product_name, product_price, product_category, id]
    );
    res.send({ 
      product_id: id,
      product_name, 
      product_price, 
      product_category 
    });
    console.log(`${new Date().toString()}: Product ID ${id} updated`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating product');
  }
});

router.get('/save', async (req, res) => {
  try {
    const data = await db.all('SELECT * FROM product');
    if (data.length === 0) {
      res.status(404).send('No products available for download');
      console.log(`${new Date().toString()}: No products available for download`);
      return;
    }
    
    const columnNames = Object.keys(data[0]);
    const csvData = [
      columnNames.join(','),
      ...data.map(row => columnNames.map(col => row[col]).join(','))
    ].join('\n');
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=products.csv');
    res.send(csvData);
    console.log(`${new Date().toString()}: Data downloaded by client`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching products');
  }
});

router.get('/data', async (req, res) => {
  try {
    const data = await db.all('SELECT * FROM product');
    res.json(data);
    console.log(`${new Date().toString()}: Data sent to client`);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.delete('/delete', async (req, res) => {
  try {
    await db.run('DELETE FROM product');
    res.send('All products deleted');
    console.log(`${new Date().toString()}: All products deleted`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting all products');
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.run('DELETE FROM product WHERE product_id = ?', [id]);
    res.send(`Product with ID ${id} deleted`);
    console.log(`${new Date().toString()}: Product ID ${id} deleted`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting product');
  }
});

module.exports = router;