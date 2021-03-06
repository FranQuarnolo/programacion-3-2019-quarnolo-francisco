import { tiposTareas } from '../actions/types';

const ESTADO_INICIAL = {
  listaTareas: [],
  tarea: {},
  cargando: false,
  errores: {}
};

export default function(state = ESTADO_INICIAL, action) {
  switch (action.type) {
    case tiposTareas.BUSCAR_TAREAS_TERMINADA:
      return {
        ...state,
        listaTareas: action.payload.data,
        cargando: false
      };

    case tiposTareas.BUSCAR_TAREAS_PENDIENTE:
      return {
        ...state,
        cargando: true
      };

    case tiposTareas.BUSCAR_TAREAS_RECHAZADA:
      return {
        ...state,
        cargando: false
      };

    case tiposTareas.BUSCAR_TAREAS_POR_ID_TERMINADA: {
      return {
        ...state,
        tarea: action.payload.data,
        cargando: false
      };
    }

    case tiposTareas.BUSCAR_TAREAS_POR_ID_PENDIENTE: {
      return {
        ...state,
        tarea: {},
        cargando: true
      };
    }

    case tiposTareas.BUSCAR_TAREAS_POR_ID_RECHAZADA: {
      return {
        ...state,
        cargando: false
      };
    }

    case tiposTareas.ELIMINAR_TAREA: {
      const id = action.payload._id;
      return {
        ...state,
        listaTareas: state.listaTareas.filter(item => item._id !== id)
      };
    }

    default:
      return state;
  }
}