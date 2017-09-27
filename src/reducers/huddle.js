import _ from 'lodash';
import moment from 'moment';
import { combineReducers } from 'redux';

import {
  REQUEST_CARE_TEAMS,
  RECEIVE_CARE_TEAMS,
  SELECT_CARE_TEAM,
  REQUEST_HUDDLES,
  RECEIVE_HUDDLES,
  SELECT_HUDDLE,
  ADD_PATIENT_TO_HUDDLE
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
        [action.careTeam.id]: huddles(state[action.careTeam], action)
      });
    default:
      return state;
  }
}

// ------------------------- SELECT HUDDLE --------------------------------- //

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

// ------------------------- ADD PATIENT TO HUDDLE ------------------------- //

function addedPatientToHuddle(state = null, action) {
  switch(action.type) {
    case ADD_PATIENT_TO_HUDDLE:
      for (let huddle in state.huddle.huddles) {
        if (huddle.id === action.json.id) {
          // remove old huddle
          _.remove(state.huddle.huddles, (huddle) => huddle.id !== action.json.id);
          // add in huddle with new patient
          state.huddle.huddles.push(action.json);
        }
      }
      return state.huddle.huddles;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  huddlesByCareTeam,
  selectedCareTeam,
  careTeams,
  selectedHuddle,
  addedPatientToHuddle
});

export default rootReducer;

export function firstHuddle(huddles) {
  return _.head(_.sortBy(huddles.filter((huddle) => isTodayOrAfter(huddle.datetime)), 'datetime'));
}

export function isTodayOrAfter(date) {
  let now = moment();
  return now.isSame(date, 'day') || now.isBefore(date, 'day');
}
