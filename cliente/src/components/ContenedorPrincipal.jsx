import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Bienvenidos from './bienvenidosPaginas/Bienvenidos';

import ListarTarea from './tareasPaginas/ListarTarea';
import NuevaTarea from './tareasPaginas/NuevaTarea';
import VerTarea from './tareasPaginas/VerTarea';
import EditarTarea from './tareasPaginas/EditarTarea';

import ListarProducto from './productosPaginas/ListarProducto';
import NuevoProducto from './productosPaginas/NuevoProducto';
import VerProducto  from './productosPaginas/VerProducto';
import EditarProducto from './productosPaginas/EditarProducto';

import ListarServicio from './serviciosPaginas/ListarServicio';
import NuevoServicio from './serviciosPaginas/NuevoServicio';
import VerServicio from './serviciosPaginas/VerServicio';
import EditarServicio from './serviciosPaginas/EditarServicio';


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

            <Route exact path='/productos' component={ListarProducto} />
            <Route exact path='/productos/nuevo' component={NuevoProducto} />
            <Route exact path='/productos/:id/ver' component={VerProducto} />
            <Route exact path='/productos/:id/editar' component={EditarProducto}/>

            <Route exact path='/servicios' component={ListarServicio} />
            <Route exact path='/servicios/nuevo' component={NuevoServicio} />
            <Route exact path='/servicios/:id/ver' component={VerServicio} />
            <Route exact path='/servicios/:id/editar' component={EditarServicio}/>

          </main>
        </div>
      </div>
    );
  }
}

export default ContenedorPrincipal;
