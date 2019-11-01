import axios from 'axios';
import { tiposProductos } from './types';

export const buscarProductos = () => async dispatch => {
  dispatch({ type: tiposProductos.BUSCAR_PRODUCTOS_PENDIENTE});

  try {
    var res = await axios.get('/api/productos');
    dispatch({ type: tiposProductos.BUSCAR_PRODUCTOS_TERMINADA, payload: res });
  } catch (error) {
    dispatch({ type: tiposProductos.BUSCAR_PRODUCTOS_RECHAZADA, payload: error });
  }
};

export const nuevoProducto = () => async dispatch => {
  dispatch({ type: tiposProductos.NUEVO_PRODUCTO});
};

export const guardarProducto = producto => async dispatch => {
  var res = await axios.post('/api/productos', producto);
  dispatch({ type: tiposProductos.GUARDAR_PRODUCTO, payload: res });
};

export const buscarProductoPorId = id => async dispatch => {
  dispatch({ type: tiposProductos.BUSCAR_PRODUCTOS_POR_ID_PENDIENTE });

  try {
    var res = await axios.get('/api/productos/' + id);
    dispatch({
      type: tiposProductos.BUSCAR_PRODUCTOS_POR_ID_TERMINADA, 
      payload: res
    });
  } catch (error) {
    dispatch({ type: tiposProductos.BUSCAR_PRODUCTOS_POR_ID_RECHAZADA });
  }
};

export const actualizarProducto = producto => async dispatch => {
  const res = await axios.put(`/api/productos/${producto._id}`, producto);
  return dispatch({
    type: tiposProductos.ACTUALIZAR_PRODUCTO,
    payload: res
  });
};

export const eliminarProductos = id => async dispatch => {

  let res = await axios.delete(`/api/productos/${id}`);

  if (res.status === 204) {
    res._id = id;
  }

  return dispatch({
    type: tiposProductos.ELIMINAR_PRODUCTO,
    payload: res
  });
};