import React, { Component } from 'react';
import { connect } from 'react-redux';
import { buscarServicios, eliminarServicios } from '../../actions';
import { Link } from 'react-router-dom';

class ListarServicio extends Component {
  componentDidMount() {
    this.props.buscarServicios();
  }

  crearFilas() {
    return this.props.listaServicios.map(servicio => {
      return (
        <tr key={servicio._id}>
          <td>{servicio.nombre}</td>
          <td>{servicio.descripcion}</td>
          <td>
            <Link to={`/servicios/${servicio._id}/ver`} className='mr-2'>
              Ver
            </Link>
            <Link to={`/servicios/${servicio._id}/editar`} className='mr-2'>
              Editar
            </Link>
            <a
              className='mr-2'
              href='#more'
              onClick={() => {
                if (
                  window.confirm(
                    '¿Está usted seguro que desea eliminar el servicio?'
                  )
                )
                  this.props.eliminarServicios(servicio._id);
              }}
            >
              Eliminar
            </a>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Listando Servicios</h2>

        <p>
          <Link to='/servicios/nueva' className='btn btn-primary'>
            Nuevo
          </Link>
        </p>

        <div className='table-responsive'>
          <table className='table table-striped table-sm'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripcion</th>
              </tr>
            </thead>
            <tbody>{this.crearFilas()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
    listaServicios: state.serviciosDs.listaServicios
  };
}

const actions = {
  buscarServicios,
  eliminarServicios
};

export default connect(
  mapState,
  actions
)(ListarServicio);
