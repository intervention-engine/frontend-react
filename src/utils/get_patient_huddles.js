// returns all huddles for the given patient in a given care team

export default function getPatientHuddles(patient, huddles, careTeam) {
  if (!patient || !huddles || !careTeam) { return null; }

  let patientHuddles = [];
  let huddlesByCareTeam = huddles.filter((huddle) => huddle.care_team_id === careTeam.id);
  if (!huddlesByCareTeam) { return null; }

  for (let i = 0; i < huddlesByCareTeam.length; ++i) {
    if (huddlesByCareTeam[i].patients.find((huddlePatient) => huddlePatient.id === patient.id)) {
      patientHuddles.push(huddlesByCareTeam[i]);
    }
  }

  return patientHuddles;
}
