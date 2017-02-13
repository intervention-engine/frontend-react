import { expect, renderComponent } from '../test_helper';
import patient from '../../src/reducers/patient';
import {
  FETCH_PATIENTS_FULFILLED,
  SET_PATIENT_SEARCH,
  SELECT_PAGE,
  FETCH_PATIENT_FULFILLED
} from '../../src/actions/types';

describe('Patient Reducer', () => {

  it('When changing the patient search the correct page is set', () => {
    const state = {};
    const newState = patient(state, {payload: '', type:SET_PATIENT_SEARCH});
    expect(newState.currentPage).to.equal(1);
    expect(newState.patientSearch).to.equal('');
  });
});
