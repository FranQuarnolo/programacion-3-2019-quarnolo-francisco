const mongoose = require('mongoose');

const Producto = mongoose.model('productos');

module.exports = app => {
  app.get('/api/productos', async (req, res) => {
    console.info('Obteniendo productos');
    const productos = await Producto.find({});
    res.send(productos);
  });

  app.get('/api/productos/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const producto = await Producto.findById(id);

      if (producto) {
        res.send(producto);
      } else {
        res
          .status(404)
          .send({ mensaje: `El producto con id '${id}' no ha sido encontrado.` });
      }
    } catch (e) {
      res.status(500).send({ mensaje: `Error en el servidor.\n\n${e}` });
    }
  });

  app.post('/api/productos', async (req, res) => {
    const { nombre, descripcion, stock } = req.body;

    const producto = new Producto({
      nombre,
      descripcion,
      precio,
      stock,
      codigo,
      marca,
    });

    try {
      let nuevoProducto = await producto.save();

      res.status(201).send(nuevoProducto);
    } catch (err) {
      if (err.name === 'MongoError') {
        res.status(409).send(err.message);
      }

      res.status(500).send(err);
    }
  });

  /* app.put('/api/prodcutos/:id', async (req, res) => {
    const id = req.params.id;

    const datosTarea = req.body || {};
    delete datosTarea.fechaCreacion;
    datosTarea.fechaActualizacion = new Date();

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
 */
  app.delete('/api/productos/:id', async (req, res) => {
    const id = req.params.id;

    try {
      let producto = await Producto.findByIdAndRemove({ _id: id });

      if (!producto) {
        return res.status(404).send({ mensaje: 'Producto no encontrado' });
      } else {
        return res.status(204).send({ mensaje: 'Registro eliminado' }); // 204 do not use content
      }
    } catch (err) {
      return res.status(500).send({
        mensaje: `Error desconocido cuando se borraba el producto con id '${id}'.`
      });
    }
  });
 
  /*  app.put('/api/tareas/:id/estaFinalizada/cambiar', async (req, res) => {
    const id = req.params.id;

    const tarea = await Tarea.findOne({ _id: id });

    if (!tarea) {
      return res.status(404).send({
        mensaje: `La tarea con id ${id} no ha sido encontrada.\n\n${e}`
      });
    }

    if (tarea) {
      tarea.estaFinalizada = !tarea.estaFinalizada;
      tarea.fechaActualizacion = new Date();
      tarea.save();
      res.status(200).send(tarea);
    }
  }); */

  app.get('/api/producto/consulta', async (req, res) => {
    try {
      var regExpTerm = new RegExp(req.query.consulta, 'i');
      var regExpSearch = [
        { nombre: { $regex: regExpTerm } },
        { descripcion: { $regex: regExpTerm } }
      ];
      const productos = await Producto.find({ $or: regExpSearch });

      res.status(200).send(productos);
    } catch (e) {
      res.status(500).send({ mensaje: e });
    }
  });
};
