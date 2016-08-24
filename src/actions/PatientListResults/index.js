import axios from 'axios';


export function loadPatients({page=1, perPage=8, params={}}) {
  const OFFSET = (page - 1) * perPage;
  // TODO Allow adding params onto this URL.
  const PATIENT_URL = `${FHIR_SERVER}/Patient?_offset=${OFFSET}&_count=${perPage}`;
  return {
    type: 'LOAD_PATIENTS',
    payload: axios.get(PATIENT_URL)
  };
}
