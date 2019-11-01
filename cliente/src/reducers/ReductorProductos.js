import { tiposProductos } from '../actions/types';

const ESTADO_INICIAL = {
  listaProductos: [],
  producto: {},
  cargando: false,
  errores: {}
};

export default function(state = ESTADO_INICIAL, action) {
  switch (action.type) {
    case tiposProductos.BUSCAR_PRODUCTOS_TERMINADA:
      return {
        ...state,
        listaProductos: action.payload.data,
        cargando: false
      };

    case tiposProductos.BUSCAR_PRODUCTOS_PENDIENTE:
      return {
        ...state,
        cargando: true
      };

    case tiposProductos.BUSCAR_PRODUCTOS_RECHAZADA:
      return {
        ...state,
        cargando: false
      };

    case tiposProductos.BUSCAR_PRODUCTOS_POR_ID_TERMINADA: {
      return {
        ...state,
        producto: action.payload.data,
        cargando: false
      };
    }

    case tiposProductos.BUSCAR_PRODUCTOS_POR_ID_PENDIENTE: {
      return {
        ...state,
        producto: {},
        cargando: true
      };
    }

    case tiposProductos.BUSCAR_PRODUCTOS_POR_ID_RECHAZADA: {
      return {
        ...state,
        cargando: false
      };
    }

    case tiposProductos.ELIMINAR_PRODUCTO: {
      const id = action.payload._id;
      return {
        ...state,
        listaProductos: state.listaProductos.filter(item => item._id !== id)
      };
    }

    default:
      return state;
  }
}