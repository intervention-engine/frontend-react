export default function patientHuddles(patient, huddles) {
  if (!patient || !huddles) { return null; }

  let patientHuddles = [];

  for (let i = 0; i < huddles.length; ++i) {
    for (let j = 0; j < huddles[i].dates.length; ++j) {
      if (huddles[i].dates[j].patients.find((huddlePatient) => huddlePatient.id === patient.id)) {
        patientHuddles.push(huddles[i].dates[j]);
      }
    }
  }

  return patientHuddles;
}
