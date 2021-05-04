const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('./modelos/TareaModel');
require('./modelos/ProductoModel');
require('./modelos/ServicioModel');



const MONGO_URI = `mongodb://localhost:27017/programacion3-2019`;
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false });

const  app = express();
app.use(bodyParser.json());

require('./controladores/TareasControlador')(app);

app.use(bodyParser.json());
require('./controladores/ProductosControlador')(app);

app.use(bodyParser.json());
require('./controladores/ServiciosControlador')(app);

const PORT = 5000;
app.listen(PORT, () => console.info(`Iniciando en puerto ${PORT}`));
//............................................................

app.set("ClaveSecreta","miclave2021")
//validar usuario
function validateUser(req,res,next){
    jwt.verify(req.headers['my-token'],req.app.get("ClaveSecreta"),function(err,decoded){
      if(err){
        res.json({message:err.message})
      }else{
        console.log(decoded)
        req.body.tokenData = decoded;
        next();
      }
    })
  }
  app.validateUser = validateUser;