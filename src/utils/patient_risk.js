export default function patientRisk(patient, riskAssessments) {
  if (!riskAssessments || riskAssessments.length === 0) { return null; }

  return riskAssessments.sort((a,b) => new Date(b.date) - new Date(a.date))[0].value;
}
