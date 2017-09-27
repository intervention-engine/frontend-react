import fetch from 'isomorphic-fetch';

import {
  REQUEST_RISK_ASSESSMENTS,
  RECEIVE_RISK_ASSESSMENTS,
  REQUEST_RISK_BREAKDOWN,
  RECEIVE_RISK_BREAKDOWN,
  SELECT_RISK_ASSESSMENT
} from './types';

// ------------------------- RISK SERVICES --------------------------------- //

function requestRiskAssessments() {
  return {
    type: REQUEST_RISK_ASSESSMENTS
  };
}

function receiveRiskAssessments(riskAssessments) {
  return {
    type: RECEIVE_RISK_ASSESSMENTS,
    riskAssessments
  };
}

export function fetchRiskAssessments(patientId, riskServiceId) {
  return dispatch => {
    dispatch(requestRiskAssessments());

    return fetch(`${FHIR_SERVER}/api/patients/${patientId}/risk_assessments?risk_service_id=${riskServiceId}`)
      .then(response => response.json())
      .then(json => dispatch(receiveRiskAssessments(json)))
      .then(({ riskAssessments }) => { dispatch(selectRiskAssessment(riskAssessments[0])); });
  };
}

function shouldFetchRiskAssessments(state) {
  let riskAssessments = state.riskAssessment.riskAssessments;

  if (riskAssessments && riskAssessments.isFetching) {
    return false;
  } else {
    return true;
  }
}

export function fetchRiskAssessmentsIfNeeded(patientId, riskServiceId) {
  return (dispatch, getState) => {
    if (shouldFetchRiskAssessments(getState())) {
      return dispatch(fetchRiskAssessments(patientId, riskServiceId));
    } else {
      return Promise.resolve();
    }
  };
}

// ------------------------- RISK BREAKDOWN -------------------------------- //

function requestRiskBreakdown() {
  return {
    type: REQUEST_RISK_BREAKDOWN
  };
}

function receiveRiskBreakdown(riskBreakdown) {
  return {
    type: RECEIVE_RISK_BREAKDOWN,
    riskBreakdown
  };
}

export function fetchRiskBreakdown(riskAssessmentId) {
  return dispatch => {
    dispatch(requestRiskBreakdown());

    return fetch(`${FHIR_SERVER}/api/risk_assessments/${riskAssessmentId}/breakdown`)
      .then(response => response.json())
      .then(json => dispatch(receiveRiskBreakdown(json)));
  };
}

function shouldFetchRiskBreakdown(state) {
  let riskBreakdown = state.riskAssessment.riskBreakdown;

  if (riskBreakdown && riskBreakdown.isFetching) {
    return false;
  } else {
    return true;
  }
}

export function fetchRiskBreakdownIfNeeded(riskAssessmentId) {
  return (dispatch, getState) => {
    if (shouldFetchRiskBreakdown(getState())) {
      return dispatch(fetchRiskBreakdown(riskAssessmentId));
    } else {
      return Promise.resolve();
    }
  };
}

// ------------------------- SELECT RISK ASSESSMENT --------------------------- //

export function selectRiskAssessment(riskAssessment) {
  return {
    type: SELECT_RISK_ASSESSMENT,
    riskAssessment
  };
}
