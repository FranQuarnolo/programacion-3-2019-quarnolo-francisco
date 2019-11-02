import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { SubmissionError } from 'redux-form';
import FormularioServicio from './FormularioServicio';
import {
  buscarServicioPorId,
  actualizarServicio} from '../../actions/AccionesServicios';

class EditarServicio extends Component {
  state = {
    redirect: false
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    if (id) {
      this.props.buscarServicioPorId(id);
    }
  }

  submit = servicio => {
    return this.props
      .actualizarServicio(servicio)
      .then(response => this.setState({ redirect: true }))
      .catch(err => {
        throw new SubmissionError(this.props.errores);
      });
  };

  render() {
    return (
      <div>
        <h2>Editar Servicio</h2>
        <div>
          {this.state.redirect ? (
            <Redirect to='/servicios' />
          ) : (
            <FormularioServicio
              servicio={this.props.servicio}
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
    servicio: state.serviciosDs.servicio,
    cargando: state.serviciosDs.cargando,
    errore: state.serviciosDs.errores
  };
}

export default connect(
  mapStateToProps,
  { buscarServicioPorId, actualizarServicio }
)(EditarServicio);
