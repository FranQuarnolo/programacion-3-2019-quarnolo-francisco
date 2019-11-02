import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { SubmissionError } from 'redux-form';
import { nuevoServicio, guardarServicio } from '../../actions/AccionesServicios';
import FormularioServicio from './FormularioServicio';

class NuevoServicio extends Component {
  state = {
    redirect: false
  };

  componentDidMount() {
    this.props.nuevoServicio();
  }

  submit = servicio => {
    return this.props
      .guardarServicio(servicio)
      .then(response => this.setState({ redirect: true }))
      .catch(err => {
        throw new SubmissionError(this.props.errores);
      });
  };

  render() {
    return (
      <div>
        <h2>Nuevo Servicio</h2>

        {this.state.redirect ? (
          <Redirect to='/servicios' />
        ) : (
          <FormularioServicio servicio={this.props.servicio} onSubmit={this.submit} />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    servicio: state.serviciosDs.servicio,
    errores: state.serviciosDs.errores
  };
}

export default connect(
  mapStateToProps,
  { nuevoServicio, guardarServicio }
)(NuevoServicio);
