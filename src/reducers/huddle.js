import _ from 'lodash';
import {
  FETCH_HUDDLES_RESOLVED,
  SELECT_HUDDLE,
  UNSELECT_HUDDLE
} from '../actions/types';

export default function huddleReducer(state = { huddles: [], selectedHuddles: [] }, action)  {
  switch (action.type) {
    case FETCH_HUDDLES_RESOLVED:
      return { ...state, huddles: action.payload };
    case SELECT_HUDDLE:
      let newSelectedHuddles = _.concat(state.selectedHuddles, action.payload);
      return { ...state, selectedHuddles: newSelectedHuddles };
    case UNSELECT_HUDDLE:
      let newSelectedHud = _.pull(state.selectedHuddles.slice(), action.payload);
      return { ...state, selectedHuddles: newSelectedHud };
    default:
      return state;
  }
}
