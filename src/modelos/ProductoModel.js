const mongoose = require('mongoose');
const errorMensaje = require("../utilidades/errorMessage")
const { Schema } = mongoose;

const productSchema = new Schema({
  //Validacion de campos de los productos
  nombre: String,
  pages: Number,
  price: Number,
  stock: Number,
  sku: String,
  category:String
})

mongoose.model('productos', productSchema);