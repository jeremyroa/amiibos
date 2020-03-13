import {FETCH_TYPES} from './types';
import amiibo from '../apis/amiibo';

export const fetchTypes = () => async dispatch => {
  try {
    const {
      data: {amiibo: allTypes},
    } = await amiibo.get('type');
    dispatch({
      type: FETCH_TYPES,
      payload: allTypes,
    });
  } catch (error) {}
};
