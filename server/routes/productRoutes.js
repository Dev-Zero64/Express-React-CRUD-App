const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/', (req, res) => {
  const { product_name, product_price, product_category } = req.body;
  db.query('INSERT INTO product (product_name, product_price, product_category) VALUES (?, ?, ?)',
    [product_name, product_price, product_category],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error inserting product');
      } else {
        res.send({ product_name, product_price, product_category });
        console.log(`${new Date().toString()}: Product inserted: ${JSON.stringify(req.body)}`);
      }
    }
  );
});

router.put('/update/:id', (req, res) => {
  const { product_name, product_price, product_category } = req.body;
  const { id } = req.params;
  db.query(
    'UPDATE product SET product_name = ?, product_price = ?, product_category = ? WHERE product_id = ?',
    [product_name, product_price, product_category, id],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error updating product');
      } else {
        res.send({ product_name, product_price, product_category, product_id: id });
        console.log(`${new Date().toString()}: Product with ID ${id} updated successfully`);
      }
    }
  );
});

router.get('/save', (req, res) => {
  db.query('SELECT * FROM product', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching products');
    } else if (data.length === 0) {
      res.status(404).send('No products available for download');
      console.log(`${new Date().toString()}: No products available for download`);
    } else {
      const columnNames = Object.keys(data[0]);
      const csvData = [
        columnNames.join(','),
        ...data.map(row => columnNames.map(columnName => row[columnName]).join(','))
      ].join('\n');
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=products.csv');
      res.send(csvData);
      console.log(`${new Date().toString()}: Data downloaded by client`);
    }
  });
});

router.get('/data', (req, res) => {
  db.query('SELECT * FROM product', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.json(data);
      console.log(`${new Date().toString()}: Data sent to client`);
    }
  });
});

router.delete('/delete', (req, res) => {
  db.query('DELETE FROM product', (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting all products');
    } else {
      res.send('All products deleted');
      console.log(`${new Date().toString()}: All products deleted`);
    }
  });
});

router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM product WHERE product_id = ?', [id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting product');
    } else {
      res.send(`Product with ID ${id} deleted`);
      console.log(`${new Date().toString()}: Product with ID ${id} deleted`);
    }
  });
});

module.exports = router;
