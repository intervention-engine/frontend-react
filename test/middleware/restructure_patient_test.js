


import { expect, isProp } from '../test_helper';

import { patientsResponse } from '../fixtures/fhir';
import patients from '../../src/middlewares/restructure_patients';
import bundles from '../../src/middlewares/request_bundles';
import MockStore from '../MockStore';
import patientProps from '../../src/prop-types/patient';

describe('Patient List Middleware', () => {
  let fhirBundle;
  let store;
  let action;
  const next = () => {
    // Do Nothing
    1+1;
  }

  beforeEach(() => {
    action = {
      type: 'NO_TYPE',
      payload: {
        data: patientsResponse
      }
    }
    store = new MockStore();
    fhirBundle = bundles(store)(next)(action);
  })
  it('will properly extract patient data', () => {
    patients(store)(next)(action);
    let patientsData = action.payload.data.Patient;
    expect(patientsData.length).to.equal(8);
    let patient0 = patientsData[0];
    expect(patient0.gender).to.equal('male');
    expect(patient0.name.family).to.equal('Baker8868');
  })
})
