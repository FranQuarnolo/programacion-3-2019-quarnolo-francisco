import axios from 'axios';
import { tiposServicios } from './types';

export const buscarServicios = () => async dispatch => {
  dispatch({ type: tiposServicios.BUSCAR_SERVICIOS_PENDIENTE});

  try {
    var res = await axios.get('/api/servicios');
    dispatch({ type: tiposServicios.BUSCAR_SERVICIOS_TERMINADA, payload: res });
  } catch (error) {
    dispatch({ type: tiposServicios.BUSCAR_SERVICIOS_RECHAZADA, payload: error });
  }
};

export const nuevoServicio = () => async dispatch => {
  dispatch({ type: tiposServicios.NUEVO_SERVICIO});
};

export const guardarServicio = servicio => async dispatch => {
  var res = await axios.post('/api/servicios', servicio);
  dispatch({ type: tiposServicios.GUARDAR_SERVICIO, payload: res });
};

export const buscarServicioPorId = id => async dispatch => {
  dispatch({ type: tiposServicios.BUSCAR_SERVICIOS_POR_ID_PENDIENTE });

  try {
    var res = await axios.get('/api/servicios/' + id);
    dispatch({
      type: tiposServicios.BUSCAR_SERVICIOS_POR_ID_TERMINADA, 
      payload: res
    });
  } catch (error) {
    dispatch({ type: tiposServicios.BUSCAR_SERVICIOS_POR_ID_RECHAZADA });
  }
};

export const actualizarServicio = servicio => async dispatch => {
  const res = await axios.put(`/api/servicios/${servicio._id}`, servicio);
  return dispatch({
    type: tiposServicios.ACTUALIZAR_SERVICIO,
    payload: res
  });
};

export const eliminarServicios = id => async dispatch => {

  let res = await axios.delete(`/api/servicios/${id}`);

  if (res.status === 204) {
    res._id = id;
  }

  return dispatch({
    type: tiposServicios.ELIMINAR_SERVICIO,
    payload: res
  });
};