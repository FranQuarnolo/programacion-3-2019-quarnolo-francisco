import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { SubmissionError } from 'redux-form';
import { nuevaTarea, guardarTarea } from '../../actions/AccionesTareas';
import FormularioTarea from './FormularioTarea';

class NuevaTarea extends Component {
  state = {
    redirect: false
  };

  componentDidMount() {
    this.props.nuevaTarea();
  }

  submit = tarea => {
    return this.props
      .guardarTarea(tarea)
      .then(response => this.setState({ redirect: true }))
      .catch(err => {
        throw new SubmissionError(this.props.errores);
      });
  };

  render() {
    return (
      <div>
        <h2>Nueva Tarea</h2>

        {this.state.redirect ? (
          <Redirect to='/tareas' />
        ) : (
          <FormularioTarea tarea={this.props.tarea} onSubmit={this.submit} />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tarea: state.tareasDs.tarea,
    errores: state.tareasDs.errores
  };
}

export default connect(
  mapStateToProps,
  { nuevaTarea, guardarTarea }
)(NuevaTarea);
