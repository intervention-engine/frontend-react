import fetch from 'isomorphic-fetch';
import Promise from 'promise';
import { firstHuddle } from '../reducers/huddle';

import {
  REQUEST_CARE_TEAMS,
  RECEIVE_CARE_TEAMS,
  SELECT_CARE_TEAM,
  REQUEST_HUDDLES,
  RECEIVE_HUDDLES,
  SELECT_HUDDLE,
  ADD_PATIENT_TO_HUDDLE
} from './types';

// ------------------------- CARE TEAMS ------------------------------------ //

function requestCareTeams() {
  return {
    type: REQUEST_CARE_TEAMS
  };
}

function receiveCareTeams(careTeams) {
  return {
    type: RECEIVE_CARE_TEAMS,
    careTeams
  };
}

export function fetchCareTeams(careTeamId) {
  return dispatch => {
    dispatch(requestCareTeams());

    return fetch(`${FHIR_SERVER}/api/care_teams`)
      .then(response => response.json())
      .then(json => dispatch(receiveCareTeams(json)))
      .then(({ careTeams }) => {
        let careTeam = careTeamId ? careTeams.find((t) => t.id === careTeamId) : null;

        return dispatch(selectCareTeam(careTeam || careTeams[0]));
      });
  };
}

function shouldFetchCareTeams(state) {
  let careTeams = state.careTeams;

  if (!careTeams) {
    return true;
  } else if (careTeams.isFetching) {
    return false;
  }
}

export function fetchCareTeamsIfNeeded(careTeamId) {
  return (dispatch, getState) => {                  // getState lets you choose what to dispatch next
    if (shouldFetchCareTeams(getState())) {
      return dispatch(fetchCareTeams(careTeamId));  // dispatch a thunk from thunk
    } else {
      return Promise.resolve();                     // let the calling code know there's nothing to wait for
    }
  };
}

// ------------------------- SELECT CARE TEAM ------------------------------ //

export function selectCareTeam(careTeam) {
  return {
    type: SELECT_CARE_TEAM,
    careTeam
  };
}

// ------------------------- HUDDLES -------------------------------------- //

function requestHuddles(careTeam) {
  return {
    type: REQUEST_HUDDLES,
    careTeam
  };
}

function receiveHuddles(careTeam, huddles) {
  return {
    type: RECEIVE_HUDDLES,
    careTeam,
    huddles
  };
}

export function fetchHuddles(careTeam) {
  return dispatch => {
    dispatch(requestHuddles(careTeam));

    return fetch(`${FHIR_SERVER}/api/care_teams/${careTeam.id}/huddles`)
      .then((response) => {
        return response.json().then((json) => {
          dispatch(receiveHuddles(careTeam, json));
          dispatch(selectHuddle(firstHuddle(json)));
        });
      });
  };
}

function shouldFetchHuddles(state, careTeam) {
  if (careTeam == null) { return false; } // don't fetch if careTeam isn't selected

  let huddles = state.huddle.huddlesByCareTeam[careTeam.id];
  if (huddles && huddles.isFetching) {
    return false;
  } else {
    return true;
  }
}

export function fetchHuddlesIfNeeded(careTeam) {
  return (dispatch, getState) => {
    if (shouldFetchHuddles(getState(), careTeam)) {
      return dispatch(fetchHuddles(careTeam));
    } else {
      return Promise.resolve();
    }
  };
}

// ------------------------- SELECT HUDDLE --------------------------------- //

export function selectHuddle(huddle) {
  return {
    type: SELECT_HUDDLE,
    huddle
  };
}

// ------------------------- ADD PATIENT TO HUDDLE ------------------------- //

export function addPatientToHuddle(payload) {
  let { patient_id, huddle_id, reason, date, careTeam } = payload;

  return dispatch => {
    return fetch(`${FHIR_SERVER}/api/care_teams/${careTeam.id}/huddles`, {
                 method: 'post',
                 body: JSON.stringify({ patient_id, huddle_id, reason, date }),
                 headers: new Headers({ 'content-type': 'application/json; charset=utf-8' })})
      .then((response) => {
        return response.json().then((json) => {
          dispatch({ type: ADD_PATIENT_TO_HUDDLE, json });
        });
      });
  };
}
