import axios from 'axios';
import { param } from 'jquery';

import {
  FETCH_PATIENTS,
  FETCH_PATIENT,
  SET_PATIENT_SEARCH,
  SELECT_PAGE,
  SELECT_PATIENT
} from './types';

export function fetchPatients(params= {}) {
  let riskAssessment = params.riskAssessment;
  delete params.riskAssessment; // remove from params for use in queryParams

  if (params.name == null || params.name === '') {
    delete params.name;
  }

  let PATIENT_URL = `${FHIR_SERVER}/Patient?${param(params, true)}`;
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

export function selectPage(page) {
  return {
    type: SELECT_PAGE,
    payload: page
  };
}

export function fetchPatient(id) {
  let PATIENT_URL = `${FHIR_SERVER}/Patient?_id=${id}&_revinclude=Encounter:patient&_revinclude=MedicationStatement:patient&_revinclude=Condition:patient&_revinclude=RiskAssessment:subject`;
  return {
    type: FETCH_PATIENT,
    payload: axios.get(PATIENT_URL)
  };
}

export function setSelectedPatient(id) {
  return {
    type: SELECT_PATIENT,
    payload: id
  };
}
