import axios from 'axios';

import {
  FETCH_RISK_ASSESSMENTS,
  SELECT_RISK_ASSESSMENT,
  FETCH_RISK_ASSESSMENT_BREAKDOWN
} from './types';

export function fetchRiskAssessments(patientId, riskServiceId) {
  let riskAssessmentsURL = `${FHIR_SERVER}/api/patients/${patientId}/risk_assessments?risk_service_id=${riskServiceId}`;

  return {
    type: FETCH_RISK_ASSESSMENTS,
    payload: axios.get(riskAssessmentsURL)
  };
}

export function selectRiskAssessment(riskAssessment) {
  return {
    type: SELECT_RISK_ASSESSMENT,
    payload: riskAssessment
  };
}

export function fetchRiskAssessmentBreakdown(riskAssessmentId) {
  let riskAssessmentBreakdownURL = `${FHIR_SERVER}/api/risk_assessments/${riskAssessmentId}/breakdown`;

  return {
    type: FETCH_RISK_ASSESSMENT_BREAKDOWN,
    payload: axios.get(riskAssessmentBreakdownURL)
  };
}
