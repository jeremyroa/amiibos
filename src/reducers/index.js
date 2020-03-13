import {combineReducers} from 'redux';
import amiiboReducers from './amiiboReducers';
import typesReducers from './typesReducers';
import cartReducers from './cartReducers';

export default combineReducers({
  amiibos: amiiboReducers,
  types: typesReducers,
  cart: cartReducers,
});
