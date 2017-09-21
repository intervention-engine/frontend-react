import _ from 'lodash';
import moment from 'moment';
import { combineReducers } from 'redux';

import {
  REQUEST_CARE_TEAMS,
  RECEIVE_CARE_TEAMS,
  SELECT_CARE_TEAM,
  REQUEST_HUDDLES,
  RECEIVE_HUDDLES,
  SELECT_HUDDLE
} from '../actions/types';

// ------------------------- CARE TEAMS ------------------------------------ //

function careTeams(state = { isFetching: false, items: [] }, action) {
  switch(action.type) {
    case REQUEST_CARE_TEAMS:
      return Object.assign({}, state, { isFetching: true });
    case RECEIVE_CARE_TEAMS:
      return Object.assign({}, state, { isFetching: false, items: action.careTeams });
    default:
      return state;
  }
}

function selectedCareTeam(state = null, action) {
  switch(action.type) {
    case SELECT_CARE_TEAM:
      return action.careTeam;
    case RECEIVE_CARE_TEAMS:
      return action.careTeams[0];
    default:
      return state;
  }
}

// ------------------------- HUDDLES -------------------------------------- //

function huddles(state = { isFetching: false, items: [] }, action) {
  switch(action.type) {
    case REQUEST_HUDDLES:
      return Object.assign({}, state, { isFetching: true });
    case RECEIVE_HUDDLES:
      return Object.assign({}, state, { isFetching: false, items: action.huddles });
    default:
      return state;
  }
}

function huddlesByCareTeam(state = {}, action) {
  switch(action.type) {
    case RECEIVE_HUDDLES:
    case REQUEST_HUDDLES:
      return Object.assign({}, state, {
        [action.careTeam]: huddles(state[action.careTeam], action)
      })
    default:
      return state;
  }
}

function selectedHuddle(state = null, action) {
  switch(action.type) {
    case SELECT_HUDDLE:
      return action.huddle;
    case RECEIVE_HUDDLES:
      return firstHuddle(action.huddles);
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  huddlesByCareTeam,
  selectedCareTeam,
  careTeams,
  selectedHuddle
});

export default rootReducer;

function firstHuddle(huddles) {
  return _.head(_.sortBy(huddles.filter((huddle) => isTodayOrAfter(huddle.datetime)), 'datetime'));
}

export function isTodayOrAfter(date) {
  let now = moment();
  return now.isSame(date, 'day') || now.isBefore(date, 'day');
}
