// Restructures the response of the Group endpoint for use in huddles
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
    id: _.uniqueId('huddleGroup-'),
    name: huddleGroup.name,
    dates: huddleGroup.dates.map((huddle) => restructureHuddle(huddle))
  };
}

function restructureHuddle(huddle) {
  let { resource } = huddle;
  return {
    id: resource.id,
    datetime: resource.extension[0].valueDateTime,
    practioner: resource.extension[1].valueReference.reference,
    patients: restructurePatients(resource.member)
  };
}

function restructurePatients(patients) {
  let newPatients = [];

  if (patients != null) {
    patients.forEach((patient) => {
      newPatients.push({
        id: patient.entity.reference,
        reason: { code: patient.extension[0].valueCodeableConcept.coding[0].code,
                  text: patient.extension[0].valueCodeableConcept.text }
      });
    });
    return newPatients;
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
