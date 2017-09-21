import fetch from 'isomorphic-fetch';
import Promise from 'promise';

import {
  REQUEST_CARE_TEAMS,
  RECEIVE_CARE_TEAMS,
  SELECT_CARE_TEAM,
  REQUEST_HUDDLES,
  RECEIVE_HUDDLES,
  SELECT_HUDDLE
//   ADD_PATIENT_TO_HUDDLE
} from './types';

// import huddleToFhir from '../utils/huddle_to_fhir';

// TODO: remove
let TEST_HUDDLES = [
  {
    id: '576c9bbf8bd4d4bdc2ac4189',
    date: '2017-10-02',
    care_team_id: '5927702e8bd4d41e975c0e2d',
    patients: [
      { id: '576c9bcb8bd4d4bdc2ac4197', reason: 'Risk Score Warrants Discussion', reason_type: 'RISK_SCORE', reviewed: false, reviewed_at: null },
      { id: '576c9bcc8bd4d4bdc2ac41b5', reason: 'Risk Score Warrants Discussion', reason_type: 'RISK_SCORE', reviewed: false, reviewed_at: null }
    ]
  },
  {
    id: '576c9bbf8bd4d4bdc2ac4190',
    date: '2017-10-09',
    care_team_id: '5927702e8bd4d41e975c0e2d',
    patients: [
      { id: '576c9bcb8bd4d4bdc2ac4197', reason: 'Risk Score Warrants Discussion', reason_type: 'RISK_SCORE', reviewed: false, reviewed_at: null },
      { id: '576c9bcc8bd4d4bdc2ac41b5', reason: 'Risk Score Warrants Discussion', reason_type: 'RISK_SCORE', reviewed: false, reviewed_at: null }
    ]
  },
  {
    id: '576c9bbf8bd4d4bdc2ac4191',
    date: '2017-10-03',
    care_team_id: '5927702e8bd4d41e975c0e2e',
    patients: [
      { id: '576c9bcb8bd4d4bdc2ac4197', reason: 'Risk Score Warrants Discussion', reason_type: 'RISK_SCORE', reviewed: false, reviewed_at: null },
      { id: '576c9bcc8bd4d4bdc2ac41b5', reason: 'Risk Score Warrants Discussion', reason_type: 'RISK_SCORE', reviewed: false, reviewed_at: null }
    ]
  },
  {
    id: '576c9bbf8bd4d4bdc2ac4192',
    date: '2017-10-10',
    care_team_id: '5927702e8bd4d41e975c0e2e',
    patients: [
      { id: '576c9bcb8bd4d4bdc2ac4197', reason: 'Risk Score Warrants Discussion', reason_type: 'RISK_SCORE', reviewed: false, reviewed_at: null },
      { id: '576c9bcc8bd4d4bdc2ac41b5', reason: 'Risk Score Warrants Discussion', reason_type: 'RISK_SCORE', reviewed: false, reviewed_at: null }
    ]
  }
];

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

export function fetchCareTeams() {
  return dispatch => {
    dispatch(requestCareTeams());

    return fetch(`${FHIR_SERVER}/api/care_teams`)
      .then(response => response.json(), error => console.log('An error occured.', error))
      .then(json => dispatch(receiveCareTeams(json)))
      .then(({ careTeams }) => dispatch(selectCareTeam(careTeams[0])));
  }
}

function shouldFetchCareTeams(state) {
  const careTeams = state.careTeams;
  if (!careTeams) {
    return true;
  } else if (careTeams.isFetching) {
    return false;
  }
}

export function fetchCareTeamsIfNeeded() {
  return (dispatch, getState) => { // getState lets you choose what to dispatch next
    if (shouldFetchCareTeams(getState())) {
      return dispatch(fetchCareTeams()) // dispatch a thunk from thunk
    } else {
      return Promise.resolve(); // let the calling code know there's nothing to wait for
    }
  }
}

export function selectCareTeam(careTeam) {
  return dispatch => {
    dispatch({ type: SELECT_CARE_TEAM, careTeam });
    dispatch(fetchHuddlesIfNeeded(careTeam));
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

    // const FETCH_HUDDLES_URL = `${FHIR_SERVER}/api/care_teams/${careTeam.id}/huddles`; // TODO: add block
    // return fetch(FETCH_HUDDLES_URL)
    //   .then(response => response.json(), error => console.log('An error occured.', error))
    //   .then(json => dispatch(receiveHuddles(careTeam, json)));

    let huddles = TEST_HUDDLES.filter((huddle) => huddle.care_team_id === careTeam.id); // TODO: remove block
    return Promise.resolve().then(() => dispatch(receiveHuddles(careTeam, huddles)));
  }
}

function shouldFetchHuddles(state, careTeam) {
  if (careTeam == null) {
    return false;
  }

  let huddles = state.huddle.huddlesByCareTeam[careTeam];
  console.debug('huddles: ', huddles);
  if (!huddles) {
    return true;
  } else if (huddles.isFetching) {
    return false;
  } else {
    return true;
  }
}

export function fetchHuddlesIfNeeded(careTeam) {
  return (dispatch, getState) => { // getState lets you choose what to dispatch next
    if (shouldFetchHuddles(getState(), careTeam)) {
      return dispatch(fetchHuddles(careTeam)) // dispatch a thunk from thunk
    } else {
      return Promise.resolve(); // let the calling code know there's nothing to wait for
    }
  }
}

export function selectHuddle(huddle) {
  return {
    type: SELECT_HUDDLE,
    huddle
  }
}

// export function addPatientToHuddle({ patient, huddleGroup, date, reason }) {
//   let existingHuddle = huddleGroup.dates.find((huddle) => moment(huddle.datetime).isSame(date, 'day'));
//   let patientObject = {
//     id: patient.id,
//     reason: {
//       code: 'MANUAL_ADDITION',
//       text: reason
//     }
//   };

//   let payload = huddleToFhir({
//     id: existingHuddle ? existingHuddle.id : null,
//     datetime: moment(date).format('YYYY-MM-DD'),
//     name: huddleGroup.name,
//     practioner: 'Practitioner/1',
//     patients: [patientObject].concat(existingHuddle ? existingHuddle.patients : [])
//   });

//   let method = existingHuddle ? 'put' : 'post';
//   let url = `${FHIR_SERVER}/Group${existingHuddle ? `/${payload.id}` : ''}`;

//   return {
//     type: ADD_PATIENT_TO_HUDDLE,
//     payload: axios[method](url, JSON.stringify(payload), {
//       headers: {
//         'content-type': 'application/json; charset=UTF-8'
//       }
//     })
//   };
// }
