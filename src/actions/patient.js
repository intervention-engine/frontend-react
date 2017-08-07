import axios from 'axios';
import { param } from 'jquery';

import {
  FETCH_PATIENTS,
  FETCH_PATIENT,
  SET_PATIENT_SEARCH,
  SELECT_PAGE
} from './types';

export function fetchPatients(params= {}) {
  let riskService = params.riskAssessment;
  delete params.riskAssessment; // remove from params for use in queryParams

  if (params.name == null || params.name === '') {
    delete params.name;
  }

  let PATIENT_URL = `${FHIR_SERVER}/api/patients?${param(params, true)}`;

  return {
    type: FETCH_PATIENTS,
    payload: axios.get(PATIENT_URL).then((payload) => {
      return { ...payload, riskService };
    })
  };
}

export function fetchPatient(id) {
  let PATIENT_URL = `${FHIR_SERVER}/api/patients/${id}`;

  return {
    type: FETCH_PATIENT,
    payload: axios.get(PATIENT_URL)
  };
}

export function setPatientSearch(term) {
  return {
    type: SET_PATIENT_SEARCH,
    payload: term
  };
}

export function selectPage(page) {
  return {
    type: SELECT_PAGE,
    payload: page
  };
}
