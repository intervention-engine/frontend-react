import moment from 'moment';

export default function huddleToFhir(props) {
  let payload = {
    resourceType: 'Group',
    meta: {
      profile: ['http://interventionengine.org/fhir/profile/huddle']
    },
    extension: [
      { url: 'http://interventionengine.org/fhir/extension/group/activeDateTime', valueDateTime: props.datetime },
      { url: 'http://interventionengine.org/fhir/extension/group/leader', valueReference: { reference: props.practioner } }
    ],
    type: 'person',
    actual: true,
    code: {
      coding: [ { system: 'http://interventionengine.org/fhir/cs/huddle', code: 'HUDDLE' } ],
      text: 'Huddle'
    },
    name: props.name,
    member: props.patients.map((patient) => patientToFhir(patient))
  };

  if (props.id) {
    payload.id = props.id;
  }

  return payload;
}

export function patientToFhir(patient) {
  let payload = {
    entity: {
      reference: `Patient/${patient.id}`
    },
    extension: [{
      url: 'http://interventionengine.org/fhir/extension/group/member/reason',
      valueCodeableConcept: {
        coding: [{
          system: 'http://interventionengine.org/fhir/cs/huddle-member-reason',
          code: patient.reason.code
        }],
        text: patient.reason.text
      }
    }]
  };

  if (patient.reviewed) {
    payload.extension.push({
      url: 'http://interventionengine.org/fhir/extension/group/member/reviewed',
      valueDateTime: moment(patient.reviewed).format('YYYY-MM-DDTHH:mm:ssZ')
    });
  }

  return payload;
}
