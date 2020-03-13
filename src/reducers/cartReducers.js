import _ from 'lodash';
import {
  ADD_TO_CART,
  UPDATE_CART,
  MORE_QUANTITY,
  LESS_QUANTITY,
  DELETE_ITEM,
  REDEEM_CART,
} from '../actions/types';

/*
  Structure:
  {
    [id]: {
      ...rest
    }
  }
*/
const INITIAL_STATE = {};
export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case ADD_TO_CART:
      return _({...state, ...payload})
        .toPairs()
        .sortBy(0)
        .fromPairs()
        .value();
    case UPDATE_CART:
      return payload;
    case MORE_QUANTITY:
      return _({...state, ...payload})
        .toPairs()
        .sortBy(0)
        .fromPairs()
        .value();
    case LESS_QUANTITY:
      return _({...state, ...payload})
        .toPairs()
        .sortBy(0)
        .fromPairs()
        .value();
    case DELETE_ITEM:
      return payload;
    case REDEEM_CART:
      return payload;
    default:
      return state;
  }
};
