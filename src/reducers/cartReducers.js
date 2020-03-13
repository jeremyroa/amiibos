import _ from 'lodash';
import {ADD_TO_CART, UPDATE_CART} from '../actions/types';
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
    default:
      return state;
  }
};
