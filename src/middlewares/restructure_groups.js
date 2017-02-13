// Restructures the response of the Group endpoint for use in huddles
import _ from 'lodash';

const REASON_EXTENSION = 'http://interventionengine.org/fhir/extension/group/member/reason';
const REVIEW_EXTENSION = 'http://interventionengine.org/fhir/extension/group/member/reviewed';

// Groups huddles by name
function groupHuddles(huddles) {
  return _.chain(huddles)
    .groupBy((object) => object.name)
    .toPairs()
    .map((item) => _.zipObject(['name', 'dates'], item))
    .value();
}

function restructurePopulation(population) {
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
    name: huddle.name,
    datetime: huddle.extension[0].valueDateTime,
    practioner: huddle.extension[1].valueReference.reference,
    patients: restructurePatients(huddle.member)
  };
}

function restructurePatients(patients) {
  let newPatients = [];

  if (patients != null) {
    newPatients = patients.map((patient) => {
      let data = {
        id: patient.entity.reference.replace('Patient/', '')
      };

      for (let i = 0; i < patient.extension.length; ++i) {
        let extension = patient.extension[i];

        if (extension.url === REASON_EXTENSION) {
          data.reason = {
            code: extension.valueCodeableConcept.coding[0].code,
            text: extension.valueCodeableConcept.text
          };
        } else if (extension.url === REVIEW_EXTENSION) {
          data.reviewed = extension.valueDateTime;
        }
      }

      return data;
    });
  }

  return newPatients;
}

export default function() {
  return next => action => {
    if (action.payload && action.payload.data && action.payload.data.Group) {
      let groups = action.payload.data.Group;
      let Huddle = groupHuddles(groups.filter((g) => g.actual)).map((huddleGroup) => restructureHuddles(huddleGroup));
      let Population  = groups.filter((g) => !g.actual).map((population) => restructurePopulation(population));
      action.payload.data.Group = { Huddle, Population };
    }

    return next(action);
  };
}
