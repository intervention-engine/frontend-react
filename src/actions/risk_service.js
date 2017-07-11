// import axios from 'axios'; // TODO - add once risk service api works

import {
  FETCH_RISK_SERVICES,
  SELECT_RISK_SERVICE
} from './types';

export function fetchRiskServices() {
  // let riskServiceURL = `${FHIR_SERVER}/api/risk_services`; // TODO - add once risk service api works

  let tempPayload = [                                         // TODO - remove once risk service api works
    {
      "id": "rs1",
      "name": "Catastrophic Health Event"
    },
    {
      "id": "rs2",
      "name": "Ischemic Stroke Risk"
    }
  ];

  return {
    type: FETCH_RISK_SERVICES,
    // payload: axios.get(riskAssessmentURL)  // TODO - add once risk service api works
    payload: Promise.resolve(tempPayload)     // TODO - remove once risk service api works
  };
}

export function selectRiskService(riskService) {
  return {
    type: SELECT_RISK_SERVICE,
    payload: riskService
  };
}
