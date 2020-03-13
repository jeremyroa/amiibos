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
      return {...state, ...payload};
    case UPDATE_CART:
      return payload;
    case MORE_QUANTITY:
      return {...state, ...payload};
    case LESS_QUANTITY:
      return {...state, ...payload};
    case DELETE_ITEM:
      return payload;
    case REDEEM_CART:
      return payload;
    default:
      return state;
  }
};
