import _ from 'lodash';
import moment from 'moment';

import {
  FETCH_HUDDLES_FULFILLED,
  SELECT_HUDDLE_GROUP,
  SELECT_HUDDLE
} from '../actions/types';

export default function huddleReducer(state = { huddles: null,
                                                selectedHuddleGroup: null,
                                                selectedHuddle: null }, action)  {
  switch (action.type) {
    case FETCH_HUDDLES_FULFILLED:
      return { ...state, huddles: action.payload.data };
    case SELECT_HUDDLE_GROUP:
      return { ...state, selectedHuddleGroup: action.payload,
                           selectedHuddle: action.payload ? firstHuddle(action.payload.dates) : null };
    case SELECT_HUDDLE:
      return { ...state, selectedHuddle: action.payload };
    default:
      return state;
  }
}

function firstHuddle(huddles) {
  return _.head(_.sortBy(huddles.filter((huddle) => isTodayOrAfter(huddle.datetime)), 'datetime'));
}

export function isTodayOrAfter(date) {
  let now = moment();
  return now.isSame(date, 'day') || now.isBefore(date, 'day');
}
