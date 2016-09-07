import _ from 'lodash';
import {
  FETCH_HUDDLES_RESOLVED,
  SELECT_HUDDLE
} from '../actions/types';

export default function huddleReducer(state = { huddles: [], selectedHuddle: null }, action)  {
  switch (action.type) {
    case FETCH_HUDDLES_RESOLVED:
      return { ...state, huddles: action.payload };
    case SELECT_HUDDLE:
      return { ...state, selectedHuddle: action.payload };
    default:
      return state;
  }
}
