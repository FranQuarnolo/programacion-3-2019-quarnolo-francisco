const mongoose = require('mongoose');
const { Schema } = mongoose;

const tareaSchema = new Schema({
  nombre: String,
  monto: Number,
  estaFinalizada: Boolean,
  /* fechaCreacion: Date,
  fechaActualizacion: Date */
});

mongoose.model('tareas', tareaSchema);