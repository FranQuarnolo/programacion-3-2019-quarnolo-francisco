import React, { Component } from 'react';
import { connect } from 'react-redux';
import { buscarProductoPorId } from '../../actions/AccionesProductos';
import { Link } from 'react-router-dom';

class VerProducto extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.id = id;
    if (id) {
      this.props.buscarProductoPorId(id);
    }
  }

  render() {
    return (
      <div>
        <h2 className='mr-2 margin-tittle-producto'>Ver Producto</h2>

        <br />
        <div className='row'>
          <div className='col-sm-2'>
            <p className='font-weight-bold text-right mr-2'>Nombre:</p>
          </div>
          <div className='col-sm-10 tbody'>{this.props.producto.nombre}</div>
        </div>
        <div className='row'>
          <div className='col-sm-2'>
            <p className='font-weight-bold text-right mr-2'>Paginas:</p>
          </div>
          <div className='col-sm-10 tbody'>{this.props.producto.pages}</div>
        </div>
        <div className='row'>
          <div className='col-sm-2'>
            <p className='font-weight-bold text-right mr-2'>Precio:</p>
          </div>
          <div className='col-sm-10 tbody'>{this.props.producto.price}</div>
        </div>
        <div className='row'>
          <div className='col-sm-2'>
            <p className='font-weight-bold text-right mr-2'>Stock:</p>
          </div>
          <div className='col-sm-10 tbody'>{this.props.producto.stock}</div>
        </div>
        <div className='row'>
          <div className='col-sm-2'>
            <p className='font-weight-bold text-right mr-2'>Sku:</p>
          </div>
          <div className='col-sm-10 tbody'>{this.props.producto.sku}</div>
        </div>
        <div className='row'>
          <Link className='btn btn-danger mr-2 margin-button-producto' to='/productos'>
            Volver
          </Link>
          <Link
            to={`/productos/${this.id}/editar`}
            className='btn btn-info mr-2'
          >
            Editar
           </Link>
          &nbsp;
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
    producto: state.productosDs.producto
  };
}

const actions = {
  buscarProductoPorId
};

export default connect(
  mapState,
  actions
)(VerProducto);
