const mongoose = require('mongoose');
const { Schema } = mongoose;

const productoSchema = new Schema({
  nombre: String,
  descripcion: String,
  precio: String,
  stock: Boolean,
  codigo: String,
  marca: String,
});

mongoose.model('productos', productoSchema);
