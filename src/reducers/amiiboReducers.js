import _ from 'lodash';
import {FETCH_AMIIBOS, FETCH_AMIIBOS_TYPES} from '../actions/types';
/*
  Structure:
  {
    [head + tail]: {
      ...amiibo
    }
  }
*/
const INITIAL_STATE = {};
export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case FETCH_AMIIBOS:
      return {...state, ..._.keyBy(payload, ({head, tail}) => head + tail)};
    case FETCH_AMIIBOS_TYPES:
      return {..._.keyBy(payload, ({head, tail}) => head + tail)};
    default:
      return state;
  }
};
