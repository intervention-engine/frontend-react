import { FETCH_PATIENTS_RESOLVED } from '../actions/types';

/*
  Data structured
patients: {
  resources: {
    patientId: patientData
    ...
  }
  selectedPatient: selectedPatientID
  patients: [patientIds...]
  meta: {
    links: linksFromFHIR
    total: totalPatientCount
  }
}
*/


function extractCurrentPatients(newPatients) {
  return newPatients.map((p) => p.id);
}

function mergePatients(state, newPatients) {
  let newState = {...state};
  newPatients.map((pat) => {
    newState[pat.id] = pat;
  });
  return newState;
}

export default function(state = {patients: [], resources: {}, meta:{}}, action)  {
  switch (action.type) {
    case FETCH_PATIENTS_RESOLVED:
      let newPatients = action.payload.patients;
      let resources = mergePatients(state.patients, newPatients);
      let { total, link } = action.payload.meta;
      let meta = { total,link };
      let patients = extractCurrentPatients(newPatients);
      return {resources, patients, meta};
    default:
      return state;
  }
}
