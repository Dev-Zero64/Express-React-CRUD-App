require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

// Configuração inicial do servidor
const app = express();
const PORT = process.env.PORT || 8090;

//Middleware para logging de requisições
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

//Middleware para parsing de JSON e URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Configuração do CORS com políticas mais seguras
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:5173, http://127.0.0.1:5173'];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false,
    optionsSuccessStatus: 204,
  })
);

// Rotas da aplicação
app.get('/', (req, res) => { res.send('Hello World'); });
app.use('/product', productRoutes);
app.use('/user', userRoutes);

//Middleware para tratamento de erros global
app.use((err, req, res, next) => {
  console.error(`${new Date().toISOString()} - Error:`, err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

//Inicializa o servidor
app.listen(PORT, () => {
  console.log(`${new Date().toString()}: Server started on http://localhost:${PORT}`);
});