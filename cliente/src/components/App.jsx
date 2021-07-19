import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import '../styles/app.css';
import Encabezado from './Encabezado';
import MenuIzquierdo from './MenuIzquierdo';
import ContenedorPrincipal from './ContenedorPrincipal';
import Bienvenidos from './bienvenidosPaginas/Bienvenidos';

class App extends Component {
  
  
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Encabezado />
            <MenuIzquierdo/>
            <ContenedorPrincipal/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
