import React, { Component } from 'react';
import { connect } from 'react-redux';
import { buscarServicioPorId } from '../../actions/AccionesServicios';
import { Link } from 'react-router-dom';

class VerServicio extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.id = id;
    if (id) {
      this.props.buscarServicioPorId(id);
    }
  }

  render() {
    return (
      <div>
        <h2>Ver Servicio</h2>

        <br />

        <div className='row'>
          <div className='col-sm-2'>
            <p className='font-weight-bold text-right'>Nombre:</p>
          </div>
          <div className='col-sm-10'>{this.props.servicio.nombre}</div>
        </div>

        <div className='row'>
          <div className='col-sm-2'>
            <p className='font-weight-bold text-right'>Descripcion:</p>
          </div>
          <div className='col-sm-10'>{this.props.servicio.descripcion}</div>
        </div>

        <div className='row'>
          <Link className='btn btn-light mr-2' to='/servicios'>
            Volver
          </Link>
          <Link
            to={`/servicios/${this.id}/editar`}
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
    servicio: state.serviciosDs.servicio
  };
}

const actions = {
  buscarServicioPorId
};

export default connect(
  mapState,
  actions
)(VerServicio);
