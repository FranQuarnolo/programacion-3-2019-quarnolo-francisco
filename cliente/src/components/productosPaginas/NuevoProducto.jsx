import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { SubmissionError } from 'redux-form';
import { nuevoProducto, guardarProducto} from '../../actions/AccionesProductos';
import FormularioProducto from './FormularioProducto';

class NuevoProducto extends Component {
  state = {
    redirect: false
  };

  componentDidMount() {
    this.props.nuevoProducto();
  }

  submit = producto => {
    return this.props
      .guardarProducto(producto)
      .then(response => this.setState({ redirect: true }))
      .catch(err => {
        throw new SubmissionError(this.props.errores);
      });
  };

  render() {
    return (
      <div>
        <h2>Nuevo Producto</h2>

        {this.state.redirect ? (
          <Redirect to='/productos' />
        ) : (
          <FormularioProducto producto={this.props.producto} onSubmit={this.submit} />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    producto: state.productosDs.producto,
    errores: state.productosDs.errores
  };
}

export default connect(
  mapStateToProps,
  { nuevoProducto, guardarProducto }
)(NuevoProducto);
