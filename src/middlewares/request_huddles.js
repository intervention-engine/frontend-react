// Restructures the response of the Group endpoint for use in huddles
// STRUCTURE:
// Payload
// ├── Object
// |   ├── name: string
// |   ├── dates: array of objects
// |       ├── Object
// |           ├── RiskAssessmentSelector.js
import _ from 'lodash';

import {
  FETCH_HUDDLES_FULFILLED,
  FETCH_HUDDLES_RESOLVED
} from '../actions/types';

function groupHuddles(huddles) {
  // Groups huddles by name
  return _.chain(huddles)
    .groupBy((object) => object.resource.name)
    .toPairs()
    .map((item) => _.zipObject(['name', 'dates'], item))
    .value();
}

function restructureHuddles(huddleGroup) {
  return {
    name: huddleGroup.name,
    dates: huddleGroup.dates.map((huddle) => restructureHuddle(huddle))
  };
}

function restructureHuddle(huddle) {
  let { resource } = huddle;
  return {
    datetime: resource.extension[0].valueDateTime,
    practioner: resource.extension[1].valueReference.reference,
    patients: resource.member.map((member) => restructurePatient(member))
  }
}

function restructurePatient(patient) {
  if (patient !== null) {
    return {
      id: patient.entity.reference,
      reason: { code: patient.extension[0].valueCodeableConcept.coding[0].code,
                text: patient.extension[0].valueCodeableConcept.text }
    }
  }

  return {};
}

export default function({ dispatch }) {
  return next => action => {
    switch (action.type) {
      case FETCH_HUDDLES_FULFILLED:
        let huddles = action.payload.data.entry;
        dispatch({
          type: FETCH_HUDDLES_RESOLVED,
          payload: groupHuddles(huddles).map((huddleGroup) => restructureHuddles(huddleGroup))
        });
        return;
    }

    return next(action);
  };
}
