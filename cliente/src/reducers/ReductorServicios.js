import { tiposServicios } from '../actions/types';

const ESTADO_INICIAL = {
  listaServicios: [],
  servicio: {},
  cargando: false,
  errores: {}
};

export default function(state = ESTADO_INICIAL, action) {
  switch (action.type) {
    case tiposServicios.BUSCAR_SERVICIOS_TERMINADA:
      return {
        ...state,
        listaServicios: action.payload.data,
        cargando: false
      };

    case tiposServicios.BUSCAR_SERVICIOS_PENDIENTE:
      return {
        ...state,
        cargando: true
      };

    case tiposServicios.BUSCAR_SERVICIOS_RECHAZADA:
      return {
        ...state,
        cargando: false
      };

    case tiposServicios.BUSCAR_SERVICIOS_POR_ID_TERMINADA: {
      return {
        ...state,
        servicio: action.payload.data,
        cargando: false
      };
    }

    case tiposServicios.BUSCAR_SERVICIOS_POR_ID_PENDIENTE: {
      return {
        ...state,
        servicio: {},
        cargando: true
      };
    }

    case tiposServicios.BUSCAR_SERVICIOS_POR_ID_RECHAZADA: {
      return {
        ...state,
        cargando: false
      };
    }

    case tiposServicios.ELIMINAR_SERVICIO: {
      const id = action.payload._id;
      return {
        ...state,
        listaServicios: state.listaServicios.filter(item => item._id !== id)
      };
    }

    default:
      return state;
  }
}