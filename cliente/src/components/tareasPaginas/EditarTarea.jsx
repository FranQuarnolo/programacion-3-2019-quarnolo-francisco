import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { SubmissionError } from 'redux-form';
import FormularioTarea from './FormularioTarea';
import {
  buscarTareaPorId,
  actualizarTarea
} from '../../actions/AccionesTareas';

class EditarTarea extends Component {
  state = {
    redirect: false
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    if (id) {
      this.props.buscarTareaPorId(id);
    }
  }

  submit = tarea => {
    return this.props
      .actualizarTarea(tarea)
      .then(response => this.setState({ redirect: true }))
      .catch(err => {
        throw new SubmissionError(this.props.errores);
      });
  };

  render() {
    return (
      <div>
        <h2>Editar tarea</h2>
        <div>
          {this.state.redirect ? (
            <Redirect to='/tareas' />
          ) : (
            <FormularioTarea
              tarea={this.props.tarea}
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
    tarea: state.tareasDs.tarea,
    cargando: state.tareasDs.cargando,
    errore: state.tareasDs.errores
  };
}

export default connect(
  mapStateToProps,
  { buscarTareaPorId, actualizarTarea }
)(EditarTarea);
