import axios from 'axios';

import {
  FETCH_RISK_SERVICES,
  SELECT_RISK_SERVICE
} from './types';

export function fetchRiskServices() {
  let riskServiceURL = `${FHIR_SERVER}/api/risk_services`;

  return {
    type: FETCH_RISK_SERVICES,
    payload: axios.get(riskServiceURL)
  };
}

export function selectRiskService(riskService) {
  return {
    type: SELECT_RISK_SERVICE,
    payload: riskService
  };
}
