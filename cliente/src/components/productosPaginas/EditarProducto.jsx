import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { SubmissionError } from 'redux-form';
import FormularioProducto from './FormularioProducto';
import {
  buscarProductoPorId,
  actualizarProducto} from '../../actions/AccionesProductos';

class EditarProducto extends Component {
  state = {
    redirect: false
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    if (id) {
      this.props.buscarProductoPorId(id);
    }
  }

  submit = producto => {
    return this.props
      .actualizarProducto(producto)
      .then(response => this.setState({ redirect: true }))
      .catch(err => {
        throw new SubmissionError(this.props.errores);
      });
  };

  render() {
    return (
      <div>
        <h2>Editar producto</h2>
        <div>
          {this.state.redirect ? (
            <Redirect to='/productos' />
          ) : (
            <FormularioProducto
              producto={this.props.producto}
              cargando={this.props.cargando}
              onSubmit={this.submit}
            />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    producto: state.productosDs.producto,
    cargando: state.productosDs.cargando,
    errore: state.productosDs.errores
  };
}

export default connect(
  mapStateToProps,
  { buscarProductoPorId, actualizarProducto }
)(EditarProducto);
