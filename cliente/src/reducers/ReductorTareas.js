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

    // case todosTypes.NEW_TODO : {
    //   return {
    //     ...state
    //   }
    // }

    // case todosTypes.SAVE_TODO : {
    //   return {
    //     ...state,
    //     listTodos: [...state.listTodos, action.payload.data],
    //     errors: {}
    //   }
    // }

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

    // case todosTypes.UPDATE_TODO: {
    //   const todo = action.payload.data;
    //   return {
    //     ...state,
    //     todo: TODO_INITIAL_STATE,
    //     listTodos: state.listTodos.map(item => item._id === todo._id ? todo : item)
    //   }
    // }

    // case todosTypes.DELETE_TODO: {
    //   const id = action.payload.data._id;
    //   return {
    //     ...state,
    //     listTodos: state.listTodos.filter(item => item._id !== id)
    //   }
    // }

    default:
      return state;
  }
}
