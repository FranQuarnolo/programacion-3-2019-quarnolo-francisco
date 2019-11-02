const mongoose = require('mongoose');

const Servicio = mongoose.model('servicios');

module.exports = app => {
  app.get('/api/servicios', async (req, res) => {
    console.info('Obteniendo servicios');
    const servicios = await Servicio.find({});
    res.send(servicios);
  });

  app.get('/api/servicios/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const servicio = await Servicio.findById(id);

      if (servicio) {
        res.send(servicio);
      } else {
        res
          .status(404)
          .send({ mensaje: `El servicio con id '${id}' no ha sido encontrado.` });
      }
    } catch (e) {
      res.status(500).send({ mensaje: `Error en el servidor.\n\n${e}` });
    }
  });

  app.post('/api/servicios', async (req, res) => {
    const { nombre, descripcion } = req.body;

    const servicio = new Servicio({
      nombre,
      descripcion
    });

    try {
      //objeto de mongose y puede demorar y espera hasta que termine y captura la exc
      let nuevoServicio = await servicio.save();

      res.status(201).send(nuevoServicio);
    } catch (err) {
      if (err.name === 'MongoError') {
        res.status(409).send(err.message);
      }

      res.status(500).send(err);
    }
  });

  app.put('/api/servicios/:id', async (req, res) => {
    const id = req.params.id;

    const datosServicio = req.body || {}; //objeto vacío 
    delete datosServicio.findByIdAndUpdate;
  

    try {
      let servicio = await Servicio.findByIdAndUpdate({ _id: id }, datosServicio, {
        new: true
      });

      if (!servicio) {
        res.status(404).send({
          mensaje: `Error cuando se actualizaba el servicio con id ${id}.\n\n${e}`
        });
      } else {
        res.status(200).send(servicio);
      }
    } catch (err) {
      if (err.name === 'MongoError') {
        res.status(409).send({ mensaje: err.message });
      }
      res.status(500).send({
        mensaje: `Error desconocido.\n\n Error desconocido cuando se actualizaba el servicio id='${id}'`
      });
    }
  });

  app.delete('/api/servicios/:id', async (req, res) => {
    const id = req.params.id;

    try {
      let servicio = await Servicio.findByIdAndRemove({ _id: id });

      if (!servicio) {
        return res.status(404).send({ mensaje: 'Servicio no encontrado' });
      } else {
        return res.status(204).send({ message: 'Servicio Eliminado' }); // 204 do not use content
      }
    } catch (err) {
      return res.status(500).send({
        mensaje: `Error desconocido cuando se borraba servicio con id '${id}'.`
      });
    }
  });
  app.get('/api/servicios/consulta', async (req, res) => {
    try {
      var regExpTerm = new RegExp(req.query.consulta, 'i');
      var regExpSearch = [
        { nombre: { $regex: regExpTerm } },
        { descripcion: { $regex: regExpTerm } }
      ];
      const servicios = await Servicio.find({ $or: regExpSearch });

      res.status(200).send(servicios);
    } catch (e) {
      res.status(500).send({ mensaje: e });
    }
  });
};