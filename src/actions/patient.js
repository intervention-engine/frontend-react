import axios from 'axios';
import { param } from 'jquery';

import {
  FETCH_PATIENTS,
  SET_PATIENT_SEARCH
} from './types';

export function fetchPatients(params= {}) {
  let riskAssessment = params.riskAssessment;
  delete params.riskAssessment; // remove from params for use in queryParams

  if (params.name == null || params.name === '') {
    delete params.name;
  }

  let queryParams = { _count: 10, _offset: 0, ...params };
  let PATIENT_URL = `${FHIR_SERVER}/Patient?${param(queryParams, true)}`;
  return {
    type: FETCH_PATIENTS,
    payload: axios.get(PATIENT_URL).then((payload) => {
      return { ...payload, riskAssessment };
    })
  };
}

export function setPatientSearch(term) {
  return {
    type: SET_PATIENT_SEARCH,
    payload: term
  };
}
