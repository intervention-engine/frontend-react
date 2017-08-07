import axios from 'axios';

import {
  FETCH_RISK_ASSESSMENTS
} from './types';

export function fetchRiskAssessments(patientId, riskServiceId) {
  let riskAssessmentsURL = `${FHIR_SERVER}/api/patients/${patientId}/risk_assessments?risk_service_id=${riskServiceId}`;

  return {
    type: FETCH_RISK_ASSESSMENTS,
    payload: axios.get(riskAssessmentsURL)
  };
}
