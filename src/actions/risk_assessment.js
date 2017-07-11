// import axios from 'axios'; // TODO - add once risk assessment api works

import {
  FETCH_RISK_ASSESSMENTS
} from './types';

export function fetchRiskAssessments() { // TODO - add patientId to arguments onces risk assessment api works
  // let riskServiceURL = `${FHIR_SERVER}/api/patients/${patientId}/risk_assessments`;  // TODO - add once risk assessment api works

  let tempPayload = [                                                                   // TODO - remove once risk assessment api works
    { "id": "ra1", "risk_service_id": "rs1", "date": "2016-06-01", "value": 3 },
    { "id": "ra2", "risk_service_id": "rs1", "date": "2016-05-01", "value": 3 },
    { "id": "ra3", "risk_service_id": "rs1", "date": "2016-05-06", "value": 2 },
    { "id": "ra4", "risk_service_id": "rs2", "date": "2016-01-01", "value": 2 },
    { "id": "ra5", "risk_service_id": "rs2", "date": "2016-02-06", "value": 1 }
  ];

  return {
    type: FETCH_RISK_ASSESSMENTS,
    // payload: axios.get(riskAssessmentURL)  // TODO - add once risk assessment api works
    payload: Promise.resolve(tempPayload)     // TODO - remove once risk assessment api works
  };
}
