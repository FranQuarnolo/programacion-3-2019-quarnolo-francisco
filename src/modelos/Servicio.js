const mongoose = require('mongoose');
const { Schema } = mongoose;

const servicioSchema = new Schema({
  nombre: String,
  descripcion: String
});

mongoose.model('servicios', servicioSchema);
