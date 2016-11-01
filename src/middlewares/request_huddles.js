// Restructures the response of the Group endpoint for use in huddles
import _ from 'lodash';

import {
  FETCH_HUDDLES_FULFILLED,
  FETCH_HUDDLES_RESOLVED
} from '../actions/types';

// Groups huddles by name
function groupHuddles(huddles) {
  return _.chain(huddles)
    .groupBy((object) => object.name)
    .toPairs()
    .map((item) => _.zipObject(['name', 'dates'], item))
    .value();
}

function restructurePopulation(population) {
  // let { resource } = population;
  return {
    id: population.id,
    meta: population.meta,
    name: population.name,
    characteristic: population.characteristic
  };
}

function restructureHuddles(huddleGroup) {
  return {
    id: _.uniqueId('huddleGroup-'),
    name: huddleGroup.name,
    dates: huddleGroup.dates.map((huddle) => restructureHuddle(huddle))
  };
}

function restructureHuddle(huddle) {
  return {
    id: huddle.id,
    datetime: huddle.extension[0].valueDateTime,
    practioner: huddle.extension[1].valueReference.reference,
    patients: restructurePatients(huddle.member)
  };
}

function restructurePatients(patients) {
  let newPatients = [];

  if (patients != null) {
    patients.forEach((patient) => {
      newPatients.push({
        id: patient.entity.reference.replace('Patient/', ''),
        reason: { code: patient.extension[0].valueCodeableConcept.coding[0].code,
                  text: patient.extension[0].valueCodeableConcept.text }
      });
    });
    return newPatients;
  }

  return [];
}

export default function({ dispatch }) {
  return next => action => {
    if (action.payload && action.payload.data && action.payload.data.Group) {
      let huddles = action.payload.data.Group;

      let Huddle = groupHuddles(huddles.filter((g) => g.actual )).map((huddleGroup) => restructureHuddles(huddleGroup));
      let Population  = huddles.filter((g) => !g.actual ).map((population) => restructurePopulation(population));
      action.payload.data.Group = {Huddle, Population};
    }
    return next(action);
  };
}
