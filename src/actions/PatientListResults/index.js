import axios from 'axios';


export function loadPatients(params={_count: 8, _offset:0}) {
  // TODO Allow adding params onto this URL.
  const OPTIONS = Object.keys(params).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`);
  const PATIENT_URL = `${FHIR_SERVER}/Patient?${OPTIONS.join('&')}`;
  return {
    type: 'LOAD_PATIENTS',
    payload: axios.get(PATIENT_URL)
  };
}
