import fetch from 'isomorphic-fetch';

import {
  REQUEST_RISK_SERVICES,
  RECEIVE_RISK_SERVICES,
  SELECT_RISK_SERVICE
} from './types';

// ------------------------- RISK SERVICES --------------------------------- //

function requestRiskServices() {
  return {
    type: REQUEST_RISK_SERVICES
  };
}

function receiveRiskServices(riskServices) {
  return {
    type: RECEIVE_RISK_SERVICES,
    riskServices
  };
}

export function fetchRiskServices() {
  return dispatch => {
    dispatch(requestRiskServices());

    return fetch(`${FHIR_SERVER}/api/risk_services`)
      .then(response => response.json())
      .then(json => dispatch(receiveRiskServices(json)))
      .then(({ riskServices }) => dispatch(selectRiskService(riskServices[0])));
  };
}

function shouldFetchRiskServices(state) {
  let riskServices = state.riskService.riskServices;

  if (riskServices && riskServices.isFetching) {
    return false;
  } else {
    return true;
  }
}

export function fetchRiskServicesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchRiskServices(getState())) {
      return dispatch(fetchRiskServices());
    } else {
      return Promise.resolve();
    }
  };
}

// ------------------------- SELECT RISK SERVICE --------------------------- //

export function selectRiskService(riskService) {
  return {
    type: SELECT_RISK_SERVICE,
    riskService
  };
}
