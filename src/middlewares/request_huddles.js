// Restructures the response of the Group endpoint for use in huddles
import _ from 'lodash';

import {
  FETCH_HUDDLES_FULFILLED,
  FETCH_HUDDLES_RESOLVED
} from '../actions/types';

function groupHuddles(huddles) {
  // Groups huddles by name
  let result = _.chain(huddles)
    .groupBy((object) => object.resource.name)
    .toPairs()
    .map((item) => _.zipObject(['name', 'dates'], item))
    .value();
  console.log("groupHuddles, result: ", result);
  return result;
}

function restructureHuddles(huddleGroup) {
  console.log("restructureHuddles, huddleGroup: ", huddleGroup);
  let result = {
    name: huddleGroup.name,
    dates: huddleGroup.dates.map((huddle) => {
      restructureHuddle(huddle)
    })
  };
  console.log("END: ", result);
  return result;
}

function restructureHuddle(huddle) {
  let { resource } = huddle;
    console.log("restructureHuddle START: ", resource);
  let result = {
    datetime: resource.extension[0].valueDateTime,
    practioner: resource.extension[1].valueReference.reference,
    patients: resource.member.map((member) => {
      restructurePatient(member)
    })
  }
  console.log("********restructureHuddle END: ", result);
  return result;
}

function restructurePatient(patient) {
  console.log("restructurePatient START: ", patient);

  if (patient !== null) {
    let result = {
      id: patient.entity.reference,
      reason: { code: patient.extension[0].valueCodeableConcept.coding[0].code,
                text: patient.extension[0].valueCodeableConcept.text }
    }
    console.log("restructurePatient END: ", result);
    return result;
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
