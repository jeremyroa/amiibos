import {
  ADD_TO_CART,
  UPDATE_CART,
  MORE_QUANTITY,
  LESS_QUANTITY,
  DELETE_ITEM,
  REDEEM_CART,
} from './types';
import _ from 'lodash';

export const addToCart = (id, quantity) => (dispatch, getState) =>
  dispatch({
    type: ADD_TO_CART,
    payload: {[id]: {quantity, ...getState().amiibos[id]}},
  });

export const updateCart = () => (dispatch, getState) =>
  dispatch({
    type: UPDATE_CART,
    payload: _.mapValues(getState().cart, (val, key) => ({
      ...val,
      ...getState().amiibos[key],
    })),
  });

export const moreQuantity = id => (dispatch, getState) =>
  dispatch({
    type: MORE_QUANTITY,
    payload: {
      [id]: {
        ...getState().cart[id],
        quantity: getState().cart[id].quantity + 1,
      },
    },
  });

export const lessQuantity = id => (dispatch, getState) => {
  const currentQuantity =
    getState().cart[id].quantity - 1 === 0
      ? 1
      : getState().cart[id].quantity - 1;

  dispatch({
    type: LESS_QUANTITY,
    payload: {[id]: {...getState().cart[id], quantity: currentQuantity}},
  });
};

export const deleteItem = id => (dispatch, getState) => {
  const _deleteItem = ({[id]: deleted, ...rest}) => rest;

  dispatch({
    type: DELETE_ITEM,
    payload: _deleteItem(getState().cart),
  });
};

export const redeemCart = () => ({
  type: REDEEM_CART,
  payload: {},
});
