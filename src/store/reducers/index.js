import { combineReducers } from 'redux';
import weatherReducer from './weatherReducer';
import favoritesReducer from './favoritesReducer';

const combinedReducer = combineReducers({
  weatherReducer,
  favoritesReducer,
})

export default combinedReducer;
