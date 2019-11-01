const mongoose = require('mongoose');
const { Schema } = mongoose;

const productoSchema = new Schema({
  nombre: String,
  marca: String,
  descripcion: String,
  precio: Number
});

mongoose.model('productos', productoSchema);
