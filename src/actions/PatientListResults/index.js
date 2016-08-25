import axios from 'axios';


export function loadPatients({page=1, perPage=8, params={}}) {
  const OFFSET = (page - 1) * perPage;
  // TODO Allow adding params onto this URL.
  const OPTIONS = Object.keys(params).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`);
  const PATIENT_URL = `${FHIR_SERVER}/Patient?_offset=${OFFSET}&_count=${perPage}&${OPTIONS.join('&')}`;
  return {
    type: 'LOAD_PATIENTS',
    payload: axios.get(PATIENT_URL)
  };
}
