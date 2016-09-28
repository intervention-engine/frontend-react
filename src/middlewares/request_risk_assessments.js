// Restructures the response of the RiskAssessment endpoint for use in risk assessments
import _ from 'lodash';

import {
  FETCH_RISK_ASSESSMENTS_FULFILLED,
  FETCH_RISK_ASSESSMENTS_RESOLVED
} from '../actions/types';

// Groups by risk assessment name
function groupRiskAssessments(riskAssessments) {
  return _.chain(riskAssessments)
    .groupBy((object) => object.resource.prediction[0].outcome.text)
    .toPairs()
    .map((item) => _.zipObject(['name', 'patients'], item))
    .value();
}

// Groups by patient reference
function groupPatients(patients) {
  return _.chain(patients)
    .groupBy((object) => object.resource.subject.reference)
    .toPairs()
    .map((item) => _.zipObject(['id', 'risks'], item))
    .value();
}

function restructureRiskAssessment(riskAssessment) {
  return {
    id: _.uniqueId('riskAssessment-'),
    name: riskAssessment.name,
    patients: groupPatients(riskAssessment.patients).map((patient) => {
      return restructurePatient(patient);
    })
  };
}

function restructurePatient(patient) {
  return {
    id: patient.id.replace('Patient/', ''),
    risks: restructureRisks(patient.risks)
  };
}

function restructureRisks(risks) {
  let newRisks = [];

  if (risks != null) {
    risks.forEach((risk) => {
      newRisks.push({
        datetime: risk.resource.date,
        value: risk.resource.prediction[0].probabilityDecimal,
        pie: risk.resource.basis[0].reference
      });
    });

    return newRisks;
  }

  return {};
}

export default function({ dispatch }) {
  return next => action => {
    switch (action.type) {
      case FETCH_RISK_ASSESSMENTS_FULFILLED:
        let riskAssessments = action.payload.data.entry;
        dispatch({
          type: FETCH_RISK_ASSESSMENTS_RESOLVED,
          payload: groupRiskAssessments(riskAssessments).map((riskAssessment) => {
            return restructureRiskAssessment(riskAssessment);
          })
        });
        return;
    }

    return next(action);
  };
}
