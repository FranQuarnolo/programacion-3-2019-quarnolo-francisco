import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Bienvenidos from './bienvenidosPaginas/Bienvenidos';
import ListarTarea from './tareasPaginas/ListarTarea';
import NuevaTarea from './tareasPaginas/NuevaTarea';
import VerTarea from './tareasPaginas/VerTarea';
import EditarTarea from './tareasPaginas/EditarTarea';

class ContenedorPrincipal extends Component {
  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <main role='main' className='col-md-9 ml-sm-auto col-lg-10 px-4'>
            <Route exact path='/' component={Bienvenidos} />
            <Route exact path='/tareas' component={ListarTarea} />
            <Route exact path='/tareas/nueva' component={NuevaTarea} />
            <Route exact path='/tareas/:id/ver' component={VerTarea} />
            <Route exact path='/tareas/:id/editar' component={EditarTarea} />
          </main>
        </div>
      </div>
    );
  }
}

export default ContenedorPrincipal;
