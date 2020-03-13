import {ADD_TO_CART, UPDATE_CART} from './types';
import _ from 'lodash';

export const addToCart = (id, quantity) => (dispatch, getState) =>
  dispatch({
    type: ADD_TO_CART,
    payload: {[id]: {quantity, ...getState().amiibos[id]}},
  });

export const updateCart = (id, quantity) => (dispatch, getState) =>
  dispatch({
    type: UPDATE_CART,
    payload: _.mapValues(getState().cart, (val, key) => ({
      ...val,
      ...getState().amiibos[key],
    })),
  });
