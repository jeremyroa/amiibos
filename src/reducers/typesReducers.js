import _ from 'lodash';
import {FETCH_TYPES} from '../actions/types';
/*
  Structure:
  {
    [key]: {
      ...type
    }
  }
*/
const INITIAL_STATE = {};
export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case FETCH_TYPES:
      return {...state, ..._.keyBy(payload, 'key')};
    default:
      return state;
  }
};
