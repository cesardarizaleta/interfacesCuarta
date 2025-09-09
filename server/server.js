require('dotenv').config(); // Importar dotenv al inicio
const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Configuración de CORS
// app.use(cors({
//   origin: process.env.CLIENT_URL || 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// }));

app.use(cors());

// Servir archivos estáticos de la carpeta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.ttf') || path.endsWith('.otf')) {
      res.set('Access-Control-Allow-Origin', process.env.CLIENT_URL || 'http://localhost:3000');
      res.set('Content-Type', 'font/ttf');
    }
  }
}));

require('./utils/auth');

app.use(express.json());

app.get('/api', (req, res) => {
  res.send('HOLA MUNDO')
});

app.get('/', (req, res) => {
  res.send('HOLA MUNDO, pero sin api')
});

routerApi(app);

const { logErrors, errorHandler, ormErrorHandler, boomErrorHandler} = require('./middlewares/error_handler');
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

//swaggerDocs(app, port);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
})

