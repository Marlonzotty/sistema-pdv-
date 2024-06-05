import { combineReducers } from 'redux';
// Aqui você pode adicionar seus reducers
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  // Adicione outros reducers aqui
});

export default rootReducer;
