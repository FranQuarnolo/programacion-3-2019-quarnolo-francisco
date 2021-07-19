import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class MenuIzquierdo extends Component {
  render() {
    return (
      <nav className='col-md-2 d-none d-md-block bg-light sidebar'>
        <div className='sidebar-sticky'>
          <ul className='nav flex-column'>
            <li className='nav-item'>
              <NavLink exact={true} className='nav-link' to={'/'}>
                Inicio
              </NavLink>
            </li>

            <li className='nav-item'>
              <NavLink exact={true} className='nav-link' to={'/productos'}>
                Productos
              </NavLink>
            </li>

            <li className='nav-item'>
              <NavLink exact={true} className='nav-link' to={'/tareas'}>
                Ventas
              </NavLink>
            </li>

            <li className='nav-item'>
              <NavLink exact={true} className='nav-link' to={'/servicios'}>
                Servicios
              </NavLink>
            </li>

          </ul>
        </div>
      </nav>
    );
  }
}

export default MenuIzquierdo;
