import moment from 'moment';

import { isTodayOrAfter } from '../reducers/huddle';

// Returns patient next huddle mapping as follows { patient id: { huddleGroup, huddle, huddlePatient }}
export default function nextHuddleForPatients(huddleGroups) {
  if (!huddleGroups) { return null; }
  
  let patientHuddleMapping = {};

  for (let i = 0; i < huddleGroups.length; ++i) {
    let huddleGroup = huddleGroups[i];
    let huddles = huddleGroup.dates;

    for (let j = 0; j < huddles.length; ++j) {
      let huddle = huddles[j];
      let huddleDate = moment(huddle.datetime);

      if (!isTodayOrAfter(huddleDate)) {
        continue;
      }

      let { patients } = huddle;

      for (let k = 0; k < patients.length; ++k) {
        let huddlePatient = patients[k];

        if (patientHuddleMapping[huddlePatient.id] == null || huddleDate.isBefore(patientHuddleMapping[huddlePatient.id].huddle.datetime, 'day')) {
          patientHuddleMapping[huddlePatient.id] = { huddleGroup, huddle, huddlePatient };
        }
      }
    }
  }

  return patientHuddleMapping;
}
