import React, { Component } from 'react';
import { connect } from 'react-redux';
import { buscarProductos, eliminarProductos } from '../../actions';
import { Link } from 'react-router-dom';
import carrito from '../images/carrito.png';


class ListarProducto extends Component {
  
  componentWillMount() {
    this.props.buscarProductos();
  }
  
  constructor(props) {
    super(props);

    this.state = {
      nombre: "",
      pages: "",
      price: "",
      stock: "",
      sku: "",
    }
  }
  
  onChange(nombre,pages,price,stock,sku) {
    this.setState({ nombre: nombre })
    this.setState({ pages: pages })
    this.setState({ price: price })
    this.setState({ stock: stock })
    this.setState({ sku: sku })

  }


  crearTabla() {
    if(this.state.lleno === true){
      return(
          <tbody>
            <tr>
              <td >
                {this.state.nombre} <br/>
                {this.state.pages} <br/>
                {this.state.price} <br/>
              </td>
              <td>$ {this.state.stock}</td>
              <td>$ {this.state.sku}</td>    
            </tr>
          </tbody>
      );
    }else{
      console.log("No se pudo agregar producto");
    }
  }


  crearFilas() {
    return this.props.listaProductos.map(producto => {
      return (
        <tr key={producto._id}>
          <td>{producto.nombre}</td>
          <td>{producto.pages}</td>
          <td>$ {producto.price}</td>
          <td>{producto.stock}</td>
          <td>{producto.sku}</td>
          <td className='posicionItemTabla' >
            <Link to={`/productos/${producto._id}/ver`} className='mr-2 btn btn-outline-success'>
              Ver
            </Link>
            <Link to={`/productos/${producto._id}/editar`} className='mr-2 btn btn-outline-warning'>
              Editar
            </Link>
            <Link
              className='mr-2 btn btn-outline-danger'
              to='/productos'
              onClick={() => {
                if (
                  window.confirm(
                    '¿Está usted seguro que desea eliminar el producto?'
                  )
                )
                  this.props.eliminarProductos(producto._id);

              }}
            >
              Eliminar
            </Link>
            {/* <button className='mr-2 btn btn-outline-info' 
            onClick={() => {
              this.onChange(producto.nombre,producto.pages,producto.price,producto.stock,producto.sku);
            }} >
                {/* <img src={carrito} className='icono-carrito' alt="carrito"/> 
            </button> */}
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <h2 className='mr-2'>Listando Productos</h2>

        <p>
          <Link to='/productos/nuevo' className='btn btn-primary'>
            Nuevo
          </Link>
        </p>

        <div className='table-responsive'>
          <table className='table table-hover table-dark table-sm'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Paginas</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Sku</th>
                <th className='posicionItemTabla' >Acciones</th>
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
    listaProductos: state.productosDs.listaProductos,
    
  };
}

const actions = {
  buscarProductos,
  eliminarProductos
  
};

export default connect(
  mapState,
  actions
)(ListarProducto);