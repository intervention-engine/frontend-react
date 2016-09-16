import axios from 'axios';

import {
  FETCH_RISK_ASSESSMENTS,
  SELECT_RISK_ASSESSMENT
} from './types';

export function fetchRiskAssessments() {
  const FETCH_RISK_ASSESSMENTS_URL = `${FHIR_SERVER}/RiskAssessment`;
  return {
    type: FETCH_RISK_ASSESSMENTS,
    payload: axios.get(FETCH_RISK_ASSESSMENTS_URL)
  };
}

export function selectRiskAssessment(riskAssessment) {
  return {
    type: SELECT_RISK_ASSESSMENT,
    payload: riskAssessment
  };
}
