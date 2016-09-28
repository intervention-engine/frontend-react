import axios from 'axios';
import { param } from 'jquery';

import { FETCH_PATIENTS } from './types';

export function fetchPatients(params= {}) {
  let riskAssessment = params.riskAssessment;
  delete params.riskAssessment; // remove from params for use in queryParams

  let queryParams = { _count: 10, _offset: 0, ...params };
  let PATIENT_URL = `${FHIR_SERVER}/Patient?${param(queryParams, true)}`;
  return {
    type: FETCH_PATIENTS,
    payload: axios.get(PATIENT_URL).then((payload) => {
      return { ...payload, riskAssessment };
    })
  };
}
