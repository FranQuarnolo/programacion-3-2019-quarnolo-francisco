const mongoose = require('mongoose');

const Producto = mongoose.model('productos');

module.exports = app => {
  //Obtener todos los productos
  app.get('/api/productos', async (req, res) => {
    console.info('Obteniendo productos');
    const productos = await Producto.find({});
    res.send(productos);
  });

  //Obtener producto mediante ID
  app.get('/api/productos/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const producto = await Producto.findById(id);

      if (producto) {
        res.send(producto);
      } else {
        res
          .status(404)
          .send({ mensaje: `El producto con id '${id}' no ha sido encontrada.` });
      }
    } catch (e) {
      res.status(500).send({ mensaje: `Error en el servidor.\n\n${e}` });
    }
  });

  //Creando un nuevo producto
  app.post('/api/productos', async (req, res) => {
    const { nombre, pages, price, stock, sku, category } = req.body;

    const producto = new Producto({
      nombre,
      pages,
      price,
      stock,
      sku,
      category
    });

    try {
      //objeto de mongose y puede demorar y espera hasta que termine y captura la exc
      let nuevoProducto = await producto.save();

      res.status(201).send(nuevoProducto);
    } catch (err) {
      if (err.name === 'MongoError') {
        res.status(409).send(err.message);
      }

      res.status(500).send(err);
    }
  });

  //Actualizar producto por el id
  app.put('/api/productos/:id', async (req, res) => {
    const id = req.params.id;

    const datosProducto = req.body || {}; //objeto vacío 
    delete datosProducto.findByIdAndUpdate;
  

    try {
      let producto = await Producto.findByIdAndUpdate({ _id: id }, datosProducto, {
        new: true
      });

      if (!producto) {
        res.status(404).send({
          mensaje: `Error cuando se actualizaba el prod con id ${id}.\n\n${e}`
        });
      } else {
        res.status(200).send(producto);
      }
    } catch (err) {
      if (err.name === 'MongoError') {
        res.status(409).send({ mensaje: err.message });
      }
      res.status(500).send({
        mensaje: `Error desconocido.\n\n Error desconocido cuando se actualizaba el producto id='${id}'`
      });
    }
  });


//Borrar producto
  app.delete('/api/productos/:id', async (req, res) => {
    const id = req.params.id;

    try {
      let producto = await Producto.findByIdAndRemove({ _id: id });

      if (!producto) {
        return res.status(404).send({ mensaje: 'Producto no encontrado' });
      } else {
        return res.status(204).send({ message: 'Producto Eliminado' }); // 204 do not use content
      }
    } catch (err) {
      return res.status(500).send({
        mensaje: `Error desconocido cuando se borraba producto con id '${id}'.`
      });
    }
  });

  
  app.get('/api/productos/consulta', async (req, res) => {
    try {
      var regExpTerm = new RegExp(req.query.consulta, 'i');
      var regExpSearch = [
        { nombre: { $regex: regExpTerm } },
        { pages: { $regex: regExpTerm } },
        { price: { $regex: regExpTerm } },
        { stock: { $regex: regExpTerm } },
        { sku: { $regex: regExpTerm } },
        { category: { $regex: regExpTerm } }
      ];
      const productos = await Producto.find({ $or: regExpSearch });

      res.status(200).send(productos);
    } catch (e) {
      res.status(500).send({ mensaje: e });
    }
  });
};