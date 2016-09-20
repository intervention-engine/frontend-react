import axios from 'axios';
import { param } from 'jquery';
import { FETCH_PATIENTS } from './types';


export function fetchPatients(params= {}) {
  let queryParams = {_count: 10, _offset:0, '_sort:asc': 'family',...params};
  const PATIENT_URL = `${FHIR_SERVER}/Patient?${param(queryParams, true)}`;
  return {
    type: FETCH_PATIENTS,
    payload: axios.get(PATIENT_URL)
  };
}
