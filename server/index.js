require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 8090;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
}));

app.listen(PORT, () => {
  console.log(`${new Date().toString()}: Server started on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/product', productRoutes);
app.use('/user', userRoutes);
