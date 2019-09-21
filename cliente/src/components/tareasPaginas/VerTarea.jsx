import React, { Component } from 'react';
import { connect } from 'react-redux';
import { buscarTareaPorId } from '../../actions/AccionesTareas';
import { Link } from 'react-router-dom';

class VerTarea extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.id = id;
    if (id) {
      this.props.buscarTareaPorId(id);
    }
  }

  render() {
    return (
      <div>
        <h2>Ver Tarea</h2>

        <br />

        <div className='row'>
          <div className='col-sm-2'>
            <p className='font-weight-bold text-right'>Nombre:</p>
          </div>
          <div className='col-sm-10'>{this.props.tarea.nombre}</div>
        </div>

        <div className='row'>
          <div className='col-sm-2'>
            <p className='font-weight-bold text-right'>Descripcion:</p>
          </div>
          <div className='col-sm-10'>{this.props.tarea.descripcion}</div>
        </div>

        <div className='row'>
          <div className='col-sm-2'>
            <p className='font-weight-bold text-right'>Finalizada:</p>
          </div>
          <div className='col-sm-10'>
            {this.props.tarea.estaFinalizada ? 'si' : 'no'}
          </div>
        </div>

        <div className='row'>
          <div className='col-sm-2'>
            <p className='font-weight-bold text-right'>Fecha Creación:</p>
          </div>
          <div className='col-sm-10'>{this.props.tarea.fechaCreacion}</div>
        </div>

        <div className='row'>
          <div className='col-sm-2'>
            <p className='font-weight-bold text-right'>Fecha Actualización:</p>
          </div>
          <div className='col-sm-10'>{this.props.tarea.fechaActualizacion}</div>
        </div>

        <div className='row'>
          <Link className='btn btn-light mr-2' to='/tareas'>
            Volver
          </Link>
          <Link
            to={`/tareas/${this.id}/editar`}
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
    tarea: state.tareasDs.tarea
  };
}

const actions = {
  buscarTareaPorId
};

export default connect(
  mapState,
  actions
)(VerTarea);
