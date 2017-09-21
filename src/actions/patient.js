import fetch from 'isomorphic-fetch';
import { param } from 'jquery';

import {
  REQUEST_PATIENTS,
  RECEIVE_PATIENTS,
  REQUEST_PATIENT,
  RECEIVE_PATIENT,
  SET_PATIENT_SEARCH,
  SELECT_PAGE
} from './types';

// ------------------------- PATIENTS -------------------------------------- //

function requestPatients(params = {}) {
  return {
    type: REQUEST_PATIENTS,
    params
  };
}

function receivePatients(patients, totalPatients) {
  return {
    type: RECEIVE_PATIENTS,
    patients,
    totalPatients
  };
}

export function fetchPatients() {
  return (dispatch, getState) => {
    let state = getState();

    let sortDir = state.sort.sortAscending ? '' : '-';
    if (state.sort.selectedSortOption.invert) { sortDir = sortDir === '' ? '-' : ''; }
    let params = {
      sort_by: `${sortDir}${state.sort.selectedSortOption.sortKey}`,
      page: state.patient.selectedPage.currentPage,
      per_page: 10
    };
    if (state.patient.patientSearch != null && state.patient.patientSearch !== '') {
      params.search_term = state.patient.patientSearch;
    }

    dispatch(requestPatients(params));

    return fetch(`${FHIR_SERVER}/api/patients?${param(params, true)}`)
      .then((response) => {
        return response.json().then((json) => {
          let total = parseInt(response.headers.get('link').match(/total=(\d+)/i)[1], 10);
          return dispatch(receivePatients(json, total));
        });
      });
  }
}

function shouldFetchPatients(state) {
  let patients = state.patient.patients;

  if (patients && patients.isFetching) {
    return false;
  } else {
    return true;
  }
}

// call this first to see if you need to fetch patients
export function fetchPatientsIfNeeded() {
  return (dispatch, getState) => {            // getState lets you choose what to dispatch next
    if (shouldFetchPatients(getState())) {
      return dispatch(fetchPatients())        // fetch patients if needed
    } else {
      return Promise.resolve();               // let the calling code know there's nothing to wait for
    }
  }
}

// ------------------------- PATIENT --------------------------------------- //

function requestPatient(params = {}) {
  return {
    type: REQUEST_PATIENT,
    params
  };
}

function receivePatient(patient) {
  return {
    type: RECEIVE_PATIENT,
    patient
  };
}

export function fetchPatient(patient) {
  return dispatch => {
    dispatch(requestPatients(patient));

    return fetch(`${FHIR_SERVER}/api/patients/${patient.id}`)
      .then(response => response.json(), error => console.log('An error occured.', error))
      .then(json => dispatch(receivePatient(json)));
  }
}

function shouldFetchPatient(state) {
  let patient = state.patient.patient;

  if (patient && patient.isFetching) {
    return false;
  } else {
    return true;
  }
}

export function fetchPatientIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchPatient(getState())) {
      return dispatch(fetchPatient())
    } else {
      return Promise.resolve();
    }
  }
}

// ------------------------- PATIENT SEARCH -------------------------------- //

export function setPatientSearch(term) {
  return (dispatch, getState) => {
    dispatch({ type: SET_PATIENT_SEARCH, term });
    return dispatch(fetchPatients());
  };
}

// ------------------------- SELECT PAGE ----------------------------------- //

export function selectPage(page) {
  return (dispatch, getState) => {
    dispatch({ type: SELECT_PAGE, page });
    return dispatch(fetchPatients());
  };
}
