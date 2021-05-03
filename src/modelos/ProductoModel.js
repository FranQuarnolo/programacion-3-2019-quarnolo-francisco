const mongoose = require('mongoose');
const errorMensaje = require("../utilidades/errorMessage")
const { Schema } = mongoose;

const tagsSchema = new mongoose.Schema({
  name:String
})

const productSchema = new mongoose.Schema({
  //Validacion de campos de los productos
  name:
  {
      type:String,
      required: [true,errorMensaje.GENERAL.campo_obligatorio],
      minlength: [3,errorMensaje.GENERAL.minlength],
      maxlength: [32,errorMensaje.GENERAL.maxlength]
  },
  description: String,
  pages: {
      type:Number,
      required: false,
      minlength: [2,errorMensaje.GENERAL.minlength]
  },
  price: {
      type:Number,
      required: [true,errorMensaje.GENERAL.campo_obligatorio],
      minlength: [2,errorMensaje.GENERAL.minlength],
  },
  stock: {
      type:Number,
      required: [true,errorMensaje.GENERAL.campo_obligatorio],
      minlength: [1,errorMensaje.GENERAL.minlength],
      maxlength: [10,errorMensaje.GENERAL.maxlength]
  },
  sku: {
      type: String,
      required: [true,errorMensaje.GENERAL.campo_obligatorio],
      minlength: [5,errorMensaje.GENERAL.minlength]
  },
  category:{
      type:mongoose.Schema.ObjectId,
      ref:"categories"
  },
  tags:[tagsSchema]
  
})

module.exports = mongoose.model("productos", productSchema)