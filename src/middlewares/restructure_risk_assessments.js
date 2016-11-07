// Restructures the response of the RiskAssessment endpoint for use in risk assessments
import _ from 'lodash';

// Groups by risk assessment name
function groupRiskAssessments(riskAssessments) {
  return _.chain(riskAssessments)
    .groupBy((object) => object.prediction[0].outcome.text)
    .toPairs()
    .map((item) => _.zipObject(['name', 'patients'], item))
    .value();
}

// Groups by patient reference
function groupPatients(patients) {
  return _.chain(patients)
    .groupBy((object) => object.subject.reference)
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
        datetime: risk.date,
        value: risk.prediction[0].probabilityDecimal,
        pie: risk.basis[0].reference
      });
    });

    return newRisks;
  }

  return {};
}

export default function() {
  return next => action => {
    if (action.payload && action.payload.data && action.payload.data.RiskAssessment) {
      let riskAssessments = action.payload.data.RiskAssessment;
      action.payload.data.RiskAssessment = groupRiskAssessments(riskAssessments).map((riskAssessment) => restructureRiskAssessment(riskAssessment));
    }
    return next(action);
  };
}
