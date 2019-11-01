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
        <h2>Ver Producto</h2>

        <br />

        <div className='row'>
          <div className='col-sm-2'>
            <p className='font-weight-bold text-right'>Nombre:</p>
          </div>
          <div className='col-sm-10'>{this.props.producto.nombre}</div>
        </div>

        <div className='row'>
          <div className='col-sm-2'>
            <p className='font-weight-bold text-right'>Marca:</p>
          </div>
          <div className='col-sm-10'>{this.props.producto.marca}</div>
        </div>

        <div className='row'>
          <div className='col-sm-2'>
            <p className='font-weight-bold text-right'>Descripcion:</p>
          </div>
          <div className='col-sm-10'>{this.props.producto.descripcion}</div>
        </div>

        <div className='row'>
          <div className='col-sm-2'>
            <p className='font-weight-bold text-right'>Precio:</p>
          </div>
          <div className='col-sm-10'>{this.props.producto.descripcion}</div>
        </div>
       
        <div className='row'>
          <Link className='btn btn-light mr-2' to='/productos'>
            Volver
          </Link>
          <Link
            to={`/productos/${this.id}/editar`}
            className='btn btn-secondary mr-2'
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
