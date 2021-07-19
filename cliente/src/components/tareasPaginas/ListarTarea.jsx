import React, { Component } from 'react';
import { connect } from 'react-redux';
import { buscarTareas, eliminarTareas } from '../../actions';
import { Link } from 'react-router-dom';

class ListarTarea extends Component {
  componentDidMount() {
    this.props.buscarTareas();
  }

  crearFilas() {
    return this.props.listaTareas.map(tarea => {
      console.log(tarea.nombre);
      return (
        
        <tr key={tarea._id}>
          <td>{tarea.nombre}</td>
          <td>{tarea.monto}</td>
          <td>{tarea.fechaCreacion}</td>
          <td>{tarea.estaFinalizada ? 'Si' : 'No'}</td>
          <td>
            <Link to={`/tareas/${tarea._id}/ver`} className='mr-2'>
              Ver
            </Link>
            <Link to={`/tareas/${tarea._id}/editar`} className='mr-2'>
              Editar
            </Link>
            <a
              className='mr-2'
              href='#more'
              onClick={() => {
                if (
                  window.confirm(
                    '¿Está usted seguro que desea eliminar la tarea?'
                  )
                )
                  this.props.eliminarTareas(tarea._id);
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
        <h2>Listando Ventas</h2>

        <p>
          <Link to='/tareas/nueva' className='btn btn-primary'>
            Nuevo
          </Link>
        </p>

        <div className='table-responsive'>
          <table className='table table-striped table-sm'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Total</th>
                <th>Fecha</th>
                <th>Finalizada</th>
                <th>Acciones</th>
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
    listaTareas: state.tareasDs.listaTareas
  };
}

const actions = {
  buscarTareas,
  eliminarTareas
};

export default connect(
  mapState,
  actions
)(ListarTarea);
