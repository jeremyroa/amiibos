import random from 'lodash/random';

import {FETCH_AMIIBOS, FETCH_AMIIBOS_TYPES} from './types';
import amiibo from '../apis/amiibo';
import {fetchTypes} from './typesActions';
import {updateCart} from './cartActions';
import Alert from '../components/Alert';

export const fetchAmiibos = () => async dispatch => {
  try {
    const {
      data: {amiibo: allAmiibos},
    } = await amiibo.get('amiibo');
    dispatch({
      type: FETCH_AMIIBOS,
      payload: allAmiibos.map(ami => ({
        ...ami,
        price: random(1, 100),
      })),
    });
  } catch (error) {}
};

export const fetchAmiibosTypes = type => async dispatch => {
  try {
    const {
      data: {amiibo: allAmiibos},
    } = await amiibo.get(`amiibo/?type=${type}`);
    await dispatch({
      type: FETCH_AMIIBOS_TYPES,
      payload: allAmiibos.map(ami => ({
        ...ami,
        price: random(1, 100),
      })),
    });
    dispatch(updateCart());
  } catch (error) {
    Alert('Error', 'An ocurred Expected');
  }
};

export const fetchInitialState = type => async (dispatch, getState) => {
  try {
    await dispatch(fetchTypes());
    const initialType = Object.keys(getState().types)[0];
    await dispatch(fetchAmiibosTypes(initialType));
  } catch (error) {
    Alert('Error', 'An ocurred Expected');
  }
};
