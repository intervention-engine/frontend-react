// Restructures the response of the Patient endpoint for use in patients
import moment from 'moment';
import { nest } from 'd3-collection';

import { fetchRiskAssessments } from '../actions/risk_assessment';
import {
  FETCH_PATIENTS_FULFILLED,
  FETCH_PATIENTS_RESOLVED,
  FETCH_PATIENT_FULFILLED,
  FETCH_PATIENT_RESOLVED
} from '../actions/types';

function restructurePatients(payload) {
  if (payload.total === 0) { return []; }

  return payload.map((patient) => {
    return restructurePatient(patient);
  });
}

function restructurePatient(patient) {
  return {
    id: patient.id,
    gender: patient.gender,
    birthDate: patient.birthDate,
    age: moment().diff(moment(patient.birthDate), 'years'),
    name: {
      family: patient.name[0].family[0],
      given: patient.name[0].given[0],
      full: `${patient.name[0].family[0]}, ${patient.name[0].given[0]}`
    },
    address: {
      street: patient.address[0].line[0],
      city: patient.address[0].city,
      state: patient.address[0].state,
      postalCode: patient.address[0].postalCode
    }
  };
}

function restructureMeta(payload) {
  return {
    total: payload.total,
    link: payload.link
  };
}

function restructureRiskAssessments(risks) {
  // Using d3-nest here to restructure these by coding
  let nesting = nest();
  nesting.key((d) => d.method.coding[0].code);
  // Then sort them properly
  nesting.sortValues((d) => new Date(d.date));
  let risksByType = nesting.entries(risks.map((d) => d.resource));
  return risksByType[0];
}

export default function ({ dispatch }) {
  return next => action => {
    if (action.payload && action.payload.data && action.payload.data.Patient) {
      action.payload.data.Patient = restructurePatients(action.payload.data.Patient)
    }

    return next(action);
  };
}
