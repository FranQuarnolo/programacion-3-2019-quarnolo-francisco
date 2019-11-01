import axios from 'axios';
import { tiposTareas } from './types';

export const buscarTareas = () => async dispatch => {
  dispatch({ type: tiposTareas.BUSCAR_TAREAS_PENDIENTE });

  try {
    var res = await axios.get('/api/tareas');
    dispatch({ type: tiposTareas.BUSCAR_TAREAS_TERMINADA, payload: res });
  } catch (error) {
    dispatch({ type: tiposTareas.BUSCAR_TAREAS_RECHAZADA, payload: error });
  }
};

export const nuevaTarea = () => async dispatch => {
  dispatch({ type: tiposTareas.NUEVA_TAREA });
};

export const guardarTarea = tarea => async dispatch => {
  var res = await axios.post('/api/tareas', tarea);
  dispatch({ type: tiposTareas.GUARDAR_TAREA, payload: res });
};

export const buscarTareaPorId = id => async dispatch => {
  dispatch({ type: tiposTareas.BUSCAR_TAREAS_POR_ID_PENDIENTE });

  try {
    const res = await axios.get('/api/tareas/' + id);
    dispatch({
      type: tiposTareas.BUSCAR_TAREAS_POR_ID_TERMINADA,
      payload: res
    });
  } catch (error) {
    dispatch({ type: tiposTareas.BUSCAR_TAREAS_POR_ID_RECHAZADA });
  }
};

export const actualizarTarea = tarea => async dispatch => {
  const res = await axios.put(`/api/tareas/${tarea._id}`, tarea);
  return dispatch({
    type: tiposTareas.ACTUALIZAR_TAREA,
    payload: res
  });
};

export const eliminarTareas = id => async dispatch => {
  
  let res = await axios.delete(`/api/tareas/${id}`);

  if (res.status === 204) {
    res._id = id;
  }

  return dispatch({
    type: tiposTareas.ELIMINAR_TAREA,
    payload: res
  });
};