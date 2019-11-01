const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('./modelos/Tarea');
require('./modelos/Producto');


const MONGO_URI = `mongodb://localhost:27017/programacion3-2019`;
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false });

const  app = express();
app.use(bodyParser.json());

require('./controladores/TareasControlador')(app);

app.use(bodyParser.json());
require('./controladores/ProductosControlador')(app);


const PORT = 5000;
app.listen(PORT, () => console.info(`Iniciando en puerto ${PORT}`));
