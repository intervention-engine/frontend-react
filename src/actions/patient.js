import axios from 'axios';
import { param } from 'jquery';


export function loadPatients(params= {}) {
  let queryParams = {_count: 8, _offset:0, ...params};
  const PATIENT_URL = `${FHIR_SERVER}/Patient?${param(queryParams, true)}`;
  return {
    type: 'LOAD_PATIENTS',
    payload: axios.get(PATIENT_URL)
  };
}
