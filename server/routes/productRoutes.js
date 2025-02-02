const express = require('express');
const db = require('../db');
const router = express.Router();

/**
 * Função utilitária para validar os dados do produto.
 * @param {Object} product - O objeto contendo os dados do produto.
 * @returns {boolean} - Retorna true se os dados forem válidos, caso contrário false.
 */
function validateProductData(product) {
  const { product_name, product_price, product_category } = product;
  if (!product_name || typeof product_name !== 'string' || product_name.trim() === '') {
    return false;
  }
  if (!product_price || isNaN(product_price) || product_price <= 0) {
    return false;
  }
  if (!product_category || typeof product_category !== 'string' || product_category.trim() === '') {
    return false;
  }
  return true;
}

/**
 * Rota para inserir um novo produto.
 */
router.post('/', async (req, res) => {
  try {
    const { product_name, product_price, product_category } = req.body;

    // Valida os dados recebidos
    if (!validateProductData(req.body)) {
      return res.status(400).send('Invalid product data');
    }

    // Insere o produto no banco de dados
    const result = await db.run(
      'INSERT INTO product (product_name, product_price, product_category) VALUES (?, ?, ?)',
      [product_name, product_price, product_category]
    );

    // Retorna o produto criado
    res.status(201).json({
      product_id: result.lastID,
      product_name,
      product_price,
      product_category,
    });

    console.log(`${new Date().toString()}: Product inserted: ${JSON.stringify(req.body)}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error inserting product');
  }
});

/**
 * Rota para atualizar um produto existente.
 */
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { product_name, product_price, product_category } = req.body;

    // Valida os dados recebidos
    if (!validateProductData(req.body)) {
      return res.status(400).send('Invalid product data');
    }

    // Atualiza o produto no banco de dados
    await db.run(
      'UPDATE product SET product_name = ?, product_price = ?, product_category = ? WHERE product_id = ?',
      [product_name, product_price, product_category, id]
    );

    // Retorna o produto atualizado
    res.json({
      product_id: id,
      product_name,
      product_price,
      product_category,
    });

    console.log(`${new Date().toString()}: Product ID ${id} updated`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating product');
  }
});

/**
 * Rota para baixar os produtos em formato CSV.
 */
router.get('/save', async (req, res) => {
  try {
    const data = await db.all('SELECT * FROM product');

    // Verifica se há produtos disponíveis
    if (data.length === 0) {
      console.log(`${new Date().toString()}: No products available for download`);
      return res.status(404).send('No products available for download');
    }

    // Gera o arquivo CSV
    const columnNames = Object.keys(data[0]);
    const csvData = [
      columnNames.join(','),
      ...data.map(row => columnNames.map(col => row[col]).join(',')),
    ].join('\n');

    // Define os cabeçalhos da resposta para download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=products.csv');
    res.send(csvData);

    console.log(`${new Date().toString()}: Data downloaded by client`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching products');
  }
});

/**
 * Rota para buscar todos os produtos.
 */
router.get('/data', async (req, res) => {
  try {
    const data = await db.all('SELECT * FROM product');
    res.json(data);
    console.log(`${new Date().toString()}: Data sent to client`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching products');
  }
});

/**
 * Rota para deletar todos os produtos.
 */
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

/**
 * Rota para deletar um produto específico pelo ID.
 */
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se o ID é válido
    if (!id || isNaN(id)) {
      return res.status(400).send('Invalid product ID');
    }

    // Deleta o produto do banco de dados
    await db.run('DELETE FROM product WHERE product_id = ?', [id]);

    res.send(`Product with ID ${id} deleted`);
    console.log(`${new Date().toString()}: Product ID ${id} deleted`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting product');
  }
});

module.exports = router;