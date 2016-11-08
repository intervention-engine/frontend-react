// Restructures the response of the Patient endpoint for use in patients
import moment from 'moment';

function restructurePatients(payload) {
  if (payload.total === 0) { return []; }

  return payload.map((patient) => {
    return restructurePatient(patient);
  });
}

function restructurePatient(patient) {
  return {
    id: patient.id,
    gender: patient.gender,
    birthDate: patient.birthDate,
    age: moment().diff(moment(patient.birthDate), 'years'),
    name: {
      family: patient.name[0].family[0],
      given: patient.name[0].given[0],
      full: `${patient.name[0].family[0]}, ${patient.name[0].given[0]}`
    },
    address: {
      street: patient.address[0].line[0],
      city: patient.address[0].city,
      state: patient.address[0].state,
      postalCode: patient.address[0].postalCode
    }
  };
}

export default function () {
  return next => action => {
    if (action.payload && action.payload.data && action.payload.data.Patient) {
      action.payload.data.Patient = restructurePatients(action.payload.data.Patient);
    }

    return next(action);
  };
}
