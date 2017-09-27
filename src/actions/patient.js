import fetch from 'isomorphic-fetch';
import param from '../utils/param';

import { fetchCareTeamsIfNeeded, fetchHuddlesIfNeeded, selectHuddle, selectCareTeam } from './huddle';
import { fetchRiskServicesIfNeeded, selectRiskService } from './risk_service';
import { fetchRiskAssessmentsIfNeeded, fetchRiskBreakdownIfNeeded } from './risk_assessment';

import {
  REQUEST_PATIENTS,
  RECEIVE_PATIENTS,
  REQUEST_PATIENT,
  RECEIVE_PATIENT,
  SET_PATIENT_SEARCH,
  SELECT_PAGE
} from './types';

// ------------------------- PATIENTS -------------------------------------- //

export function loadPatients() {
  return (dispatch, getState) => {
    dispatch(fetchRiskServicesIfNeeded());

    return dispatch(fetchCareTeamsIfNeeded()).then(() => {
      return dispatch(fetchHuddlesIfNeeded(getState().huddle.selectedCareTeam)).then(() => {
        dispatch(fetchPatientsIfNeeded());
      });
    });
  };
}

export function filterPatientsByHuddle(huddle) {
  return (dispatch) => {
    dispatch(selectHuddle(huddle));
    dispatch(fetchPatientsIfNeeded());
  };
}

export function filterPatientsByFirstHuddle(careTeam) {
  return (dispatch) => {
    dispatch(selectCareTeam(careTeam));
    return dispatch(fetchHuddlesIfNeeded(careTeam)).then(() => dispatch(fetchPatientsIfNeeded()));
  };
}

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

    // filter by selected care team if huddle not selected
    if (state.huddle.selectedCareTeam != null && state.huddle.selectedHuddle == null) {
      params.care_team_id = state.huddle.selectedCareTeam.id;
    }

    // filter by selected huddle
    if (state.huddle.selectedHuddle != null) {
      if (params.care_team_id) { delete params.care_team_id; }
      params.huddle_id = state.huddle.selectedHuddle.id;
    }

    // filter by search term
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
  };
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
      return dispatch(fetchPatients());       // fetch patients if needed
    } else {
      return Promise.resolve();               // let the calling code know there's nothing to wait for
    }
  };
}

// ------------------------- PATIENT --------------------------------------- //

export function loadPatient(patientId, careTeamId, riskServiceId) {
  return (dispatch, getState) => {
    dispatch(fetchRiskServicesIfNeeded()).then(() => {                                        // fetch all risk services
      let riskService = getState().riskService.riskServices.items.find((rs) => rs.id === riskServiceId);  // get risk service object
      return dispatch(selectRiskService(riskService));                                        // then select correct risk service
    });

    dispatch(fetchCareTeamsIfNeeded()).then(() => {                                           // fetch all care teams
      let careTeam = getState().huddle.careTeams.items.find((ct) => ct.id === careTeamId);    // get care team object
      dispatch(selectCareTeam(careTeam));                                                     // then select correct care team

      return dispatch(fetchHuddlesIfNeeded(getState().huddle.selectedCareTeam));              // fetch huddles for patient
    });

    dispatch(fetchRiskAssessmentsIfNeeded(patientId, riskServiceId)).then(() => {             // fetch all risk assessments and select first one
      let riskAssessmentId = getState().riskAssessment.selectedRiskAssessment.id;             // get risk assessment id
      return dispatch(fetchRiskBreakdownIfNeeded(riskAssessmentId));                          // then select correct risk assessment breakdown
    });

    dispatch(fetchPatientIfNeeded(patientId));                                                // fetch patient
  };
}

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

export function fetchPatient(patientId) {
  return dispatch => {
    dispatch(requestPatient(patientId));

    return fetch(`${FHIR_SERVER}/api/patients/${patientId}`)
      .then(response => response.json())
      .then(json => dispatch(receivePatient(json)));
  };
}

function shouldFetchPatient(state) {
  let patient = state.patient.patient;

  if (patient && patient.isFetching) {
    return false;
  } else {
    return true;
  }
}

export function fetchPatientIfNeeded(patientId) {
  return (dispatch, getState) => {
    if (shouldFetchPatient(getState())) {
      return dispatch(fetchPatient(patientId));
    } else {
      return Promise.resolve();
    }
  };
}

// ------------------------- PATIENT SEARCH -------------------------------- //

export function setPatientSearch(term) {
  return (dispatch) => {
    dispatch({ type: SET_PATIENT_SEARCH, term });
    return dispatch(fetchPatients());
  };
}

// ------------------------- SELECT PAGE ----------------------------------- //

export function selectPage(page) {
  return (dispatch) => {
    dispatch({ type: SELECT_PAGE, page });
    return dispatch(fetchPatients());
  };
}
