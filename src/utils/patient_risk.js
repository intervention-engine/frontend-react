export default function patientRisk(patient, riskAssessments) {
  if (!riskAssessments || riskAssessments.length === 0 || !riskAssessments.patients) {
    return null;
  }

  let patientRisk = riskAssessments.patients.find((patientRisk) => {
    return patientRisk.id === patient.id;
  });

  if (patientRisk != null) {
    return patientRisk.risks.sort((a,b) => new Date(b.datetime) - new Date(a.datetime))[0].value;
  } else {
    return null;
  }
}
