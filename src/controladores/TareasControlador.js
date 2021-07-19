const mongoose = require('mongoose');

const Tarea = mongoose.model('tareas');

module.exports = app => {
  app.get('/api/tareas', async (req, res) => {
    console.info('Obteniendo tareas');
    const tareas = await Tarea.find({});
    res.send(tareas);
  });

  app.get('/api/tareas/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const tarea = await Tarea.findById(id);

      if (tarea) {
        res.send(tarea);
      } else {
        res
          .status(404)
          .send({ mensaje: `La tarea con id '${id}' no ha sido encontrada.` });
      }
    } catch (e) {
      res.status(500).send({ mensaje: `Error en el servidor.\n\n${e}` });
    }
  });

  app.post('/api/tareas', async (req, res) => {
    const { nombre, monto, estaFinalizada } = req.body;

    const tarea = new Tarea({
      nombre,
      monto,
      estaFinalizada,
      /*fechaCreacion: new Date(),
      fechaActualizacion: new Date()*/
    });

    try {
      //objeto de mongose y puede demorar y espera hasta que termine y captura la exc
      let nuevaTarea = await tarea.save();

      res.status(201).send(nuevaTarea);
    } catch (err) {
      if (err.name === 'MongoError') {
        res.status(409).send(err.message);
      }

      res.status(500).send(err);
    }
  });

  app.put('/api/tareas/:id', async (req, res) => {
    const id = req.params.id;

    const datosTarea = req.body || {}; //objeto vacío 
    /*delete datosTarea.fechaCreacion;
    datosTarea.fechaActualizacion = new Date();*/

    try {
      let tarea = await Tarea.findByIdAndUpdate({ _id: id }, datosTarea, {
        new: true
      });

      if (!tarea) {
        res.status(404).send({
          mensaje: `Error cuando se actualizaba la tarea con id ${id}.\n\n${e}`
        });
      } else {
        res.status(200).send(tarea);
      }
    } catch (err) {
      if (err.name === 'MongoError') {
        res.status(409).send({ mensaje: err.message });
      }
      res.status(500).send({
        mensaje: `Error desconocido.\n\n Error desconocido cuando se actualizaba la tarea id='${id}'`
      });
    }
  });

  app.delete('/api/tareas/:id', async (req, res) => {
    const id = req.params.id;

    try {
      let tarea = await Tarea.findByIdAndRemove({ _id: id });

      if (!tarea) {
        return res.status(404).send({ mensaje: 'Tarea no encontrada' });
      } else {
        return res.status(204).send({ message: 'Tarea Eliminada' }); // 204 do not use content
      }
    } catch (err) {
      return res.status(500).send({
        mensaje: `Error desconocido cuando se borraba tarea con id '${id}'.`
      });
    }
  });

  app.put('/api/tareas/:id/estaFinalizada/cambiar', async (req, res) => {
    const id = req.params.id;

    const tarea = await Tarea.findOne({ _id: id });

    if (!tarea) {
      return res.status(404).send({
        mensaje: `La tarea con id ${id} no ha sido encontrada.\n\n${e}`
      });
    }

    if (tarea) {
      tarea.estaFinalizada = !tarea.estaFinalizada;
      /*tarea.fechaActualizacion = new Date();*/
      tarea.save();
      res.status(200).send(tarea);
    }
  });

  app.get('/api/tareas/consulta', async (req, res) => {
    try {
      var regExpTerm = new RegExp(req.query.consulta, 'i');
      var regExpSearch = [
        { nombre: { $regex: regExpTerm } },
        { monto: { $regex: regExpTerm } }
      ];
      const tareas = await Tarea.find({ $or: regExpSearch });

      res.status(200).send(tareas);
    } catch (e) {
      res.status(500).send({ mensaje: e });
    }
  });
};
