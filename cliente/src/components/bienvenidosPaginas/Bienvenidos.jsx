import React, { Component } from 'react';
import MenuIzquierdo from '../MenuIzquierdo';
import {Form, Button} from 'react-bootstrap'
import '../../styles/login.css'
class Bienvenidos extends Component {
    
  render() {
    
    return (
      
      <div className='page'>
        
        <form>
          <div class="mb-3">
            <label>
              <p>Nombre Usuario</p>
              <input type="text"/>
            </label>
          </div>
          <div class="mb-3">
            <label>
              <p>Password</p>
              <input type="password"/>
            </label>
          </div>
          <div>
            <button type="submit">Entrar</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Bienvenidos;
