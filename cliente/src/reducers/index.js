import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import reducerTareas from './ReductorTareas';

export default combineReducers({
  form: reduxForm,
  tareasDs: reducerTareas
});
