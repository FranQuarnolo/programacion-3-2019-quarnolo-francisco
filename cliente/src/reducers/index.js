import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import reducerTareas from './ReductorTareas';
import reducerProductos from './ReductorProductos';
import reducerServicios from './ReductorServicios';


export default combineReducers({
  form: reduxForm,
  tareasDs: reducerTareas,
  productosDs: reducerProductos,
  serviciosDs: reducerServicios,

});
