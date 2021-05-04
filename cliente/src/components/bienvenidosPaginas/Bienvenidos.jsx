import React, { Component } from 'react';

class Bienvenidos extends Component {
  render() {
    return (
      <div>
        <form>
          <label>
            <p>Nombre Usuario</p>
            <input type="text"/>
          </label>
          <label>
            <p>Password</p>
            <input type="password"/>
          </label>
          <div>
            <button type="submit">Entrar</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Bienvenidos;
