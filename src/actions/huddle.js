import axios from 'axios';
import moment from 'moment';

import {
  FETCH_HUDDLES,
  SELECT_HUDDLE_GROUP,
  SELECT_HUDDLE,
  ADD_PATIENT_TO_HUDDLE
} from './types';

import huddleToFhir from '../utils/huddle_to_fhir';

export function fetchHuddles() {
  const FETCH_HUDDLES_URL = `${FHIR_SERVER}/Group?actual=true`;
  return {
    type: FETCH_HUDDLES,
    payload: axios.get(FETCH_HUDDLES_URL)
  };
}

export function selectHuddleGroup(huddleGroup) {
  return {
    type: SELECT_HUDDLE_GROUP,
    payload: huddleGroup
  };
}

export function selectHuddle(huddle) {
  return {
    type: SELECT_HUDDLE,
    payload: huddle
  };
}

export function addPatientToHuddle({ patient, huddleGroup, date, reason }) {
  let existingHuddle = huddleGroup.dates.find((huddle) => moment(huddle.datetime).isSame(date, 'day'));
  let patientObject = {
    id: patient.id,
    reason: {
      code: 'MANUAL_ADDITION',
      text: reason
    }
  };

  let payload = huddleToFhir({
    id: existingHuddle ? existingHuddle.id : null,
    datetime: moment(date).format('YYYY-MM-DD'),
    name: huddleGroup.name,
    practioner: 'Practitioner/1',
    patients: [patientObject].concat(existingHuddle ? existingHuddle.patients : [])
  });

  let method = existingHuddle ? 'put' : 'post';
  let url = `${FHIR_SERVER}/Group${existingHuddle ? `/${payload.id}` : ''}`;

  return {
    type: ADD_PATIENT_TO_HUDDLE,
    payload: axios[method](url, JSON.stringify(payload), {
      headers: {
        'content-type': 'application/json; charset=UTF-8'
      }
    })
  };
}
