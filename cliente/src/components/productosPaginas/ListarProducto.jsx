import React, { Component } from 'react';
import { connect } from 'react-redux';
import { buscarProductos, eliminarProductos } from '../../actions';
import { Link } from 'react-router-dom';

class ListarProducto extends Component {
  componentWillMount() {
    this.props.buscarProductos(); 
  }

  crearFilas() {
    return this.props.listaProductos.map(producto => {
      return (
        <tr key={producto._id}>

          <td>{producto.nombre}</td>
          <td>{producto.pages}</td>
          <td>{producto.price}</td>
          <td>{producto.stock}</td>
          <td>{producto.sku}</td>
          <td>
            <Link to={`/productos/${producto._id}/ver`} className='mr-2'>
              Ver
            </Link>
            <Link to={`/productos/${producto._id}/editar`} className='mr-2'>
              Editar
            </Link>
            <a
              className='mr-2'
              href='#more'
              onClick={() => {
                if (
                  window.confirm(
                    '¿Está usted seguro que desea eliminar el producto?'
                  )
                )
                  this.props.eliminarProductos(producto._id);

              }}
            >
              Eliminar
            </a>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Listando Productos</h2>

        <p>
          <Link to='/productos/nuevo' className='btn btn-primary'>
            Nuevo
          </Link>
        </p>

        <div className='table-responsive'>
          <table className='table table-striped table-sm'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Paginas</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Sku</th>
              </tr>
            </thead>
            <tbody>{this.crearFilas()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
    listaProductos: state.productosDs.listaProductos
  };
}

const actions = {
  buscarProductos,
  eliminarProductos
};

export default connect(
  mapState,
  actions
)(ListarProducto);
