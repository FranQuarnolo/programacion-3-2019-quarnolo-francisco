const mongoose = require('mongoose');
const { Schema } = mongoose;

const tareaSchema = new Schema({
  nombre: String,
  descripcion: String,
  estaFinalizada: Boolean,
  fechaCreacion: Date,
  fechaActualizacion: Date
});

mongoose.model('tareas', tareaSchema);